"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Swal from "sweetalert2";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Car,
  CarFront,
  CheckCircle2,
  MapPin,
  ShoppingBag,
  X,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const benefits = [
  {
    title: "Ganhos garantidos",
    description:
      "O valor que você vê na tela ao receber uma corrida agora é exatamente o que você vai receber ao final.",
    image: "/ganhos.png",
  },
  {
    title: "Proteção anticalote",
    description:
      "Garantimos mais segurança financeira caso o passageiro não realize o pagamento.",
    image: "/protecao_anticalote.png",
  },
  {
    title: "Taxa de cancelamento",
    description:
      "A taxa de cancelamento será creditada proporcionalmente ao tempo e distância.",
    image: "/taxa_cancelamento.png",
  },
  {
    title: "Tarifa fixa",
    description:
      "Quanto maior o deslocamento até o embarque, maior será o valor recebido.",
    image: "/tarifa_fixa.png",
  },
];

const adFormats = [
  {
    image: "/tela_celular.png",
    badge: "Banner",
    title: "Banner Inteligente",
    desc: "Destaque sua marca para milhares de passageiros diretamente no aplicativo Maylon e conquiste novos clientes todos os dias.",
    value: "R$ 85,00 / mês",
  },
  {
    image: "/banco_anuncio.png",
    badge: "Banner",
    title: "Banner Inteligente",
    desc: "Alcance milhares de potenciais clientes diariamente com anúncios exclusivos na plataforma Maylon.",
    value: "R$ 168,00 / mês",
  },
];

const adBenefits = [
  {
    title: "+1M",
    description: "Impressões mensais dentro da plataforma.",
  },
  {
    title: "24h",
    description: "Exposição contínua durante as viagens.",
  },
  {
    title: "Segmentado",
    description: "Campanhas por cidade e perfil.",
  },
  {
    title: "Alta Conversão",
    description: "Impacte passageiros estrategicamente.",
  },
];

