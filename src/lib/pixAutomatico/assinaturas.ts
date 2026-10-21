// src/lib/pixAutomatico/assinaturas.ts
/* eslint-disable @typescript-eslint/no-explicit-any -- payloads externos (BTG/MySQL) sem tipagem oficial */
// Acesso ao banco (MySQL) para assinaturas e cobranças do Pix Automático.

import { randomUUID } from "crypto";
import { db } from "../db";
import type { StatusAutorizacaoBTG } from "./btgPixAutomatico";

export type StatusAssinatura = "PENDING" | "ACTIVE" | "REJECTED" | "CANCELED" | "EXPIRED";
export type StatusCobranca = "PENDING" | "SCHEDULED" | "PAID" | "REJECTED" | "FAILED" | "CANCELED";

export type Assinatura = {
  id: string;
  plano_id: string;
  plano_nome: string;
  servicos: unknown;
  valor: string; // DECIMAL vem como string do mysql2
  pagador_nome: string;
  pagador_cpf: string;
  status: StatusAssinatura;
  btg_authorization_id: string | null;
  btg_status: string | null;
  emv: string | null;
  qrcode_url: string | null;
  dia_cobranca: number;
  proxima_cobranca: string; // YYYY-MM-DD (dateStrings)
  parcelas_agendadas: number;
  ativada_em: string | null;
  cancelada_em: string | null;
  ultima_sincronizacao: string | null;
  created_at: string;
  // calculados no SELECT (independem do fuso do servidor MySQL)
  idade_seg?: number;
  seg_desde_sync?: number | null;
  proximo_debito?: string | null; // vencimento já agendado e ainda não pago
};

const FINAIS: StatusAssinatura[] = ["REJECTED", "CANCELED", "EXPIRED"];

/** Converte o status do BTG para o status interno da assinatura. */
export function mapearStatusBTG(btg: StatusAutorizacaoBTG): StatusAssinatura | null {
  switch (String(btg).toUpperCase()) {
    case "CREATED":
    case "WAITING_DEFINITION":
    case "PENDING":
      return "PENDING";
    case "APPROVED":
    case "ACTIVE":
      return "ACTIVE";
    case "REJECTED":
      return "REJECTED";
    case "CANCELED":
    case "CANCELLED":
      return "CANCELED";
    case "EXPIRED":
      return "EXPIRED";
    default:
      return null;
  }
}

// mysql2: força DATE/DATETIME a virem como string para não sofrer com fuso horário
const q = (sql: string, values?: any[]) => db.query({ sql, values, dateStrings: true });

