"use client";

import Image from "next/image";
import {
    ShieldCheck,
    MapPinned,
    PhoneCall,
    BadgeCheck,
    CarTaxiFront,
    Clock3,
    ArrowUpRight,
} from "lucide-react";

const itens = [
    {
        icon: ShieldCheck,
        titulo: "Motoristas verificados",
        descricao:
            "Todos os motoristas parceiros passam por análise documental e validação de cadastro.",
    },
    {
        icon: MapPinned,
        titulo: "Monitoramento em tempo real",
        descricao:
            "Acompanhe sua viagem com rastreamento em tempo real durante todo o trajeto.",
    },
    {
        icon: PhoneCall,
        titulo: "Suporte rápido",
        descricao:
            "Nossa equipe está pronta para ajudar você em qualquer situação durante a corrida.",
    },
    {
        icon: BadgeCheck,
        titulo: "Viagens mais seguras",
        descricao:
            "Tecnologia e processos que aumentam a segurança de passageiros e motoristas.",
    },
    {
        icon: CarTaxiFront,
        titulo: "Motoristas identificados",
        descricao:
            "Confira nome, veículo e informações do motorista antes da corrida começar.",
    },
    {
        icon: Clock3,
        titulo: "Atendimento 24 horas",
        descricao:
            "Suporte disponível para garantir tranquilidade em qualquer horário.",
    },
];

