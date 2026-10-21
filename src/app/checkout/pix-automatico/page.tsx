"use client";

// src/app/checkout/pix-automatico/page.tsx
// Checkout do Pix Automático (Jornada 2):
//   1. Cliente informa nome e CPF do titular da conta
//   2. Exibimos o QR Code de AUTORIZAÇÃO (R$ 0,00 hoje)
//   3. Polling em /api/checkout/pix-automatico/[id] até o status virar ACTIVE

import { Suspense, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";
import { calcularAssinatura } from "../../../lib/planos";
import { cpfValido, mascararCpf } from "../../../lib/cpf";

export const dynamic = "force-dynamic";

type Status = "PENDING" | "ACTIVE" | "REJECTED" | "CANCELED" | "EXPIRED";
type Etapa = "dados" | "autorizar" | "ativo" | "encerrado";

const POLLING_MS = 4000;

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const dataBR = (iso?: string | null) => {
  if (!iso) return "";
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${d}/${m}/${y}`;
};

const MENSAGEM_ENCERRADO: Record<string, { titulo: string; texto: string }> = {
  EXPIRED: {
    titulo: "O QR Code expirou",
    texto: "A autorização não foi concluída a tempo. Gere um novo QR Code para continuar.",
  },
  REJECTED: {
    titulo: "Autorização recusada",
    texto: "O banco não confirmou a autorização. Confira se o CPF é do titular da conta e tente de novo.",
  },
  CANCELED: {
    titulo: "Autorização cancelada",
    texto: "A autorização foi cancelada no app do banco. Gere um novo QR Code se quiser assinar.",
  },
};

function CheckoutPixAutomatico() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const planId = searchParams.get("plan");
  const serviceIds = useMemo(
    () => (searchParams.get("services") || "").split(",").filter(Boolean),
    [searchParams]
  );
  const resumo = useMemo(() => calcularAssinatura(planId, serviceIds), [planId, serviceIds]);

  const idInicial = searchParams.get("id");
  // Com ?id= na URL (página recarregada), retoma direto na etapa de autorização
  const [etapa, setEtapa] = useState<Etapa>(idInicial ? "autorizar" : "dados");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const [assinaturaId, setAssinaturaId] = useState<string | null>(idInicial);
  const [emv, setEmv] = useState("");
  const [status, setStatus] = useState<Status>("PENDING");
  const [proximaCobranca, setProximaCobranca] = useState<string | null>(null);
  const [segundos, setSegundos] = useState<number | null>(null);
  const [copiado, setCopiado] = useState(false);
  const [valorServidor, setValorServidor] = useState<number | null>(null);

  const cpfOk = cpfValido(cpf);
  const nomeOk = nome.trim().split(/\s+/).length >= 2;

  // ---------------------------------------------------------------------------
  // 1) Gera a autorização
  // ---------------------------------------------------------------------------
  const gerarAutorizacao = async () => {
    if (!resumo || !cpfOk || !nomeOk || enviando) return;
    setEnviando(true);
    setErro(null);
    try {
      const resp = await fetch("/api/checkout/pix-automatico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: resumo.plano.id, serviceIds, nome, cpf }),
      });
      const data = await resp.json().catch(() => ({}));
      if (!resp.ok || !data.sucesso) {
        setErro(data.erro || "Não foi possível gerar o QR Code. Tente novamente.");
        return;
      }
      setAssinaturaId(data.assinaturaId);
      setEmv(data.emv);
      setValorServidor(data.valorMensal);
      setProximaCobranca(data.primeiraCobranca);
      setStatus("PENDING");
      setEtapa("autorizar");

      // Guarda o id na URL: se a página recarregar, o polling continua
      const params = new URLSearchParams(searchParams.toString());
      params.set("id", data.assinaturaId);
      router.replace(`/checkout/pix-automatico?${params.toString()}`, { scroll: false });
    } catch {
      setErro("Sem conexão com o servidor. Verifique sua internet e tente novamente.");
    } finally {
      setEnviando(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 2) Polling do status
  // ---------------------------------------------------------------------------
  const consultarStatus = useCallback(async (): Promise<Status | null> => {
    if (!assinaturaId) return null;
    try {
      const resp = await fetch(`/api/checkout/pix-automatico/${assinaturaId}`, { cache: "no-store" });
      if (!resp.ok) return null;
      const data = await resp.json();
      setStatus(data.status);
      if (typeof data.valorMensal === "number") setValorServidor(data.valorMensal);
      if (data.emv) setEmv(data.emv);
      if (data.proximaCobranca) setProximaCobranca(data.proximaCobranca);
      if (typeof data.segundosRestantes === "number") setSegundos(data.segundosRestantes);

      if (data.status === "PENDING") setEtapa("autorizar");
      else if (data.status === "ACTIVE") setEtapa("ativo");
      else setEtapa("encerrado");
      return data.status;
    } catch {
      return null; // falha de rede: tenta de novo no próximo ciclo
    }
  }, [assinaturaId]);

  useEffect(() => {
    if (!assinaturaId) return;
    let ativo = true;
    let timer: ReturnType<typeof setTimeout>;

    const ciclo = async () => {
      // Economiza requisições com a aba em segundo plano
      const s = document.visibilityState === "visible" ? await consultarStatus() : null;
      if (!ativo) return;
      if (s && s !== "PENDING") return; // status final: para o polling
      timer = setTimeout(ciclo, POLLING_MS);
    };
    ciclo();

    const aoVoltar = () => document.visibilityState === "visible" && consultarStatus();
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      ativo = false;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, [assinaturaId, consultarStatus]);

  // Contagem regressiva local (sincronizada pelo servidor a cada polling)
  useEffect(() => {
    if (etapa !== "autorizar" || segundos === null || segundos <= 0) return;
    const t = setTimeout(() => setSegundos((s) => (s === null ? s : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [etapa, segundos]);

  const copiar = async () => {
    await navigator.clipboard.writeText(emv);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const recomecar = () => {
    setAssinaturaId(null);
    setEmv("");
    setSegundos(null);
    setValorServidor(null);
    setStatus("PENDING");
    setEtapa("dados");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("id");
    router.replace(`/checkout/pix-automatico?${params.toString()}`, { scroll: false });
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  if (!resumo && !assinaturaId) {
    return (
      <Casca>
        <h1 className="text-xl font-black text-slate-900">Plano não encontrado</h1>
        <p className="mt-2 text-sm text-slate-500">Volte e escolha um plano do Maylon Pass.</p>
        <Link href="/maylon_pass" className="mt-6 inline-block font-bold text-[#35a989] hover:underline">
          Ver planos
        </Link>
      </Casca>
    );
  }

  // O valor confirmado pelo servidor tem prioridade sobre o calculado no navegador
  const valorMensal = valorServidor ?? resumo?.total ?? 0;
  const diaCobranca = proximaCobranca ? Number(proximaCobranca.slice(8, 10)) : null;

  return (
    <Casca>
      {etapa === "dados" && (
        <>
          <Cabecalho
            titulo="Assinar com Pix Automático"
            texto="Você autoriza uma única vez no app do seu banco. Depois, a mensalidade é debitada sozinha na data combinada."
          />

          <ResumoValores valorMensal={valorMensal} plano={resumo?.plano.name} />

          <div className="mt-6 space-y-4 text-left">
            <Campo label="Nome completo do titular da conta">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                autoComplete="name"
                placeholder="Como está no seu banco"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#35a989] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#35a989]/30"
              />
            </Campo>
            <Campo
              label="CPF do titular da conta"
              ajuda={cpf.length >= 14 && !cpfOk ? "CPF inválido" : "O banco confere se o CPF é o mesmo da conta que vai pagar."}
              erro={cpf.length >= 14 && !cpfOk}
            >
              <input
                value={cpf}
                onChange={(e) => setCpf(mascararCpf(e.target.value))}
                inputMode="numeric"
                placeholder="000.000.000-00"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#35a989] focus:bg-white focus-visible:ring-2 focus-visible:ring-[#35a989]/30"
              />
            </Campo>
          </div>

          {erro && (
            <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-left text-sm text-red-700">
              {erro}
            </p>
          )}

          <button
            type="button"
            onClick={gerarAutorizacao}
            disabled={!cpfOk || !nomeOk || enviando}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white shadow-sm transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {enviando ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {enviando ? "Gerando QR Code..." : "Gerar QR Code de autorização"}
            {!enviando && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4" />
            Você pode cancelar quando quiser pelo app do seu banco.
          </p>
        </>
      )}

      {etapa === "autorizar" && (
        <>
          <Cabecalho
            titulo="Autorize no app do seu banco"
            texto="Escaneie o QR Code ou use o Pix Copia e Cola. Nada será cobrado agora."
          />

          {emv ? (
            <div className="mb-6 inline-block rounded-3xl border-2 border-slate-100 bg-white p-4 shadow-sm">
              <QRCodeSVG value={emv} size={208} fgColor="#0f2b23" marginSize={1} />
            </div>
          ) : (
            <div className="mb-6 flex h-[240px] items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-[#35a989]" />
            </div>
          )}

          <ResumoValores
            valorMensal={valorMensal}
            plano={resumo?.plano.name}
            diaCobranca={diaCobranca}
            primeiraCobranca={proximaCobranca}
          />

          <ol className="mt-6 space-y-3 text-left text-sm text-slate-600">
            <Passo n={1}>Abra o app do seu banco e entre na área Pix.</Passo>
            <Passo n={2}>Escolha ler QR Code ou Pix Copia e Cola.</Passo>
            <Passo n={3}>Confira o valor mensal e a frequência e toque em Autorizar.</Passo>
          </ol>

          <div className="mt-6 text-left">
            <p className="mb-2 ml-1 text-xs font-semibold text-slate-500">Pix Copia e Cola</p>
            <div className="flex gap-2">
              <input
                readOnly
                value={emv}
                aria-label="Código Pix Copia e Cola"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={copiar}
                disabled={!emv}
                aria-label="Copiar código"
                className="flex shrink-0 items-center justify-center rounded-xl bg-[#35a989] px-4 py-3 text-white transition-colors hover:bg-[#27866c]"
              >
                {copiado ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div
            className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#35a989]/10 p-3 text-sm font-bold text-[#27866c]"
            aria-live="polite"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            Aguardando sua autorização
            {segundos !== null && segundos > 0 && (
              <span className="ml-1 flex items-center gap-1 font-semibold text-[#27866c]/80">
                <Clock className="h-4 w-4" />
                {String(Math.floor(segundos / 60)).padStart(2, "0")}:{String(segundos % 60).padStart(2, "0")}
              </span>
            )}
          </div>
        </>
      )}

      {etapa === "ativo" && (
        <>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#35a989]/10">
            <CheckCircle2 className="h-10 w-10 text-[#35a989]" />
          </div>
          <h1 className="mb-3 text-2xl font-black text-slate-900">Assinatura ativa!</h1>
          <p className="mb-6 text-sm leading-relaxed text-slate-500">
            Seu Maylon Pass já está liberado. A mensalidade será debitada automaticamente via Pix,
            sem precisar gerar QR Code todo mês.
          </p>

          <div className="mb-8 space-y-3 rounded-2xl bg-slate-50 p-4 text-left text-sm">
            <Linha rotulo="Valor mensal" valor={brl(valorMensal || 0)} />
            {proximaCobranca && <Linha rotulo="Próximo débito" valor={dataBR(proximaCobranca)} />}
            <Linha rotulo="Forma de pagamento" valor="Pix Automático" />
          </div>

          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white shadow-sm transition-all hover:brightness-95"
          >
            Ir para o meu painel
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </>
      )}

      {etapa === "encerrado" && (
        <>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="mb-3 text-2xl font-black text-slate-900">
            {MENSAGEM_ENCERRADO[status]?.titulo ?? "Autorização não concluída"}
          </h1>
          <p className="mb-8 text-sm leading-relaxed text-slate-500">
            {MENSAGEM_ENCERRADO[status]?.texto ?? "Gere um novo QR Code para continuar."}
          </p>
          <button
            type="button"
            onClick={recomecar}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white shadow-sm transition-all hover:brightness-95"
          >
            <RefreshCw className="h-5 w-5" />
            Gerar novo QR Code
          </button>
        </>
      )}
    </Casca>
  );
}

// -----------------------------------------------------------------------------
// Componentes de apoio
// -----------------------------------------------------------------------------

function Casca({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] p-4 text-slate-900">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-100 bg-white p-8 text-center shadow-xl">
        {children}
      </div>
    </main>
  );
}

function Cabecalho({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <>
      <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1c5a4b] shadow-md">
        <Smartphone className="h-6 w-6 text-white" />
      </div>
      <h1 className="mb-2 text-2xl font-black text-slate-900">{titulo}</h1>
      <p className="mb-6 text-sm leading-relaxed text-slate-500">{texto}</p>
    </>
  );
}

function ResumoValores({
  valorMensal,
  plano,
  diaCobranca,
  primeiraCobranca,
}: {
  valorMensal: number;
  plano?: string;
  diaCobranca?: number | null;
  primeiraCobranca?: string | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 text-left">
      <div className="rounded-2xl border-2 border-[#35a989] bg-[#35a989]/5 p-4">
        <p className="text-xs font-semibold text-slate-500">Você paga hoje</p>
        <p className="mt-1 text-2xl font-black text-[#35a989]">R$ 0,00</p>
        <p className="mt-1 text-[11px] leading-4 text-slate-400">Apenas autorização</p>
      </div>
      <div className="rounded-2xl border border-slate-200 p-4">
        <p className="text-xs font-semibold text-slate-500">Débito mensal</p>
        <p className="mt-1 text-2xl font-black text-slate-900">{brl(valorMensal)}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] leading-4 text-slate-400">
          <CalendarClock className="h-3 w-3 shrink-0" />
          {diaCobranca
            ? `Todo dia ${diaCobranca}${primeiraCobranca ? `, a partir de ${dataBR(primeiraCobranca)}` : ""}`
            : plano
              ? `Maylon Pass ${plano}`
              : "Mensal"}
        </p>
      </div>
    </div>
  );
}

function Campo({
  label,
  ajuda,
  erro,
  children,
}: {
  label: string;
  ajuda?: string;
  erro?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 ml-1 block text-xs font-semibold text-slate-600">{label}</span>
      {children}
      {ajuda && (
        <span className={`ml-1 mt-1.5 block text-[11px] ${erro ? "text-red-600" : "text-slate-400"}`}>
          {ajuda}
        </span>
      )}
    </label>
  );
}

function Passo({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35a989]/10 text-xs font-bold text-[#35a989]">
        {n}
      </span>
      <span className="pt-0.5">{children}</span>
    </li>
  );
}

function Linha({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500">{rotulo}</span>
      <strong className="text-slate-900">{valor}</strong>
    </div>
  );
}

export default function CheckoutPixAutomaticoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          Carregando...
        </div>
      }
    >
      <CheckoutPixAutomatico />
    </Suspense>
  );
}
