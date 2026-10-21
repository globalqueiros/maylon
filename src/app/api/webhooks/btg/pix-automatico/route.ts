// src/app/api/webhooks/btg/pix-automatico/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any -- payloads externos (BTG/MySQL) sem tipagem oficial */
// Recebe os eventos de Pix Automático do BTG:
//   automatic-pix.authorization-created   → QR gerado (PENDING)
//   automatic-pix.scheduling-approved     → autorização APROVADA pelo cliente (→ ACTIVE)
//   automatic-pix.authorization-rejected  → agendamento/autorização rejeitado
//   automatic-pix.cancelled               → cancelamento (pelo cliente no app do banco ou pela Maylon)
//   automatic-pix.scheduling-paid         → mensalidade debitada
//
// Cadastre no portal do BTG a URL:
//   https://SEU_DOMINIO/api/webhooks/btg/pix-automatico?token=<BTG_WEBHOOK_SECRET>
//
// O evento é sempre registrado (idempotência por hash do corpo). Se o processamento
// falhar, devolvemos 500 para o BTG reenviar.

import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import {
  aplicarStatusBTG,
  atualizarCobrancaPorScheduling,
  buscarAssinatura,
  buscarPorAuthorizationId,
  finalizarEventoWebhook,
  registrarEventoWebhook,
  type StatusCobranca,
} from "../../../../../lib/pixAutomatico/assinaturas";
import { agendarAssinatura } from "../../../../../lib/pixAutomatico/agendamentos";

export const dynamic = "force-dynamic";

function tokenValido(recebido: string | null): boolean {
  const esperado = process.env.BTG_WEBHOOK_SECRET;
  if (!esperado) {
    console.error("❌ BTG_WEBHOOK_SECRET não definido — webhook recusado");
    return false;
  }
  if (!recebido) return false;
  const a = Buffer.from(recebido);
  const b = Buffer.from(esperado);
  return a.length === b.length && timingSafeEqual(a, b);
}

function statusCobranca(btg: string): StatusCobranca {
  switch (btg.toUpperCase()) {
    case "PAID":
    case "SETTLED":
      return "PAID";
    case "REJECTED":
    case "FAILED":
      return "REJECTED";
    case "CANCELED":
    case "CANCELLED":
      return "CANCELED";
    default:
      return "SCHEDULED";
  }
}

async function processar(evento: string, data: any) {
  // Eventos de agendamento (cobrança mensal) trazem schedulingId
  if (data?.schedulingId) {
    const status = statusCobranca(String(data.status || ""));
    await atualizarCobrancaPorScheduling(data.schedulingId, {
      status,
      endToEndId: data.paymentEndToEndId,
      valorPago: data.amountPaid != null ? Number(data.amountPaid) : undefined,
      pagoEm: data.paidAt,
      erro: data.rejectionCode
        ? `${data.rejectionCode}: ${data.rejectionDescription ?? ""}`.trim()
        : undefined,
    });
    if (status === "REJECTED") {
      // 👉 Ponto de integração: avisar o cliente / tentar retentativa (retryPolicy ACCEPT_3R_7D)
      console.warn(`⚠️ [Pix Automático] Cobrança ${data.schedulingId} rejeitada: ${data.rejectionCode}`);
    }
    return;
  }

  // Eventos da autorização (o "cadastro" do cliente)
  if (data?.authorizationId) {
    const assinatura =
      (await buscarPorAuthorizationId(data.authorizationId)) ??
      (data.externalId ? await buscarAssinatura(String(data.externalId)) : null);

    if (!assinatura) {
      console.warn(`⚠️ [Pix Automático] Autorização desconhecida: ${data.authorizationId} (${evento})`);
      return;
    }

    let statusBTG = String(data.status || "");
    if (!statusBTG && evento.endsWith("cancelled")) statusBTG = "CANCELED";

    const novo = await aplicarStatusBTG(assinatura, statusBTG);
    if (novo === "ACTIVE") {
      // Se o 1º vencimento já está na janela D-10..D-2, agenda agora mesmo
      const atualizada = await buscarAssinatura(assinatura.id);
      if (atualizada) await agendarAssinatura(atualizada);
    }
    return;
  }

  // instant-collections.* e outros eventos não usados aqui
  console.log(`ℹ️ [Pix Automático] Evento ignorado: ${evento}`);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  if (!tokenValido(url.searchParams.get("token") ?? req.headers.get("x-webhook-token"))) {
    return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
  }

  const bruto = await req.text();
  let body: any;
  try {
    body = JSON.parse(bruto);
  } catch {
    return NextResponse.json({ erro: "JSON inválido" }, { status: 400 });
  }

  // Envelope: o payload do evento fica em `data` (conforme a doc do BTG)
  const evento: string = String(body?.event ?? body?.eventType ?? body?.type ?? body?.name ?? "desconhecido");
  const data = body?.data ?? body;

  const chave = createHash("sha256").update(bruto).digest("hex");
  const registro = await registrarEventoWebhook(chave, evento, body);
  if (!registro.novo) return NextResponse.json({ ok: true, duplicado: true });

  try {
    await processar(evento, data);
    await finalizarEventoWebhook(registro.id);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("❌ [Pix Automático] Erro ao processar webhook:", e);
    await finalizarEventoWebhook(registro.id, e?.message || String(e)).catch(() => {});
    return NextResponse.json({ erro: "Falha ao processar" }, { status: 500 });
  }
}
