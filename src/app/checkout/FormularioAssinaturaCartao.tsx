"use client";
<<<<<<< HEAD
=======

// src/app/checkout/FormularioAssinaturaCartao.tsx
// Assinatura mensal no cartão (Stripe Billing) com o fluxo "deferred intent":
// o PaymentElement aparece na hora e a assinatura só é criada no servidor quando
// o cliente clica em Assinar. Assim não ficam assinaturas incompletas abandonadas.

>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Loader2, LockKeyhole, RefreshCw } from "lucide-react";
import type { ResumoAssinatura } from "../../lib/planos";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Props = { resumo: ResumoAssinatura };

function Formulario({ resumo }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");
<<<<<<< HEAD
  
=======
  // Guardado após a 1ª tentativa: se o cartão for recusado, a nova tentativa usa a
  // MESMA assinatura em vez de criar outra
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || processando) return;

    setErro("");
    if (nome.trim().split(/\s+/).length < 2) return setErro("Informe seu nome completo.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setErro("Informe um e-mail válido.");

    setProcessando(true);
    try {
      // 1) Valida os campos do cartão
      const { error: erroCampos } = await elements.submit();
      if (erroCampos) {
        setErro(erroCampos.message ?? "Confira os dados do cartão.");
        return;
      }

      // 2) Cria a assinatura no servidor (só na 1ª tentativa)
      let secret = clientSecret;
      if (!secret) {
        const resp = await fetch("/api/checkout/stripe/assinatura", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planId: resumo.plano.id,
            serviceIds: resumo.servicos.map((s) => s.id),
            nome,
            email,
          }),
        });
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok || !data.clientSecret) {
          setErro(data.erro || "Não foi possível iniciar a assinatura. Tente novamente.");
          return;
        }
        secret = data.clientSecret as string;
        setClientSecret(secret);
      }

      // 3) Confirma a 1ª mensalidade (abre o 3DS do banco se for necessário)
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: secret,
        confirmParams: {
          return_url: `${window.location.origin}/pagamento-sucesso?tipo=assinatura`,
          payment_method_data: { billing_details: { name: nome, email } },
        },
        redirect: "if_required",
      });

      if (error) {
        setErro(
          error.type === "card_error" || error.type === "validation_error"
            ? error.message ?? "Cartão recusado."
            : "Não foi possível concluir o pagamento. Tente novamente."
        );
        return;
      }

      router.push("/pagamento-sucesso?tipo=assinatura");
    } finally {
      setProcessando(false);
    }
  };

  const recomecar = () => {
    // Permite trocar nome/e-mail depois de um erro (cria uma nova assinatura)
    setClientSecret(null);
    setErro("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 ml-1 block text-xs font-semibold text-slate-600">Nome completo</span>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={!!clientSecret}
            autoComplete="name"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#35a989] focus:bg-white disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 ml-1 block text-xs font-semibold text-slate-600">E-mail</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!!clientSecret}
            autoComplete="email"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#35a989] focus:bg-white disabled:opacity-60"
          />
          <span className="ml-1 mt-1.5 block text-[11px] text-slate-400">
            Os recibos mensais são enviados para este e-mail.
          </span>
        </label>
      </div>

      <PaymentElement options={{ layout: "tabs" }} />

      {erro && (
        <div role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {erro}
          {clientSecret && (
            <button
              type="button"
              onClick={recomecar}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-red-700 underline"
            >
              <RefreshCw className="h-3 w-3" />
              Corrigir nome ou e-mail
            </button>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-slate-50 p-4 text-sm">
        <div className="flex items-center justify-between">
<<<<<<< HEAD
          <span className="text-slate-500 text-sm">Cobrança hoje</span>
          <strong>{brl(resumo.total)}</strong>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-slate-500 text-sm">Depois</span>
=======
          <span className="text-slate-500">Cobrança hoje</span>
          <strong>{brl(resumo.total)}</strong>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-slate-500">Depois</span>
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
          <strong>{brl(resumo.total)} / mês</strong>
        </div>
        <p className="mt-2 text-[11px] leading-4 text-slate-400">
          A renovação é automática no mesmo dia de cada mês. Cancele quando quiser.
        </p>
      </div>

      <button
        type="submit"
        disabled={processando || !stripe || !elements}
<<<<<<< HEAD
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#35a989] py-4 font-bold text-white transition hover:brightness-95 disabled:opacity-50"
=======
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] py-4 font-bold text-white transition hover:brightness-95 disabled:opacity-50"
>>>>>>> 786e4627bf6f264c0aa476b88f39103b8d99b8ab
      >
        {processando && <Loader2 className="h-5 w-5 animate-spin" />}
        {processando ? "Processando..." : `Assinar por ${brl(resumo.total)}/mês`}
      </button>

      <p className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <LockKeyhole className="h-4 w-4" />
        Pagamento processado pelo Stripe
      </p>
    </form>
  );
}

export default function FormularioAssinaturaCartao({ resumo }: Props) {
  const options = useMemo(
    () => ({
      mode: "subscription" as const,
      amount: Math.round(resumo.total * 100), // precisa bater com o valor calculado no servidor
      currency: "brl",
      paymentMethodTypes: ["card"],
      locale: "pt-BR" as const,
      appearance: {
        theme: "stripe" as const,
        variables: { colorPrimary: "#35a989", borderRadius: "12px" },
      },
    }),
    [resumo.total]
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <Formulario resumo={resumo} />
    </Elements>
  );
}
