"use client";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const benefits = [
  "Condições especiais dentro da Maylon",
  "Benefícios exclusivos para assinantes",
  "Experiência premium no aplicativo",
  "Ofertas e vantagens selecionadas",
  "Ambulância disponível",
  "Cancelamento simples",
];

type BenefitProps = {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
};

export default function MaylonPassPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const handlePayment = () => {
    if (paymentMethod === "card") {
      console.log("Pagamento selecionado: cartão");
      return;
    }
    console.log("Pagamento selecionado: Pix");
  };
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf9] text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#35a989]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[#35a989]/5 blur-[100px]" />
      </div>
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-12 sm:pt-12 lg:px-8 lg:pb-12 lg:pt-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-12">
            <div className="pt-16 lg:pt-32">
              <h1 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                Tenha mais vantagens com o{" "}
                <span className="text-[#35a989]">Maylon Pass</span>
              </h1>
              <p className="my-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Uma assinatura mensal criada para quem quer aproveitar ainda
                mais a experiência Maylon.
              </p>
              <div className="space-y-3 sm:space-y-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#35a989]/10">
                      <Check className="h-4 w-4 text-[#35a989]" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
                  <LockKeyhole className="h-5 w-5 text-[#35a989]" />
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Pagamento protegido
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm sm:px-4 sm:py-3">
                  <ShieldCheck className="h-5 w-5 text-[#35a989]" />
                  <span className="text-xs font-semibold text-slate-700 sm:text-sm">
                    Assinatura segura
                  </span>
                </div>
              </div>
            </div>
            <div className="relative w-full">
              <div className="absolute -inset-4 -z-10 rounded-[40px] bg-[#35a989]/20 blur-3xl" />
              <div className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_25px_80px_-25px_rgba(15,23,42,0.25)] lg:mx-0 lg:max-w-none">
                <div className="bg-[#35a989] px-6 py-6 text-white sm:px-8 sm:py-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold text-white/80 sm:text-sm">
                        Assinatura mensal
                      </p>
                      <h2 className="mt-1 text-xl font-black sm:text-2xl">
                        Maylon Pass
                      </h2>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 sm:h-12 sm:w-12 sm:rounded-2xl">
                      <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-end gap-1.5 sm:gap-2">
                    <span className="text-xs font-medium text-white/80 sm:text-sm">
                      R$
                    </span>
                    <span className="text-4xl font-black tracking-tight sm:text-5xl">
                      59
                    </span>
                    <span className="mb-1 text-xs text-white/80 sm:text-sm">
                      ,90 / mês
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/80 sm:mt-3 sm:text-sm">
                    Renovação mensal enquanto sua assinatura estiver ativa.
                  </p>
                </div>
                <div className="p-5 sm:p-7 lg:p-8">
                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      Escolha sua forma de pagamento
                    </p>
                    <p className="mt-0 text-xs leading-5 text-slate-500 sm:text-sm">
                      Selecione como deseja pagar sua assinatura Maylon Pass.
                    </p>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition-all sm:p-4 ${paymentMethod === "card"
                          ? "border-2 border-[#35a989] bg-[#35a989]/10 shadow-sm"
                          : "border border-slate-200 bg-white hover:border-[#35a989] hover:bg-[#35a989]/5"
                        }`}
                    >
                      <div className="flex min-w-0 cursor-pointer items-center gap-3 sm:gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${paymentMethod === "card"
                              ? "bg-white shadow-sm"
                              : "bg-slate-100"
                            }`}
                        >
                          <CreditCard
                            className={`h-5 w-5 ${paymentMethod === "card"
                                ? "text-[#35a989]"
                                : "text-slate-600"
                              }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
                            Cartão de crédito
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                            Cobrança recorrente automática
                          </p>
                        </div>
                      </div>
                      <div
                        className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${paymentMethod === "card"
                            ? "border-[#35a989] bg-[#35a989]"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {paymentMethod === "card" && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pix")}
                      className={`flex w-full items-center justify-between rounded-2xl p-3.5 text-left transition-all sm:p-4 ${paymentMethod === "pix"
                          ? "border-2 border-[#35a989] bg-[#35a989]/10 shadow-sm"
                          : "border border-slate-200 bg-white hover:border-[#35a989] hover:bg-[#35a989]/5"
                        }`}
                    >
                      <div className="flex min-w-0 cursor-pointer items-center gap-3 sm:gap-4">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${paymentMethod === "pix"
                              ? "bg-white shadow-sm"
                              : "bg-slate-100"
                            }`}
                        >
                          <QrCode
                            className={`h-5 w-5 ${paymentMethod === "pix"
                                ? "text-[#35a989]"
                                : "text-slate-600"
                              }`}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 sm:text-base">
                            Pix
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-500 sm:text-xs">
                            Pagamento via QR Code
                          </p>
                        </div>
                      </div>
                      <div
                        className={`ml-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${paymentMethod === "pix"
                            ? "border-[#35a989] bg-[#35a989]"
                            : "border-slate-300 bg-white"
                          }`}
                      >
                        {paymentMethod === "pix" && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </button>
                  </div>
                  <div className="mt-5 rounded-2xl bg-slate-50 p-4 sm:mt-7 sm:p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 sm:text-sm">
                        Maylon Pass
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        R$ 59,90
                      </span>
                    </div>
                    <div className="my-3 h-px bg-slate-200 sm:my-4" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900">
                        Total mensal
                      </span>
                      <span className="text-lg font-black text-[#35a989] sm:text-xl">
                        R$ 59,90
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="group mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-7 py-4 text-sm font-bold text-white transition hover:brightness-95 sm:text-base"
                  >
                    <span>Assinar Maylon Pass</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 sm:text-xs">
                    {paymentMethod === "card" ? (
                      <>
                        <CreditCard className="h-3.5 w-3.5" />
                        Cartão de crédito selecionado
                      </>
                    ) : (
                      <>
                        <QrCode className="h-3.5 w-3.5" />
                        Pix selecionado
                      </>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400 sm:text-xs">
                    <LockKeyhole className="h-3.5 w-3.5" />
                    Seus dados são protegidos durante o pagamento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-7 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-[#35a989]/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#35a989]">
              Por que assinar?
            </span>
            <h2 className="my-3 text-3xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl lg:text-[44px]">
              Uma experiência feita
              <span className="text-[#35a989]"> para você</span>
            </h2>
            <p className="mx-auto mt-0 max-w-xl text-sm leading-6 text-black sm:text-sm">
              O Maylon Pass reúne vantagens, praticidade e segurança em uma
              única assinatura mensal.
            </p>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-black">
            <Benefit
              number="01"
              icon={<Sparkles className="h-5 w-5" />}
              title="Vantagens exclusivas"
              text="Tenha acesso a benefícios especiais dentro do ecossistema Maylon."
            />
            <Benefit
              number="02"
              icon={<CreditCard className="h-5 w-5" />}
              title="Pagamento simples"
              text="Escolha uma forma de pagamento conveniente para sua assinatura."
            />
            <Benefit
              number="03"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Mais segurança"
              text="Seu pagamento é processado em um ambiente seguro e protegido."
            />
            <Benefit
              number="04"
              icon={<Check className="h-5 w-5" />}
              title="Tudo pelo app"
              text="Gerencie sua assinatura e sua experiência Maylon de forma simples."
            />
          </div>
          <div className="relative mt-6 overflow-hidden rounded-3xl bg-[#3bac85] px-6 py-7 shadow-[0_20px_50px_-20px_rgba(59,172,133,0.45)] sm:px-8 lg:px-10">
            <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#3bac85] shadow-lg shadow-black/10">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">
                    Tudo o que você precisa em um só lugar.
                  </p>
                  <p className="mt-1 max-w-xl text-sm leading-6 text-white/75">
                    Assine o Maylon Pass e aproveite uma experiência mais completa,
                    prática e exclusiva.
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                <Check className="h-4 w-4" />
                <span>Simples. Seguro. Exclusivo.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Benefit({
  number,
  icon,
  title,
  text,
}: BenefitProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#35a989]/30 hover:shadow-[0_18px_45px_-20px_rgba(53,169,137,0.35)]">
      <span className="absolute right-5 top-5 text-xs font-bold tracking-widest text-slate-200 transition-colors duration-300 group-hover:text-[#35a989]/20">
        {number}
      </span>
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#35a989]/10 text-[#35a989] transition-all duration-300 group-hover:bg-[#35a989] group-hover:text-white">
        {icon}
      </div>
      <div className="mt-6">
        <h3 className="text-[17px] font-extrabold tracking-tight text-slate-950">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {text}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#35a989] transition-all duration-300 group-hover:w-full" />
    </div>
  );
}