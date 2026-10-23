/* eslint-disable @typescript-eslint/no-explicit-any -- resultados do mysql2 sem tipagem */
// src/app/api/webhooks/stripe/route.ts
// Mantém as assinaturas em dia com o que acontece no Stripe.
//
// No Dashboard → Desenvolvedores → Webhooks, crie o endpoint
//   https://SEU_DOMINIO/api/webhooks/stripe
// com os eventos:
//   customer.subscription.created, customer.subscription.updated, customer.subscription.deleted,
//   invoice.paid, invoice.payment_failed, invoice.payment_action_required
// e copie o "Signing secret" (whsec_...) para STRIPE_WEBHOOK_SECRET.

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "../../../../lib/db";
import { getStripe, sincronizarAssinatura } from "../../../../lib/stripeAssinaturas";

export const dynamic = "force-dynamic";

function subscriptionIdDaFatura(invoice: Stripe.Invoice): string | null {
  const s = invoice.parent?.subscription_details?.subscription;
  if (!s) return null;
  return typeof s === "string" ? s : s.id;
}

async function registrarFatura(invoice: Stripe.Invoice, subscriptionId: string) {
  const pagoEm = invoice.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000)
    : null;
  await db.query(
    `INSERT INTO stripe_faturas (id, assinatura_id, valor, status, motivo, tentativas, pago_em, url_fatura)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), tentativas = VALUES(tentativas),
                             pago_em = COALESCE(VALUES(pago_em), pago_em), url_fatura = VALUES(url_fatura)`,
    [
      invoice.id,
      subscriptionId,
      ((invoice.amount_paid || invoice.amount_due) / 100).toFixed(2),
      invoice.status ?? "open",
      invoice.billing_reason ?? null,
      invoice.attempt_count ?? 0,
      pagoEm,
      invoice.hosted_invoice_url ?? null,
    ]
  );
}

async function processar(event: Stripe.Event) {
  const stripe = getStripe();

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      // Busca o estado atual (os eventos podem chegar fora de ordem)
      const sub = await stripe.subscriptions.retrieve(event.data.object.id);
      await sincronizarAssinatura(sub);
      // 👉 Ponto de integração: liberar/revogar benefícios conforme STATUS_COM_ACESSO
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object;
      const subId = subscriptionIdDaFatura(invoice);
      if (!subId) break;
      await registrarFatura(invoice, subId);
      await db.query(
        `UPDATE assinaturas_stripe
            SET ultima_fatura_id = ?, ultimo_pagamento_em = NOW(), ultima_falha = NULL
          WHERE id = ?`,
        [invoice.id, subId]
      );
      await sincronizarAssinatura(await stripe.subscriptions.retrieve(subId));
      console.log(`✅ [Stripe] Mensalidade paga: ${subId} (${invoice.billing_reason})`);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const subId = subscriptionIdDaFatura(invoice);
      if (!subId) break;
      await registrarFatura(invoice, subId);
      await db.query(`UPDATE assinaturas_stripe SET ultima_falha = ? WHERE id = ?`, [
        `Cobrança recusada (tentativa ${invoice.attempt_count}) em ${new Date().toISOString()}`,
        subId,
      ]);
      await sincronizarAssinatura(await stripe.subscriptions.retrieve(subId));
      // 👉 Ponto de integração: avisar o cliente para atualizar o cartão
      console.warn(`⚠️ [Stripe] Falha na cobrança de ${subId}, tentativa ${invoice.attempt_count}`);
      break;
    }

    case "invoice.payment_action_required": {
      // O banco pediu autenticação (3DS) numa renovação. O Stripe pode enviar o e-mail
      // ao cliente automaticamente (Dashboard → Billing → Revenue recovery).
      const invoice = event.data.object;
      console.warn(`⚠️ [Stripe] Renovação requer autenticação: ${invoice.hosted_invoice_url}`);
      break;
    }

    default:
      break;
  }
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const assinatura = req.headers.get("stripe-signature");
  if (!secret || !assinatura) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 400 });
  }

  // O corpo precisa ser o texto bruto para validar a assinatura do Stripe
  const corpo = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(corpo, assinatura, secret);
  } catch (e) {
    console.error("❌ [Stripe Webhook] Assinatura inválida:", (e as Error).message);
    return NextResponse.json({ erro: "Assinatura inválida" }, { status: 400 });
  }

  // Idempotência: o Stripe pode entregar o mesmo evento mais de uma vez
  await db.query(`INSERT IGNORE INTO stripe_webhook_eventos (id, tipo) VALUES (?, ?)`, [event.id, event.type]);
  const [rows]: any = await db.query(`SELECT processado_em FROM stripe_webhook_eventos WHERE id = ?`, [event.id]);
  if (rows?.[0]?.processado_em) return NextResponse.json({ ok: true, duplicado: true });

  try {
    await processar(event);
    await db.query(`UPDATE stripe_webhook_eventos SET processado_em = NOW(), erro = NULL WHERE id = ?`, [
      event.id,
    ]);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = (e as Error)?.message || String(e);
    console.error(`❌ [Stripe Webhook] Erro em ${event.type}:`, msg);
    await db.query(`UPDATE stripe_webhook_eventos SET erro = ? WHERE id = ?`, [msg, event.id]).catch(() => {});
    return NextResponse.json({ erro: "Falha ao processar" }, { status: 500 }); // Stripe tenta de novo
  }
}
