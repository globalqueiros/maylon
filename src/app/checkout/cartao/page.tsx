<<<<<<< HEAD

=======
// src/app/checkout/cartao/page.tsx
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FormularioAssinaturaCartao from "../FormularioAssinaturaCartao";
import { calcularAssinatura } from "../../../lib/planos";
<<<<<<< HEAD
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
=======

export const dynamic = "force-dynamic";
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab

function CheckoutCartaoContent() {
  const searchParams = useSearchParams();

<<<<<<< HEAD
=======
  // O valor é calculado a partir do plano/serviços; o servidor recalcula ao criar a assinatura
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
  const resumo = useMemo(
    () =>
      calcularAssinatura(
        searchParams.get("plan"),
<<<<<<< HEAD
        (searchParams.get("services") || "")
          .split(",")
          .filter(Boolean)
=======
        (searchParams.get("services") || "").split(",").filter(Boolean)
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
      ),
    [searchParams]
  );

<<<<<<< HEAD
  const formatarMoeda = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const totalMensal = resumo
    ? resumo.plano.price +
      resumo.servicos.reduce(
        (total, servico) => total + servico.price,
        0
      )
    : 0;

  return (
    <main className="min-h-screen bg-[#f4f8f7] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <div className="mb-9 max-w-6xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e3f5ef] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#16866c]">
            <Sparkles size={14} />
            Finalização da assinatura
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-3xl">
            Sua próxima experiência
            <span className="block text-[#259b7b]">
              começa aqui.
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-sm">
            Confira seu plano e finalize a contratação com
            praticidade. Seus benefícios Maylon Pass em um só lugar.
          </p>
        </div>

        {!resumo ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <CreditCard size={30} />
            </div>

            <h2 className="text-xl font-extrabold">
              Plano não encontrado
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Não foi possível identificar o plano selecionado.
              Volte à página do Maylon Pass e escolha uma opção
              para continuar.
            </p>

            <Link
              href="/maylon_pass"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#16866c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#116b57]"
            >
              Ver planos disponíveis
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f5ef] text-[#16866c]">
                    <CreditCard size={22} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold">
                      Dados da assinatura
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Preencha os dados para continuar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <FormularioAssinaturaCartao resumo={resumo} />
              </div>

              <div className="mx-5 mb-5 flex gap-3 rounded-2xl bg-slate-50 p-4 sm:mx-8 sm:mb-8">
                <ShieldCheck
                  className="mt-0.5 shrink-0 text-[#259b7b]"
                  size={21}
                />
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Proteção dos seus dados
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Utilize somente a página oficial da MAYLON
                    para informar seus dados de pagamento.
                    O processamento do cartão deve seguir a
                    integração segura do provedor de pagamentos.
                  </p>
                </div>
              </div>
            </section>

            <aside className="space-y-5 lg:sticky lg:top-6">
              <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="bg-gradient-to-br from-[#16866c] to-[#35a989] p-6 text-white">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-white/80">
                        Resumo do pedido
                      </p>
                      <h2 className="mt-2 text-2xl font-black">
                        Maylon Pass
                      </h2>
                      <p className="mt-1 text-sm text-white/85">
                        Plano {resumo.plano.name}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <ShieldCheck size={25} />
                    </div>
                  </div>

                  <div className="mt-7 border-t border-white/20 pt-5">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/80">
                      Total da assinatura
                    </p>
                    <div className="mt-1 flex flex-wrap items-baseline gap-2">
                      <span className="text-3xl font-black tracking-tight">
                        {formatarMoeda(totalMensal)}
                      </span>
                      <span className="text-sm text-white/80">
                        /mês
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="mb-4 text-sm font-extrabold">
                    Detalhamento dos valores
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Plano {resumo.plano.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Assinatura principal
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-sm font-bold">
                        {formatarMoeda(resumo.plano.price)}
                      </span>
                    </div>

                    {resumo.servicos.map((servico) => (
                      <div
                        key={servico.id}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700">
                            {servico.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            Serviço adicional
                          </p>
                        </div>
                        <span className="whitespace-nowrap text-sm font-bold">
                          {formatarMoeda(servico.price)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="my-5 border-t border-dashed border-slate-200" />

                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-700">
                      Total mensal
                    </span>
                    <span className="text-xl font-black text-[#16866c]">
                      {formatarMoeda(totalMensal)}
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                    <div className="flex gap-2">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-emerald-700"
                      />
                      <p className="text-xs leading-5 text-emerald-900">
                        Cobrança recorrente mensal no cartão,
                        conforme as condições apresentadas na
                        contratação.
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                    Ao concluir, confira os termos da assinatura,
                    a política de cancelamento e as condições
                    de cobrança antes de confirmar o pagamento.
                  </p>
                </div>
              </section>

              <div className="flex items-center justify-center gap-2 px-3 text-xs text-slate-500">
                <LockKeyhole size={14} className="text-[#259b7b]" />
                Ambiente de contratação protegido
              </div>
            </aside>
          </div>
        )}
       </section>
=======
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
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
    </main>
  );
}

export default function CheckoutCartaoPage() {
  return (
    <Suspense
      fallback={
<<<<<<< HEAD
        <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-5">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#d9eee7] border-t-[#259b7b]" />
            <p className="mt-4 text-sm font-medium text-slate-600">
              Carregando ambiente seguro...
            </p>
          </div>
        </main>
=======
        <div className="min-h-screen flex items-center justify-center">Carregando ambiente seguro...</div>
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
      }
    >
      <CheckoutCartaoContent />
    </Suspense>
  );
}
