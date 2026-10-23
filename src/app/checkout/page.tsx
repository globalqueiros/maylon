
"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Headphones,
  LoaderCircle,
  LockKeyhole,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
  XCircle,
} from "lucide-react";

const BRAND = "#35a989";
const PIX_EXPIRATION_SECONDS = 300;

function formatCurrency(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function CheckoutContent() {
  const searchParams = useSearchParams();

  const amountParam = searchParams.get("amount") || "0.00";
  const planName = searchParams.get("plan") || "Assinatura";

  const amount = Number(amountParam.replace(",", "."));

  const [pixCode, setPixCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(PIX_EXPIRATION_SECONDS);
  const [retry, setRetry] = useState(0);

  const expired = timeLeft <= 0;

  const generatePix = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError("");
      setPixCode("");
      setCopied(false);
      setTimeLeft(PIX_EXPIRATION_SECONDS);

      try {
        if (!Number.isFinite(amount) || amount <= 0) {
          throw new Error("O valor da assinatura é inválido.");
        }

        const response = await fetch("/api/checkout/pix", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          cache: "no-store",
          body: JSON.stringify({
            amount: amount.toFixed(2),
            description: `Maylon Pass - ${planName}`,
          }),
          signal,
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data?.sucesso || !data?.qrcode) {
          throw new Error(
            data?.mensagem ||
              data?.message ||
              "Não foi possível gerar o PIX. Tente novamente."
          );
        }

        if (signal.aborted) return;

        setPixCode(data.qrcode);
      } catch (err) {
        if (signal.aborted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao gerar o pagamento."
        );
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    },
    [amount, planName, retry]
  );

  useEffect(() => {
    const controller = new AbortController();

    void generatePix(controller.signal);

    return () => controller.abort();
  }, [generatePix]);

  useEffect(() => {
    if (!pixCode || loading || timeLeft <= 0) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(timerId);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [pixCode, loading]);

  const handleCopy = useCallback(async () => {
    if (!pixCode || expired) return;

    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setError("");

      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(
        "Não foi possível copiar automaticamente. Selecione o código e copie manualmente."
      );
    }
  }, [pixCode, expired]);

  const handleRetry = useCallback(() => {
    setError("");
    setPixCode("");
    setTimeLeft(PIX_EXPIRATION_SECONDS);
    setRetry((current) => current + 1);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#f4f8f7] text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="/"
            aria-label="Voltar para a página inicial da MAYLON"
            className="flex items-center gap-3 rounded-xl outline-none transition hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#35a989]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#087c68] text-white shadow-sm">
              <div className="grid grid-cols-2 gap-1">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
                <span className="h-2.5 w-2.5 rounded-[3px] border border-white" />
                <span className="h-2.5 w-2.5 rounded-[3px] border border-white" />
                <span className="h-2.5 w-2.5 rounded-[3px] bg-white" />
              </div>
            </div>

            <div>
              <p className="text-xl font-black tracking-[0.12em] text-[#087c68]">
                MAYLON
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-slate-400">
                Mobilidade inteligente
              </p>
            </div>
          </a>

          <div className="flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 sm:px-4 sm:text-sm">
            <LockKeyhole className="h-4 w-4" />
            <span>Checkout seguro</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#087c68]"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a MAYLON
          </a>

          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
            Finalize sua assinatura
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Confira os detalhes do seu pedido e pague via PIX para continuar.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#087c68]">
                  <Wallet className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-extrabold">
                    Resumo do pedido
                  </h2>
                  <p className="text-sm text-slate-500">
                    Confira o plano selecionado.
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#087c68] text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-extrabold text-slate-900">
                        Maylon Pass
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Plano {planName}
                      </p>
                      <span className="mt-3 inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">
                        Assinatura selecionada
                      </span>
                    </div>
                  </div>

                  <p className="shrink-0 text-right text-base font-extrabold">
                    {formatCurrency(
                      Number.isFinite(amount) && amount > 0 ? amount : 0
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold">
                    {formatCurrency(
                      Number.isFinite(amount) && amount > 0 ? amount : 0
                    )}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Taxa de pagamento</span>
                  <span className="font-semibold text-emerald-700">
                    Sem taxa adicional nesta tela
                  </span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold">Total a pagar</span>
                    <span className="text-2xl font-black text-[#087c68]">
                      {formatCurrency(
                        Number.isFinite(amount) && amount > 0 ? amount : 0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-7">
              <h3 className="font-extrabold">Por que pagar com PIX?</h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#087c68]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Prático e rápido</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Pague diretamente pelo aplicativo do seu banco.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-[#087c68]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Mais tranquilidade</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Confira o destinatário e o valor antes de confirmar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
            <div className="bg-[#087c68] px-6 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <QrCode className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold">
                    Pagamento via PIX
                  </h2>
                  <p className="mt-1 text-sm text-emerald-50">
                    Escaneie ou copie o código.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-emerald-50">
                <Smartphone className="h-4 w-4" />
                Pague usando o aplicativo do seu banco
              </div>
            </div>

            <div className="p-5 sm:p-6">
              {loading ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                    <LoaderCircle className="h-8 w-8 animate-spin text-[#087c68]" />
                  </div>

                  <p className="mt-5 font-bold">Preparando seu pagamento</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                    Estamos gerando o código PIX. Isso pode levar alguns
                    instantes.
                  </p>
                </div>
              ) : error && !pixCode ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                    <XCircle className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    Não foi possível gerar o PIX
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#087c68] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066653] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Tentar novamente
                  </button>
                </div>
              ) : expired ? (
                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                    <Clock3 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    Código expirado
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Gere um novo código para continuar o pagamento. O código
                    anterior pode continuar válido no banco ou no provedor;
                    confirme seu status antes de criar outra cobrança.
                  </p>

                  <button
                    type="button"
                    onClick={handleRetry}
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#087c68] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066653]"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Gerar novo PIX
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-center">
                    <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.07)]">
                      <QRCodeSVG
                        value={pixCode}
                        size={220}
                        level="M"
                        marginSize={3}
                        fgColor="#103b30"
                        bgColor="#ffffff"
                        title="QR Code para pagamento PIX da MAYLON"
                      />
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm font-semibold text-slate-500">
                      Valor do pagamento
                    </p>

                    <p className="mt-1 text-3xl font-black tracking-tight text-[#087c68]">
                      {formatCurrency(amount)}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">{planName}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm font-bold text-emerald-800">
                    <Clock3 className="h-4 w-4 shrink-0" />
                    <span>
                      Código disponível por {minutes}:{seconds}
                    </span>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="pix-code"
                      className="mb-2 block text-sm font-bold text-slate-700"
                    >
                      PIX Copia e Cola
                    </label>

                    <textarea
                      id="pix-code"
                      value={pixCode}
                      readOnly
                      rows={3}
                      aria-label="Código PIX Copia e Cola"
                      onFocus={(event) => event.currentTarget.select()}
                      className="w-full resize-none break-all rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 outline-none focus:border-[#35a989] focus:ring-2 focus:ring-emerald-100"
                    />

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087c68] px-4 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#066653] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200"
                    >
                      {copied ? (
                        <>
                          <Check className="h-5 w-5" />
                          Código copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-5 w-5" />
                          Copiar código PIX
                        </>
                      )}
                    </button>

                    {copied && (
                      <p
                        role="status"
                        className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Código copiado para a área de transferência.
                      </p>
                    )}

                    {error && (
                      <p
                        role="alert"
                        className="mt-3 text-center text-xs leading-5 text-red-600"
                      >
                        {error}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-800">
                      Como pagar
                    </p>

                    <ol className="mt-3 space-y-3 text-xs leading-5 text-slate-500">
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                          1
                        </span>
                        Abra o aplicativo do seu banco.
                      </li>
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                          2
                        </span>
                        Escolha PIX e escaneie o QR Code ou use Copia e Cola.
                      </li>
                      <li className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-800">
                          3
                        </span>
                        Confira o destinatário e o valor antes de confirmar.
                      </li>
                    </ol>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        <footer className="mt-8 border-t border-slate-200 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-sm font-bold text-slate-700">
                MAYLON · Maylon Pass
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Mobilidade inteligente e benefícios para você.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <LockKeyhole className="h-3.5 w-3.5" />
                Conexão protegida
              </span>
              <a
                href="/central-de-ajuda"
                className="flex items-center gap-1.5 transition hover:text-[#087c68]"
              >
                <Headphones className="h-3.5 w-3.5" />
                Precisa de ajuda?
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function CheckoutFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] p-5">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
          <LoaderCircle className="h-8 w-8 animate-spin text-[#087c68]" />
        </div>
        <p className="mt-5 font-extrabold text-slate-800">
          Carregando checkout...
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Preparando o ambiente de pagamento da MAYLON.
        </p>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}
