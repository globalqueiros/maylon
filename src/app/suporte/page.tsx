"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
    CheckCircle2,
    ClipboardList,
    MessageCircle,
    Search,
    ShieldAlert,
    X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import NvoipWidget from "../../lib/NvoipWidget";

type StatusConsulta = {
    protocolo?: string;
    tipo?: string;
    status: string;
    mensagem?: string;
    resposta?: string;
    data_criacao?: string;
};

type FormData = {
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    mensagem: string;
    tipo: string;
};

const WHATSAPP =
    "https://wa.me/5511974204958?text=Olá%2C%20sou%20o%20Maylon.%20Estou%20à%20disposição%20para%20ajudar.%20Como%20posso%20atendê-lo%3F";
const OUVIDORIA = "https://groupqueiros.com/brazil/contato";

const initialForm: FormData = {
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
    tipo: "atendimento",
};

function gerarProtocolo() {
    const agora = new Date();

    const data =
        agora.getFullYear() +
        String(agora.getMonth() + 1).padStart(2, "0") +
        String(agora.getDate()).padStart(2, "0");

    const random =
        (crypto.getRandomValues(new Uint32Array(1))[0] % 900000) + 100000;

    return `MAY-${data}${random}`;
}

function formatTelefone(value: string) {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .substring(0, 15);
}