export async function criarAssinaturaPendente(dados: {
  planoId: string;
  planoNome: string;
  servicos: unknown;
  valor: number;
  pagadorNome: string;
  pagadorCpf: string;
  diaCobranca: number;
  primeiraCobranca: string;
}): Promise<string> {
  const id = randomUUID();
  await q(
    `INSERT INTO assinaturas_pix_automatico
       (id, plano_id, plano_nome, servicos, valor, pagador_nome, pagador_cpf, dia_cobranca, proxima_cobranca)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      dados.planoId,
      dados.planoNome,
      JSON.stringify(dados.servicos ?? []),
      dados.valor.toFixed(2),
      dados.pagadorNome,
      dados.pagadorCpf,
      dados.diaCobranca,
      dados.primeiraCobranca,
    ]
  );
  return id;
}

/**
 * Reaproveita um QR Code ainda pendente do mesmo CPF/plano/valor criado há pouco.
 * Evita gerar várias autorizações se o usuário atualizar a página
 * (e o double-render do React Strict Mode em desenvolvimento).
 */
export async function buscarPendenteReutilizavel(
  cpf: string,
  planoId: string,
  valor: number,
  minutos: number
): Promise<Assinatura | null> {
  const [rows]: any = await q(
    `SELECT * FROM assinaturas_pix_automatico
      WHERE pagador_cpf = ? AND plano_id = ? AND valor = ? AND status = 'PENDING'
        AND emv IS NOT NULL AND created_at > (NOW() - INTERVAL ? MINUTE)
      ORDER BY created_at DESC LIMIT 1`,
    [cpf, planoId, valor.toFixed(2), minutos]
  );
  return rows?.[0] ?? null;
}

export async function salvarDadosAutorizacao(
  id: string,
  aut: { authorizationId: string; status: string; emv: string; qrCodeImageUrl?: string }
) {
  await q(
    `UPDATE assinaturas_pix_automatico
        SET btg_authorization_id = ?, btg_status = ?, emv = ?, qrcode_url = ?
      WHERE id = ?`,
    [aut.authorizationId || null, aut.status, aut.emv, aut.qrCodeImageUrl ?? null, id]
  );
}

export async function marcarFalhaCriacao(id: string) {
  await q(
    `UPDATE assinaturas_pix_automatico SET status = 'REJECTED', btg_status = 'ERRO_CRIACAO' WHERE id = ?`,
    [id]
  );
}

export async function buscarAssinatura(id: string): Promise<Assinatura | null> {
  const [rows]: any = await q(
    `SELECT a.*,
            TIMESTAMPDIFF(SECOND, a.created_at, NOW())           AS idade_seg,
            TIMESTAMPDIFF(SECOND, a.ultima_sincronizacao, NOW()) AS seg_desde_sync,
            (SELECT MIN(c.data_vencimento) FROM cobrancas_pix_automatico c
              WHERE c.assinatura_id = a.id AND c.status IN ('PENDING','SCHEDULED','FAILED')) AS proximo_debito
       FROM assinaturas_pix_automatico a WHERE a.id = ? LIMIT 1`,
    [id]
  );
  return rows?.[0] ?? null;
}

export async function buscarPorAuthorizationId(authorizationId: string): Promise<Assinatura | null> {
  const [rows]: any = await q(
    `SELECT * FROM assinaturas_pix_automatico WHERE btg_authorization_id = ? LIMIT 1`,
    [authorizationId]
  );
  return rows?.[0] ?? null;
}

/**
 * Aplica um status vindo do BTG (webhook ou consulta) sem permitir regressão:
 * - estados finais (REJECTED/CANCELED/EXPIRED) nunca voltam;
 * - ACTIVE não volta para PENDING se um webhook antigo chegar atrasado.
 * Retorna o status resultante.
 */
export async function aplicarStatusBTG(
  assinatura: Assinatura,
  btgStatus: StatusAutorizacaoBTG
): Promise<StatusAssinatura> {
  const novo = mapearStatusBTG(btgStatus);
  const atual = assinatura.status;

  if (!novo || novo === atual) {
    await q(`UPDATE assinaturas_pix_automatico SET btg_status = ? WHERE id = ?`, [btgStatus, assinatura.id]);
    return atual;
  }
  if (FINAIS.includes(atual)) return atual;
  if (atual === "ACTIVE" && novo === "PENDING") return atual;

  await q(
    `UPDATE assinaturas_pix_automatico
        SET status = ?, btg_status = ?,
            ativada_em   = IF(? = 'ACTIVE' AND ativada_em IS NULL, NOW(), ativada_em),
            cancelada_em = IF(? IN ('CANCELED','REJECTED','EXPIRED'), NOW(), cancelada_em)
      WHERE id = ?`,
    [novo, btgStatus, novo, novo, assinatura.id]
  );

  if (novo === "ACTIVE") {
    console.log(`✅ [Pix Automático] Assinatura ${assinatura.id} ATIVA`);
    // 👉 Ponto de integração: liberar os benefícios do Maylon Pass para o usuário aqui.
  }
  if (novo === "CANCELED" || novo === "REJECTED" || novo === "EXPIRED") {
    await q(
      `UPDATE cobrancas_pix_automatico SET status = 'CANCELED'
        WHERE assinatura_id = ? AND status IN ('PENDING','FAILED')`,
      [assinatura.id]
    );
    // 👉 Ponto de integração: revogar benefícios do Maylon Pass aqui.
  }
  return novo;
}

export async function marcarSincronizada(id: string) {
  await q(`UPDATE assinaturas_pix_automatico SET ultima_sincronizacao = NOW() WHERE id = ?`, [id]);
}

/** PENDING há mais de `minutos` → EXPIRED (QR Code abandonado). */
export async function expirarPendentesAntigas(minutos: number) {
  await q(
    `UPDATE assinaturas_pix_automatico
        SET status = 'EXPIRED', cancelada_em = NOW()
      WHERE status = 'PENDING' AND created_at < (NOW() - INTERVAL ? MINUTE)`,
    [minutos]
  );
}

// ---------------------------------------------------------------------------
// Cobranças (agendamentos mensais)
// ---------------------------------------------------------------------------

/** Assinaturas ativas cuja próxima cobrança cai dentro da janela permitida. */
export async function listarParaAgendar(ate: string, limite = 200): Promise<Assinatura[]> {
  const [rows]: any = await q(
    `SELECT * FROM assinaturas_pix_automatico
      WHERE status = 'ACTIVE' AND btg_authorization_id IS NOT NULL AND proxima_cobranca <= ?
      ORDER BY proxima_cobranca ASC
      LIMIT ?`,
    [ate, limite]
  );
  return rows ?? [];
}

/**
 * Reserva a cobrança do mês (idempotente pela UNIQUE assinatura+vencimento).
 * Retorna o id da cobrança ou null se ela já estava agendada/paga.
 */
export async function reservarCobranca(
  assinatura: Assinatura,
  dataVencimento: string
): Promise<{ id: string; parcela: number } | null> {
  const parcela = assinatura.parcelas_agendadas + 1;
  const id = randomUUID();
  await q(
    `INSERT INTO cobrancas_pix_automatico (id, assinatura_id, parcela, valor, data_vencimento)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE id = id`,
    [id, assinatura.id, parcela, assinatura.valor, dataVencimento]
  );
  const [rows]: any = await q(
    `SELECT id, parcela, status FROM cobrancas_pix_automatico WHERE assinatura_id = ? AND data_vencimento = ?`,
    [assinatura.id, dataVencimento]
  );
  const c = rows?.[0];
  if (!c || !["PENDING", "FAILED"].includes(c.status)) return null; // já enviada antes
  return { id: c.id, parcela: c.parcela };
}

export async function confirmarAgendamento(
  cobrancaId: string,
  assinaturaId: string,
  schedulingId: string,
  proximaCobranca: string
) {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      `UPDATE cobrancas_pix_automatico SET status = 'SCHEDULED', btg_scheduling_id = ?, erro = NULL WHERE id = ?`,
      [schedulingId || null, cobrancaId]
    );
    await conn.query(
      `UPDATE assinaturas_pix_automatico
          SET proxima_cobranca = ?, parcelas_agendadas = parcelas_agendadas + 1
        WHERE id = ?`,
      [proximaCobranca, assinaturaId]
    );
    await conn.commit();
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

export async function marcarFalhaCobranca(cobrancaId: string, erro: string) {
  await q(`UPDATE cobrancas_pix_automatico SET status = 'FAILED', erro = ? WHERE id = ?`, [
    erro.slice(0, 4000),
    cobrancaId,
  ]);
}

export async function atualizarCobrancaPorScheduling(
  schedulingId: string,
  dados: {
    status: StatusCobranca;
    endToEndId?: string;
    valorPago?: number;
    pagoEm?: string;
    erro?: string;
  }
) {
  await q(
    `UPDATE cobrancas_pix_automatico
        SET status = ?,
            end_to_end_id = COALESCE(?, end_to_end_id),
            valor_pago    = COALESCE(?, valor_pago),
            pago_em       = COALESCE(?, pago_em),
            erro          = COALESCE(?, erro)
      WHERE btg_scheduling_id = ? AND status <> 'PAID'`,
    [
      dados.status,
      dados.endToEndId ?? null,
      dados.valorPago ?? null,
      dados.pagoEm?.slice(0, 10) ?? null,
      dados.erro ?? null,
      schedulingId,
    ]
  );
}

// ---------------------------------------------------------------------------
// Log/idempotência de webhooks
// ---------------------------------------------------------------------------

/** Registra o evento; retorna false se ele já tinha sido processado (reenvio). */
export async function registrarEventoWebhook(
  chave: string,
  evento: string | null,
  payload: unknown
): Promise<{ id: number; novo: boolean }> {
  const [res]: any = await q(
    `INSERT INTO btg_webhook_eventos (evento, chave_idempotencia, payload)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)`,
    [evento, chave, JSON.stringify(payload)]
  );
  const id = Number(res.insertId);
  const [rows]: any = await q(`SELECT processado_em FROM btg_webhook_eventos WHERE id = ?`, [id]);
  return { id, novo: !rows?.[0]?.processado_em };
}

export async function finalizarEventoWebhook(id: number, erro?: string) {
  await q(
    `UPDATE btg_webhook_eventos SET processado_em = IF(? IS NULL, NOW(), NULL), erro = ? WHERE id = ?`,
    [erro ?? null, erro ?? null, id]
  );
}
