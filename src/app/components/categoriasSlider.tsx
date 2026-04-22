"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

const categorias = [
  {
    nome: "99Pop",
    descricao: "Com motoristas particulares em diversas cidades do Brasil",
    imagem: "/car1.png",
  },
  {
    nome: "99Plus",
    descricao: "Para quem quer um serviço e atendimento premium",
    imagem: "/car2.png",
  },
  {
    nome: "99Comfort",
    descricao: "Mais conforto para sua viagem",
    imagem: "/car3.png",
  },
  {
    nome: "99Entrega",
    descricao: "Envie e receba pacotes com rapidez",
    imagem: "/car4.png",
  },
];

export default function CategoriasSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Parece <span className="font-extrabold">incrível</span>, né? E é!
          </h2>
          <p className="mt-4 text-gray-600 max-w-md">
            Para fazer isso acontecer, oferecemos várias opções de serviço
            dentro do 99App
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-10">
              {categorias.map((item, index) => (
                <div
                  key={index}
                  className="min-w-[260px] bg-white p-6 rounded-xl shadow-sm"
                >
                  <Image
                    src={item.imagem}
                    alt={item.nome}
                    width={200}
                    height={120}
                    className="mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg">{item.nome}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {item.descricao}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-gray-600 text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          >
            →
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-2">
        <div className="w-6 h-2 bg-[#3bab88] rounded-full"></div>
        <div className="w-2 h-2 bg-[#3bab88] rounded-full"></div>
        <div className="w-2 h-2 bg-[#3bab88] rounded-full"></div>
        <div className="w-2 h-2 bg-[#3bab88] rounded-full"></div>
      </div>
    </section>
  );
}