function formatNome(value: string) {
    return value
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatStatus(status: string) {
    const labels: Record<string, string> = {
        pendente: "Pendente",
        em_analise: "Em análise",
        andamento: "Em andamento",
        resolvido: "Resolvido",
        encerrado: "Encerrado",
        concluido: "Concluído",
        concluído: "Concluído",
    };

    return labels[status.toLowerCase()] || status;
}

function formatTipo(tipo?: string) {
    const labels: Record<string, string> = {
        reclamacao: "Reclamação",
        sugestao: "Sugestão",
        elogio: "Elogio",
        financeiro: "Financeiro",
        suporte: "Suporte Técnico",
        atendimento: "Atendimento",
    };

    return tipo ? labels[tipo] || tipo : "-";
}

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [protocolo, setProtocolo] = useState("");
    const [consulta, setConsulta] = useState("");
    const [loadingConsulta, setLoadingConsulta] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [statusConsulta, setStatusConsulta] =
        useState<StatusConsulta | null>(null);

    const [form, setForm] = useState<FormData>(initialForm);

    useEffect(() => {
        setProtocolo(gerarProtocolo());
    }, []);

    const consultarProtocolos = async () => {
        if (!consulta.trim() || loadingConsulta) return;

        setLoadingConsulta(true);
        setStatusConsulta(null);

        try {
            const response = await fetch("/api/consultar-protocolo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    protocolo: consulta.trim(),
                }),
            });

            const data = await response.json();

            if (!data.success || !data.data) {
                setStatusConsulta({ status: "not_found" });
            } else {
                setStatusConsulta({
                    protocolo: data.data.protocolo,
                    tipo: data.data.tipo,
                    status: data.data.status,
                    mensagem: data.data.mensagem,
                    resposta: data.data.resposta,
                    data_criacao: data.data.data_criacao,
                });
            }

            if (window.innerWidth < 1280) {
                setShowModal(true);
            }
        } catch {
            setStatusConsulta({ status: "error" });

            if (window.innerWidth < 1280) {
                setShowModal(true);
            }
        } finally {
            setLoadingConsulta(false);
        }
    };

    const abrirChat = () => {
        const seletores = [
            "#nvoip-widget button",
            "[id*='nvoip'] button",
            "[class*='nvoip'] button",
            "[aria-label*='Nvoip' i]",
            "[title*='Nvoip' i]",
        ];

        for (const seletor of seletores) {
            const elemento = document.querySelector<HTMLElement>(seletor);

            if (elemento) {
                elemento.click();
                return;
            }
        }

        console.warn("Botão do widget Nvoip ainda não foi encontrado.");
    };

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === "nome"
                    ? formatNome(value)
                    : name === "telefone"
                        ? formatTelefone(value)
                        : value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loadingSubmit) return;

        setSuccess("");
        setError("");
        setLoadingSubmit(true);

        try {
            const response = await fetch("/api/protocolo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...form,
                    protocolo,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSuccess(
                    `Solicitação enviada com sucesso. Protocolo: ${protocolo}`
                );

                setForm(initialForm);
                setProtocolo(gerarProtocolo());
            } else {
                setError(
                    data.message || "Não foi possível enviar a solicitação."
                );
            }
        } catch (error) {
            console.error(error);
            setError(
                "Ocorreu um erro ao enviar sua solicitação. Tente novamente."
            );
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <>
            <NvoipWidget />

            {/* HERO */}
            <section id="consulta-protocolo" className="relative overflow-hidden bg-[#f7faf9]">
                <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-emerald-100/40 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-13 lg:px-8 lg:py-12">
                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
                        <div className="max-w-xl">
                            <h1 className="my-0 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl lg:text-4xl">
                                Atendimento que
                                <span className="block text-teal-600">
                                    resolve de verdade.
                                </span>
                            </h1>

                            <p className="my-5 max-w-lg text-base leading-7 text-zinc-600 sm:text-sm text-justify">
                                Suporte, denúncias e acompanhamento de protocolos em um único
                                lugar. Conte com a equipe Maylon sempre que precisar.
                            </p>

                            <div className="mt-0 flex flex-col gap-3 sm:flex-row">
                                <button
                                    onClick={abrirChat}
                                    className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Falar com atendimento
                                </button>

                                <Link
                                    href="#protocolo"
                                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 font-semibold text-zinc-700 transition hover:border-teal-300 hover:text-teal-700"
                                >
                                    Abrir solicitação
                                </Link>
                            </div>

                            <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-500">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                    Atendimento especializado
                                </span>

                                <span className="flex items-center gap-2">
                                    <ShieldAlert className="h-4 w-4 text-teal-600" />
                                    Canal seguro
                                </span>
                            </div>
                        </div>

                        {/* CONSULTA */}
                        <div className="rounded-[32px] border border-white/80 bg-white/80 p-6 shadow-[0_20px_70px_rgba(15,118,110,0.10)] backdrop-blur-xl sm:p-8">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                                    <Search className="h-6 w-6" />
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-zinc-950">
                                        Acompanhar protocolo
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-500">
                                        Consulte o andamento da sua solicitação.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                    Número do protocolo
                                </label>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <input
                                        value={consulta}
                                        onChange={(event) =>
                                            setConsulta(event.target.value.toUpperCase())
                                        }
                                        placeholder="MAY-0000000000000000000"
                                        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                    />

                                    <button
                                        onClick={consultarProtocolos}
                                        disabled={loadingConsulta}
                                        className="h-12 rounded-2xl bg-zinc-950 px-6 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {loadingConsulta ? "Consultando..." : "Consultar"}
                                    </button>
                                </div>
                            </div>

                            {statusConsulta && (
                                <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                        Resultado da consulta
                                    </p>

                                    {statusConsulta.status === "not_found" ? (
                                        <p className="mt-3 font-semibold text-red-600">
                                            Protocolo não encontrado.
                                        </p>
                                    ) : statusConsulta.status === "error" ? (
                                        <p className="mt-3 font-semibold text-red-600">
                                            Erro ao consultar protocolo.
                                        </p>
                                    ) : (
                                        <div className="mt-4 space-y-3">
                                            <div>
                                                <p className="text-xs text-zinc-500">Protocolo</p>
                                                <p className="font-bold text-zinc-900">
                                                    {statusConsulta.protocolo}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500">Status</p>
                                                <span className="mt-1 inline-flex rounded-full bg-teal-100 px-3 py-1 text-sm font-semibold text-teal-700">
                                                    {formatStatus(statusConsulta.status)}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-xs text-zinc-500">Assunto</p>
                                                <p className="font-semibold text-zinc-900">
                                                    {formatTipo(statusConsulta.tipo)}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ATENDIMENTO */}
            <section className="relative z-10 bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 max-w-2xl">
                        <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Canais de atendimento
                        </span>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                            Estamos prontos para ajudar
                        </h2>

                        <p className="mt-4 text-base leading-7 text-zinc-600">
                            Escolha o canal mais adequado para tirar dúvidas, acompanhar
                            solicitações ou falar diretamente com a equipe Maylon.
                        </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {/* Atendimento via WhatsApp */}
                        <article className="flex h-full flex-col rounded-[26px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <FaWhatsapp className="h-5 w-5" />
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold tracking-tight text-zinc-950">
                                Atendimento via WhatsApp
                            </h3>

                            <p className="mt-3 flex-1 text-sm leading-6 text-justify text-zinc-600">
                                Nossa equipe está pronta para oferecer suporte com agilidade,
                                segurança e atenção.
                            </p>

                            <Link
                                href={WHATSAPP}
                                rel="noopener noreferrer"
                                className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-bold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                            >
                                <FaWhatsapp className="h-5 w-5 mr-2" /> Acessar WhatsApp
                            </Link>
                        </article>

                        {/* Chat Online */}
                        <article className="flex h-full flex-col rounded-[26px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                                <MessageCircle className="h-5 w-5" />
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold tracking-tight text-zinc-950">
                                Chat Online
                            </h3>

                            <p className="mt-3 flex-1 text-justify text-sm leading-6 text-zinc-600">
                                Tenha uma experiência de atendimento próxima, rápida e personalizada
                                com a equipe Maylon.
                            </p>

                            <button
                                type="button"
                                onClick={abrirChat}
                                className="mt-7 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-bold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-100"
                            >
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Abrir Chat
                            </button>
                        </article>

                        {/* Consulta de protocolo */}
                        <article className="flex h-full flex-col rounded-[26px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                <ClipboardList className="h-5 w-5" />
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold tracking-tight text-zinc-950">
                                Consultar Protocolo
                            </h3>

                            <p className="mt-3 flex-1 text-sm leading-6 text-justify text-zinc-600">
                                Acompanhe de forma rápida e transparente o status da sua solicitação.
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    document
                                        .getElementById("consulta-protocolo")
                                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className="mt-7 cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                <ClipboardList className="h-5 w-5 mr-2" /> Consultar protocolo
                            </button>
                        </article>

                        {/* Ouvidoria */}
                        <article className="flex h-full flex-col rounded-[26px] border border-zinc-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:p-7">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                                <ShieldAlert className="h-5 w-5" />
                            </div>

                            <h3 className="mt-6 text-xl font-extrabold tracking-tight text-zinc-950">
                                Ouvidoria
                            </h3>

                            <p className="mt-3 flex-1 text-sm leading-6 text-justify text-zinc-600">
                                Estamos disponíveis para receber sua manifestação com atenção,
                                transparência e respeito.
                            </p>

                            <Link
                                href={OUVIDORIA}
                                className="mt-7 cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-xl bg-amber-500 px-4 text-sm font-bold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-100"
                            >
                                <ShieldAlert className="h-5 w-5 mr-2" /> Falar com a Ouvidoria
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            {/* DENÚNCIA */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="rounded-[32px] border border-red-100 bg-[#fffafa] p-6 sm:p-8 lg:p-10">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                                    <ShieldAlert className="h-7 w-7" />
                                </div>

                                <div className="max-w-2xl">
                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                                        Segurança da viagem
                                    </span>

                                    <h2 className="my-2 text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
                                        Denúncia durante a viagem
                                    </h2>

                                    <p className="mt-0 text-sm leading-6 text-zinc-600 sm:text-sm">
                                        Caso ocorra qualquer situação durante a viagem, utilize
                                        este canal para registrar a ocorrência com segurança,
                                        confidencialidade e prioridade no atendimento da equipe
                                        Maylon.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <span className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600">
                                            Atendimento prioritário
                                        </span>

                                        <span className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600">
                                            Canal confidencial
                                        </span>

                                        <span className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-600">
                                            Suporte 24 horas
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-3 lg:w-auto lg:min-w-[250px]">
                                <Link
                                    href="/denuncias"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700"
                                >
                                    Fazer denúncia
                                </Link>

                                <Link
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 font-semibold text-zinc-700 transition hover:border-red-200 hover:text-red-600"
                                >
                                    Falar com atendimento
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROTOCOLO */}
            <section id="protocolo" className="bg-[#f7faf9] px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 max-w-2xl">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                            Central de protocolos
                        </span>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                            Registre sua solicitação
                        </h2>

                        <p className="mt-2 text-base leading-7 text-zinc-600">
                            Registre solicitações, reclamações, sugestões ou elogios e
                            acompanhe o atendimento através do seu protocolo.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.5fr]">
                        {/* PAINEL */}
                        <div className="space-y-4">
                            <div className="rounded-[28px] bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 p-6 text-white shadow-[0_18px_45px_rgba(13,148,136,0.22)] sm:p-8">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-teal-100 ring-1 ring-white/15">
                                    <ClipboardList className="h-7 w-7" />
                                </div>

                                <h3 className="mt-3 text-2xl font-black tracking-tight">
                                    Seu protocolo
                                </h3>

                                <p className="my-2 max-w-sm text-sm leading-6 text-teal-50/85">
                                    Guarde este número para acompanhar o andamento da sua solicitação.
                                </p>

                                <div className="mt-3 rounded-2xl border border-white/15 bg-black/10 p-5 backdrop-blur-sm">
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-100/80">
                                        Número atual
                                    </p>

                                    <p className="mt-2 break-all text-xl font-black tracking-wide text-white">
                                        {protocolo || "Gerando protocolo..."}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                                <h4 className="font-bold text-zinc-950">
                                    Atendimento rápido
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-zinc-600">
                                    Nossa equipe analisa sua solicitação com atenção e
                                    prioridade.
                                </p>
                            </div>

                            <div className="rounded-[24px] border border-zinc-200 bg-white p-6">
                                <h4 className="font-bold text-zinc-950">
                                    Acompanhamento completo
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-zinc-600">
                                    Consulte o andamento através do protocolo gerado.
                                </p>
                            </div>
                        </div>

                        {/* FORMULÁRIO */}
                        <div className="rounded-[32px] border border-zinc-200/80 bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
                            <div className="mb-8">
                                <h3 className="text-2xl font-black text-zinc-950 sm:text-3xl">
                                    Abrir solicitação
                                </h3>

                                <p className="mt-2 text-sm text-zinc-500">
                                    Preencha os dados abaixo para registrar seu atendimento.
                                </p>
                            </div>

                            {success && (
                                <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                                    <span>
                                        {success}
                                    </span>
                                </div>
                            )}

                            {error && (
                                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            Nome completo
                                        </label>

                                        <input
                                            type="text"
                                            name="nome"
                                            value={form.nome}
                                            onChange={handleChange}
                                            required
                                            placeholder="Nome completo"
                                            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            E-mail
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Seu e-mail"
                                            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            Telefone
                                        </label>

                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={form.telefone}
                                            onChange={handleChange}
                                            required
                                            placeholder="(00) 00000-0000"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            Assunto
                                        </label>

                                        <select
                                            name="assunto"
                                            value={form.assunto}
                                            onChange={handleChange}
                                            required
                                            className="h-12 w-full cursor-pointer rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                        >
                                            <option value="" disabled>
                                                Selecione o assunto
                                            </option>
                                            <option value="reclamacao">Reclamação</option>
                                            <option value="sugestao">Sugestão</option>
                                            <option value="elogio">Elogio</option>
                                            <option value="financeiro">Financeiro</option>
                                            <option value="suporte">Suporte Técnico</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Mensagem
                                    </label>

                                    <textarea
                                        name="mensagem"
                                        value={form.mensagem}
                                        onChange={handleChange}
                                        required
                                        rows={7}
                                        placeholder="Descreva sua solicitação..."
                                        className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 py-4 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loadingSubmit}
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-teal-600 py-4 font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loadingSubmit ? "Enviando..." : "Enviar solicitação"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* OUVIDORIA */}
            <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col gap-6 rounded-[32px] border border-teal-100 bg-teal-50/40 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
                        <div className="flex items-center gap-5">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
                                <ShieldAlert className="h-7 w-7" />
                            </div>

                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                                    Canal de transparência
                                </span>

                                <h2 className="mt-2 text-2xl font-black text-zinc-950">
                                    Ouvidoria
                                </h2>

                                <p className="mt-1 text-sm text-zinc-600">
                                    Canal imparcial para denúncias, sugestões e transparência.
                                </p>
                            </div>
                        </div>

                        <Link
                            href={OUVIDORIA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-2xl bg-teal-600 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-700"
                        >
                            Acessar Ouvidoria
                        </Link>
                    </div>
                </div>
            </section>

            {/* MODAL MOBILE */}
            {showModal && statusConsulta && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm xl:hidden">
                    <div className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl">
                        <div className="flex items-center justify-between bg-zinc-950 p-6 text-white">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    Consulta
                                </p>

                                <h3 className="mt-1 text-2xl font-black">
                                    Protocolo
                                </h3>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                aria-label="Fechar consulta"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-zinc-300 transition hover:bg-white/20 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            {statusConsulta.status === "not_found" ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                                    <p className="font-bold text-red-600">
                                        Protocolo não encontrado.
                                    </p>
                                </div>
                            ) : statusConsulta.status === "error" ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                                    <p className="font-bold text-red-600">
                                        Erro ao consultar protocolo.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 flex justify-center">
                                        <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-bold text-teal-700">
                                            {formatStatus(statusConsulta.status)}
                                        </span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                                                Número do protocolo
                                            </p>

                                            <p className="mt-1 break-all text-base font-black text-zinc-900">
                                                {statusConsulta.protocolo}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                                <p className="text-xs uppercase text-zinc-500">
                                                    Assunto
                                                </p>

                                                <p className="mt-1 font-semibold text-zinc-900">
                                                    {formatTipo(statusConsulta.tipo)}
                                                </p>
                                            </div>

                                            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                                <p className="text-xs uppercase text-zinc-500">
                                                    Data
                                                </p>

                                                <p className="mt-1 font-semibold text-zinc-900">
                                                    {statusConsulta.data_criacao
                                                        ? new Date(
                                                            statusConsulta.data_criacao
                                                        ).toLocaleDateString("pt-BR")
                                                        : "-"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                                                Resposta da equipe
                                            </p>

                                            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
                                                {statusConsulta.resposta?.trim()
                                                    ? statusConsulta.resposta
                                                    : "Sua solicitação foi recebida e ainda está em análise."}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )}

                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-6 w-full rounded-2xl bg-zinc-950 py-4 font-bold text-white transition hover:bg-zinc-800"
                            >
                                Fechar consulta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}