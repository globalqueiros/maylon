// src/lib/pixAutomatico/datas.ts
// Todas as datas do Pix Automático são "datas civis" (YYYY-MM-DD) no horário de Brasília.

const TZ = "America/Sao_Paulo";

/** Data de hoje em São Paulo no formato YYYY-MM-DD */
export function hojeSP(): string {
  // en-CA formata como YYYY-MM-DD
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function parse(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
}

function fmt(y: number, m: number, d: number): string {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function diasNoMes(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

export function somarDias(iso: string, dias: number): string {
  const { y, m, d } = parse(iso);
  const dt = new Date(Date.UTC(y, m - 1, d + dias));
  return fmt(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate());
}

/**
 * Próximo mês respeitando o dia de cobrança original.
 * Ex.: dia 31 → 28/02 → 31/03 (não "escorrega" para o dia 28 para sempre).
 */
export function proximoMes(iso: string, diaCobranca: number): string {
  const { y, m } = parse(iso);
  const ny = m === 12 ? y + 1 : y;
  const nm = m === 12 ? 1 : m + 1;
  return fmt(ny, nm, Math.min(diaCobranca, diasNoMes(ny, nm)));
}

export function diaDoMes(iso: string): number {
  return parse(iso).d;
}

/** Diferença em dias (b - a) entre duas datas YYYY-MM-DD */
export function diffDias(a: string, b: string): number {
  const pa = parse(a);
  const pb = parse(b);
  const ta = Date.UTC(pa.y, pa.m - 1, pa.d);
  const tb = Date.UTC(pb.y, pb.m - 1, pb.d);
  return Math.round((tb - ta) / 86_400_000);
}
