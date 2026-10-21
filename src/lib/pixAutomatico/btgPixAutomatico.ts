// src/lib/pixAutomatico/btgPixAutomatico.ts
/* eslint-disable @typescript-eslint/no-explicit-any -- payloads externos (BTG/MySQL) sem tipagem oficial */
// Cliente da API "Banking - Pix Automático" do BTG Pactual Empresas (lado RECEBEDOR).
//
// Endpoints (docs BTG → Banking APIs → Pix Automático):
//   POST   /:companyId/banking/collections/automatic-pix/authorization/flow
//   GET    /:companyId/banking/collections/automatic-pix/authorization
//   DELETE /:companyId/banking/collections/automatic-pix/authorization/:authorizationId
//   POST   /:companyId/banking/collections/automatic-pix/authorization/:authorizationId/scheduling-instruction
//
// Escopo OAuth obrigatório: brn:btg:empresas:banking:collections (token via Authorization Code).
//
// ⚠️ Os corpos de requisição abaixo foram montados espelhando o objeto de autorização
// que o BTG devolve nos webhooks (externalId, period, initialDate, link.contract,
// link.debtor, retryPolicy...). Confira os nomes exatos na aba "Request" de cada
// endpoint na documentação e ajuste SOMENTE as funções `montar*Payload` se algo divergir.

import { obterAccessTokenValido } from "../btgServices";

const BASE_URL = (process.env.BTG_API_BASE_URL || "https://api.empresas.btgpactual.com").replace(/\/$/, "");
const SANDBOX = process.env.BTG_SANDBOX === "true";

function companyId(): string {
  const id = process.env.BTG_COMPANY_ID;
  if (!id) throw new Error("BTG_COMPANY_ID não definido no .env");
  return id;
}

function urlPixAutomatico(path: string): string {
  return `${BASE_URL}/${companyId()}/banking/collections/automatic-pix${path}`;
}

export class BtgApiError extends Error {
  constructor(message: string, public status: number, public body: unknown) {
    super(message);
  }
}

async function btgFetch<T = any>(
  method: "GET" | "POST" | "DELETE" | "PATCH",
  url: string,
  body?: unknown
): Promise<T> {
  const { accessToken } = await obterAccessTokenValido();

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (SANDBOX) headers["x-response"] = "success"; // header exigido pelo Wiremock do sandbox

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }

  if (!res.ok) {
    console.error(`❌ [BTG Pix Automático] ${method} ${url} → ${res.status}`, json);
    throw new BtgApiError(`BTG respondeu ${res.status}`, res.status, json);
  }
  return json as T;
}

// ---------------------------------------------------------------------------
// Tipos normalizados (o que o resto do sistema usa)
// ---------------------------------------------------------------------------

export type StatusAutorizacaoBTG =
  | "CREATED"
  | "APPROVED"
  | "REJECTED"
  | "CANCELED"
  | "CANCELLED"
  | "EXPIRED"
  | string;

export type AutorizacaoBTG = {
  authorizationId: string;
  externalId?: string;
  status: StatusAutorizacaoBTG;
  emv: string;
  qrCodeImageUrl?: string;
  bruto: any;
};

export function normalizarAutorizacao(raw: any): AutorizacaoBTG {
  const d = raw?.data ?? raw;
  return {
    authorizationId: d?.authorizationId ?? d?.id ?? "",
    externalId: d?.externalId,
    status: d?.status ?? "CREATED",
    emv: d?.qrCodeInfo?.emv ?? d?.location?.emv ?? d?.emv ?? "",
    qrCodeImageUrl: d?.location?.url,
    bruto: d,
  };
}

// ---------------------------------------------------------------------------
// 1) Autorização (Jornada 2: QR Code só com os dados da recorrência, sem pagamento agora)
// ---------------------------------------------------------------------------

export type DadosAutorizacao = {
  externalId: string; // nosso ID da assinatura (idempotência / conciliação)
  contrato: string; // identificador do contrato exibido ao pagador no app do banco
  descricao: string; // ex.: "Maylon Pass Plus"
  valor: number; // valor fixo mensal em reais
  dataInicial: string; // YYYY-MM-DD — data da 1ª cobrança
  dataFinal?: string; // opcional — sem data final = assinatura por prazo indeterminado
  pagador: { nome: string; cpf: string };
};

