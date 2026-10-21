// src/lib/planos.ts
// Fonte única de verdade para planos e serviços adicionais do Maylon Pass.
// É usada pela página /maylon_pass (exibição) e pelas rotas de API (cálculo do valor).
// O valor cobrado NUNCA deve vir do navegador: o servidor recalcula a partir daqui.

export type PlanId = "basico" | "plus" | "premium";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  description: string;
  benefits: string[];
};

export type AdditionalService = {
  id: string;
  name: string;
  description: string;
  href: string;
  prices: Record<PlanId, number>;
};

export const plans: Plan[] = [
  {
    id: "basico",
    name: "Básico",
    price: 29.9,
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
    price: 59.9,
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
    price: 89.9,
    description: "A experiência Maylon mais completa.",
    benefits: [
      "Todos os benefícios do Plus",
      "Benefícios exclusivos Premium",
      "Experiência completa",
    ],
  },
];

export const additionalServices: AdditionalService[] = [
  {
    id: "maylon-home",
    name: "Maylon Home",
    description: "Proteção e assistência para o seu lar.",
    href: "/maylon_pass/maylon_home",
    prices: {
      basico: 69.9,
      plus: 50,
      premium: 80,
    },
  },
  {
    id: "maylon-van-escolar",
    name: "Maylon Van Escolar",
    description: "Transporte escolar com mais praticidade e segurança.",
    href: "/maylon_pass/maylon_van_escolar",
    prices: {
      basico: 180,
      plus: 210,
      premium: 320,
    },
  },
];

export function isPlanId(value: unknown): value is PlanId {
  return value === "basico" || value === "plus" || value === "premium";
}

export type ResumoAssinatura = {
  plano: Plan;
  servicos: { id: string; name: string; price: number }[];
  total: number; // em reais, 2 casas
};

/**
 * Calcula o total mensal a partir do plano e dos IDs dos serviços.
 * IDs desconhecidos são ignorados. Retorna null se o plano for inválido.
 */
export function calcularAssinatura(
  planId: unknown,
  serviceIds: unknown
): ResumoAssinatura | null {
  if (!isPlanId(planId)) return null;
  const plano = plans.find((p) => p.id === planId)!;

  const ids = Array.isArray(serviceIds)
    ? Array.from(new Set(serviceIds.filter((s): s is string => typeof s === "string")))
    : [];

  const servicos = additionalServices
    .filter((s) => ids.includes(s.id))
    .map((s) => ({ id: s.id, name: s.name, price: s.prices[planId] }));

  // Soma em centavos para não acumular erro de ponto flutuante
  const totalCentavos =
    Math.round(plano.price * 100) +
    servicos.reduce((acc, s) => acc + Math.round(s.price * 100), 0);

  return { plano, servicos, total: totalCentavos / 100 };
}
