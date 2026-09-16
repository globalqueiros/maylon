"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Home,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type PlanId = "basico" | "plus" | "premium";

type Plan = {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  benefits: string[];
};

type AdditionalService = {
  id: string;
  name: string;
  description: string;
  href: string;
  prices: Record<PlanId, number>;
};

type BenefitProps = {
  number: string;
  icon: ReactNode;
  title: string;
  text: string;
};

type PaymentOptionProps = {
  selected: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
};

type AdditionalServiceProps = {
  selected: boolean;
  name: string;
  price: number;
  description: string;
  href: string;
  onClick: () => void;
};

const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: 19.9,
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
    price: 40,
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
    price: 69.9,
    description: "A experiência Maylon mais completa.",
    benefits: [
      "Todos os benefícios do Plus",
      "Benefícios exclusivos Premium",
      "Experiência completa",
    ],
  },
];

const additionalServices: AdditionalService[] = [
  {
    id: "maylon-home",
    name: "Maylon Home",
    description: "Proteção e assistência para o seu lar.",
    href: "/maylon_pass/maylon_home",
    prices: {
      basico: 35,
      plus: 55,
      premium: 25,
    },
  },
];

export default function MaylonPassPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("plus");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">("card");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const currentPlan = useMemo(
    () =>
      plans.find((plan) => plan.id === selectedPlan) ??
      plans.find((plan) => plan.id === "plus")!,
    [selectedPlan]
  );

  const planPrice = currentPlan.price;

  const selectedServicesData = useMemo(
    () =>
      additionalServices.filter((service) =>
        selectedServices.includes(service.id)
      ),
    [selectedServices]
  );

  const additionalTotal = useMemo(
    () =>
      selectedServicesData.reduce(
        (total, service) => total + service.prices[selectedPlan],
        0
      ),
    [selectedServicesData, selectedPlan]
  );

  const monthlyTotal = planPrice + additionalTotal;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const toggleService = (serviceId: string) => {
    setSelectedServices((current) =>
      current.includes(serviceId)
        ? current.filter((id) => id !== serviceId)
        : [...current, serviceId]
    );
  };

  const handleSubscribe = () => {
    console.log("Assinar Maylon Pass", {
      plano: currentPlan.id,
      nomePlano: currentPlan.name,
      pagamento: paymentMethod,
      servicos: selectedServices,
      valorPlano: planPrice,
      valorAdicional: additionalTotal,
      totalMensal: monthlyTotal,
    });
  };

  return (
    <main className="min-h-screen bg-[#f7faf9] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#35a989]">
            Maylon Pass
          </p>
          <h1 className="mt-2 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Tenha mais vantagens com{" "}
            <span className="text-[#35a989]">Maylon Pass</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Escolha o plano ideal para aproveitar ainda mais a experiência
            Maylon.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-3">
          {plans.map((plan) => {
            const selected = selectedPlan === plan.id;
            const featured = plan.id === "plus";

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                aria-pressed={selected}
                className={`relative flex min-h-[285px] w-full cursor-pointer flex-col rounded-3xl border-2 bg-white p-6 text-left transition-all duration-300 ${selected
                  ? "border-[#35a989] shadow-[0_18px_45px_-24px_rgba(53,169,137,.7)]"
                  : "border-slate-200 hover:-translate-y-1 hover:border-[#35a989]/50 hover:shadow-lg"
                  }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-[#35a989] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
                    Mais escolhido
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-black text-slate-950">
                      {plan.name}
                    </h2>
                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {plan.description}
                    </p>
                  </div>

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selected
                      ? "border-[#35a989] bg-[#35a989]"
                      : "border-slate-300 bg-white"
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
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="mb-1 text-xs text-slate-400">/ mês</span>
                </div>

                <div className="mt-auto space-y-2 pt-6">
                  {plan.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className={`flex items-center gap-2 text-sm ${benefit === "Ambulância disponível"
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

        <div className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Forma de pagamento
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Escolha como deseja pagar sua assinatura.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#35a989]/10">
                  <CreditCard className="h-5 w-5 text-[#35a989]" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <PaymentOption
                  selected={paymentMethod === "card"}
                  icon={<CreditCard className="h-5 w-5" />}
                  title="Cartão de Crédito"
                  description="Cobrança recorrente automática"
                  onClick={() => setPaymentMethod("card")}
                />
                <PaymentOption
                  selected={paymentMethod === "pix"}
                  icon={<QrCode className="h-5 w-5" />}
                  title="Pix"
                  description="Autorização + 1ª mensalidade"
                  onClick={() => setPaymentMethod("pix")}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-950">
                    Adicione mais proteção
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Serviços adicionais podem variar de preço conforme o plano
                    escolhido.
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#35a989]/10">
                  <ShieldCheck className="h-5 w-5 text-[#35a989]" />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {additionalServices.map((service) => {
                  const selected = selectedServices.includes(service.id);
                  const servicePrice = service.prices[selectedPlan];

                  return (
                    <AdditionalService
                      key={service.id}
                      selected={selected}
                      name={service.name}
                      price={servicePrice}
                      description={service.description}
                      href={service.href}
                      onClick={() => toggleService(service.id)}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6">
            <div className="bg-[#35a989] p-6 text-white">
              <p className="text-xs font-semibold text-white/80">
                Plano selecionado
              </p>
              <h2 className="mt-1 text-xl font-black">
                Maylon Pass {currentPlan.name}
              </h2>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-sm">R$</span>
                <span className="text-3xl font-black">
                  {formatCurrency(monthlyTotal)}
                </span>
                <span className="mb-1 text-sm text-white/80">/ mês</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-500">
                  Maylon Pass {currentPlan.name}
                </span>
                <strong className="shrink-0">
                  R$ {formatCurrency(planPrice)}
                </strong>
              </div>

              {selectedServicesData.length > 0 && (
                <div className="mt-4 space-y-3">
                  {selectedServicesData.map((service) => {
                    const servicePrice = service.prices[selectedPlan];

                    return (
                      <div
                        key={service.id}
                        className="flex items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#35a989]/10">
                            <Home className="h-4 w-4 text-[#35a989]" />
                          </div>
                          <span className="truncate text-slate-500">
                            {service.name}
                          </span>
                        </div>
                        <strong className="shrink-0">
                          R$ {formatCurrency(servicePrice)}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="my-5 h-px bg-slate-200" />

              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-slate-900">
                  Total mensal
                </span>
                <strong className="text-lg text-[#35a989]">
                  R$ {formatCurrency(monthlyTotal)}
                </strong>
              </div>

              {additionalTotal > 0 && (
                <p className="mt-2 text-right text-[11px] text-slate-400">
                  Plano + serviços adicionais
                </p>
              )}

              <div className="mt-4 rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-2">
                  {paymentMethod === "card" ? (
                    <CreditCard className="h-4 w-4 text-[#35a989]" />
                  ) : (
                    <QrCode className="h-4 w-4 text-[#35a989]" />
                  )}
                  <span className="text-xs font-semibold text-slate-700">
                    {paymentMethod === "card"
                      ? "Cartão de Crédito"
                      : "Pix"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubscribe}
                className="group mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-5 py-4 font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95 hover:shadow-lg active:translate-y-0"
              >
                <span>Assinar Maylon Pass</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
            <h2 className="mt-2 text-3xl font-black text-slate-950 sm:text-4xl">
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
  icon,
  title,
  description,
  onClick,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-200 ${selected
        ? "border-[#35a989] bg-[#35a989]/10 shadow-sm"
        : "border-slate-200 hover:border-[#35a989]/50 hover:bg-slate-50"
        }`}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#35a989]/10 text-[#35a989]">
          {icon}
        </span>
        <span className="min-w-0">
          <strong className="block text-sm text-slate-900">{title}</strong>
          <small className="mt-0.5 block text-xs text-slate-500">
            {description}
          </small>
        </span>
      </span>

      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${selected
          ? "border-[#35a989] bg-[#35a989]"
          : "border-slate-300 bg-white"
          }`}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </span>
    </button>
  );
}

function AdditionalService({
  selected,
  name,
  price,
  description,
  href,
  onClick,
}: AdditionalServiceProps) {
  return (
    <div
      className={`flex w-full items-center justify-between gap-4 rounded-2xl border-2 p-4 transition-all duration-200 ${selected
        ? "border-[#35a989] bg-[#35a989]/5 shadow-sm"
        : "border-slate-200 bg-white hover:border-[#35a989]/50 hover:bg-slate-50"
        }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all ${selected ? "bg-[#35a989]" : "bg-[#35a989]/10"
            }`}
        >
          <Home
            className={`h-5 w-5 ${selected ? "text-white" : "text-[#35a989]"
              }`}
          />
        </div>

        <div className="min-w-0">
          <strong className="block text-sm font-bold text-slate-900">
            {name}
          </strong>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}{" "}
            <Link
              href={href}
              onClick={(event) => event.stopPropagation()}
              className="font-semibold text-[#35a989] transition-colors hover:text-[#27866c] hover:underline"
            >
              Consulte aqui os termos de uso.
            </Link>
          </p>
        </div>
      </button>

      <div className="shrink-0 text-right">
        <strong className="block text-sm font-black text-[#35a989]">
          + R${" "}
          {price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </strong>
        <span className="text-[10px] text-slate-400">/ mês</span>
      </div>
    </div>
  );
}

function Benefit({ number, icon, title, text }: BenefitProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#35a989]/30 hover:shadow-lg">
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