// src/lib/stripeAssinaturas.ts
// Assinatura mensal no cartão com Stripe Billing.
//
// Como funciona:
// 1. Criamos (ou reaproveitamos) o Customer pelo e-mail.
// 2. Criamos uma Subscription "default_incomplete": o Stripe gera a 1ª fatura e um
//    PaymentIntent, e devolvemos o client_secret para o PaymentElement confirmar no navegador.
// 3. Com o 1º pagamento aprovado, o cartão fica salvo como padrão da assinatura
//    (save_default_payment_method) e o Stripe cobra sozinho todo mês.
// 4. O webhook (/api/webhooks/stripe) mantém a tabela assinaturas_stripe atualizada.

import Stripe from "stripe";
import type { ResultSetHeader } from "mysql2";
import { db } from "./db";
import { calcularAssinatura, type ResumoAssinatura } from "./planos";

let _stripe: Stripe | null = null;
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY não definido no .env");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

const APP = "maylon_pass"; // marcador em metadata para separar de outros produtos da conta

// ---------------------------------------------------------------------------
// Produtos: um por plano e um por serviço adicional, com IDs fixos.
// São criados automaticamente na primeira venda (não precisa cadastrar no Dashboard).
// ---------------------------------------------------------------------------

const produtosGarantidos = new Set<string>();

async function garantirProduto(id: string, nome: string): Promise<string> {
  if (produtosGarantidos.has(id)) return id;
  const stripe = getStripe();
  try {
    await stripe.products.retrieve(id);
  } catch (e) {
    if ((e as Stripe.errors.StripeError)?.code !== "resource_missing") throw e;
    try {
      await stripe.products.create({ id, name: nome, metadata: { app: APP } });
    } catch (e2) {
      // Outra requisição criou ao mesmo tempo
      if ((e2 as Stripe.errors.StripeError)?.code !== "resource_already_exists") throw e2;
    }
  }
  produtosGarantidos.add(id);
  return id;
}

async function montarItens(resumo: ResumoAssinatura) {
  const itens: Stripe.SubscriptionCreateParams.Item[] = [];

  const produtoPlano = await garantirProduto(
    `maylon_pass_${resumo.plano.id}`,
    `Maylon Pass ${resumo.plano.name}`
  );
  itens.push({
    price_data: {
      currency: "brl",
      product: produtoPlano,
      unit_amount: Math.round(resumo.plano.price * 100),
      recurring: { interval: "month" },
    },
  });

  // Cada serviço vira uma linha própria na fatura do cliente
  for (const s of resumo.servicos) {
    const produto = await garantirProduto(`maylon_servico_${s.id}`, s.name);
    itens.push({
      price_data: {
        currency: "brl",
        product: produto,
        unit_amount: Math.round(s.price * 100),
        recurring: { interval: "month" },
      },
    });
  }
  return itens;
}

// ---------------------------------------------------------------------------
// Customer
// ---------------------------------------------------------------------------

async function buscarOuCriarCliente(email: string, nome: string): Promise<Stripe.Customer> {
  const stripe = getStripe();
  const existentes = await stripe.customers.list({ email, limit: 1 });
  const atual = existentes.data[0];
  if (atual) {
    if (atual.name !== nome) await stripe.customers.update(atual.id, { name: nome });
    return atual;
  }
  return stripe.customers.create({ email, name: nome, metadata: { app: APP } });
}

// ---------------------------------------------------------------------------
// Criação da assinatura
// ---------------------------------------------------------------------------

