"use client";
import Image from "next/image";
import {
    ShieldCheck,
    MapPinned,
    PhoneCall,
    BadgeCheck,
    CarTaxiFront,
    Clock3,
} from "lucide-react";

export default function SegurancaPage() {
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

    return (
        <>
            <section className="relative overflow-hidden py-10 sm:py-10 md:py-15 lg:py-1 xl:py-0 2xl:py-0">
                <div className="absolute inset-0">
                    <Image
                        src="/centralmonitoramento.png"
                        alt="Central de Monitoramento"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/60" />
                    <div className="absolute inset-y-0 right-0 hidden md:block w-1/3 bg-gradient-to-l from-slate-950/50 to-transparent" />
                    <div className="absolute left-1/2 top-1/2 h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 lg:grid-cols-2 xl:gap-16">
                        <div className="relative z-10 max-w-xl">
                            <span className="mb-4 sm:mb-6 inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/15 px-4 py-2 sm:px-6 text-xs sm:text-sm font-medium text-emerald-300 backdrop-blur-sm">
                                Segurança em primeiro lugar
                            </span>
                            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                                Sua viagem mais segura
                                <span className="block text-emerald-400">
                                    com a Maylon
                                </span>
                            </h1>
                            <p className="mt-4 text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base leading-relaxed text-slate-300 text-justify">
                                Na Maylon, segurança não é detalhe. Investimos em
                                tecnologia, monitoramento em tempo real e processos
                                inteligentes para garantir mais tranquilidade para
                                passageiros e motoristas parceiros.
                            </p>
                            <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        24h
                                    </h3>
                                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                        Monitoramento Ativo
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        GPS
                                    </h3>
                                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                        Rastreamento em Tempo Real
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                                        100%
                                    </h3>
                                    <p className="mt-1 text-xs sm:text-sm text-slate-400">
                                        Motoristas Verificados
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="hidden lg:flex relative items-end justify-center lg:justify-end">
                            <div className="relative h-[500px] lg:h-[550px] xl:h-[650px] 2xl:h-[750px] w-full max-w-[650px] lg:max-w-[800px] xl:max-w-[950px]">
                                <div className="absolute bottom-10 right-10 h-[220px] w-[220px] lg:h-[300px] lg:w-[300px] rounded-full bg-emerald-500/20 blur-3xl" />
                                <Image
                                    src="/boneco_encostado_carrro.png"
                                    alt="Segurança Maylon"
                                    width={950}
                                    height={850}
                                    priority
                                    className="
                                        absolute
                                        bottom-0
                                        right-0
                                        w-full
                                        h-auto
                                        object-contain
                                        object-bottom
                                        drop-shadow-[0_30px_80px_rgba(0,0,0,0.8)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative overflow-hidden bg-[#f5f7f6] py-10 sm:py-10 md:py-11 lg:py-10 xl:py-15 2xl:py-20">
                <div className="absolute inset-0">
                    <div className="absolute -left-20 top-10 h-48 w-48 sm:h-72 sm:w-72 lg:h-[320px] lg:w-[320px] rounded-full bg-emerald-300/20 blur-3xl" />
                    <div className="absolute -right-20 bottom-10 h-48 w-48 sm:h-72 sm:w-72 lg:h-[320px] lg:w-[320px] rounded-full bg-emerald-400/10 blur-3xl" />
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-10 md:gap-8 lg:grid-cols-2 lg:gap-16 xl:gap-20">
                        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                            <Image
                                src="/celularotp.png"
                                alt="Segurança OTP Maylon"
                                width={700}
                                height={500}
                                priority
                                className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-cover transition duration-700 hover:scale-105"
                            />
                            <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-lg">
                                Segurança OTP
                            </div>
                        </div>
                        <div className="mx-auto max-w-xl text-center lg:text-left">
                            <span className="inline-flex rounded-full bg-emerald-100 px-3 py-2 text-xs sm:text-sm font-medium text-emerald-700">
                                Segurança inteligente
                            </span>
                            <h2 className="mt-4 text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                                Tecnologia e monitoramento
                                <span className="block text-emerald-600">
                                    para viagens mais seguras
                                </span>
                            </h2>
                            <p className="mt-4 text-sm leading-6 text-black text-justify sm:text-lg md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                                A Maylon utiliza tecnologia avançada, monitoramento em tempo real e
                                confirmação via OTP para oferecer mais segurança e autenticidade em
                                cada viagem.
                            </p>
                            <p className="mt-3 text-sm leading-6 text-black text-justify sm:text-lg md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                                Nossa central acompanha as corridas 24 horas por dia,
                                proporcionando mais tranquilidade, confiança e proteção para
                                passageiros e motoristas parceiros.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                                    <div className="text-2xl font-black text-emerald-600">
                                        24h
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Monitoramento contínuo
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                                    <div className="text-2xl font-black text-emerald-600">
                                        OTP
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Verificação de embarque
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-4 lg:order-3 mx-auto max-w-xl text-center lg:text-left">
                            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs sm:text-sm font-medium text-pink-700">
                                Proteção e cuidado
                            </span>
                            <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                                Mais proteção para
                                <span className="block text-pink-600">
                                    mulheres durante a viagem
                                </span>
                            </h2>
                            <p className="mt-4 text-sm leading-6 text-black text-justify sm:text-lg md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                                A Maylon utiliza tecnologia e monitoramento em tempo real para oferecer
                                viagens mais seguras, confortáveis e tranquilas para mulheres.
                            </p>
                            <p className="mt-3 text-sm leading-6 text-black text-justify sm:text-lg md:text-sm lg:text-sm xl:text-base 2xl:text-base">
                                Com compartilhamento de viagem, suporte da central de segurança e
                                verificação de motoristas, garantimos mais proteção e confiança do
                                embarque até o destino final.
                            </p>
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
                                    <div className="text-2xl font-black text-pink-600">
                                        100%
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Viagens rastreadas
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">
                                    <div className="text-2xl font-black text-pink-600">
                                        SOS
                                    </div>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Suporte de emergência
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="order-3 lg:order-4 relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
                            <Image
                                src="/mulhernocarro.png"
                                alt="Proteção para mulheres Maylon"
                                width={700}
                                height={500}
                                priority
                                className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-cover transition duration-700 hover:scale-105"
                            />

                            <div className="absolute left-4 top-4 rounded-full bg-pink-500 px-3 py-1 text-xs sm:text-sm font-semibold text-white shadow-lg">
                                Proteção Feminina
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className="bg-[#f8fafc] py-6 sm:py-10 md:py-8 lg:py-8 xl:py-8 2xl:py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10">
                    <div className="mx-auto mb-6 sm:mb-8 md:mb-10 max-w-4xl text-center">
                        <span className="text-xs sm:text-sm md:text-sm font-semibold uppercase tracking-wider text-emerald-600">
                            Proteção e confiança
                        </span>
                        <h2 className="my-1 text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-bold text-slate-900">
                            Recursos pensados para sua segurança
                        </h2>
                        <p className="mt-0 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-lg 2xl:text-lg leading-relaxed text-slate-600">
                            Cada funcionalidade da Maylon foi criada para tornar sua
                            experiência mais segura, confiável e tranquila.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {itens.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 md:p-7 lg:p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                                    <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-emerald-100">
                                        <Icon
                                            className="text-emerald-600"
                                            size={28}/>
                                    </div>
                                    <h3 className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl font-semibold text-black">
                                        {item.titulo}
                                    </h3>
                                    <p className="mt-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm leading-relaxed text-black text-justify">
                                        {item.descricao}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="bg-[#ececec] px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-6 sm:py-14 md:py-7 lg:py-6 xl:py-8 2xl:py-8">
                <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-8 sm:gap-10 md:gap-5 lg:gap-16">
                    <div className="w-full lg:w-1/2">
                        <Image
                            src="/futurotecnologico.png"
                            alt="Tecnologia Maylon"
                            width={1100}
                            height={800}
                            priority
                            className="w-full h-[220px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[480px] 2xl:h-[550px] object-cover rounded-2xl sm:rounded"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="font-bold text-black leading-tight tracking-tight text-2xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
                            O futuro da tecnologia Maylon
                        </h1>
                        <p className="mt-2 text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base leading-6 text-black text-justify">
                            Para desenvolver soluções modernas e inteligentes, a Maylon investe
                            constantemente em inovação, reunindo uma equipe altamente qualificada
                            de engenheiros de software, analistas de sistemas e especialistas em
                            tecnologia.
                        </p>
                        <p className="mt-2 text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-base leading-6 text-black text-justify">
                            Com profissionais atuando em arquitetura de sistemas, desenvolvimento
                            web, automação e análise de dados, a Maylon busca transformar ideias
                            em plataformas robustas e escaláveis. A empresa também investe em
                            pesquisa tecnológica e capacitação contínua para garantir excelência
                            em cada projeto entregue.
                        </p>
                    </div>
                </div>
                <p className="mx-auto mt-4 max-w-7xl text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs text-zinc-500">
                    *As tecnologias e soluções podem variar conforme o projeto e necessidade
                    do cliente.
                </p>
            </section>
        </>
    );
}