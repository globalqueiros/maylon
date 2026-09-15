"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const categorias = [
  {
    nome: "Moto",
    descricao: "Viagens rápidas e práticas com motoristas parceiros em diversas cidades.",
    imagem: "/moto.png",
  },
  {
    nome: "Maylon Basic",
    descricao: "Uma opção econômica com conforto e praticidade para o dia a dia.",
    imagem: "/maylonbasic.png",
  },
  {
    nome: "Maylon Select",
    descricao: "Mais conforto e qualidade para viagens especiais.",
    imagem: "/maylonselect.png",
  },
  {
    nome: "Maylon Plus",
    descricao: "Ideal para quem busca mais espaço e comodidade durante a viagem.",
    imagem: "/maylonplus.png",
  },
  {
    nome: "Maylon Space",
    descricao: "Perfeito para grupos e viagens com maior espaço para passageiros e bagagens.",
    imagem: "/maylonspace.png",
  },
];

export default function CategoriasSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <>
      <section className="bg-white py-8 sm:py-20 md:py-8 lg:py-14 xl:py-12 2xl:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 xl:gap-20 items-center">
            <div className="lg:col-span-4 text-center lg:text-left">
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-teal-50
                  px-4
                  sm:px-5
                  py-2
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-teal-700
                  mb-5
                "
              >
                Serviços disponíveis
              </span>
              <h2
                className="
                  font-bold
                  text-gray-900
                  leading-tight
                  text-3xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-2xl
                  xl:text-3xl
                  2xl:text-4xl
                "
              >
                Parece{" "}
                <span className="text-[#3bab88]">
                  incrível
                </span>
                , né? E é!
              </h2>
              <p
                className="
                  mt-3
                  text-black
                  leading-relaxed
                  text-sm
                  sm:text-sm
                  md:text-sm
                  lg:text-sm
                  xl:text-sm
                  2xl:text-sm
                  max-w-xl
                  mx-auto
                  lg:mx-0
                  text-justify
                "
              >
                Maylon oferece diferentes categorias de carros para atender às
                necessidades do dia a dia com mais praticidade, conforto e eficiência.
              </p>
            </div>
            <div className="lg:col-span-8 relative">
              <div
                ref={emblaRef}
                className="overflow-hidden">
                <div className="flex items-stretch -ml-6">
                  {categorias.map((item, index) => (
                    <div
                      key={index}
                      className="
                        pl-6
                        flex-[0_0_100%]
                        sm:flex-[0_0_80%]
                        md:flex-[0_0_50%]
                        lg:flex-[0_0_50%]
                        xl:flex-[0_0_33.333%]
                        2xl:flex-[0_0_33.333%]"
                    >
                      <div
                        className="
                          h-full
                          bg-white
                          border
                          border-gray-100
                          rounded-[32px]
                          shadow-lg
                          hover:shadow-2xl
                          transition-all
                          duration-300
                          overflow-hidden
                          flex
                          flex-col
                        "
                      >
                        <div
                          className="
                            h-56
                            sm:h-64
                            xl:h-72
                            bg-gray-50
                            flex
                            items-center
                            justify-center
                            p-6
                          "
                        >
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            width={240}
                            height={240}
                            className="
                              object-contain
                              max-w-full
                              max-h-full
                              transition-transform
                              duration-300
                              hover:scale-105
                            "
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-base font-bold text-gray-900">
                            {item.nome}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-gray-600">
                            {item.descricao}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => emblaApi?.scrollPrev()}
                className="
                  hidden lg:flex
                  absolute
                  -left-8
                  top-1/2
                  -translate-y-1/2
                  z-20
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  border
                  border-gray-200
                  shadow-xl
                  hover:bg-[#3bab88]
                  hover:text-white
                  transition-all
                "
              >
                ←
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                className="
                  hidden lg:flex
                  absolute
                  -right-8
                  top-1/2
                  -translate-y-1/2
                  z-20
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  border
                  border-gray-200
                  shadow-xl
                  hover:bg-[#3bab88]
                  hover:text-white
                  transition-all
                "
              >
                →
              </button>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-2.5 w-10 rounded-full bg-[#3bab88]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3bab88]/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3bab88]/40" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#3bab88]/40" />
          </div>
        </div>
      </section>
    </>
  );
}