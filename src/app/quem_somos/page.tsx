import Image from "next/image";
import Link from "next/link";
import CategoriasSlider from "../components/categoriasSlider";


export default function QuemSomos() {
    return (
        <>
            <section className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-8 sm:py-10 md:py-10 lg:py-10 xl:py-7 2xl:py-9">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-16 xl:gap-24 items-center">
                        <div className="order-2 lg:order-1 text-center lg:text-left">
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#35a989]/10 text-[#35a989] text-sm md:text-base lg:text-sm xl:text-sm 2xl:text-sm font-semibold mb-5">
                                Sobre a Maylon
                            </span>
                            <h1 className="font-bold text-gray-900 leading-tight text-2xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-4xl">
                                Conheça mais sobre a{" "}
                                <span className="text-[#35a989]">
                                    Maylon
                                </span>
                            </h1>

                            <p className="
                                mt-4
                                text-gray-700
                                leading-relaxed
                                text-sm
                                sm:text-sm
                                md:text-base
                                lg:text-sm
                                xl:text-sm
                                2xl:text-sm
                                max-w-2xl
                                mx-auto
                                lg:mx-0
                                text-justify">
                                A Maylon foi fundada em 2022 pela{" "}
                                <Link
                                    href="https://groupqueiros.com/brazil"
                                    className="
                                        font-semibold
                                        text-[#35a989]
                                        hover:text-[#2d8f74]
                                        transition-colors
                                    "
                                >
                                    Corporação Queirós Brazil
                                </Link>{" "}
                                com o objetivo de transformar a mobilidade urbana por meio
                                da tecnologia, inovação e segurança. Desde o início, a
                                empresa surgiu com a missão de oferecer viagens mais
                                práticas, confortáveis e confiáveis, conectando passageiros
                                a motoristas parceiros em diferentes regiões do país.
                            </p>
                            <p className="
                                mt-5
                                text-gray-700
                                leading-relaxed
                                text-sm
                                sm:text-sm
                                md:text-base
                                lg:text-sm
                                xl:text-sm
                                2xl:text-sm
                                max-w-2xl
                                mx-auto
                                lg:mx-0
                                text-justify
                            ">
                                Com foco na experiência dos passageiros, a Maylon investe
                                constantemente em soluções digitais que tornam o transporte
                                mais acessível, eficiente e moderno. Além de facilitar o
                                dia a dia das pessoas, a plataforma também cria
                                oportunidades para motoristas parceiros, contribuindo para
                                geração de renda e desenvolvimento da mobilidade.
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 relative flex justify-center items-center">
                            <div
                                className="
                                    absolute
                                    w-[85%]
                                    h-[80%]
                                    rounded-[30px]
                                    sm:rounded-[40px]
                                    lg:rounded-[60px]
                                    bg-gradient-to-br
                                    from-[#35a989]
                                    via-[#35a989]
                                    to-[#2d8f74]
                                    shadow-[0_30px_80px_rgba(53,169,137,0.35)]
                                "
                            />
                            <div
                                className="
                                    absolute
                                    top-0
                                    right-0
                                    w-24
                                    h-24
                                    sm:w-32
                                    sm:h-32
                                    xl:w-40
                                    xl:h-40
                                    rounded-full
                                    bg-white/20
                                    backdrop-blur-sm
                                "
                            />
                            <Image
                                src="/boneco_encostado_carrro.png"
                                alt="Motorista Maylon"
                                width={1000}
                                height={1000}
                                priority
                                className="
                                    relative
                                    z-10
                                    w-full
                                    max-w-[320px]
                                    sm:max-w-[420px]
                                    md:max-w-[500px]
                                    lg:max-w-[600px]
                                    xl:max-w-[700px]
                                    2xl:max-w-[800px]
                                    h-auto
                                    object-contain
                                    drop-shadow-[0_35px_45px_rgba(0,0,0,0.25)]
                                    transition-transform
                                    duration-500
                                    hover:scale-105
                                "
                            />
                        </div>
                    </div>
                </div>
            </section>
            <CategoriasSlider />
            <section className="w-full bg-[#f5f7f8] py-10 sm:py-13 md:py-12 lg:py-13 xl:py-12 2xl:py-18">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-20 lg:space-y-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 xl:gap-24 mb-15 sm:mb-15 md:mb-15 lg:mb-18 xl:mb-19 2xl:mb-19 items-center">
                        <div
                            className="
                                relative
                                order-1
                                w-full
                                h-[280px]
                                sm:h-[380px]
                                md:h-[460px]
                                lg:h-[520px]
                                xl:h-[620px]
                                2xl:h-[700px]
                                overflow-hidden
                                rounded-3xl
                                shadow-2xl
                            "
                        >
                            <Image
                                src="/sustentabilidade.png"
                                alt="Sustentabilidade"
                                fill
                                priority
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        <div className="order-2">
                            <h2 className="font-bold text-gray-900 leading-none text-3xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-5xl">
                                Sustentabilidade
                            </h2>
                            <p className="my-3 text-sm sm:text-sm md:text-sm xl:text-base 2xl:text-base leading-relaxed text-black text-justify">
                                A Maylon pretende se tornar uma plataforma totalmente elétrica e sem emissão de carbono até 2040, incentivando viagens mais sustentáveis com veículos leves, transporte público e carros híbridos. A empresa busca combater as mudanças climáticas e apoiar o uso de energias limpas, tornando a mobilidade urbana mais eficiente e menos poluente.
                            </p>
                            <p className="mb-0 text-sm sm:text-sm md:text-sm xl:text-base 2xl:text-base leading-relaxed text-black text-justify">
                                A sustentabilidade tem se tornado um dos temas mais importantes da atualidade. Nesse cenário, os carros híbridos surgem como uma alternativa eficiente para reduzir a emissão de poluentes e contribuir para um futuro mais sustentável.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 xl:gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="font-bold text-gray-900 leading-none text-3xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-5xl">
                                Viagens e muito mais
                            </h2>
                            <p className="my-3 text-sm sm:text-sm md:text-sm xl:text-base 2xl:text-base leading-relaxed text-black text-justify">
                                A Maylon vai muito além das viagens. Além de oferecer mais mobilidade para as pessoas, a plataforma também possibilita entregas rápidas e acessíveis, amplia o acesso à assistência médica e cria soluções modernas para o transporte de cargas.
                            </p>
                            <p className="mb-0 text-sm sm:text-sm md:text-sm xl:text-base 2xl:text-base leading-relaxed text-black text-justify">
                                Outro ponto importante é o apoio aos motoristas e entregadores parceiros, oferecendo oportunidades para geração de renda e maior flexibilidade no trabalho.
                            </p>
                        </div>
                        <div
                            className="
                                    relative
                                    order-1
                                    lg:order-2
                                    w-full
                                    h-[280px]
                                    sm:h-[380px]
                                    md:h-[460px]
                                    lg:h-[520px]
                                    xl:h-[620px]
                                    2xl:h-[700px]
                                    overflow-hidden
                                    rounded-3xl
                                    shadow-2xl
                                "
                        >
                            <Image
                                src="/viagens.webp"
                                alt="Viagens"
                                fill
                                priority
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white py-10 sm:py-10 md:py-13 lg:py-10 xl:py-11 2xl:py-10">
                <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 sm:gap-12 md:gap-16 xl:gap-24 2xl:gap-32">
                        <div
                            className="
                                    relative
                                    order-1
                                    w-full
                                    overflow-hidden
                                    rounded-3xl
                                    xl:rounded-[40px]
                                    shadow-xl
                                    h-[260px]
                                    sm:h-[360px]
                                    md:h-[450px]
                                    lg:h-[520px]
                                    xl:h-[620px]
                                    2xl:h-[720px]
                                "
                        >
                            <Image
                                src="/seguranca.png"
                                alt="Segurança"
                                fill
                                priority
                                className="
                                    object-cover
                                    transition-transform
                                    duration-700
                                    hover:scale-105
                                "
                            />
                        </div>
                        <div className="order-2 flex flex-col justify-center">
                            <span
                                className="
                                    inline-flex
                                    w-fit
                                    items-center
                                    rounded-full
                                    bg-green-50
                                    px-5
                                    py-2
                                    text-xs
                                    sm:text-sm
                                    font-semibold
                                    text-green-700
                                    mb-5
                                "
                            >
                                Segurança
                            </span>
                            <h2
                                className="
                                    font-bold
                                    text-gray-900
                                    leading-tight
                                    text-2xl
                                    sm:text-2xl
                                    md:text-3xl
                                    lg:text-3xl
                                    xl:text-4xl
                                    2xl:text-4xl
                                "
                            >
                                Sua segurança em primeiro lugar
                            </h2>
                            <div className="mt-4.5 space-y-5 max-w-3xl">
                                <p
                                    className="
                                    text-sm
                                    sm:text-sm
                                    md:text-sm
                                    xl:text-sm
                                    2xl:text-sm
                                    leading-relaxed
                                    text-gray-700
                                    text-justify
                                    mb-0
                                    "
                                >
                                    Todos os nossos motoristas passam por um rigoroso processo de
                                    verificação, incluindo consulta de antecedentes e ficha criminal,
                                    garantindo mais segurança e confiança para nossos passageiros.
                                </p>
                                <p
                                    className="
                                        text-sm
                                        sm:text-sm
                                        md:text-sm
                                        xl:text-sm
                                        2xl:text-sm
                                        leading-relaxed
                                        text-gray-700
                                        text-justify
                                        my-3
                                    "
                                >
                                    Todas as viagens são monitoradas e rastreadas em tempo real pela
                                    Central de Segurança da Maylon, permitindo acompanhamento contínuo
                                    do trajeto e maior tranquilidade para passageiros e motoristas
                                    parceiros.
                                </p>
                                <p
                                    className="
                                        text-sm
                                        sm:text-sm
                                        md:text-sm
                                        xl:text-sm
                                        2xl:text-sm
                                        leading-relaxed
                                        text-gray-700
                                        text-justify
                                        mb-0
                                    "
                                >
                                    A segurança de passageiros e motoristas parceiros é uma das maiores
                                    prioridades da Maylon. Utilizamos tecnologia e inovação para tornar
                                    cada viagem mais segura, prática e confiável, oferecendo uma
                                    experiência moderna e protegida para todos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="relative overflow-hidden bg-black">
                <div
                    className="
                        relative
                        h-[420px]
                        sm:h-[500px]
                        md:h-[600px]
                        lg:h-[680px]
                        xl:h-[760px]
                        2xl:h-[850px]
                        "
                    >
                    <Image
                        src="/diretoraexecultiva.png"
                        alt="Carta da Diretora Geral"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
                            <div className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl">
                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        rounded-full
                                        bg-white/15
                                        backdrop-blur-md
                                        px-5
                                        sm:px-6
                                        py-2
                                        text-xs
                                        sm:text-sm
                                        font-semibold
                                        text-white
                                        mb-5
                                    "
                                >
                                    Mensagem da Liderança
                                </span>
                                <h2
                                    className="
                                        font-bold
                                        text-white
                                        leading-tight
                                        text-3xl
                                        sm:text-4xl
                                        md:text-4xl
                                        lg:text-5xl
                                        xl:text-5xl
                                        2xl:text-6xl
                                    "
                                >
                                    Uma carta da nossa
                                    <br />
                                    Diretora Geral
                                </h2>
                                <p
                                    className="
                                        mt-6
                                        max-w-2xl
                                        text-sm
                                        sm:text-sm
                                        md:text-base
                                        lg:text-base
                                        xl:text-base
                                        2xl:text-base
                                        leading-normal
                                        text-gray-100
                                        text-justify
                                    "
                                >
                                    Confira a mensagem da nossa Diretora Geral e o compromisso contínuo
                                    com a excelência, a inovação e o cuidado com cada pessoa que faz
                                    parte da nossa trajetória.
                                </p>
                                <Link
                                    href="/carta_diretora"
                                    className="
                                        mt-8
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-[#35a989]
                                        px-6
                                        sm:px-8
                                        lg:px-10
                                        py-3
                                        sm:py-4
                                        text-sm
                                        sm:text-base
                                        lg:text-lg
                                        font-semibold
                                        text-white
                                        shadow-xl
                                        transition-all
                                        duration-300
                                        hover:bg-[#2d8f74]
                                        hover:scale-105
                                    "
                                >
                                    Leia a carta da Diretora
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}