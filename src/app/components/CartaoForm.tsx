"use client";

import { FormEvent, useState } from "react";
import {
    CardElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { CreditCard, Loader2, LockKeyhole } from "lucide-react";

type CartaoFormProps = {
    onSuccess?: () => void;
};

export default function CartaoForm({ onSuccess }: CartaoFormProps) {
    const stripe = useStripe();
    const elements = useElements();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setErro("");
        setSucesso("");

        if (!stripe || !elements) {
            setErro("O Stripe ainda está carregando. Tente novamente.");
            return;
        }

        if (!nome.trim()) {
            setErro("Digite seu nome.");
            return;
        }

        if (!email.trim()) {
            setErro("Digite seu e-mail.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setErro("Campo do cartão não carregado.");
            return;
        }

        setLoading(true);

        try {
            /*
             * 1. Cria o PaymentMethod no Stripe.
             *
             * Os dados do cartão não passam pelo seu servidor.
             */
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                    name: nome,
                    email,
                },
            });

            if (error) {
                setErro(error.message || "Não foi possível validar o cartão.");
                return;
            }

            if (!paymentMethod) {
                setErro("Não foi possível criar o método de pagamento.");
                return;
            }

            /*
             * 2. Envia apenas o ID do PaymentMethod para seu backend.
             *
             * O backend deverá criar a assinatura no Stripe.
             */
            const response = await fetch("/api/stripe/create-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    name: nome,
                    email,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error || "Não foi possível criar sua assinatura."
                );
            }

            /*
             * Caso o backend retorne um clientSecret para
             * autenticação 3D Secure, tratamos aqui.
             */
            if (data.clientSecret) {
                const { error: confirmError } =
                    await stripe.confirmCardPayment(data.clientSecret);

                if (confirmError) {
                    throw new Error(
                        confirmError.message || "Não foi possível confirmar o pagamento."
                    );
                }
            }

            setSucesso("Assinatura realizada com sucesso!");

            cardElement.clear();

            onSuccess?.();
        } catch (error) {
            setErro(
                error instanceof Error
                    ? error.message
                    : "Ocorreu um erro ao processar o pagamento."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Nome */}
            <div>
                <label
                    htmlFor="nome"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                    Nome completo
                </label>

                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite seu nome"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#35a989] focus:ring-2 focus:ring-[#35a989]/20 disabled:bg-slate-50"
                />
            </div>

            {/* E-mail */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                    E-mail
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#35a989] focus:ring-2 focus:ring-[#35a989]/20 disabled:bg-slate-50"
                />
            </div>

            {/* Cartão */}
            <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                    Cartão de crédito
                </label>

                <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 transition focus-within:border-[#35a989] focus-within:ring-2 focus-within:ring-[#35a989]/20">
                    <CardElement
                        options={{
                            hidePostalCode: false,
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#0f172a",
                                    fontFamily:
                                        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                                    "::placeholder": {
                                        color: "#94a3b8",
                                    },
                                },
                                invalid: {
                                    color: "#dc2626",
                                    iconColor: "#dc2626",
                                },
                            },
                        }}
                    />
                </div>
            </div>

            {/* Erro */}
            {erro && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {erro}
                </div>
            )}

            {/* Sucesso */}
            {sucesso && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
                    {sucesso}
                </div>
            )}

            {/* Botão */}
            <button
                type="submit"
                disabled={!stripe || !elements || loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#35a989] px-7 py-4 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processando pagamento...
                    </>
                ) : (
                    <>
                        <CreditCard className="h-5 w-5" />
                        Assinar por R$ 59,90/mês
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-400">
                <LockKeyhole className="h-3.5 w-3.5" />
                Pagamento processado com segurança pelo Stripe
            </div>
        </form>
    );
}
