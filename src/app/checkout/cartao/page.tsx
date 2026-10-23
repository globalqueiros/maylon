// src/app/checkout/cartao/page.tsx
"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FormularioAssinaturaCartao from "../FormularioAssinaturaCartao";
import { calcularAssinatura } from "../../../lib/planos";

export const dynamic = "force-dynamic";

function CheckoutCartaoContent() {
  const searchParams = useSearchParams();

  // O valor é calculado a partir do plano/serviços; o servidor recalcula ao criar a assinatura
  const resumo = useMemo(
    () =>
      calcularAssinatura(
        searchParams.get("plan"),
        (searchParams.get("services") || "").split(",").filter(Boolean)
      ),
    [searchParams]
  );

  return (
    <main className="min-h-screen bg-[#f7faf9] flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 w-full max-w-md">
        {!resumo ? (
          <div className="text-center">
            <h1 className="text-xl font-black text-slate-900">Plano não encontrado</h1>
            <p className="mt-2 text-sm text-slate-500">Volte e escolha um plano do Maylon Pass.</p>
            <Link href="/maylon_pass" className="mt-6 inline-block font-bold text-[#35a989] hover:underline">
              Ver planos
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-black text-slate-900 mb-2 text-center">
              Assinar Maylon Pass {resumo.plano.name}
            </h1>
            <p className="text-sm text-slate-500 mb-6 text-center">
              Cobrança mensal automática no cartão de crédito.
            </p>

            {resumo.servicos.length > 0 && (
              <ul className="mb-6 space-y-1 rounded-2xl border border-slate-100 p-4 text-sm">
                <li className="flex justify-between">
                  <span className="text-slate-500">Maylon Pass {resumo.plano.name}</span>
                  <span>R$ {resumo.plano.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </li>
                {resumo.servicos.map((s) => (
                  <li key={s.id} className="flex justify-between">
                    <span className="text-slate-500">{s.name}</span>
                    <span>R$ {s.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </li>
                ))}
              </ul>
            )}

            <FormularioAssinaturaCartao resumo={resumo} />
          </>
        )}
      </div>
    </main>
  );
}

export default function CheckoutCartaoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">Carregando ambiente seguro...</div>
      }
    >
      <CheckoutCartaoContent />
    </Suspense>
  );
}
