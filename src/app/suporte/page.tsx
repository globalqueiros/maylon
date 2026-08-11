"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Phone,
    ClipboardList,
    ShieldAlert,
    MessageCircle,
    Search,
    CheckCircle2,
    Clock3,
    MessageSquare,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import HuggyChat from "../../lib/huggychat";

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [tab, setTab] = useState("atendimento");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [protocolo, setProtocolo] = useState("");
    const [consulta, setConsulta] = useState("");
    const [statusConsulta, setStatusConsulta] = useState<{
        protocolo?: string;
        tipo?: string;
        status: string;
        mensagem?: string;
        resposta?: string;
        data_criacao?: string;
    } | null>(null);
    const [form, setForm] = useState({
        nome: "",
        email: "",
        telefone: "",
        assunto: "",
        mensagem: "",
        tipo: "atendimento",
    });

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

    useEffect(() => {
        setProtocolo(gerarProtocolo());
    }, []);

    const consultarProtocolos = async () => {
        if (!consulta.trim()) return;

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
        }
    };

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

    function handleChange(
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "nome"
                    ? formatNome(value)
                    : name === "telefone"
                        ? formatTelefone(value)
                        : value,
        });
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setSuccess("");
        setError("");

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

                setForm({
                    nome: "",
                    email: "",
                    telefone: "",
                    assunto: "",
                    mensagem: "",
                    tipo: "atendimento",
                });

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
        }
    };

    return (
        <>
            <HuggyChat />
            <section className="relative overflow-hidden bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#14b8a6] text-white">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:mb-7 lg:px-8 py-8 sm:py-10 md:py-13 lg:py-24 xl:py-28 2xl:py-32">
                    <div className="grid items-center gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm font-medium backdrop-blur-xl">
                                <span className="!text-white">
                                    Central oficial de atendimento
                                </span>
                            </span>
                            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-black leading-tight text-white">
                                Central de Atendimento
                                <span className="block sm:inline sm:pl-2 text-teal-300">
                                    Maylon
                                </span>
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm sm:text-sm md:text-base lg:text-sm leading-relaxed text-white/85 text-justify">
                                Atendimento, denúncias, suporte e acompanhamento de protocolos em um único lugar.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                <button
                                    onClick={() => {
                                        (window as any).Huggy?.openBox?.();
                                    }}
                                    className="w-full sm:w-auto rounded-3xl bg-white px-6 py-3 font-bold text-teal-700 shadow-lg transition-all hover:-translate-y-1 cursor-pointer"
                                >
                                    Chat Online
                                </button>
                                <Link
                                    href="#protocolo"
                                    className="w-full sm:w-auto text-center rounded-3xl border border-white/30 bg-white/10 px-6 py-3 font-bold backdrop-blur-xl transition-all hover:bg-white/20 text-white cursor-pointer"
                                >
                                    Abrir Protocolo
                                </Link>
                            </div>
                        </div>
                        <div className="rounded-[32px] border border-white/20 bg-white/10 p-5 sm:p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white/20">
                                    <Search size={24} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-black text-white">
                                        Acompanhar Protocolo
                                    </h2>
                                    <p className="text-xs sm:text-sm text-white/75">
                                        Consulte o andamento da sua solicitação.
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <input
                                    value={consulta}
                                    onChange={(e) =>
                                        setConsulta(e.target.value.toUpperCase())
                                    }
                                    placeholder="MAY-0000000000000000000"
                                    className="h-14 p-3.5 sm:p-3.5 md:p-3.5 ld:p-3.5 xl:p-3.5 2xl:p-3.5 w-full flex-1 rounded-2xl border border-white/20 bg-white/10 px-5 text-white outline-none placeholder:text-white/50 focus:border-white/40"
                                />
                                <button
                                    onClick={consultarProtocolos}
                                    className="h-14 w-full sm:w-auto rounded-2xl bg-white px-6 font-bold text-teal-700 transition-all hover:scale-[1.02] cursor-pointer"
                                >
                                    Consultar
                                </button>
                            </div>
                            {statusConsulta && (
                                <div className="hidden xl:block mt-6 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                                    {statusConsulta.status === "not_found" ? (
                                        <div className="text-center text-white">
                                            Protocolo não encontrado.
                                        </div>
                                    ) : statusConsulta.status === "error" ? (
                                        <div className="text-center text-white">
                                            Erro ao consultar protocolo.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-white/70">
                                                    Número do Protocolo
                                                </p>
                                                <p className="font-semibold text-white">
                                                    {statusConsulta.protocolo}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/70">
                                                    Assunto
                                                </p>
                                                <p className="font-semibold text-white">
                                                    {statusConsulta.tipo || "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/70">
                                                    Status
                                                </p>
                                                <p className="font-semibold text-white">
                                                    {statusConsulta.status}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/70">
                                                    Data
                                                </p>
                                                <p className="font-semibold text-white">
                                                    {statusConsulta.data_criacao
                                                        ? new Date(
                                                            statusConsulta.data_criacao
                                                        ).toLocaleDateString("pt-BR")
                                                        : "-"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-white/70">
                                                    Resposta
                                                </p>
                                                <p className="font-semibold text-white">
                                                    {statusConsulta.resposta?.trim()
                                                        ? statusConsulta.resposta
                                                        : "Ainda não tem resposta"}
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
            <section className="relative z-10 mx-auto -mt-3 sm:-mt-12 -md:mt-0 lg:-mt-14 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        {
                            icon: FaWhatsapp,
                            title: "Atendimento",
                            desc: "Suporte especializado para motoristas e passageiros.",
                            link: "https://wa.me/5511974204958",
                        },
                        {
                            icon: MessageCircle,
                            title: "Chat Online",
                            desc: "Fale diretamente com nossa equipe em tempo real.",
                            button: true,
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="rounded-[32px] border border-zinc-200 bg-white p-5 sm:p-6 md:p-8 shadow-[0_15px_60px_rgba(0,0,0,0.08)] transition-all hover:-translate-y-2"
                        >
                            <div className="mb-6 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-teal-100">
                                <item.icon
                                    size={28}
                                    className="text-teal-700"
                                />
                            </div>
                            <h2 className="text-xl sm:text-xl md:text-2xl font-black text-zinc-900">
                                {item.title}
                            </h2>
                            <p className="mt-3 text-sm sm:text-sm md:text-sm leading-relaxed text-zinc-600 text-justify">
                                {item.desc}
                            </p>
                            {item.link && (
                                <Link
                                    href={item.link}
                                    target="_blank"
                                    className="mt-6 inline-flex items-center justify-center rounded-2xl bg-teal-500 w-full py-4 text-sm sm:text-base font-bold text-white shadow-lg transition-all hover:bg-teal-600 hover:shadow-2xl"
                                >
                                    Acessar Whatsapp
                                </Link>
                            )}
                            {item.button && (
                                <button
                                    onClick={() => {
                                        (window as any).Huggy?.openBox?.();
                                    }}
                                    className="mt-6 w-full rounded-2xl bg-teal-500 py-4 text-sm sm:text-base font-bold text-white transition-all hover:bg-teal-600"
                                >
                                    Abrir Chat
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <section className="relative overflow-hidden bg-white py-12 sm:py-10 md:py-10 lg:py-12 xl:py-14 2xl:py-13">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    <div className="rounded-3xl sm:rounded-[40px] border border-red-100 bg-white/90 p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-xl">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
                            <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
                                <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl sm:rounded-[32px] bg-gradient-to-br from-red-500 via-red-600 to-red-700 shadow-[0_20px_50px_rgba(239,68,68,0.35)]">
                                    <ShieldAlert
                                        size={24}
                                        className="text-white sm:hidden"
                                    />
                                    <ShieldAlert
                                        size={32}
                                        className="hidden text-white sm:block md:hidden"
                                    />
                                    <ShieldAlert
                                        size={42}
                                        className="hidden text-white md:block"
                                    />
                                </div>
                                <div className="max-w-4xl">
                                    <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm md:text-xs font-bold uppercase tracking-wider text-red-600">
                                        Segurança da Viagem
                                    </span>
                                    <h2 className="mt-4 sm:mt-5 text-xl sm:text-xl md:text-3xl lg:text-2xl xl:text-4xl 2xl:text-3xl font-black tracking-tight text-zinc-900">
                                        Denúncia Durante a Viagem
                                    </h2>
                                    <p className="mt-3 sm:mt-4 text-sm sm:text-sm md:text-base lg:text-sm xl:text-base 2xl:text-base leading-6 sm:leading-7 md:leading-7 text-zinc-600 text-justify">
                                        Caso ocorra qualquer situação durante a viagem,
                                        utilize este canal imediatamente para registrar
                                        a ocorrência com total segurança,
                                        confidencialidade e prioridade no atendimento
                                        da equipe Maylon.
                                    </p>
                                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold text-zinc-700">
                                            Atendimento Prioritário
                                        </div>
                                        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold text-zinc-700">
                                            Canal Confidencial
                                        </div>
                                        <div className="rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm md:text-xs lg:text-sm font-semibold text-zinc-700">
                                            Suporte 24 Horas
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[280px] xl:min-w-[320px]">
                                <Link
                                    href="denuncias"
                                    target="_blank"
                                    className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500 to-red-700 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1"
                                >
                                    Fazer Denúncia
                                </Link>
                                <Link
                                    href="https://wa.me/5511974204958"
                                    target="_blank"
                                    className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-zinc-200 bg-white px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-bold text-zinc-700 transition-all hover:bg-zinc-50"
                                >
                                    Falar com Atendimento
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gradient-to-b from-slate-50 to-white py-1 sm:py-5 md:py-4 lg:py-0 xl:py-8 xl:pb-0 2xl:py-12 2xl:pb-0">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    <div className="mb-8 sm:mb-10 md:mb-7 lg:mb-6 xl:mb-8 text-center">
                        <h2 className="text-3xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-4xl lg:text-4xl font-black text-zinc-900">
                            Central de Protocolos
                        </h2>
                        <p className="mx-auto mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base md:text-base lg:text-base xl:text-sm 2xl:text-base text-zinc-600">
                            Registre solicitações, reclamações, sugestões ou elogios e
                            acompanhe o atendimento através do seu protocolo.
                        </p>
                    </div>
                    <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-teal-600 to-teal-800 p-5 sm:p-6 md:p-8 text-white shadow-xl">
                                <ClipboardList
                                    size={28}
                                    className="sm:hidden"
                                />
                                <ClipboardList
                                    size={36}
                                    className="hidden sm:block md:hidden"
                                />
                                <ClipboardList
                                    size={40}
                                    className="hidden md:block"
                                />

                                <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-bold">
                                    Seu Protocolo
                                </h3>

                                <div className="mt-5 sm:mt-6 rounded-2xl bg-white/10 p-4 sm:p-5 backdrop-blur">
                                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/80">
                                        Número Atual
                                    </p>

                                    <p className="mt-2 break-all text-lg sm:text-xl font-black">
                                        {protocolo || "Gerando protocolo..."}
                                    </p>

                                    <small className="mt-3 block text-xs sm:text-sm text-white/80">
                                        Guarde este número para acompanhar sua solicitação.
                                    </small>
                                </div>
                            </div>
                            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm">
                                <h4 className="font-bold text-zinc-900">
                                    Atendimento Rápido
                                </h4>

                                <p className="mt-2 text-sm text-zinc-600">
                                    Nossa equipe analisa sua solicitação com prioridade.
                                </p>
                            </div>
                            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm">
                                <h4 className="font-bold text-zinc-900">
                                    Acompanhamento Completo
                                </h4>

                                <p className="mt-2 text-sm text-zinc-600">
                                    Consulte o andamento através do protocolo gerado.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-2 rounded-3xl sm:rounded-[40px] border border-zinc-200 bg-white p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl">
                            <form onSubmit={handleSubmit}>
                                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900">
                                    Abrir Solicitação
                                </h3>
                                <p className="my-2 text-sm sm:text-sm text-zinc-500">
                                    Preencha os dados abaixo para registrar seu atendimento.
                                </p>
                                <div className="my-4 sm:my-4 md:my-4 lg:my-4">
                                    {success && (
                                        <div className="my-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-700">
                                            <CheckCircle2 size={20} />
                                            <span>
                                                {success} Protocolo:{" "}
                                                <strong className="font-black">
                                                    {protocolo}
                                                </strong>
                                            </span>
                                        </div>
                                    )}
                                    {error && (
                                        <div className="my-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-0 sm:mt-0 grid gap-4 sm:gap-6 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm sm:text-base font-semibold text-zinc-700">
                                            Nome completo
                                        </label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={form.nome}
                                            onChange={handleChange}
                                            className="h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 text-sm outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-100" placeholder="Nome completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm sm:text-base font-semibold text-zinc-700">
                                            E-mail
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Seu e-mail"
                                            className="h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 text-sm outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm sm:text-base font-semibold text-zinc-700">
                                            Telefone
                                        </label>
                                        <input
                                            type="tel"
                                            name="telefone"
                                            value={form.telefone}
                                            onChange={handleChange}
                                            placeholder="(00) 00000-0000"
                                            inputMode="numeric"
                                            autoComplete="tel"
                                            className="h-12 sm:h-14 w-full rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 text-sm outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm sm:text-base font-semibold text-zinc-700">
                                            Assunto
                                        </label>
                                        <select
                                            name="assunto"
                                            value={form.assunto}
                                            onChange={handleChange}
                                            className="cursor-pointerh-12 sm:h-14 w-full rounded-xl sm:rounded-2xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 text-sm outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
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
                                <div className="mt-4 sm:mt-6">
                                    <label className="mb-2 block text-sm sm:text-base font-semibold text-zinc-700">
                                        Mensagem
                                    </label>
                                    <textarea
                                        name="mensagem"
                                        value={form.mensagem}
                                        onChange={handleChange}
                                        rows={7}
                                        placeholder="Descreva sua solicitação..."
                                        className="w-full rounded-2xl sm:rounded-3xl border border-zinc-200 bg-zinc-50 px-4 sm:px-5 py-4 sm:py-5 text-sm outline-none transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="cursor-pointer mt-6 sm:mt-8 w-full rounded-2xl sm:rounded-3xl bg-gradient-to-r from-teal-500 to-teal-700 py-4 sm:py-5 text-base sm:text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                                >
                                    Enviar Solicitação
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-8 sm:py-8 md:py-10 lg:py-8 xl:py-14 2xl:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                    <div className="rounded-3xl sm:rounded-[40px] border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-teal-100/40 p-5 sm:p-6 md:p-8 lg:p-10 shadow-xl">
                        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                                <div className="flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl sm:rounded-[28px] bg-gradient-to-br from-teal-400 to-teal-600 shadow-lg">
                                    <ShieldAlert
                                        className="text-white"
                                        size={28}
                                    />
                                </div>
                                <div className="max-w-2xl">
                                    <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black text-zinc-900">
                                        Ouvidoria
                                    </h2>
                                    <p className="mt-1 text-sm sm:text-base md:text-base lg:text-sm leading-6 sm:leading-7 text-zinc-600">
                                        Canal imparcial para denúncias,
                                        sugestões e transparência.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="https://groupqueiros.com/brazil/contato"
                                target="_blank"
                                className="
                                    inline-flex
                                    w-full sm:w-auto
                                    items-center
                                    justify-center
                                    rounded-xl sm:rounded-2xl
                                    bg-gradient-to-r
                                    from-teal-500
                                    to-teal-700
                                    px-6 sm:px-8 md:px-10
                                    py-3 sm:py-4
                                    text-base sm:text-lg
                                    font-bold
                                    text-white
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    hover:shadow-2xl
                                "
                            >
                                Acessar Ouvidoria
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {showModal && statusConsulta && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 xl:hidden">
                    <div className="w-full max-w-md overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-6 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-widest text-white/70">
                                        Consulta
                                    </p>
                                    <h3 className="mt-1 text-2xl font-black">
                                        Protocolo
                                    </h3>
                                </div>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl font-bold text-white transition hover:bg-white/30"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            {statusConsulta.status === "not_found" ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                                    <p className="font-bold text-red-600">
                                        Protocolo não encontrado
                                    </p>
                                </div>
                            ) : statusConsulta.status === "error" ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
                                    <p className="font-bold text-red-600">
                                        Erro ao consultar protocolo
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-6 flex justify-center">
                                        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">
                                            {statusConsulta.status}
                                        </span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                                            <p className="text-xs uppercase tracking-wide text-zinc-500">
                                                Número do Protocolo
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
                                                    {statusConsulta.tipo || "-"}
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
                                                Resposta da Equipe
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
                                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl"
                            >
                                Fechar Consulta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}