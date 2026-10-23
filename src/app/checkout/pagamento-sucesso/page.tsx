
"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Headset,
} from "lucide-react";

function PagamentoSucessoContent() {
  const searchParams = useSearchParams();
  const pedido = searchParams.get("pedido");

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-4 py-10">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <header className="flex items-center justify-center gap-3 border-b border-slate-100 bg-white px-6 py-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#35a989] text-lg font-black text-white">
            M
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              MAYLON <span className="text-[#35a989]">PASS</span>
            </h1>
            <p className="text-xs text-slate-500">
              Assinaturas e benefícios
            </p>
          </div>
        </header>

        <section className="px-6 py-10 text-center sm:px-10 sm:py-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2
              size={54}
              strokeWidth={1.8}
              className="text-[#259b7b]"
            />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#16866c]">
            Pagamento confirmado
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
            Tudo certo!
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500">
            Seu pagamento foi confirmado. Obrigado por escolher
            a MAYLON! Consulte as informações da sua assinatura
            para acompanhar seus benefícios.
          </p>

          {pedido && (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Referência do pedido
              </p>
              <p className="mt-2 break-all text-sm font-bold text-slate-800">
                {pedido}
              </p>
            </div>
          )}

          <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-left">
            <div className="flex gap-3">
              <ShieldCheck
                size={22}
                className="shrink-0 text-[#16866c]"
              />
              <div>
                <p className="text-sm font-bold text-emerald-900">
                  Próximo passo
                </p>
                <p className="mt-1 text-sm leading-6 text-emerald-800">
                  Acesse sua conta para consultar os dados da
                  assinatura e os benefícios disponíveis.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <Link
              href="/passageiro/beneficios"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#16866c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#116b57]"
            >
              <CreditCard size={18} />
              Consultar meus benefícios
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/maylon_pass"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Voltar ao Maylon Pass
            </Link>

            <a
              href="https://maylon.com.br"
              className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#16866c] hover:underline"
            >
              <Headset size={17} />
              Site oficial da MAYLON
            </a>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-5">
            <p className="text-xs leading-5 text-slate-400">
              © {new Date().getFullYear()} MAYLON PASS
              <br />
              Uma empresa da Corporação Queirós Brazil.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function PagamentoSucessoPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7]">
          Carregando confirmação...
        </main>
      }
    >
      <PagamentoSucessoContent />
    </Suspense>
  );
}
