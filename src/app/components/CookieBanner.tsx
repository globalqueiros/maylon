"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("maylon-cookie-consent");

        if (!consent) {
            setVisible(true);
        }


    }, []);

    function acceptCookies() {
        localStorage.setItem("maylon-cookie-consent", "accepted");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[9999] p-3 sm:p-5">
            <div className="mx-auto max-w-4xl">

                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.15)]">

                    {/* Barra verde */}
                    <div className="absolute left-0 top-0 h-full w-1.5 bg-[#3bab88]" />

                    <div className="p-5 sm:p-6 md:p-7">

                        {/* Cabeçalho */}
                        <div className="flex items-start gap-4">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#3bab88]/10">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-6 w-6 text-[#3bab88]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.5 13.5A8.5 8.5 0 1110.5 3.5"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3a9 9 0 009 9"
                                    />
                                    <circle cx="8" cy="10" r="1" fill="currentColor" />
                                    <circle cx="12" cy="7" r="1" fill="currentColor" />
                                    <circle cx="16" cy="12" r="1" fill="currentColor" />
                                    <circle cx="10" cy="16" r="1" fill="currentColor" />
                                </svg>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-base font-bold tracking-tight text-gray-900 sm:text-lg">
                                    Nós usamos cookies 🍪
                                </h2>

                                <p className="mt-1.5 max-w-2xl text-sm leading-6 text-gray-500">
                                    Usamos cookies para melhorar sua experiência, entender como
                                    nosso site é utilizado e tornar a Maylon cada vez melhor.
                                </p>
                            </div>

                        </div>

                        {/* Detalhes */}
                        {showDetails && (
                            <div className="ml-0 mt-5 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600 sm:ml-[60px]">
                                <p>
                                    Alguns cookies são necessários para o funcionamento do site.
                                    Outros nos ajudam a entender o uso da plataforma e melhorar
                                    nossos serviços.
                                </p>

                                <p className="mt-2">
                                    Ao aceitar, você concorda com o uso de cookies conforme nossa
                                    Política de Privacidade.
                                </p>
                            </div>
                        )}

                        {/* Rodapé */}
                        <div className="mt-1 flex flex-col gap-3 sm:ml-[60px] sm:flex-row sm:items-center sm:justify-between">

                            <Link
                                href="/politica_privacidade"
                                className="w-fit text-sm font-semibold text-[#2f8f70] transition hover:text-[#24745b]"
                            >
                                Saiba mais →
                            </Link>


                            <button
                                type="button"
                                onClick={acceptCookies}
                                className="rounded-xl cursor-pointer bg-[#3bab88] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#3bab88]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#319a78] hover:shadow-xl hover:shadow-[#3bab88]/25 active:translate-y-0"
                            >
                                Aceitar cookies
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}