export class AssinaturaError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export async function criarAssinaturaCartao(params: {
  planId: unknown;
  serviceIds: unknown;
  nome: string;
  email: string;
}) {
  const resumo = calcularAssinatura(params.planId, params.serviceIds);
  if (!resumo) throw new AssinaturaError("Plano inválido");

  const stripe = getStripe();
  const cliente = await buscarOuCriarCliente(params.email, params.nome);

  // Bloqueia assinatura duplicada do Maylon Pass para o mesmo cliente
  const ativas = await stripe.subscriptions.list({ customer: cliente.id, status: "all", limit: 20 });
  const jaAssina = ativas.data.some(
    (s) => s.metadata?.app === APP && ["active", "trialing", "past_due"].includes(s.status)
  );
  if (jaAssina) {
    throw new AssinaturaError("Este e-mail já tem uma assinatura Maylon Pass ativa.", 409);
  }

  // Cancela tentativas anteriores que ficaram sem pagamento (ex.: usuário recarregou a página)
  for (const s of ativas.data) {
    if (s.metadata?.app === APP && s.status === "incomplete") {
      await stripe.subscriptions.cancel(s.id).catch(() => {});
    }
  }

  const subscription = await stripe.subscriptions.create({
    customer: cliente.id,
    items: await montarItens(resumo),
    payment_behavior: "default_incomplete",
    payment_settings: {
      payment_method_types: ["card"],
      save_default_payment_method: "on_subscription", // cartão fica salvo para os próximos meses
    },
    expand: ["latest_invoice.confirmation_secret"],
    metadata: {
      app: APP,
      plano: resumo.plano.id,
      servicos: resumo.servicos.map((s) => s.id).join(","),
    },
  });

  const invoice = subscription.latest_invoice as Stripe.Invoice | null;
  const clientSecret = invoice?.confirmation_secret?.client_secret;
  if (!clientSecret) throw new Error("Stripe não retornou o client_secret da 1ª fatura");

  await salvarAssinatura(subscription, {
    email: params.email,
    nome: params.nome,
    resumo,
  });

  return {
    subscriptionId: subscription.id,
    clientSecret,
    valorMensal: resumo.total,
    plano: resumo.plano.name,
  };
}

// ---------------------------------------------------------------------------
// Espelho local (MySQL)
// ---------------------------------------------------------------------------

function fimPeriodo(sub: Stripe.Subscription): Date | null {
  // Na API atual o período fica em cada item
  const fim = sub.items?.data?.[0]?.current_period_end;
  return fim ? new Date(fim * 1000) : null;
}

async function salvarAssinatura(
  sub: Stripe.Subscription,
  extra: { email: string; nome: string; resumo: ResumoAssinatura }
) {
  await db.query(
    `INSERT INTO assinaturas_stripe
       (id, customer_id, email, nome, plano_id, plano_nome, servicos, valor, status, cancelar_no_fim, periodo_atual_fim)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status)`,
    [
      sub.id,
      typeof sub.customer === "string" ? sub.customer : sub.customer.id,
      extra.email,
      extra.nome,
      extra.resumo.plano.id,
      extra.resumo.plano.name,
      JSON.stringify(extra.resumo.servicos),
      extra.resumo.total.toFixed(2),
      sub.status,
      sub.cancel_at_period_end ? 1 : 0,
      fimPeriodo(sub),
    ]
  );
}

/** Atualiza status/período a partir do objeto do Stripe (usado pelo webhook). */
export async function sincronizarAssinatura(sub: Stripe.Subscription) {
  const [res] = await db.query<ResultSetHeader>(
    `UPDATE assinaturas_stripe
        SET status = ?, cancelar_no_fim = ?, periodo_atual_fim = ?
      WHERE id = ?`,
    [sub.status, sub.cancel_at_period_end ? 1 : 0, fimPeriodo(sub), sub.id]
  );

  // Assinatura criada fora deste fluxo (ex.: pelo Dashboard) — registra mesmo assim
  if (res.affectedRows === 0 && sub.metadata?.app === APP) {
    const resumo = calcularAssinatura(sub.metadata.plano, (sub.metadata.servicos || "").split(","));
    const cliente =
      typeof sub.customer === "string" ? await getStripe().customers.retrieve(sub.customer) : sub.customer;
    if (resumo && !("deleted" in cliente && cliente.deleted)) {
      const c = cliente as Stripe.Customer;
      await salvarAssinatura(sub, { email: c.email || "", nome: c.name || "", resumo });
    }
  }
}

/** Assinaturas que dão direito aos benefícios (past_due = carência enquanto o Stripe tenta de novo). */
export const STATUS_COM_ACESSO = ["active", "trialing", "past_due"];

// ---------------------------------------------------------------------------
// Gestão (para usar em rotas autenticadas da área do cliente / admin)
// ---------------------------------------------------------------------------

/** Cancela no fim do período já pago (o cliente usa até o último dia). */
export async function cancelarAssinaturaCartao(subscriptionId: string, imediatamente = false) {
  const stripe = getStripe();
  const sub = imediatamente
    ? await stripe.subscriptions.cancel(subscriptionId)
    : await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  await sincronizarAssinatura(sub);
  return sub;
}

/**
 * Link do Portal do Cliente do Stripe: o cliente troca o cartão, vê faturas e cancela.
 * Ative em Dashboard → Configurações → Billing → Portal do cliente.
 */
export async function criarLinkPortalCliente(customerId: string, returnUrl: string) {
  const session = await getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
    locale: "pt-BR",
  });
  return session.url;
}
