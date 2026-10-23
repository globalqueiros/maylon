import Image from 'next/image';

export default function Page() {
    return (
        <main className="bg-[#f5f5f5] min-h-screen py-10 px-5">
            <section className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-black text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-semibold leading-tight tracking-tight">
                        Carta da Eva Amaral,
                        <br />
                        Diretora Executiva
                    </h1>
                </div>
                <div className="mb-3">
                    <Image
                        src="/maylon.png"
                        width={1200}
                        height={800}
                        alt="Diretora Executiva"
                        className="w-full h-auto rounded-2xl object-cover shadow-lg"
                        priority
                    />
                </div>
                <p className="text-black font-bold text-xs sm:text-sm mb-4">
                    Maio de 2026
                </p>
                <div className="space-y-4 text-black text-justify text-sm sm:text-sm leading-7">
                    <p className="mb-2">
                        <strong>Prezados motorista, passageiro e colaborador,</strong>
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        É com grande respeito e profunda gratidão que me dirijo a todos vocês que fazem parte da trajetória e do crescimento da Maylon. Cada motorista parceiro, passageiro e colaborador desempenha um papel essencial na construção da nossa história e no fortalecimento do propósito que nos move diariamente.
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        Nossa missão é ir além do transporte e das entregas. Trabalhamos diariamente para proporcionar uma experiência pautada em segurança, confiança, respeito e excelência no atendimento, conectando pessoas e oportunidades por meio de um serviço humano, eficiente e de alta qualidade.
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        Aos nossos motoristas parceiros, deixo meu sincero reconhecimento pelo compromisso, dedicação e profissionalismo demonstrados em cada viagem realizada. Vocês representam a essência da Maylon e desempenham um papel fundamental para que nossos passageiros vivenciem uma experiência segura, confortável e positiva.
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        Aos nossos passageiros, expresso minha sincera gratidão pela confiança depositada em nossa plataforma. Cada viagem realizada com a Maylon fortalece o nosso propósito de oferecer um serviço moderno, acessível e comprometido com a mais alta qualidade, segurança e excelência no atendimento.
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        Sabemos que grandes resultados são construídos por meio da união, do diálogo e do compromisso com a melhoria contínua. Por isso, seguimos investindo constantemente em tecnologia, inovação e suporte, com o objetivo de tornar a experiência de nossos motoristas parceiros e passageiros cada vez mais segura, eficiente e satisfatória.
                    </p>
                    <p className="mb-2 md:mb-3 lg:mb-3 xl:mb-3 2xl:mb-3">
                        Mais do que uma empresa, a Maylon busca ser uma comunidade construída sobre os pilares do respeito, da confiança e da responsabilidade. Nosso propósito é conectar motoristas parceiros e passageiros em uma jornada conjunta, promovendo um futuro cada vez mais seguro, eficiente e humano para todos.
                    </p>
                    <p className="font-semibold">
                        Seguimos em frente, com confiança e compromisso
                    </p>
                    <p className="mt-4 text-black-800 leading-7">
                        <strong className="block text-black text-xl font-semibold">
                            Eva Amaral
                        </strong>
                        <span className="block text-black-600">
                            Diretora Geral — Maylon
                        </span>
                        <span className="italic text-black-500">
                            “Conectando pessoas, valorizando trajetórias e criando novas oportunidades.”
                        </span>
                    </p>
                </div>
            </section>
        </main>
    );
}