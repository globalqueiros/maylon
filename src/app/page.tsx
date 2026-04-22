import Image from "next/image";
import { MapPin, Calendar, Car } from "lucide-react";

export default function Home() {
  const items = [
    {
      title: 'Ganhos garantidos',
      description:
        'O valor que você vê na tela ao receber uma corrida agora é exatamente o que você vai receber ao final, sem variações.',
      image: '/ganhos.png',
    },
    {
      title: 'Proteção anticalote',
      description:
        'Para evitar prejuízos em sua rotina, garantimos o pagamento da corrida caso o passageiro não realize o pagamento. O reembolso está sujeito à análise e é limitado a R$ 50,00.',
      image: '/protecao_anticalote.png',
    },
    {
      title: 'Taxa de cancelamento',
      description:
        'A taxa de cancelamento será creditada no saldo da sua carteira. O valor é calculado proporcionalmente ao tempo e à distância percorridos.',
      image: '/taxa_cancelamento.png',
    },
    {
      title: 'Tarifa fixa',
      description:
        'A tarifa será fixa em 60% do valor calculado pela distância até o ponto de embarque. Ou seja, quanto maior o deslocamento, maior será o valor.',
      image: '/tarifa_fixa.png',
    },
  ]

  return (
    <>
      <div className="relative overflow-hidden bg-[#f2f2f2]">
        <div className="absolute top-0 right-0 w-1/2 h-[60vh] bg-[#3bab88] rounded-bl-[250px] z-0"></div>
        <section className="relative z-10 max-w-7xl mx-auto px-6 h-[60vh] flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl flex flex-col justify-center py-10">
            <h1 className="text-4xl md:text-4xl font-bold text-black leading-tight">
              Mobilidade inteligente <br /> para sua cidade
            </h1>
            <p className="mt-6 text-base text-black text-justify">
              Peça sua corrida com rapidez, segurança e tecnologia.
              A Maylon conecta você ao seu destino com facilidade.
            </p>
          </div>
          <div className="relative flex justify-end items-end w-full md:w-1/2">
            <div className="m-auto text-auto md:translate-x-50 md:-translate-y-6">
              <Image
                src="/boneco_encostado_carrro.png"
                alt="Maylon App"
                width={650}
                height={650}
                priority
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </div>
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-0">
          <h2 className="text-xl md:text-3xl font-bold text-black mb-8">
            Incentivos para <br className="hidden md:block" />
            motoristas parceiros
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                <div className="relative w-full h-52">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-justify text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-10 overflow-hidden bg-gradient-to-br from-white via-[#f7fdfb] to-[#e9f7f2]">
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#35a989]/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[450px] h-[450px] bg-[#3bab88]/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-0 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
              Planeje sua próxima <br />
              viagem com a <span className="text-[#35a989]">Maylon</span>
            </h1>
            <p className="mt-4 text-base text-justify text-gray-700">
              Reserve viagens com antecedência, escolha seu veículo e viaje com
              conforto, segurança e pontualidade para aeroportos, eventos ou
              destinos especiais.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <button className="flex items-center gap-2 bg-[#35a989] text-sm text-white px-8 py-3 cursor-pointer rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition">
                <Calendar size={18} />
                Reservar viagem
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-6 text-sm text-gray-800">
              <div className="flex items-center gap-2 bg-white px-3 py-2 text-sm rounded-full shadow-sm w-fit">
                <Car size={18} />
                Viagens programadas
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 text-sm rounded-full shadow-sm w-fit">
                <Calendar size={18} />
                Reserva antecipada
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2 text-sm rounded-full shadow-sm w-fit">
                <MapPin size={18} />
                Aeroportos e cidades
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-[#35a989]/20 blur-2xl rounded-[50px]"></div>
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-white">
              <Image
                src="/viagem.webp"
                alt="Viagens Maylon"
                width={700}
                height={500}
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}