export default function SegurancaPage() {
    return (
        <main className="overflow-hidden">
            {/* HERO */}
            <section className="relative isolate min-h-[680px] overflow-hidden bg-slate-950 lg:min-h-[720px]">
                {/* Background */}
                <div className="absolute inset-0 -z-20">
                    <Image
                        src="/centralmonitoramento.png"
                        alt="Central de Monitoramento Maylon"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20" />

                {/* Decorative lights */}
                <div className="absolute -left-32 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-emerald-500/10 blur-[120px]" />
                <div className="absolute right-0 top-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-400/10 blur-[140px]" />

                <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-0 sm:px-8 lg:min-h-[720px] lg:px-8 lg:py-0">
                    <div className="grid w-full items-center lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-4">
                        {/* Content */}
                        <div className="relative z-10 max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                                Segurança em primeiro lugar
                            </div>

                            <h1 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4.3rem]">
                                Sua viagem,
                                <span className="block text-emerald-400">
                                    mais segura.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                                Na Maylon, segurança não é detalhe. Investimos em
                                tecnologia, monitoramento em tempo real e processos
                                inteligentes para proporcionar mais tranquilidade a
                                passageiros e motoristas parceiros.
                            </p>

                            {/* Stats */}
                            <div className="mt-9 grid max-w-xl grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                                <div className="border-r border-white/10 p-4 sm:p-5">
                                    <span className="block text-xl font-black text-white sm:text-2xl">
                                        24h
                                    </span>
                                    <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
                                        Monitoramento
                                    </span>
                                </div>

                                <div className="border-r border-white/10 p-4 sm:p-5">
                                    <span className="block text-xl font-black text-white sm:text-2xl">
                                        GPS
                                    </span>
                                    <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
                                        Tempo real
                                    </span>
                                </div>

                                <div className="p-4 sm:p-5">
                                    <span className="block text-xl font-black text-white sm:text-2xl">
                                        100%
                                    </span>
                                    <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
                                        Verificados
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Character */}
                        <div className="relative hidden h-[650px] lg:block xl:h-[730px]">
                            <div className="absolute bottom-12 right-10 h-[360px] w-[360px] rounded-full bg-emerald-500/15 blur-[100px]" />

                            <Image
                                src="/boneco_encostado_carrro.png"
                                alt="Segurança Maylon"
                                width={950}
                                height={850}
                                priority
                                className="absolute bottom-0 right-[-80px] h-auto w-[850px] max-w-none object-contain object-bottom drop-shadow-[0_35px_80px_rgba(0,0,0,0.75)] xl:right-[-120px] xl:w-[950px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* TECNOLOGIA */}
            <section className="relative overflow-hidden bg-[#f7f9f8] py-16 sm:py-20 lg:py-24">
                <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-[100px]" />
                <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-emerald-400/10 blur-[100px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Image */}
                        <div className="group relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)]">
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <Image
                                src="/celularotp.png"
                                alt="Segurança OTP Maylon"
                                width={700}
                                height={500}
                                priority
                                className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:h-[460px] lg:h-[520px]"
                            />

                            <div className="absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-emerald-500/95 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                                <ShieldCheck size={15} />
                                Segurança OTP
                            </div>
                        </div>

                        {/* Content */}
                        <div className="max-w-xl">
                            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                                Segurança inteligente
                            </span>

                            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.7rem]">
                                Tecnologia e monitoramento
                                <span className="block text-emerald-600">
                                    para viagens mais seguras.
                                </span>
                            </h2>

                            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                                <p>
                                    A Maylon utiliza tecnologia avançada,
                                    monitoramento em tempo real e confirmação via
                                    OTP para oferecer mais segurança e
                                    autenticidade em cada viagem.
                                </p>

                                <p>
                                    Nossa central acompanha as corridas 24 horas
                                    por dia, proporcionando mais tranquilidade,
                                    confiança e proteção para passageiros e
                                    motoristas parceiros.
                                </p>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">
                                        24h
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        Monitoramento contínuo
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                                    <div className="text-3xl font-black text-emerald-600">
                                        OTP
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        Verificação de embarque
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PROTEÇÃO FEMININA */}
                    <div className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Content */}
                        <div className="order-2 max-w-xl lg:order-1">
                            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-pink-700">
                                Proteção e cuidado
                            </span>

                            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[2.7rem]">
                                Mais proteção para
                                <span className="block text-pink-600">
                                    mulheres durante a viagem.
                                </span>
                            </h2>

                            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                                <p>
                                    A Maylon utiliza tecnologia e monitoramento em
                                    tempo real para oferecer viagens mais seguras,
                                    confortáveis e tranquilas para mulheres.
                                </p>

                                <p>
                                    Com compartilhamento de viagem, suporte da
                                    central de segurança e verificação de
                                    motoristas, proporcionamos mais proteção e
                                    confiança do embarque ao destino final.
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                                    <div className="text-3xl font-black text-pink-600">
                                        100%
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        Viagens rastreadas
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm">
                                    <div className="text-3xl font-black text-pink-600">
                                        SOS
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-500">
                                        Suporte de emergência
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="group order-1 relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white shadow-[0_25px_70px_rgba(15,23,42,0.08)] lg:order-2">
                            <Image
                                src="/mulhernocarro.png"
                                alt="Proteção para mulheres Maylon"
                                width={700}
                                height={500}
                                priority
                                className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:h-[460px] lg:h-[520px]"
                            />

                            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-pink-500/95 px-4 py-2 text-xs font-bold text-white shadow-xl backdrop-blur-md">
                                <ShieldCheck size={15} />
                                Proteção feminina
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RECURSOS */}
            <section className="relative overflow-hidden bg-slate-950 py-10 sm:py-10 lg:py-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(11, 155, 107, 0.12),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(10, 136, 94, 0.08),transparent_30%)]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
                    <div className="mx-auto mb-12 max-w-3xl text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                            Proteção e confiança
                        </span>

                        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                            Recursos pensados
                            <span className="block text-emerald-400">
                                para sua segurança.
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            Cada funcionalidade da Maylon foi criada para tornar
                            sua experiência mais segura, confiável e tranquila.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {itens.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={index}
                                    className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/20 hover:bg-white/[0.07] hover:shadow-[0_25px_70px_rgba(16,185,129,0.08)] sm:p-7"
                                >
                                    <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-3xl transition-opacity group-hover:opacity-100" />

                                    <div className="relative flex items-start justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-emerald-400/10">
                                            <Icon
                                                size={26}
                                                strokeWidth={1.8}
                                                className="text-emerald-400"
                                            />
                                        </div>

                                        <ArrowUpRight
                                            size={20}
                                            className="text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-emerald-400"
                                        />
                                    </div>

                                    <h3 className="relative mt-6 text-lg font-bold text-white">
                                        {item.titulo}
                                    </h3>

                                    <p className="relative mt-3 text-sm leading-6 text-slate-400">
                                        {item.descricao}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FUTURO */}
            <section className="relative overflow-hidden bg-[#eef1f0] py-10 sm:py-10 lg:py-12">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/20 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div className="group relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.15)]">
                            <Image
                                src="/futurotecnologico.png"
                                alt="Tecnologia Maylon"
                                width={1100}
                                height={800}
                                priority
                                className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.04] sm:h-[420px] lg:h-[520px]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

                            <div className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                                Inovação & tecnologia
                            </div>
                        </div>

                        <div className="max-w-xl">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                                Tecnologia & inovação
                            </span>

                            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
                                O futuro da tecnologia
                                <span className="block text-emerald-600">
                                    Maylon.
                                </span>
                            </h2>

                            <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                                <p>
                                    Para desenvolver soluções modernas e
                                    inteligentes, a Maylon investe constantemente
                                    em inovação, reunindo uma equipe altamente
                                    qualificada de engenheiros de software,
                                    analistas de sistemas e especialistas em
                                    tecnologia.
                                </p>

                                <p>
                                    Com profissionais atuando em arquitetura de
                                    sistemas, desenvolvimento web, automação e
                                    análise de dados, a Maylon transforma ideias
                                    em plataformas robustas e escaláveis.
                                </p>

                                <p>
                                    A empresa também investe em pesquisa
                                    tecnológica e capacitação contínua para
                                    garantir excelência em cada projeto entregue.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-xs leading-5 text-slate-500">
                        *As tecnologias e soluções podem variar conforme o projeto
                        e a necessidade do cliente.
                    </p>
                </div>
            </section>
        </main>
    );
}
