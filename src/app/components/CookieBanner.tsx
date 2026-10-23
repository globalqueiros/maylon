"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

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

    function rejectCookies() {
        localStorage.setItem("maylon-cookie-consent", "rejected");
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[9999] px-3 pb-3 sm:px-5 sm:pb-5">
            <div className="mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
                    <div className="h-1 bg-[#35a989]" />
                    <div className="p-4 sm:p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#35a989]/10 sm:flex">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="h-5 w-5 text-[#35a989]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3a9 9 0 1 0 9 9"
                                    />

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3a9 9 0 0 1 9 9"
                                    />

                                    <circle
                                        cx="8"
                                        cy="10"
                                        r="1"
                                        fill="currentColor"
                                    />

                                    <circle
                                        cx="12"
                                        cy="7"
                                        r="1"
                                        fill="currentColor"
                                    />

                                    <circle
                                        cx="16"
                                        cy="12"
                                        r="1"
                                        fill="currentColor"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-sm font-bold text-gray-900 sm:text-base">
                                    Cookies e privacidade
                                </h2>
                                <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                                    A Maylon usa cookies para melhorar sua experiência,
                                    manter a plataforma segura e entender como nossos
                                    serviços são utilizados.
                                </p>
                                <Link
                                    href="/politica_privacidade"
                                    className="mt-1.5 inline-block text-xs font-semibold text-[#2f8f70] hover:underline"
                                >
                                    Saiba mais
                                </Link>
                            </div>
                            <div className="flex w-full shrink-0 flex-row gap-2 sm:w-auto sm:min-w-[290px]">
                                <button
                                    type="button"
                                    onClick={rejectCookies}
                                    className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
                                >
                                    Recusar
                                </button>
                                <button
                                    type="button"
                                    onClick={acceptCookies}
                                    className="flex-1 cursor-pointer rounded-xl bg-[#35a989] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2f987a] active:scale-[0.98]"
                                >
                                    Aceitar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}