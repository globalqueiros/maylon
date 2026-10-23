// src/app/api/checkout/stripe/assinatura/route.ts
// Cria a assinatura mensal no cartão e devolve o client_secret da 1ª cobrança.
// O valor é recalculado no servidor a partir do plano e dos serviços.

import { NextResponse } from "next/server";
import { AssinaturaError, criarAssinaturaCartao } from "../../../../../lib/stripeAssinaturas";

export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  const nome = String(body?.nome || "").trim().replace(/\s+/g, " ").slice(0, 140);
  const email = String(body?.email || "").trim().toLowerCase().slice(0, 190);

  if (nome.split(" ").length < 2) {
    return NextResponse.json({ erro: "Informe seu nome completo" }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ erro: "E-mail inválido" }, { status: 400 });
  }

  try {
    const resultado = await criarAssinaturaCartao({
      planId: body.planId,
      serviceIds: body.serviceIds,
      nome,
      email,
    });
    return NextResponse.json({ sucesso: true, ...resultado });
  } catch (e) {
    if (e instanceof AssinaturaError) {
      return NextResponse.json({ erro: e.message }, { status: e.status });
    }
    console.error("❌ [Stripe Assinatura] Erro ao criar assinatura:", (e as Error)?.message ?? e);
    return NextResponse.json(
      { erro: "Não foi possível iniciar a assinatura. Tente novamente." },
      { status: 502 }
    );
  }
}
