"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Crown, X, Smartphone, Wifi, ShieldCheck, WalletCards, Headset } from "lucide-react";
import Link from "next/link";

export default function Vantagens99() {
  const [open, setOpen] = useState(false);
  const [trips, setTrips] = useState(1);
  const [valuePerTrip, setValuePerTrip] = useState(9.5);
  const total = useMemo(() => trips * valuePerTrip, [trips, valuePerTrip]);

  const benefits = [
    { icon: Smartphone, title: "Celular profissional", text: "Equipamento preparado para sua rotina" },
    { icon: Wifi, title: "Conexão garantida", text: "Mais estabilidade para receber corridas" },
    { icon: ShieldCheck, title: "Mais segurança", text: "Proteção e suporte para o motorista" },
    { icon: WalletCards, title: "Economize seu dinheiro", text: "Alugue sem precisar comprar um celular" },
  ];

  const vantagens = [
    { titulo: "Ganhos mais transparentes", descricao: "Veja o valor exato da corrida antes de aceitar e tenha mais previsibilidade sobre quanto vai receber ao final." },
    { titulo: "Compensação por cancelamento", descricao: "Quando uma corrida for cancelada dentro das regras da plataforma, o valor da taxa será repassado diretamente para sua carteira." },
    { titulo: "Mais segurança nos pagamentos", descricao: "Caso ocorra algum problema com o pagamento da corrida, a plataforma oferece suporte e proteção para evitar prejuízos ao motorista." },
    { titulo: "Tarifas mais equilibradas", descricao: "Os valores das corridas são ajustados de forma inteligente para considerar fatores como deslocamento e demanda da região." },
    { titulo: "Benefícios exclusivos Maylon", descricao: "Motoristas parceiros contam com vantagens especiais, suporte dedicado e recursos pensados para trazer mais segurança, economia e praticidade no dia a dia." },
  ];

  return (
    <>
      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3bab88] via-[#258f6c] to-[#0d5c43]" />
        <div className="absolute -top-20 left-0 h-56 w-56 rounded-full bg-[#7ce0bf]/20 blur-3xl sm:h-72 sm:w-72 lg:-top-32 lg:h-[400px] lg:w-[400px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#0d5c43]/40 blur-3xl sm:h-96 sm:w-96 lg:h-[500px] lg:w-[500px]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 py-10 sm:px-6 sm:py-16 md:gap-12 md:py-15 lg:flex-row lg:gap-16 lg:px-10 xl:px-12 2xl:px-0">
          <div className="max-w-2xl flex-1 text-center lg:text-left">
            <span className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md sm:px-5 sm:text-sm">
              Ganhe dinheiro dirigindo no seu tempo
            </span>
            <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
              Dirija quando quiser{" "}
              <span className="block bg-gradient-to-r from-[#7CE0BF] to-[#A8F5D6] bg-clip-text text-transparent">
                E aumente seus ganhos
              </span>
            </h1>
            <p className="mx-auto mt-3.5 max-w-lg text-sm leading-relaxed text-white/90 sm:text-sm lg:mx-0 lg:text-sm xl:text-base 2xl:text-base">
              Trabalhe com liberdade total, escolha seus horários e gere renda extra de maneira simples, rápida e segura.
            </p>
          </div>
          <div className="relative hidden w-full flex-1 items-center justify-center lg:flex">
            <div className="absolute h-64 w-64 rounded-full bg-[#7ce0bf]/20 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[450px] lg:w-[450px]" />
            <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60" />
              <Image src="/driver.webp" alt="Motorista dirigindo" width={720} height={520} priority className="h-auto w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f5f5f5] py-9 sm:py-10 md:py-10 lg:py-13 xl:py-11">
        <div className="absolute -top-20 left-0 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl sm:h-72 sm:w-72 lg:-top-32 lg:h-96 lg:w-96" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-cyan-100/30 blur-3xl sm:h-72 sm:w-72 lg:h-96 lg:w-96" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 sm:px-6 md:gap-12 lg:flex-row lg:gap-16 lg:px-10 xl:gap-20 xl:px-12 2xl:px-0">
          <div className="relative hidden w-full justify-center lg:flex lg:w-1/2">
            <div className="relative h-[360px] w-[360px] xl:h-[430px] xl:w-[430px] 2xl:h-[480px] 2xl:w-[480px]">
              <div className="absolute inset-0 overflow-hidden rounded-full bg-gradient-to-br from-[#45b18e] to-[#0d6e4f] shadow-[0_40px_100px_rgba(0,0,0,0.25)]">
                <div className="absolute inset-0 bg-white/10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/10 blur-2xl" />
              </div>
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <Image src="/car.png" alt="Carro" width={600} height={400} priority className="translate-x-6 scale-105 object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.45)] xl:translate-x-10 xl:scale-110" />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-full ring-8 ring-[#f5f5f5]" />
            </div>
          </div>
          <div className="w-full max-w-2xl text-justify sm:text-justify lg:max-w-xl lg:text-left">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-700 sm:px-5 sm:text-sm md:text-sm lg:text-sm">
              Mobilidade do futuro
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight text-zinc-900 sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
              Dirija rumo ao futuro
              <span className="block text-teal-500">com a Maylon</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-black sm:text-base md:max-w-2xl md:text-justify md:text-sm lg:mx-0 lg:text-sm lg:leading-7 xl:text-base 2xl:text-base">
              Explore uma nova era da mobilidade urbana, com mais tecnologia, segurança e oportunidades reais para motoristas parceiros. O futuro aponta para uma frota cada vez mais sustentável e inteligente, com veículos elétricos e autônomos operados por inteligência artificial, sensores avançados e sistemas de navegação automatizados.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#cccccc] via-[#b5b5b5] to-[#858383] py-10 sm:py-10 md:py-13 lg:py-13 xl:py-14 2xl:py-14">
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/20 blur-3xl sm:h-72 sm:w-72 lg:-top-24 lg:-right-24 lg:h-80 lg:w-80" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-black/10 blur-3xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 xl:px-12 2xl:px-0">
          <div className="mx-auto max-w-5xl text-center lg:mx-0 lg:text-left">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur sm:px-5 sm:text-sm">
              Benefícios exclusivos
            </span>
            <h2 className="my-3 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-4xl lg:text-5xl xl:text-4xl 2xl:text-4xl">
              Vantagens Para
              <span className="block text-zinc-100">Motoristas Parceiros</span>
            </h2>
            <p className="mx-auto mt-0 max-w-2xl text-sm leading-7 text-zinc-100 sm:text-base md:text-sm lg:mx-0 lg:text-base xl:text-base 2xl:text-base">
              Tudo o que você precisa para aumentar seus ganhos e trabalhar com mais segurança, liberdade e suporte.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:gap-7 xl:grid-cols-3">
            {vantagens.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl border border-white/20 bg-teal-500/75 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-teal-700/75 hover:shadow-2xl hover:shadow-black/10 sm:p-7 lg:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <div className="relative mb-6 flex items-center gap-4 sm:mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-black text-teal-500 shadow-lg shadow-black/10 sm:h-14 sm:w-14 sm:text-xl lg:h-16 lg:w-16">
                    0{index + 1}
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-white/50 to-transparent" />
                </div>
                <div className="relative">
                  <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">{item.titulo}</h3>
                  <p className="mt-2 text-sm leading-5 text-zinc-100 text-justify sm:mt-4 sm:text-base sm:leading-7">{item.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative mx-auto max-w-[1800px] overflow-hidden rounded-[2rem] bg-[#002c27] shadow-2xl shadow-[#003c35]/30">
          <div className="pointer-events-none absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#12e7a5]/15 blur-[130px]" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#087c6b]/30 blur-[140px]" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#12e7a5]/10 blur-[120px]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="relative mx-auto flex min-h-[700px] max-w-[1720px] flex-col px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10 xl:px-16">
            <header className="relative z-20 flex items-center justify-between">
              <div className="flex items-center gap-3" />
              <div className="hidden rounded-full border border-[#12e7a5]/30 bg-[#12e7a5]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#12e7a5] sm:block">
                Solução para motoristas
              </div>
            </header>
            <div className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[0.95fr_1fr_1fr] lg:gap-3 lg:py-8">
              <div className="relative z-10 text-center lg:text-left">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#12e7a5]/30 bg-[#12e7a5]/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#12e7a5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#12e7a5] shadow-[0_0_12px_#12e7a5]" />
                  Mobilidade para quem faz acontecer
                </div>
                <h1 className="max-w-xl text-3xl font-black text-white sm:text-4xl xl:text-3xl">
                  MAIS TECNOLOGIA
                  <br />
                  <span className="text-[#12e7a5]">PARA SUA JORNADA.</span>
                </h1>
                <h2 className="mt-4 max-w-lg text-3xl font-black text-white sm:text-3xl xl:text-3xl">
                  UM SMARTPHONE
                  <br />
                  À ALTURA DOS SEUS OBJETIVOS.
                </h2>
                <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/65 text-justify lg:mx-0 xl:text-base">
                  Tenha um celular preparado para acompanhar cada corrida, cada entrega e cada nova oportunidade. Mais desempenho, conectividade e praticidade para você trabalhar com tranquilidade.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12e7a5]" />
                    Pronto para sua rotina
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#12e7a5]" />
                    Mais produtividade
                  </div>
                </div>
                <div className="mx-auto mt-8 max-w-md rounded-3xl border border-[#12e7a5]/30 bg-white/[0.06] p-5 text-left shadow-xl shadow-black/10 backdrop-blur-xl lg:mx-0">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#12e7a5] text-[#003c35] shadow-lg shadow-[#12e7a5]/20">
                      <Crown size={25} fill="currentColor" strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/50">Sua próxima conquista começa aqui</span>
                      <h3 className="mt-1 text-xl font-black tracking-tight text-[#12e7a5] xl:text-2xl">ELEVE SUA ROTINA</h3>
                      <p className="mt-2 text-xs leading-5 text-white/60">Equipamento confiável para você se conectar, trabalhar e aproveitar novas oportunidades todos os dias.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex items-center justify-center lg:h-full">
                <div className="absolute h-64 w-64 rounded-full bg-[#12e7a5]/20 blur-[90px] sm:h-96 sm:w-96" />
                <div className="absolute bottom-5 h-8 w-44 rounded-full bg-black/40 blur-2xl sm:w-64" />
                <Image src="/celular-maylon.png" alt="Celular Maylon para motoristas" width={620} height={760} priority className="relative z-10 h-auto w-[210px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.55)] transition duration-500 hover:-translate-y-2 sm:w-[280px] md:w-[320px] lg:w-[350px] xl:w-[410px]" />
              </div>
              <div className="relative z-10 flex items-end justify-center lg:h-full lg:justify-end">
                <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#12e7a5]/10 blur-[100px]" />
                <Image src="/motorista-maylon.png" alt="Motorista Maylon com cachorro" width={620} height={760} priority className="relative z-10 h-auto w-[270px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-2 sm:w-[350px] md:w-[410px] lg:w-[440px] xl:w-[530px]" />
              </div>
            </div>
            <div className="relative z-20 border-t border-white/10 pt-6">
              <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={benefit.title} className="group rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-[#12e7a5]/40 hover:bg-[#12e7a5]/10">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#12e7a5]/10 text-[#12e7a5] transition group-hover:bg-[#12e7a5] group-hover:text-[#003c35]">
                          <Icon size={19} strokeWidth={2.5} />
                        </div>
                        <strong className="block text-sm font-bold leading-tight text-white">{benefit.title}</strong>
                        <span className="mt-1 block text-xs leading-4 text-white/50">{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col items-center gap-5 lg:items-end">
                  <div className="text-center lg:text-right">
                    <p className="font-serif text-base italic leading-6 text-white/60">
                      Motoristas mais fortes,
                      <br />
                      cidades melhores.
                    </p>
                    <p className="mt-3 text-lg font-black leading-6 tracking-tight text-white sm:text-xl">
                      ALUGUEL DE CELULAR
                      <br />
                      <span className="text-[#12e7a5]">PARA MOTORISTAS</span>
                    </p>
                  </div>
                  <button type="button" className="group cursor-pointer flex w-full max-w-md items-center justify-center gap-3 rounded-2xl bg-[#12e7a5] px-5 py-4 text-xs font-black tracking-wide text-[#003c35] shadow-lg shadow-[#12e7a5]/10 transition duration-300 hover:-translate-y-1 hover:bg-[#25f7b5] hover:shadow-xl hover:shadow-[#12e7a5]/20 sm:text-sm">
                    <Headset size={21} strokeWidth={2.5} className="transition group-hover:scale-110" />
                    ALUGUE SEU CELULAR AGORA
                    <span className="ml-auto text-2xl leading-none transition group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
              <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center sm:flex-row sm:text-left">
                <p className="font-serif text-sm italic text-white/45">Motoristas hoje, histórias maiores amanhã.</p>
                <div className="flex items-center gap-2 text-lg font-black tracking-[-0.05em] text-white">
                  <Image src="/maylon_logo_branco.png" alt="Maylon" width={120} height={60} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#35a989] via-[#2f9d80] to-[#58d68d] py-10 sm:py-10 md:py-10 lg:py-12 xl:py-12 2xl:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-8 xl:px-10 2xl:px-12">
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl sm:rounded-[32px] lg:rounded-[40px]">
            <div className="grid gap-8 p-5 sm:gap-8 sm:p-6 md:gap-10 md:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12 xl:gap-16 xl:p-14 2xl:p-16">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-4xl">Calculadora de Ganhos</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base md:mt-1 md:text-base lg:text-base xl:text-base 2xl:text-base">
                  Descubra automaticamente quanto você pode faturar mensalmente.
                </p>
                <div className="mt-6 rounded-3xl bg-white p-5 shadow-2xl sm:mt-8 sm:p-6 md:p-8 lg:mt-10">
                  <p className="text-xs font-medium text-zinc-500 sm:text-sm">Ganho estimado mensal</p>
                  <h3 className="mt-3 break-words text-3xl font-black text-emerald-600 sm:text-4xl md:text-5xl xl:text-5xl">
                    R$ {total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </h3>
                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-200">
                    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: `${Math.min((total / 50000) * 100, 100)}%` }} />
                  </div>
                  <small className="mt-3 block text-[11px] leading-5 text-zinc-500 sm:text-xs">
                    * Estimativa calculada com base na média mensal de viagens e no valor selecionado por corrida.
                  </small>
                </div>
              </div>
              <div className="space-y-5 sm:space-y-6 md:space-y-8">
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl sm:p-6 md:p-7">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-sm font-semibold text-white sm:text-base">Quantidade de viagens</label>
                    <span className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-600">{trips}</span>
                  </div>
                  <input type="range" min={1} max={500} value={trips} onChange={(e) => setTrips(Number(e.target.value))} className="w-full accent-white" />
                </div>
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl sm:p-6 md:p-7">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-sm font-semibold text-white sm:text-base">Valor por viagem</label>
                    <span className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-600">R$ {valuePerTrip.toFixed(2)}</span>
                  </div>
                  <input type="range" min={9.5} max={500} step={0.5} value={valuePerTrip} onChange={(e) => setValuePerTrip(Number(e.target.value))} className="w-full accent-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl sm:h-80 sm:w-80 md:h-[420px] md:w-[420px] lg:h-[500px] lg:w-[500px]" />
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-10 px-4 py-10 sm:px-6 sm:py-13 md:gap-14 md:py-14 lg:flex-row lg:gap-20 lg:px-8 lg:py-14 xl:px-10 xl:py-14 2xl:px-12 2xl:py-14">
          <div className="relative z-10 w-full max-w-2xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400 backdrop-blur-sm sm:text-sm">Motoristas parceiros</div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
              Dirija quando quiser
              <span className="block text-emerald-400">e ganhe no seu ritmo</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-zinc-300 sm:text-sm md:text-sm lg:mx-0 lg:text-sm xl:text-base 2xl:text-base">
              Trabalhe nos seus horários, aumente sua renda e tenha liberdade para dirigir quando quiser com total flexibilidade.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <button onClick={() => setOpen(true)} className="w-full cursor-pointer rounded-2xl border border-zinc-700 bg-zinc-900/70 px-8 py-2 text-sm font-semibold text-white transition hover:border-emerald-500 hover:bg-zinc-800 sm:w-auto sm:px-10 lg:px-12 xl:text-sm">
                Ver requisitos
              </button>
            </div>
          </div>
          <div className="relative flex w-full justify-center lg:w-1/2">
            <div className="absolute h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl sm:h-80 sm:w-80 md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px]" />
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 shadow-[0_20px_80px_rgba(16,185,129,0.25)] sm:max-w-md md:max-w-lg lg:max-w-[560px] xl:max-w-[620px]">
              <Image src="/motorista.png" alt="Motorista parceiro" width={620} height={440} priority className="h-auto w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                <p className="text-xs text-zinc-300 sm:text-sm">Ganhos semanais estimados</p>
                <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">R$ 3.500+</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[32px] bg-white shadow-2xl">
            <button onClick={() => setOpen(false)} className="absolute right-6 top-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600">
              <X size={20} />
            </button>
            <div className="text-center">
              <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">Comece a dirigir</span>
              <h3 className="my-2 text-3xl font-black text-zinc-900 sm:text-4xl lg:text-4xl">É Fácil Começar</h3>
              <p className="mx-auto mt-0 max-w-2xl text-sm text-zinc-500">Faça seu cadastro gratuitamente e comece a receber corridas em poucos passos.</p>
            </div>
            <div className="relative mt-10">
              <div className="pointer-events-none absolute left-[12%] right-[12%] top-[-32px] z-20 hidden lg:block">
                <div className="h-[4px] rounded-full bg-zinc-200">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />
                </div>
              </div>
              <div className="relative z-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl">
                  <div className="absolute left-1/2 top-0 hidden h-8 w-[2px] -translate-x-1/2 -translate-y-full bg-emerald-500 lg:block" />
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-bold text-white shadow-lg">1</div>
                  <h4 className="mt-6 text-center text-2xl font-bold text-zinc-900">Cadastre-se</h4>
                  <p className="mt-4 text-center leading-7 text-zinc-600">Envie uma foto da sua CNH com observação EAR para iniciar seu cadastro.</p>
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-600">Não aceitamos PPD. Apenas CNH permanente.</p>
                  </div>
                </div>
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl">
                  <div className="absolute left-1/2 top-0 hidden h-8 w-[2px] -translate-x-1/2 -translate-y-full bg-emerald-500 lg:block" />
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-bold text-white shadow-lg">2</div>
                  <h4 className="mt-6 text-center text-2xl font-bold text-zinc-900">Verificação</h4>
                  <p className="mt-4 text-center leading-7 text-zinc-600">Nossa equipe verifica sua documentação para garantir a segurança da plataforma.</p>
                  <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm text-emerald-700">Aprovação rápida e totalmente segura.</p>
                  </div>
                </div>
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl md:col-span-2 md:mx-auto md:max-w-xl lg:col-span-1 lg:max-w-none">
                  <div className="absolute left-1/2 top-0 hidden h-8 w-[2px] -translate-x-1/2 -translate-y-full bg-emerald-500 lg:block" />
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-bold text-white shadow-lg">3</div>
                  <h4 className="mt-6 text-center text-2xl font-bold text-zinc-900">Comece a dirigir</h4>
                  <p className="mt-4 text-center leading-7 text-zinc-600">Após a aprovação, envie o CRLV do veículo e fique online para receber corridas.</p>
                  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm text-amber-700 text-justify">Não possui veículo? Alugue com desconto em nossas locadoras parceiras.</p>
                  </div>
                  <button className="mt-6 w-full cursor-pointer rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-emerald-300/40">Alugar veículo</button>
                </div>
              </div>
            </div>
            <div className="mt-5 border-t border-zinc-200 bg-zinc-50 px-3 py-3 md:px-10 md:py-6 lg:px-12 lg:py-6 xl:px-12 xl:py-6 2xl:px-12 2xl:py-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-xl font-bold text-zinc-900 sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl">Pronto para começar?</h4>
                  <p className="mt-1 text-sm text-black sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm">Faça seu cadastro e comece a dirigir com a Maylon hoje mesmo.</p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <button onClick={() => setOpen(false)} className="rounded-2xl bg-red-500 px-6 py-2 text-base font-semibold text-white transition hover:bg-red-600">Fechar</button>
                  <Link href="/quero_ser_motorista" className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 text-center text-base font-semibold text-white shadow-lg transition hover:scale-105">Quero ser motorista →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}