export function montarAutorizacaoPayload(d: DadosAutorizacao) {
  return {
    externalId: d.externalId,
    journey: "JOURNEY_2",
    period: "MONTHLY",
    initialDate: d.dataInicial,
    ...(d.dataFinal ? { finalDate: d.dataFinal } : {}),
    // Valor fixo: enviar `amount`. Para valor variável, a doc manda NÃO enviar `amount`.
    amount: Number(d.valor.toFixed(2)),
    retryPolicy: "ACCEPT_3R_7D", // até 3 retentativas em 7 dias se faltar saldo
    useLineOfCredit: false,
    link: {
      contract: d.contrato,
      description: d.descricao,
      debtor: {
        name: d.pagador.nome,
        taxId: d.pagador.cpf,
        personType: "F",
      },
    },
  };
}

export async function criarAutorizacao(d: DadosAutorizacao): Promise<AutorizacaoBTG> {
  const payload = montarAutorizacaoPayload(d);
  console.log("🚀 [BTG Pix Automático] Criando autorização", { externalId: d.externalId });
  const resp = await btgFetch("POST", urlPixAutomatico("/authorization/flow"), payload);
  const aut = normalizarAutorizacao(resp);
  if (!aut.authorizationId || !aut.emv) {
    console.warn("⚠️ [BTG Pix Automático] Resposta sem authorizationId ou emv:", resp);
  }
  return aut;
}

/**
 * Consulta uma autorização no BTG (fallback do webhook, usado pelo polling).
 * Usa o endpoint de listagem e filtra localmente para não depender do nome exato
 * do query param de filtro.
 */
export async function consultarAutorizacao(params: {
  authorizationId?: string | null;
  externalId?: string | null;
}): Promise<AutorizacaoBTG | null> {
  const qs = new URLSearchParams();
  if (params.externalId) qs.set("externalId", params.externalId);
  if (params.authorizationId) qs.set("authorizationId", params.authorizationId);

  const resp: any = await btgFetch("GET", urlPixAutomatico(`/authorization?${qs.toString()}`));
  const lista: any[] = Array.isArray(resp)
    ? resp
    : resp?.items ?? resp?.data ?? resp?.content ?? resp?.authorizations ?? [];

  const achada = lista.find(
    (a) =>
      (params.authorizationId && a?.authorizationId === params.authorizationId) ||
      (params.externalId && a?.externalId === params.externalId)
  );
  return achada ? normalizarAutorizacao(achada) : null;
}

export async function cancelarAutorizacao(authorizationId: string): Promise<void> {
  await btgFetch("DELETE", urlPixAutomatico(`/authorization/${encodeURIComponent(authorizationId)}`));
}

// ---------------------------------------------------------------------------
// 2) Agendamento (a cobrança recorrente de cada mês)
// Regra do BACEN: a instrução deve chegar ao banco do pagador entre D-10 e D-2
// da data de vencimento. O job em /api/cron/pix-automatico cuida disso.
// ---------------------------------------------------------------------------

export type DadosAgendamento = {
  externalId: string; // nosso ID da cobrança
  valor: number;
  dataVencimento: string; // YYYY-MM-DD
  informacaoAdicional?: string;
};

export function montarAgendamentoPayload(d: DadosAgendamento) {
  return {
    externalId: d.externalId,
    amount: Number(d.valor.toFixed(2)),
    scheduledDate: d.dataVencimento,
    ...(d.informacaoAdicional ? { additionalInformation: d.informacaoAdicional } : {}),
  };
}

export async function criarAgendamento(
  authorizationId: string,
  d: DadosAgendamento
): Promise<{ schedulingId: string; status: string; bruto: any }> {
  const resp: any = await btgFetch(
    "POST",
    urlPixAutomatico(`/authorization/${encodeURIComponent(authorizationId)}/scheduling-instruction`),
    montarAgendamentoPayload(d)
  );
  const data = resp?.data ?? resp;
  return {
    schedulingId: data?.schedulingId ?? data?.id ?? "",
    status: data?.status ?? "CREATED",
    bruto: data,
  };
}
