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

const plans = [
  {
    id: "basico",
    name: "Básico",
    price: "19,90",
    description: "Para começar com as vantagens Maylon.",
    benefits: [
      "Condições especiais",
      "Benefícios exclusivos",
      "Cancelamento simples",
    ],
  },
  {
    id: "plus",
    name: "Plus",
    price: "39,90",
    description: "Mais benefícios para uma experiência completa.",
    benefits: [
      "Todos os benefícios do Básico",
      "Ambulância disponível",
      "Ofertas selecionadas",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "69,90",
    description: "A experiência Maylon mais completa.",
    benefits: [
      "Todos os benefícios do Plus",
      "Benefícios exclusivos Premium",
      "Experiência completa",
    ],
  },
];

type BenefitProps = {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
};

type PaymentOptionProps = {
  selected: boolean;
  className?: string;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

export default function MaylonPassPage() {
  const [selectedPlan, setSelectedPlan] = useState("plus");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");

  const currentPlan =
    plans.find((plan) => plan.id === selectedPlan) ?? plans[1];

  return (
    <main className="min-h-screen bg-[#f7faf9] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#35a989]">
            Maylon Pass
          </p>
          <h1 className="my-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-3xl">
            Tenha mais vantagens com{" "}
            <span className="text-[#35a989]">Maylon Pass</span>
          </h1>
          <p className="mx-auto mt-0 max-w-2xl text-base leading-7 text-slate-600 sm:text-sm">
            Escolha o plano ideal para aproveitar ainda mais a experiência
            Maylon.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-3">
          {plans.map((plan) => {
            const selected = selectedPlan === plan.id;
            const featured = plan.id === "plus";

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative flex min-h-[285px] cursor-pointer flex-col rounded-3xl border-2 bg-white p-6 text-left transition-all ${
                  selected
                    ? "border-[#35a989] shadow-[0_18px_45px_-24px_rgba(53,169,137,.7)]"
                    : "border-slate-200 hover:border-[#35a989]/50"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#35a989] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Mais escolhido
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-950">
                      {plan.name}
                    </h2>
                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {plan.description}
                    </p>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      selected
                        ? "border-[#35a989] bg-[#35a989]"
                        : "border-slate-300"
                    }`}
                  >
                    {selected && <Check className="h-4 w-4 text-white" />}
                  </span>
                </div>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-sm font-semibold text-slate-500">
                    R$
                  </span>
                  <span className="text-4xl font-black tracking-tight text-[#35a989]">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-xs text-slate-400">/ mês</span>
                </div>

                <div className="mt-auto space-y-2 pt-6">
                  {plan.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className={`flex items-center gap-2 text-sm ${
                        benefit === "Ambulância disponível"
                          ? "font-bold text-[#35a989]"
                          : "text-slate-600"
                      }`}
                    >
                      <Check className="h-4 w-4 shrink-0 text-[#35a989]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Forma de pagamento
                </h2>
                <p className="mt-0.8 text-xs text-slate-500">
                  Escolha como deseja pagar sua assinatura.
                </p>
              </div>
              <CreditCard className="h-6 w-6 text-[#35a989]" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <PaymentOption
                selected={paymentMethod === "card"}
                className="cursor-pointer"
                icon={<CreditCard className="h-5 w-5" />}
                title="Cartão de Crédito"
                description="Cobrança recorrente automática"
                onClick={() => setPaymentMethod("card")}
              />
              <PaymentOption
                selected={paymentMethod === "pix"}
                className="cursor-pointer"
                icon={<QrCode className="h-5 w-5" />}
                title="Pix"
                description="Autorização + 1ª mensalidade"
                onClick={() => setPaymentMethod("pix")}
              />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-[#35a989] p-6 text-white">
              <p className="text-xs font-semibold text-white/80">
                Plano selecionado
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                Maylon Pass {currentPlan.name}
              </h2>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-sm">R$</span>
                <span className="text-3xl font-black">
                  {currentPlan.price}
                </span>
                <span className="mb-1 text-sm text-white/80">/ mês</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Assinatura mensal</span>
                <strong>R$ {currentPlan.price}</strong>
              </div>

              <div className="my-4 h-px bg-slate-200" />

              <div className="flex items-center justify-between">
                <span className="font-bold">Total mensal</span>
                <strong className="text-base text-[#35a989]">
                  R$ {currentPlan.price}
                </strong>
              </div>

              <button
                type="button"
                onClick={() =>
                  console.log("Assinar", currentPlan.id, paymentMethod)
                }
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white transition hover:brightness-95"
              >
                Assinar Maylon Pass
                <ArrowRight className="h-5 w-5" />
              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                <LockKeyhole className="h-4 w-4" />
                Pagamento protegido
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#35a989]">
              Por que assinar?
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-3xl">
              Uma experiência feita{" "}
              <span className="text-[#35a989]">para você</span>
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Benefit
              number="01"
              icon={<Sparkles className="h-5 w-5" />}
              title="Vantagens exclusivas"
              text="Benefícios especiais dentro do ecossistema Maylon."
            />
            <Benefit
              number="02"
              icon={<CreditCard className="h-5 w-5" />}
              title="Pagamento simples"
              text="Escolha uma forma de pagamento conveniente."
            />
            <Benefit
              number="03"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Mais segurança"
              text="Seu pagamento é processado em ambiente protegido."
            />
            <Benefit
              number="04"
              icon={<Check className="h-5 w-5" />}
              title="Tudo pelo app"
              text="Gerencie sua assinatura de forma simples."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function PaymentOption({
  selected,
  className = "",
  icon,
  title,
  description,
  onClick,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
        selected
          ? "border-[#35a989] bg-[#35a989]/10"
          : "border-slate-200 hover:border-[#35a989]/50"
      } ${className}`}
    >
      <span className="flex items-center gap-3">
        <span className="text-[#35a989]">{icon}</span>
        <span>
          <strong className="block text-sm text-slate-900">{title}</strong>
          <small className="text-xs text-slate-500">{description}</small>
        </span>
      </span>

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
          selected
            ? "border-[#35a989] bg-[#35a989]"
            : "border-slate-300"
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </span>
    </button>
  );
}

function Benefit({ number, icon, title, text }: BenefitProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#35a989]/10 text-[#35a989]">
        {icon}
      </div>
      <span className="mt-5 block text-xs font-bold tracking-widest text-[#35a989]">
        {number}
      </span>
      <h3 className="mt-2 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
    </div>
  );
}