export default function Home() {
  const [trips, setTrips] = useState(1);
  const [valuePerTrip, setValuePerTrip] = useState(9.5);
  const [openModal, setOpenModal] = useState(false);

  const total = useMemo(() => trips * valuePerTrip, [trips, valuePerTrip]);

  const mostrarAlerta = () => {
    Swal.fire({
      title: "Atualmente, o setor comercial não dispõe de atendimento pelo WhatsApp.",
      icon: "warning",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f9fb] py-8 sm:py-10 md:py-12">
        <div className="absolute inset-0">
          <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_40px_90px_rgba(0,0,0,.08)]">
            <div className="grid items-center xl:grid-cols-[48%_52%]">
              <div className="px-8 py-10 sm:px-10 md:px-14 lg:px-16 xl:px-20">
                <span className="inline-flex rounded-full bg-emerald-50 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                  Seja Motorista Parceiro
                </span>

                <h1 className="my-4 text-2xl font-black leading-tight text-zinc-900 sm:text-2xl md:text-4xl lg:text-5xl xl:text-2xl 2xl:text-3xl">
                  Ganhe dinheiro no seu ritmo. Dirija quando quiser.
                </h1>

                <p className="mt-0 max-w-xl text-justify text-sm leading-6 text-black">
                  Cadastre-se gratuitamente, escolha seus horários e aumente
                  sua renda transportando passageiros com segurança, tecnologia
                  e a liberdade de dirigir quando quiser.
                </p>

                <div className="mt-7 grid grid-cols-2 gap-5">
                  <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-6">
                    <h3 className="text-3xl font-black text-[#2BA27F]">24h</h3>
                    <p className="mt-2 text-sm text-black">
                      Suporte especializado
                    </p>
                  </div>

                  <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-6">
                    <h3 className="text-3xl font-black text-[#2BA27F]">100%</h3>
                    <p className="mt-2 text-sm text-black">
                      Cadastro online
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/quero_ser_motorista"
                    className="group m-auto inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-4 font-semibold text-white transition-all hover:bg-emerald-600"
                  >
                    Quero ser motorista
                    <motion.div
                      whileHover={{ x: [0, 4, 0], y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12" />
                    </motion.div>
                  </Link>
                </div>
              </div>

              <div className="relative hidden items-center justify-center overflow-hidden bg-[url('/bg-cidades.png')] bg-cover bg-center bg-no-repeat px-8 py-8 xl:flex">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-white/20 to-teal-900/20" />
                <div className="absolute left-10 top-10 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-56 w-56 rounded-full bg-teal-300/20 blur-3xl" />
                <div className="absolute h-[500px] w-[500px] rounded-full border border-white/20" />
                <div className="absolute h-[380px] w-[380px] rounded-full border border-white/30" />
                <div className="absolute h-[250px] w-[250px] rounded-full bg-white/20 blur-[100px]" />

                <Image
                  src="/boneco_encostado_carrro.png"
                  alt="Motorista Maylon"
                  width={900}
                  height={900}
                  priority
                  className="relative z-10 ml-10 w-[620px] transition duration-700 hover:scale-105 xl:w-[650px] 2xl:w-[760px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              Benefícios exclusivos
            </span>

            <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-2xl md:text-3xl">
              Incentivos para motoristas parceiros
            </h2>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            speed={1000}
            spaceBetween={25}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-14"
          >
            {benefits.map((item) => (
              <SwiperSlide key={item.title}>
                <div className="group h-full overflow-hidden rounded-[30px] border border-zinc-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-justify text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#e8fff7] via-[#d5f5eb] to-[#b8e8d8] py-10">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-300/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-teal-400/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute h-80 w-80 rounded-full border border-emerald-900/10" />
              <div className="absolute h-60 w-60 rounded-full border border-emerald-900/10" />
              <div className="absolute h-40 w-40 rounded-full bg-white/50 blur-xl" />

              <div className="relative z-10 flex h-[360px] w-full max-w-[560px] items-center justify-center">
                <div className="absolute bottom-8 left-1/2 h-8 w-72 -translate-x-1/2 rounded-full bg-emerald-900/20 blur-xl" />

                <div className="grid w-full grid-cols-2 items-center gap-2">
                  {/* Lado esquerdo: círculos decorativos */}
                  <div className="relative flex h-[300px] w-full items-center justify-center">
                    <div className="absolute h-64 w-64 rounded-full border border-emerald-900/10" />

                    <div className="absolute h-52 w-52 rounded-full border border-emerald-900/10" />

                    <div className="absolute h-40 w-40 rounded-full bg-white/60 shadow-inner blur-sm" />

                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#0b6e4f]/20 bg-white/70 shadow-xl backdrop-blur-md">
                      <ShoppingBag className="h-14 w-14 text-[#0b6e4f]" />
                    </div>
                  </div>

                  {/* Lado direito: imagem dos produtos */}
                  <div className="relative flex h-[300px] w-full items-center justify-center">
                    <Image
                      src="/pecas.png"
                      alt="Pneus, filtros, óleos e peças automotivas da Maylon Store"
                      width={520}
                      height={360}
                      priority
                      className="relative z-10 h-auto w-full max-w-[290px] object-contain drop-shadow-2xl"
                    />

                    <div className="absolute right-0 top-4 z-20 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#0b6e4f]" />

                        <span className="text-[10px] font-bold text-[#06221e]">
                          Produtos confiáveis
                        </span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-0 z-20 rounded-2xl border border-white/70 bg-white/80 px-3 py-2 shadow-lg backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4 text-[#0b6e4f]" />

                        <span className="text-[10px] font-bold text-[#06221e]">
                          Tudo para seu carro
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0b6e4f] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                <ShoppingBag className="h-4 w-4" />
                Maylon Store
              </div>

              <h2 className="text-3xl font-black leading-tight text-[#06221e] sm:text-4xl">
                Tudo que o motorista precisa,
                <span className="block text-[#0b6e4f]">
                  em um só lugar!
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-700 lg:mx-0">
                Encontre pneus, filtros, óleos, acessórios e peças automotivas com
                qualidade, preços especiais e praticidade para continuar rodando. Disponível no portal do motorista.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/60 bg-white/70 p-3 text-center shadow-sm backdrop-blur-md">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-[#0b6e4f]" />

                  <p className="mt-1 text-xs font-bold text-[#06221e]">
                    Qualidade garantida
                  </p>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/70 p-3 text-center shadow-sm backdrop-blur-md">
                  <ShoppingBag className="mx-auto h-5 w-5 text-[#0b6e4f]" />

                  <p className="mt-1 text-xs font-bold text-[#06221e]">
                    Preços especiais
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:justify-start">
                <Link
                  href="https://connect.maylon.com.br/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0b6e4f] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#095a41]"
                >
                  Conhecer a Maylon Store
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={mostrarAlerta}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#0b6e4f] bg-white/70 px-6 py-3 text-sm font-bold text-[#0b6e4f] transition hover:bg-white"
                >
                  Falar com Comercial
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#35a989] via-[#2f9d80] to-[#58d68d] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-8 p-5 sm:p-6 md:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Calculadora de Ganhos
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  Descubra automaticamente quanto você pode faturar mensalmente.
                </p>

                <div className="mt-6 rounded-3xl bg-white p-5 shadow-2xl sm:p-6 md:p-8">
                  <p className="text-xs font-medium text-zinc-500 sm:text-sm">
                    Ganho estimado mensal
                  </p>

                  <h3 className="mt-3 break-words text-3xl font-black text-emerald-600 sm:text-4xl md:text-5xl">
                    R$ {formatarValor(total)}
                  </h3>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                      style={{
                        width: `${Math.min((total / 50000) * 100, 100)}%`,
                      }}
                    />
                  </div>

                  <small className="mt-3 block text-[11px] leading-5 text-zinc-500 sm:text-xs">
                    * Estimativa calculada com base na média mensal de viagens e
                    no valor selecionado por corrida.
                  </small>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6 md:space-y-8">
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl sm:p-6 md:p-7">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-sm font-semibold text-white sm:text-base">
                      Quantidade de viagens
                    </label>

                    <span className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-600">
                      {trips}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={500}
                    value={trips}
                    onChange={(e) => setTrips(Number(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>

                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-xl sm:p-6 md:p-7">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-sm font-semibold text-white sm:text-base">
                      Valor por viagem
                    </label>

                    <span className="w-fit rounded-xl bg-white px-4 py-2 text-sm font-bold text-emerald-600">
                      R$ {formatarValor(valuePerTrip)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={9.5}
                    max={500}
                    step={0.5}
                    value={valuePerTrip}
                    onChange={(e) =>
                      setValuePerTrip(Number(e.target.value))
                    }
                    className="w-full accent-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f7fdfb] to-[#e9f7f2] py-10">
        <div className="absolute -left-32 -top-32 h-[300px] w-[300px] rounded-full bg-[#35a989]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[320px] w-[320px] rounded-full bg-[#3bab88]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl">
                Planeje sua próxima
                <br />
                viagem com{" "}
                <span className="text-[#35a989]">Maylon</span>
              </h1>

              <p className="mx-auto my-3 max-w-2xl text-justify text-sm leading-6 text-black lg:mx-0">
                Reserve viagens com antecedência, escolha seu veículo e viaje
                com conforto, segurança e pontualidade para aeroportos, eventos
                ou destinos especiais.
              </p>

              <div className="mt-6 flex justify-center lg:justify-start">
                <Link
                  href="/reservar-viagem"
                  className="flex items-center gap-2 rounded-full bg-[#35a989] px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:text-base"
                >
                  <Calendar size={20} />
                  Reservar viagem
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 min-[425px]:grid-cols-2 lg:flex lg:flex-wrap lg:justify-start">
                <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs shadow-md sm:text-sm">
                  <Car size={18} />
                  Viagens programadas
                </div>

                <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs shadow-md sm:text-sm">
                  <Calendar size={18} />
                  Reserva antecipada
                </div>

                <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-xs shadow-md sm:text-sm">
                  <MapPin size={18} />
                  Aeroportos e cidades
                </div>
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex">
              <div className="absolute -inset-4 rounded-[50px] bg-[#35a989]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[40px] border border-white shadow-2xl">
                <Image
                  src="/viagem.webp"
                  alt="Viagens Maylon"
                  width={700}
                  height={500}
                  className="w-[550px] object-cover transition duration-700 hover:scale-105 xl:w-[650px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0b6e4f] py-10 sm:py-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-28 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px]" />
          <div className="absolute -right-20 top-10 h-[250px] w-[250px] rounded-full bg-emerald-300/10 blur-3xl sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:35px_35px] sm:bg-[size:45px_45px] lg:bg-[size:55px_55px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-xl">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-300" />
                <span className="text-xs font-medium text-emerald-100 sm:text-sm">
                  Agência Glowx
                </span>
              </div>

              <h2 className="text-2xl font-black leading-tight text-white sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl">
                Sua marca
                <span className="block bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  dentro da Maylon Ads
                </span>
              </h2>

              <p className="my-5 max-w-2xl text-justify text-sm leading-6 text-emerald-50/90">
                Transforme cada viagem em uma oportunidade de conexão com
                milhares de passageiros diariamente. A Maylon oferece espaços
                modernos para divulgação de produtos, serviços e campanhas
                diretamente no app e durante as viagens.
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {adBenefits.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/40 sm:p-6"
                  >
                    <div className="text-2xl font-black text-white">
                      {card.title}
                    </div>

                    <p className="mt-2 text-sm leading-7 text-emerald-100/70">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <button
                  onClick={mostrarAlerta}
                  className="cursor-pointer rounded-full bg-white px-8 py-3 text-center text-sm font-semibold text-[#0b6e4f] shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Falar com Comercial
                </button>

                <button
                  onClick={() => setOpenModal(true)}
                  className="cursor-pointer rounded-full border border-white/15 bg-white/[0.06] px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.10]"
                >
                  Ver formatos de anúncio
                </button>
              </div>
            </div>

            <div className="relative hidden items-center justify-center lg:flex lg:justify-end">
              <div className="absolute bottom-10 h-[250px] w-[250px] rounded-full bg-emerald-300/20 blur-3xl lg:h-[420px] lg:w-[420px]" />

              <div className="relative w-full max-w-[650px] xl:max-w-[720px]">
                <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl" />

                <div className="relative overflow-hidden rounded-[40px] p-5">
                  <Image
                    src="/agencia_glowx.png"
                    alt="Publicidade Maylon"
                    width={1000}
                    height={800}
                    priority
                    className="rounded-[30px] object-cover shadow-[0_35px_90px_rgba(0,0,0,0.45)] transition duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-white/10 bg-[#0f7a59]/90 p-6 shadow-2xl backdrop-blur-2xl xl:block">
                  <div className="text-sm text-emerald-100/70">
                    Alcance médio mensal
                  </div>

                  <div className="mt-2 text-4xl font-black text-white">
                    +10 mil
                  </div>

                  <div className="mt-1 text-sm font-medium text-emerald-300">
                    usuários impactados
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6 lg:p-8">
          <div className="flex min-h-full items-center justify-center">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#071018] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl sm:h-72 sm:w-72 lg:h-[300px] lg:w-[300px]" />
                <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-emerald-400/10 blur-3xl sm:h-60 sm:w-60 lg:h-[250px] lg:w-[250px]" />
              </div>

              <div className="relative flex flex-col gap-6 border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 text-left">
                  <span className="inline-flex rounded-2xl bg-emerald-500/10 px-6 py-3 text-xs font-medium text-emerald-300">
                    Agência Glowx Ads
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-white sm:text-xl md:text-3xl">
                    Formatos de anúncio disponíveis
                  </h2>

                  <p className="mt-2 text-sm text-slate-400 sm:text-sm md:text-base">
                    Escolha o formato ideal para fortalecer a presença da sua
                    marca na plataforma Maylon.
                  </p>
                </div>

                <button
                  onClick={() => setOpenModal(false)}
                  aria-label="Fechar modal"
                  className="absolute right-5 top-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-red-600 lg:static lg:h-12 lg:w-12"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative grid grid-cols-1 gap-5 p-5 sm:gap-6 sm:p-6 md:grid-cols-2 md:p-8 xl:grid-cols-2">
                {adFormats.map((item) => (
                  <div
                    key={item.image}
                    className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/30"
                  >
                    <div className="relative flex h-80 items-center justify-center overflow-hidden sm:h-64 md:h-72">
                      <div className="flex h-full items-center justify-center p-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={500}
                          height={350}
                          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white sm:px-4 sm:text-sm">
                        {item.badge}
                      </div>

                      <div className="absolute bottom-5 left-5 right-5">
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-justify text-sm leading-6 text-slate-300">
                          {item.desc}
                        </p>

                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xl font-bold text-emerald-500">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-col gap-4 border-t border-white/10 px-5 py-5 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-justify text-sm text-slate-400 lg:text-left">
                  Alcance milhares de passageiros diariamente e fortaleça a
                  presença da sua empresa por meio da plataforma de mobilidade
                  Maylon.
                </p>

                <button
                  onClick={mostrarAlerta}
                  className="w-full cursor-pointer rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_10px_40px_rgba(16,185,129,0.35)] sm:w-auto sm:px-10 sm:py-4"
                >
                  Solicitar proposta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative my-3 overflow-hidden bg-gradient-to-br from-[#35a989] via-[#0c664d] to-[#0ec996] px-6 py-8 sm:px-10 lg:px-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Seja um parceiro Maylon
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Pronto para ganhar mais
              <br className="hidden sm:block" />
              com a Maylon?
            </h2>

            <p className="my-3 max-w-xl text-base leading-7 text-emerald-50">
              Cadastre-se como motorista parceiro e tenha acesso a uma
              plataforma feita para oferecer mais segurança, praticidade e
              oportunidades para você.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <CheckCircle2 className="h-5 w-5" />
                Cadastro rápido
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <CheckCircle2 className="h-5 w-5" />
                Mais oportunidades
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <CheckCircle2 className="h-5 w-5" />
                Segurança
              </div>
            </div>
          </div>

          <div className="w-full max-w-md rounded-[28px] bg-white p-7 shadow-2xl sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <CarFront className="h-7 w-7 text-emerald-600" />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Quero ser motorista
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Faça seu cadastro e comece sua jornada como motorista parceiro
              Maylon.
            </p>

            <Link
              href="/quero_ser_motorista"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-4xl bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
            >
              Cadastrar-me como motorista
              <ArrowRight className="h-5 w-5" />
            </Link>

            <p className="mt-4 text-center text-xs text-slate-400">
              Leva poucos minutos para iniciar seu cadastro.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}