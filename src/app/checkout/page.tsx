"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Check, ShieldCheck, Clock, AlertCircle } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const amountParam = searchParams.get("amount") || "0.00";
  const planName = searchParams.get("plan") || "Assinatura";
  const amount = Number(amountParam.replace(",", "."));

  const [pixCode, setPixCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timeLeft]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPix() {
      setLoading(true);
      setError("");
      setPixCode("");

      try {
        if (!Number.isFinite(amount) || amount <= 0) {
          throw new Error("O valor da assinatura é inválido.");
        }

        const response = await fetch("/api/checkout/pix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount.toFixed(2),
            description: `Maylon Pass - ${planName}`,
          }),
          signal: controller.signal,
        });

        const data = await response.json();

        if (!response.ok || !data.sucesso || !data.qrcode) {
          throw new Error(
            data.mensagem || data.message || "Não foi possível gerar o PIX."
          );
        }

        setPixCode(data.qrcode);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro ao gerar o PIX."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPix();

    return () => controller.abort();
  }, [amount, planName]);

  const handleCopy = useCallback(async () => {
    if (!pixCode) return;

    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Não foi possível copiar. Selecione e copie o código PIX manualmente.");
    }
  }, [pixCode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] p-4 text-slate-900">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-6 text-center shadow-xl sm:p-8">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1c5a4b] shadow-md">
          <div className="grid grid-cols-2 gap-1">
            <div className="h-2 w-2 rounded-sm bg-white" />
            <div className="h-2 w-2 rounded-sm border border-white" />
            <div className="h-2 w-2 rounded-sm border border-white" />
            <div className="h-2 w-2 rounded-sm bg-white" />
          </div>
        </div>

        <h1 className="mb-2 text-2xl font-black text-slate-900">
          Pagamento via PIX
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Escaneie o QR Code com o aplicativo do seu banco para pagar.
        </p>

        {loading ? (
          <div className="mb-8 flex h-[240px] flex-col items-center justify-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-b-[#35a989]" />
            <p className="text-sm text-slate-500">Gerando seu PIX...</p>
          </div>
        ) : error && !pixCode ? (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-5">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-[#087c68] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#066653]"
            >
              Tentar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 inline-block rounded-3xl border-2 border-slate-100 bg-white p-4 shadow-sm">
              <QRCodeSVG
                value={pixCode}
                size={200}
                level="M"
                marginSize={2}
                fgColor="#0f2b23"
                imageSettings={{
                  src: "/favicon.ico",
                  height: 36,
                  width: 36,
                  excavate: true,
                }}
              />
            </div>

            <div className="mb-6">
              <p className="mb-1 text-sm font-semibold text-slate-500">
                Valor da assinatura
              </p>
              <h2 className="text-4xl font-black text-[#35a989]">
                {amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{planName}</p>
            </div>

            <p className="mb-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#35a989]" />
              Pagamento processado com segurança.
            </p>

            <div
              className={`mb-6 flex items-center justify-center gap-2 rounded-xl p-3 font-bold ${
                timeLeft > 0
                  ? "bg-[#35a989]/10 text-[#27866c]"
                  : "bg-red-50 text-red-600"
              }`}
            >
              <Clock className="h-4 w-4" />
              {timeLeft > 0
                ? `Expira em ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
                : "Tempo de pagamento encerrado"}
            </div>

            {timeLeft > 0 ? (
              <div className="text-left">
                <p className="mb-2 ml-1 text-xs font-semibold text-slate-500">
                  PIX Copia e Cola
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixCode}
                    readOnly
                    aria-label="Código PIX Copia e Cola"
                    className="min-w-0 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-600 outline-none focus:border-[#35a989]"
                  />

                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? "Código copiado" : "Copiar código PIX"}
                    className="flex shrink-0 items-center justify-center rounded-xl bg-[#35a989] px-4 py-3 text-white transition-colors hover:bg-[#27866c]"
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="mt-2 text-xs font-semibold text-[#27866c]">
                    Código PIX copiado com sucesso!
                  </p>
                )}

                {error && (
                  <p className="mt-2 text-xs text-red-600">{error}</p>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full rounded-xl bg-[#087c68] px-5 py-3 font-bold text-white transition hover:bg-[#066653]"
              >
                Gerar novo PIX
              </button>
            )}
          </>
        )}

        <p className="mt-6 text-xs text-slate-400">
          Maylon Pass · Mobilidade inteligente
        </p>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f7faf9] p-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-b-[#35a989]" />
            <p className="text-sm text-slate-500">Carregando checkout...</p>
          </div>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
