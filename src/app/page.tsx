"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Car,
  CarFront,
  CheckCircle2,
  Clock3,
  MapPin,
  School,
  ShieldCheck,
  ShoppingBag,
  Users,
  User,
  Phone,
  FileText,
  X,
  AlertCircle,
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

type AlertType = "success" | "danger";

interface AlertState {
  type: AlertType;
  message: string;
}

export default function Home() {
  const [trips, setTrips] = useState(1);
  const [valuePerTrip, setValuePerTrip] = useState(9.5);

  const [openModal, setOpenModal] = useState(false);
  const [modalRendaExtra, setModalRendaExtra] = useState(false);

  const [enviandoRendaExtra, setEnviandoRendaExtra] = useState(false);

  // Telefone com máscara
  const [telefoneRenda, setTelefoneRenda] = useState("");

  // ALERTA
  const [alert, setAlert] = useState<AlertState | null>(null);

  const total = useMemo(
    () => trips * valuePerTrip,
    [trips, valuePerTrip]
  );

  /*
   * =========================================================
   * ALERTA TOGGLE
   * =========================================================
   */
  const mostrarAlerta = (
    type: AlertType,
    message: string
  ) => {
    setAlert({
      type,
      message,
    });

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  /*
   * =========================================================
   * ALERTA COMERCIAL
   * =========================================================
   */
  const alertaComercial = () => {
    mostrarAlerta(
      "danger",
      "Atualmente, o setor comercial não dispõe de atendimento pelo WhatsApp."
    );
  };

  /*
   * =========================================================
   * FORMATAR VALOR
   * =========================================================
   */
  const formatarValor = (valor: number) =>
    valor.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /*
   * =========================================================
   * MÁSCARA DE TELEFONE
   * Formato: (00) 00000-0000
   * =========================================================
   */
  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length === 0) {
      return "";
    }

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7)}`;
  };

  /*
   * =========================================================
   * ENVIO DO FORMULÁRIO DE RENDA EXTRA
   * =========================================================
   */
  const enviarRendaExtra = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (enviandoRendaExtra) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nome = String(formData.get("nome") || "").trim();
    const telefone = String(
      formData.get("telefone") || ""
    ).trim();
    const produto = String(
      formData.get("produto") || ""
    ).trim();
    const observacoes = String(
      formData.get("observacoes") || ""
    ).trim();

    /*
     * VALIDAÇÃO
     */
    if (!nome || !telefone || !produto) {
      mostrarAlerta(
        "danger",
        "Preencha o nome, telefone e produto antes de enviar."
      );

      return;
    }

    /*
     * VALIDA TELEFONE
     */
    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (telefoneNumeros.length !== 11) {
      mostrarAlerta(
        "danger",
        "Digite um telefone celular válido com DDD."
      );

      return;
    }

    try {
      setEnviandoRendaExtra(true);

      const response = await fetch("/api/renda-extra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          telefone,
          produto,
          observacoes,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
          "Não foi possível enviar o cadastro."
        );
      }

      /*
       * LIMPA FORMULÁRIO
       */
      form.reset();

      setTelefoneRenda("");

      /*
       * FECHA MODAL
       */
      setModalRendaExtra(false);

      /*
       * ALERTA DE SUCESSO
       */
      mostrarAlerta(
        "success",
        data.message ||
        "Cadastro enviado com sucesso! A Maylon entrará em contato."
      );
    } catch (error) {
      console.error(
        "Erro ao enviar renda extra:",
        error
      );

      mostrarAlerta(
        "danger",
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar seu cadastro. Tente novamente."
      );
    } finally {
      setEnviandoRendaExtra(false);
    }
  };

  /*
   * =========================================================
   * FECHAR MODAL RENDA EXTRA
   * =========================================================
   */
  const fecharModalRendaExtra = () => {
    if (enviandoRendaExtra) return;

    setTelefoneRenda("");
    setModalRendaExtra(false);
  };

  return (
    <>
      {/* =========================================================
          ALERTA TOGGLE
      ========================================================= */}
      {alert && (
        <div
          role="alert"
          className={`fixed right-4 top-4 z-[99999] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl ${alert.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
            }`}
        >
          <div className="flex items-start gap-3 p-4">
            {/* ÍCONE */}
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${alert.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
                }`}
            >
              {alert.type === "success" ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
            </div>

            {/* TEXTO */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">
                {alert.type === "success"
                  ? "Sucesso!"
                  : "Atenção"}
              </p>

              <p className="mt-1 text-sm leading-5 opacity-90">
                {alert.message}
              </p>
            </div>

            {/* FECHAR */}
            <button
              type="button"
              onClick={() => setAlert(null)}
              className="shrink-0 rounded-lg p-1 opacity-50 transition hover:bg-black/5 hover:opacity-100"
              aria-label="Fechar alerta"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* BARRA DE TEMPO */}
          <div
            className={`h-1 w-full ${alert.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
              }`}
          />
        </div>
      )}

      {/* =========================================================
          HERO
      ========================================================= */}
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
                    <h3 className="text-3xl font-black text-[#2BA27F]">
                      24h
                    </h3>

                    <p className="mt-2 text-sm text-black">
                      Suporte especializado
                    </p>
                  </div>

                  <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-6">
                    <h3 className="text-3xl font-black text-[#2BA27F]">
                      100%
                    </h3>

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
                      whileHover={{
                        x: [0, 4, 0],
                        y: [0, -4, 0],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                      }}
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

      {/* =========================================================
          BENEFÍCIOS
      ========================================================= */}
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

      {/* =========================================================
          MAYLON STORE
      ========================================================= */}
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
                  <div className="relative flex h-[300px] w-full items-center justify-center">
                    <div className="absolute h-64 w-64 rounded-full border border-emerald-900/10" />

                    <div className="absolute h-52 w-52 rounded-full border border-emerald-900/10" />

                    <div className="absolute h-40 w-40 rounded-full bg-white/60 shadow-inner blur-sm" />

                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-[#0b6e4f]/20 bg-white/70 shadow-xl backdrop-blur-md">
                      <ShoppingBag className="h-14 w-14 text-[#0b6e4f]" />
                    </div>
                  </div>

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
              <h2 className="text-3xl font-black leading-tight text-[#06221e] sm:text-4xl">
                Tudo que o motorista precisa,
                <span className="block text-[#0b6e4f]">
                  em um só lugar!
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-700 lg:mx-0">
                Encontre pneus, filtros, óleos, acessórios e peças automotivas
                com qualidade, preços especiais e praticidade para continuar
                rodando. Disponível no portal do motorista.
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
                  onClick={alertaComercial}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[#0b6e4f] bg-white/70 px-6 py-3 text-sm font-bold text-[#0b6e4f] transition hover:bg-white"
                >
                  Falar com Comercial
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CALCULADORA
      ========================================================= */}
      <section className="bg-gradient-to-br from-[#35a989] via-[#2f9d80] to-[#58d68d] py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="grid gap-8 p-5 sm:p-6 md:p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl">
                  Calculadora de Ganhos
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                  Descubra automaticamente quanto você pode faturar
                  mensalmente.
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
                        width: `${Math.min(
                          (total / 50000) * 100,
                          100
                        )}%`,
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
                    onChange={(e) =>
                      setTrips(Number(e.target.value))
                    }
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
                      setValuePerTrip(
                        Number(e.target.value)
                      )
                    }
                    className="w-full accent-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RENDA EXTRA
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f3fffa] via-white to-[#e5f7f0] py-10 sm:py-10">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="mt-4 text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
                Quer fazer uma
                <span className="block text-[#0b6e4f]">
                  renda extra?
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-justify text-sm leading-6 text-gray-700 sm:text-sm">
                Venda seus próprios produtos e transforme seu tempo livre em
                uma oportunidade de renda. Você pode vender docinhos,
                alimentos, acessórios, cosméticos, artesanato e outros
                produtos.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm font-bold text-gray-900">
                    Docinhos
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Brigadeiros, bolos e doces
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm font-bold text-gray-900">
                    Alimentos
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Lanches e produtos caseiros
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm font-bold text-gray-900">
                    Outros produtos
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    Acessórios, cosméticos e mais
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() =>
                    setModalRendaExtra(true)
                  }
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0b6e4f] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#095a41] hover:shadow-xl"
                >
                  Quero vender e fazer renda extra
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute h-[75%] w-[75%] rounded-full bg-emerald-300/30 blur-3xl" />

              <div className="relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px]">
                <Image
                  src="/maylon_store.png"
                  alt="Maylon Store - oportunidade para fazer renda extra vendendo produtos"
                  width={1200}
                  height={1024}
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 55vw, 440px"
                  className="relative z-10 h-auto w-full object-contain drop-shadow-xl transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <ShoppingBag className="h-6 w-6 text-[#0b6e4f]" />
              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                Venda seus produtos
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Aproveite seus talentos e produtos para criar uma nova fonte
                de renda.
              </p>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <CheckCircle2 className="h-6 w-6 text-[#0b6e4f]" />
              </div>

              <h3 className="mt-5 text-lg font-black text-gray-900">
                Comece com o que você já faz
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Docinhos, salgados, produtos artesanais ou outros itens que
                você já produz podem se transformar em oportunidade.
              </p>
            </div>

            <div className="rounded-[28px] border border-emerald-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-black text-gray-900">
                    Uma oportunidade para quem quer empreender
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Tenha mais uma alternativa para complementar sua renda
                    vendendo produtos e divulgando seu trabalho.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-[#0b6e4f]">
                  <CheckCircle2 className="h-4 w-4" />
                  Renda extra
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VAN ESCOLAR
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f7fdfb] to-[#e9f7f2] py-10 sm:py-10">
        <div className="absolute -left-32 -top-32 h-[300px] w-[300px] rounded-full bg-[#35a989]/20 blur-3xl" />

        <div className="absolute -bottom-32 -right-32 h-[320px] w-[320px] rounded-full bg-[#35a989]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-10 lg:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
            <div className="relative flex items-center justify-center lg:order-1">
              <div className="absolute h-[280px] w-[280px] rounded-full bg-[#35a989]/20 blur-3xl sm:h-[380px] sm:w-[380px]" />

              <div className="relative w-full max-w-[600px]">
                <div className="relative hidden w-full lg:block">
                  <Image
                    src="/sprinter-van-escolar-01.png"
                    alt="Van escolar Maylon"
                    width={900}
                    height={650}
                    priority
                    className="relative z-10 block h-auto w-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.18)] transition duration-500 hover:scale-[1.03]"
                  />

                  <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-2 shadow-lg backdrop-blur sm:px-5 sm:py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35a989] text-white">
                        <School size={19} />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">
                          Serviço Maylon
                        </p>

                        <p className="text-sm font-black text-gray-900 sm:text-base">
                          Van Escolar
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center lg:order-2 lg:text-left">
              <h2 className="text-3xl font-black text-gray-900 sm:text-3xl md:text-3xl">
                Transporte escolar
                <br />
                com a{" "}
                <span className="text-[#35a989]">
                  Maylon Van Escolar
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-justify text-sm leading-6 text-gray-700 sm:text-sm lg:mx-0">
                Conte com a Maylon para transporte escolar com mais conforto,
                segurança e pontualidade. Uma solução pensada para levar alunos
                diariamente com tranquilidade e praticidade.
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 min-[450px]:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl border border-[#35a989]/10 bg-white px-4 py-4 text-left shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f3] text-[#35a989]">
                    <ShieldCheck size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Mais segurança
                    </p>

                    <p className="text-xs text-gray-500">
                      Transporte com tranquilidade
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#35a989]/10 bg-white px-4 py-4 text-left shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f3] text-[#35a989]">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Pontualidade
                    </p>

                    <p className="text-xs text-gray-500">
                      Horários planejados
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#35a989]/10 bg-white px-4 py-4 text-left shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f3] text-[#35a989]">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Transporte coletivo
                    </p>

                    <p className="text-xs text-gray-500">
                      Ideal para grupos de alunos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-[#35a989]/10 bg-white px-4 py-4 text-left shadow-sm">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f7f3] text-[#35a989]">
                    <MapPin size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      Rotas programadas
                    </p>

                    <p className="text-xs text-gray-500">
                      Rotas organizadas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex justify-center lg:justify-start">
                <Link
                  href="/van_escolar"
                  className="flex items-center gap-2 rounded-full bg-[#35a989] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2f9679] hover:shadow-xl sm:px-9 sm:text-base"
                >
                  <Calendar size={20} />
                  Conheça Mais Serviço
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          RESERVA
      ========================================================= */}
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

      {/* =========================================================
          MAYLON ADS
      ========================================================= */}
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
                  onClick={alertaComercial}
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

      {/* =========================================================
          MODAL MAYLON ADS
      ========================================================= */}
      {openModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md sm:p-6 lg:p-8">
          <div className="flex min-h-full items-center justify-center">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#071018] shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
              <div className="pointer-events-none absolute inset-0">
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
                  onClick={alertaComercial}
                  className="w-full cursor-pointer rounded-full bg-emerald-500 px-8 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_10px_40px_rgba(16,185,129,0.35)] sm:w-auto sm:px-10 sm:py-4"
                >
                  Solicitar proposta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL RENDA EXTRA
      ========================================================= */}
      {modalRendaExtra && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
          onClick={fecharModalRendaExtra}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* FECHAR */}
            <button
              type="button"
              disabled={enviandoRendaExtra}
              onClick={fecharModalRendaExtra}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* CABEÇALHO */}
            <div className="pr-10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                <ShoppingBag className="h-6 w-6 text-[#0b6e4f]" />
              </div>

              <h2 className="text-2xl font-black text-gray-900">
                Quero fazer renda extra
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Preencha seus dados e conte para a Maylon quais produtos você
                gostaria de vender.
              </p>
            </div>

            {/* FORMULÁRIO */}
            <form
              className="mt-6 space-y-4"
              onSubmit={enviarRendaExtra}
            >
              {/* NOME */}
              <div>
                <label
                  htmlFor="renda-nome"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Nome completo
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="renda-nome"
                    name="nome"
                    type="text"
                    required
                    disabled={enviandoRendaExtra}
                    placeholder="Digite seu nome completo"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm capitalize text-gray-900 outline-none transition focus:border-[#0b6e4f] focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* TELEFONE */}
              <div>
                <label
                  htmlFor="renda-telefone"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  WhatsApp / Telefone
                </label>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="renda-telefone"
                    name="telefone"
                    type="tel"
                    required
                    disabled={enviandoRendaExtra}
                    value={telefoneRenda}
                    onChange={(e) => {
                      setTelefoneRenda(
                        formatarTelefone(e.target.value)
                      );
                    }}
                    maxLength={15}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="(00) 00000-0000"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0b6e4f] focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PRODUTO */}
              <div>
                <label
                  htmlFor="renda-produto"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  O que você gostaria de vender?
                </label>

                <div className="relative">
                  <ShoppingBag className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <select
                    id="renda-produto"
                    name="produto"
                    required
                    defaultValue=""
                    disabled={enviandoRendaExtra}
                    className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0b6e4f] focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>

                    <option value="doces">
                      Doces, balas e chocolates
                    </option>

                    <option value="perfumes">
                      Perfumes
                    </option>

                    <option value="cosmeticos">
                      Cosméticos e cuidados pessoais
                    </option>

                    <option value="acessorios">
                      Acessórios e bijuterias
                    </option>

                    <option value="alimentos">
                      Alimentos e lanches
                    </option>

                    <option value="bebidas">
                      Bebidas
                    </option>

                    <option value="artesanato">
                      Artesanato
                    </option>

                    <option value="roupas">
                      Roupas e vestuário
                    </option>

                    <option value="eletronicos">
                      Eletrônicos e acessórios
                    </option>

                    <option value="outros">
                      Outros produtos
                    </option>
                  </select>
                </div>
              </div>

              {/* OBSERVAÇÕES */}
              <div>
                <label
                  htmlFor="renda-observacoes"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Por que você gostaria de vender esse produto? (opcional)
                </label>

                <div className="relative">
                  <FileText className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

                  <textarea
                    id="renda-observacoes"
                    name="observacoes"
                    rows={4}
                    disabled={enviandoRendaExtra}
                    placeholder="Por que você gostaria de vender esse produto..."
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#0b6e4f] focus:bg-white focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={enviandoRendaExtra}
                  onClick={fecharModalRendaExtra}
                  className="cursor-pointer rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={enviandoRendaExtra}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-[#0b6e4f] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#095a41] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {enviandoRendaExtra ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar cadastro
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          CTA MOTORISTA
      ========================================================= */}
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
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
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