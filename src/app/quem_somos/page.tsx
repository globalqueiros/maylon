import { Metadata } from "next";
import Image from "next/image";
import CategoriasSlider from "../components/categoriasSlider";

export const metadata: Metadata = {
    title: "Quem Somos | Maylon",
    description: "Conheça a Maylon, plataforma de mobilidade que conecta passageiros e motoristas com tecnologia e segurança.",
};

export default function QuemSomos() {
    return (
        <>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h3 className="text-3xl md:text-3xl font-bold text-black">Trabalhamos para melhorar a mobilidade das <br /> pessoas em todo o país</h3>
                <p className="mt-4 text-black text-justify md:max-w-4xl">
                    Trabalhamos todos os dias para oferecer mais mobilidade com segurança para pessoas em todo o país.
                    Mover pessoas com confiança é o que nos inspira e orienta cada decisão que tomamos.
                    Desenvolvemos soluções que tornam os deslocamentos mais seguros, práticos e eficientes,
                    para que você possa chegar ao seu destino com tranquilidade, seja para trabalhar,
                    alcançar seus objetivos ou se deslocar com mais liberdade.
                </p>
            </section>
            <section className="w-full bg-gray-100 py-14 pt-6">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
                    <div className="text-left">
                        <h1 className="text-4xl md:text-4xl font-bold text-gray-900 leading-tight">
                            Conheça mais sobre a <br /> <span className="text-[#35a989]">Maylon</span>
                        </h1>
                        <p className="mt-4 text-black text-justify leading-relaxed max-w-xl">
                            Fundada em 2022 pela Corporação Queirós Brazil, a Maylon é uma plataforma digital que combina tecnologia, segurança e praticidade para oferecer viagens confiáveis e confortáveis, conectando seus usuários a motoristas parceiros em todo o país.
                        </p>
                    </div>
                    <div className="relative flex justify-center md:justify-end">
                        <div className="absolute w-[320px] h-[380px] bg-[#3bab88] rounded-[40px] right-8 top-8"></div>
                        <Image
                            src="/boneco_encostado_carrro.png"
                            alt="Motorista"
                            width={950}
                            height={500}
                            className="relative z-10 object-contain"
                        />
                    </div>
                </div>
            </section>
            <CategoriasSlider />
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    Classes do transporte urbano
                </h1>
                <p className="mt-4 text-black max-w-2xl">
                    A Maylon é uma plataforma de mobilidade que conecta passageiros e
                    motoristas com tecnologia, segurança e praticidade, oferecendo viagens
                    confortáveis e confiáveis para diferentes destinos.
                </p>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    Mudar vidas faz parte do nosso DNA
                </h1>
                <p className="mt-4 text-black max-w-2xl">
                    A Maylon é uma plataforma de mobilidade que conecta passageiros e
                    motoristas com tecnologia, segurança e praticidade, oferecendo viagens
                    confortáveis e confiáveis para diferentes destinos.
                </p>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    Viagens e muito mais
                </h1>
                <p className="mt-4 text-black max-w-2xl">
                    A Maylon é uma plataforma de mobilidade que conecta passageiros e
                    motoristas com tecnologia, segurança e praticidade, oferecendo viagens
                    confortáveis e confiáveis para diferentes destinos.
                </p>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    Sua tranquilidade é nossa prioridade
                </h1>
                <p className="mt-4 text-black max-w-2xl">
                    A Maylon é uma plataforma de mobilidade que conecta passageiros e
                    motoristas com tecnologia, segurança e praticidade, oferecendo viagens
                    confortáveis e confiáveis para diferentes destinos.
                </p>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                    Mas esse é só o começo!
                </h1>
                <p className="mt-4 text-black max-w-2xl">
                    A Maylon é uma plataforma de mobilidade que conecta passageiros e
                    motoristas com tecnologia, segurança e praticidade, oferecendo viagens
                    confortáveis e confiáveis para diferentes destinos.
                </p>
            </section>
            <section className="w-full bg-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative w-full h-[420px] overflow-hidden rounded-tr-[120px] rounded-br-[120px]">
                        <Image
                            src="/images/work.jpg"
                            alt="Pessoa trabalhando"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold text-black">
                            Juntos, vamos reimaginar a mobilidade.
                        </h2>
                        <p className="text-black leading-relaxed">
                            Unindo trabalho, tecnologia e o foco em pessoas, construímos um
                            futuro promissor para toda a comunidade, sempre pensando em
                            sustentabilidade e firmando um compromisso com as próximas gerações.
                        </p>
                    </div>

                </div>
            </section>
        </>
    )
}