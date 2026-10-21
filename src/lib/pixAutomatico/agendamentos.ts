// src/lib/pixAutomatico/agendamentos.ts
/* eslint-disable @typescript-eslint/no-explicit-any -- payloads externos (BTG/MySQL) sem tipagem oficial */
// "Pix recorrente": todo mês a Maylon envia ao BTG a instrução de agendamento
// da mensalidade. Regra do BACEN: a instrução precisa ser enviada entre
// D-10 e D-2 do vencimento. Fora dessa janela o banco do pagador rejeita.

import { BtgApiError, criarAgendamento } from "./btgPixAutomatico";
import {
  Assinatura,
  confirmarAgendamento,
  listarParaAgendar,
  marcarFalhaCobranca,
  reservarCobranca,
} from "./assinaturas";
import { diffDias, hojeSP, proximoMes, somarDias } from "./datas";
import { db } from "../db";

export const JANELA_MAX_DIAS = 10; // pode enviar a partir de D-10
export const JANELA_MIN_DIAS = 2; // e no máximo até D-2

export type ResultadoAgendamento =
  | { assinaturaId: string; resultado: "agendada"; vencimento: string; schedulingId: string }
  | { assinaturaId: string; resultado: "aguardando_janela"; vencimento: string }
  | { assinaturaId: string; resultado: "ja_agendada"; vencimento: string }
  | { assinaturaId: string; resultado: "fora_do_prazo"; vencimento: string; novoVencimento: string }
  | { assinaturaId: string; resultado: "erro"; vencimento: string; erro: string };

/** Agenda a próxima mensalidade de UMA assinatura, se estiver dentro da janela. */
export async function agendarAssinatura(a: Assinatura): Promise<ResultadoAgendamento> {
  const hoje = hojeSP();
  const vencimento = a.proxima_cobranca.slice(0, 10);
  const faltam = diffDias(hoje, vencimento);

  if (faltam > JANELA_MAX_DIAS) {
    return { assinaturaId: a.id, resultado: "aguardando_janela", vencimento };
  }

  if (faltam < JANELA_MIN_DIAS) {
    // Perdemos a janela deste mês (ex.: servidor fora do ar). Pula para o próximo ciclo
    // e registra para o time financeiro decidir se cobra por outro meio.
    const novo = proximoMes(vencimento, a.dia_cobranca);
    await db.query(
      `UPDATE assinaturas_pix_automatico SET proxima_cobranca = ? WHERE id = ? AND proxima_cobranca = ?`,
      [novo, a.id, vencimento]
    );
    console.warn(
      `⚠️ [Pix Automático] Janela perdida para ${a.id} (venc. ${vencimento}). Próximo ciclo: ${novo}`
    );
    return { assinaturaId: a.id, resultado: "fora_do_prazo", vencimento, novoVencimento: novo };
  }

  const cobranca = await reservarCobranca(a, vencimento);
  if (!cobranca) return { assinaturaId: a.id, resultado: "ja_agendada", vencimento };

  try {
    const ag = await criarAgendamento(a.btg_authorization_id!, {
      externalId: cobranca.id,
      valor: Number(a.valor),
      dataVencimento: vencimento,
      informacaoAdicional: `Maylon Pass ${a.plano_nome} - parcela ${cobranca.parcela}`,
    });
    await confirmarAgendamento(cobranca.id, a.id, ag.schedulingId, proximoMes(vencimento, a.dia_cobranca));
    return { assinaturaId: a.id, resultado: "agendada", vencimento, schedulingId: ag.schedulingId };
  } catch (e: any) {
    const detalhe = e instanceof BtgApiError ? JSON.stringify(e.body) : e?.message || String(e);
    await marcarFalhaCobranca(cobranca.id, detalhe);
    return { assinaturaId: a.id, resultado: "erro", vencimento, erro: detalhe };
  }
}

/** Executado pelo cron diário: agenda tudo que entrou na janela D-10. */
export async function agendarCobrancasPendentes(): Promise<ResultadoAgendamento[]> {
  const limite = somarDias(hojeSP(), JANELA_MAX_DIAS);
  const assinaturas = await listarParaAgendar(limite);
  const resultados: ResultadoAgendamento[] = [];
  for (const a of assinaturas) {
    resultados.push(await agendarAssinatura(a)); // sequencial: respeita rate limit do BTG
  }
  return resultados;
}
