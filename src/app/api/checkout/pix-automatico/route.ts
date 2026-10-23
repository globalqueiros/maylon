// src/app/api/checkout/pix-automatico/route.ts
/* eslint-disable @typescript-eslint/no-explicit-any -- payloads externos (BTG/MySQL) sem tipagem oficial */
// Etapa 1 do Pix Automático: AUTORIZAÇÃO.
// Cria a assinatura (PENDING) e pede ao BTG o QR Code de autorização (Jornada 2).
// Nada é cobrado agora — o cliente só autoriza os débitos futuros no app do banco.

import { NextResponse } from "next/server";
import { calcularAssinatura } from "../../../../lib/planos";
import { cpfValido, somenteDigitos } from "../../../../lib/cpf";
import { BtgApiError, criarAutorizacao } from "../../../../lib/pixAutomatico/btgPixAutomatico";
import {
  buscarPendenteReutilizavel,
  criarAssinaturaPendente,
  marcarFalhaCriacao,
  salvarDadosAutorizacao,
} from "../../../../lib/pixAutomatico/assinaturas";
import { diaDoMes, hojeSP, somarDias } from "../../../../lib/pixAutomatico/datas";

export const dynamic = "force-dynamic";

// Dias entre a autorização e o 1º débito. Precisa ser > 2 por causa da regra D-2
// do agendamento; 5 dá folga caso o cliente demore para autorizar.
const DIAS_ATE_PRIMEIRA_COBRANCA = Math.max(3, Number(process.env.PIX_AUTOMATICO_DIAS_PRIMEIRA_COBRANCA || 5));

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Corpo da requisição inválido" }, { status: 400 });
  }

  // 1) Validação — o valor é SEMPRE recalculado no servidor
  const resumo = calcularAssinatura(body?.planId, body?.serviceIds);
  if (!resumo) return NextResponse.json({ erro: "Plano inválido" }, { status: 400 });

  const nome = String(body?.nome || "").trim().replace(/\s+/g, " ").slice(0, 140);
  const cpf = somenteDigitos(String(body?.cpf || ""));
  if (nome.split(" ").length < 2) {
    return NextResponse.json({ erro: "Informe o nome completo do titular da conta" }, { status: 400 });
  }
  if (!cpfValido(cpf)) {
    return NextResponse.json({ erro: "CPF inválido" }, { status: 400 });
  }

  // 2) Reaproveita QR pendente recente (refresh da página / Strict Mode)
  const existente = await buscarPendenteReutilizavel(cpf, resumo.plano.id, resumo.total, 20);
  if (existente) {
    return NextResponse.json({
      sucesso: true,
      assinaturaId: existente.id,
      emv: existente.emv,
      qrCodeUrl: existente.qrcode_url,
      valorMensal: Number(existente.valor),
      primeiraCobranca: existente.proxima_cobranca,
      plano: existente.plano_nome,
    });
  }

  // 3) Cria a assinatura localmente antes de chamar o BTG (o id vira o externalId)
  const primeiraCobranca = somarDias(hojeSP(), DIAS_ATE_PRIMEIRA_COBRANCA);
  const assinaturaId = await criarAssinaturaPendente({
    planoId: resumo.plano.id,
    planoNome: resumo.plano.name,
    servicos: resumo.servicos,
    valor: resumo.total,
    pagadorNome: nome,
    pagadorCpf: cpf,
    diaCobranca: diaDoMes(primeiraCobranca),
    primeiraCobranca,
  });

  // 4) Pede ao BTG o QR Code de autorização
  try {
    const aut = await criarAutorizacao({
      externalId: assinaturaId,
      contrato: assinaturaId.replace(/-/g, "").slice(0, 20).toUpperCase(),
      descricao: `Maylon Pass ${resumo.plano.name}`,
      valor: resumo.total,
      dataInicial: primeiraCobranca,
      pagador: { nome, cpf },
    });

    if (!aut.emv) throw new Error("BTG não retornou o código do QR Code");

    await salvarDadosAutorizacao(assinaturaId, aut);

    return NextResponse.json({
      sucesso: true,
      assinaturaId,
      emv: aut.emv,
      qrCodeUrl: aut.qrCodeImageUrl ?? null,
      valorMensal: resumo.total,
      primeiraCobranca,
      plano: resumo.plano.name,
    });
  } catch (e: any) {
    await marcarFalhaCriacao(assinaturaId).catch(() => {});
    console.error("❌ [Pix Automático] Falha ao criar autorização:", e?.body ?? e?.message ?? e);
    const status = e instanceof BtgApiError && e.status < 500 ? 422 : 502;
    return NextResponse.json(
      { erro: "Não foi possível gerar a autorização do Pix Automático. Tente novamente." },
      { status }
    );
  }
}
