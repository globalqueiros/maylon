
"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    Headset,
    RefreshCw,
    ShieldCheck,
} from "lucide-react";

function ErroCheckoutContent() {
    const searchParams = useSearchParams();
    const tipo = searchParams.get("tipo");

    const mensagem =
        tipo === "assinatura"
            ? "Não foi possível concluir sua assinatura neste momento."
            : "Ocorreu um problema ao processar sua solicitação.";

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7] px-4 py-10">
            <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <div className="flex justify-center border-b border-slate-100 bg-slate-50 px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#35a989] text-lg font-black text-white">
                            M
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-slate-900">
                                MAYLON <span className="text-[#35a989]">PASS</span>
                            </h1>
                            <p className="text-xs text-slate-500">
                                Central de assinaturas
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-9 text-center sm:px-10 sm:py-12">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <AlertTriangle size={38} strokeWidth={1.8} />
                    </div>

                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-red-600">
                        Não foi possível finalizar
                    </p>

                    <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                        Ops! Algo deu errado.
                    </h2>

                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500">
                        {mensagem} Seus dados precisam ser verificados
                        novamente antes de tentar outra vez.
                    </p>

                    <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-left">
                        <p className="text-sm font-bold text-amber-900">
                            O que você pode fazer?
                        </p>
                        <p className="mt-1 text-sm leading-6 text-amber-800">
                            Tente novamente em alguns instantes. Se o problema
                            continuar, entre em contato com o suporte da MAYLON.
                        </p>
                    </div>

                    <div className="mt-7 flex flex-col gap-3">
                        <Link
                            href="/checkout/cartao"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#16866c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#116b57]"
                        >
                            <RefreshCw size={17} />
                            Tentar novamente
                        </Link>

                        <Link
                            href="/maylon_pass"
                            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            <ArrowLeft size={17} />
                            Voltar aos planos
                        </Link>

                        <a
                            href="https://maylon.com.br"
                            className="mt-2 inline-flex items-center justify-center gap-2 text-sm font-semibold text-[#16866c] hover:underline"
                        >
                            <Headset size={17} />
                            Acessar MAYLON
                        </a>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                        <ShieldCheck size={15} className="text-[#35a989]" />
                        MAYLON · Atendimento e suporte
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function CheckoutErroPage() {
    return (
        <Suspense
            fallback={
                <main className="flex min-h-screen items-center justify-center bg-[#f4f8f7]">
                    Carregando...
                </main>
            }
        >
            <ErroCheckoutContent />
        </Suspense>
    );
}
