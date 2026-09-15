"use client";

import Link from "next/link";
import {
    ArrowLeft,
    CheckCircle2,
    FileText,
    Home,
    ShieldCheck,
} from "lucide-react";
import { type ReactNode } from "react";
import Image from "next/image";

export default function TermosDeUsoPage() {
    return (
        <main className="min-h-screen bg-[#f7faf9] text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                    <Link
                        href="/maylon_pass"
                        className="flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-[#35a989]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar
                    </Link>

                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Banner Maylon"
                            width={150}
                            height={500}
                            className="rounded-2xl object-cover"
                        />
                    </div>
                </div>
            </header>

            <section className="relative overflow-hidden bg-white">
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#35a989]/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#35a989]/10 blur-3xl" />

                <div className="relative mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 sm:py-10">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#35a989]/10">
                        <FileText className="h-8 w-8 text-[#35a989]" />
                    </div>

                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-[#35a989]">
                        Maylon Home
                    </p>

                    <h1 className="my-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        Termos de Uso - Maylon
                    </h1>

                    <p className="mx-auto mt-0 max-w-2xl text-sm leading-6 text-slate-500">
                        Recomendamos a leitura atenta e integral dos presentes Termos de Uso e das condições aplicáveis à contratação e utilização dos serviços disponibilizados pelo Maylon Home.
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#35a989]/20 bg-[#35a989]/5 px-4 py-2 text-xs font-semibold text-[#27866c]">
                        <ShieldCheck className="h-4 w-4" />
                        Documento de referência para utilização do serviço
                    </div>
                </div>
            </section>

            <section className="px-4 py-10 sm:px-6 sm:py-8 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 rounded-2xl border border-[#35a989]/20 bg-[#35a989]/5 p-5">
                        <div className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#35a989]" />

                            <div>
                                <h2 className="font-bold text-slate-900">
                                    Antes de Continuar
                                </h2>

                                <p className="mt-0.5 text-sm leading-6 text-slate-600">
                                    Recomenda-se a leitura integral deste documento previamente à contratação ou à utilização dos serviços disponibilizados pelo Maylon Home.
                                </p>
                            </div>
                        </div>
                    </div>

                    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-b border-slate-200 bg-slate-50 px-6 py-7 sm:px-10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#35a989]">
                                    <FileText className="h-5 w-5 text-white" />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#35a989]">
                                        Documento
                                    </p>

                                    <h2 className="text-xl font-black text-slate-950">
                                        Termos de Uso — Seguro Home
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-4 text-black sm:px-10 sm:py-6">
                            <p className="m-0 p-0 text-sm leading-7 text-black text-justify">
                                O presente Termo de Uso tem por objeto estabelecer as condições, regras, direitos, deveres e responsabilidades que regerão a contratação, disponibilização e utilização dos serviços de assistência residencial integrantes do programa “Maylon Home”, doravante denominado simplesmente “Programa”, administrado pela MAYLON e disponibilizado aos seus assinantes regularmente cadastrados e adimplentes, observadas as condições previstas neste instrumento e na legislação aplicável.
                            </p>

                            <p className="m-0 mt-3 p-0 text-sm leading-7 text-black text-justify">
                                A adesão ao Programa implicará a declaração expressa do usuário titular de que teve prévio e amplo acesso ao presente Termo de Uso, procedeu à sua leitura e compreensão integral e concorda, de forma livre e inequívoca, com todas as suas disposições, obrigando-se a cumpri-las durante a vigência de sua adesão ao Programa.
                            </p>

                            <TermSection
                                number="01"
                                title="DO OBJETO E DA NATUREZA DO PROGRAMA"
                            >
                                <p className="text-justify text-black">
                                    1.1. A Maylon Home consiste em programa de assistência residencial destinado a disponibilizar ao assinante serviços de suporte, atendimento e assistência para situações emergenciais e/ou de manutenção relacionadas à residência, mediante a disponibilização de profissionais especializados, observados, em todos os casos, os procedimentos de acionamento, as condições de utilização, os limites de atendimento, as coberturas e as hipóteses de exclusão estabelecidos no presente Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    1.2. Para todos os fins de direito, a Maylon Home não se caracteriza como contrato de seguro privado, tampouco constitui produto securitário sujeito à regulamentação e fiscalização da Superintendência de Seguros Privados – SUSEP. O Programa possui natureza exclusivamente assistencial, destinando-se à prestação de serviços de assistência residencial, não substituindo, em qualquer hipótese, apólice ou contrato de seguro residencial, nem conferindo ao assinante as coberturas, garantias ou indenizações próprias de contratos de seguro.
                                </p>

                                <p className="text-justify text-black">
                                    1.3. A disponibilização dos serviços de assistência previstos neste Termo estará condicionada à observância das condições, limites, regras de utilização e hipóteses de exclusão estabelecidas no presente instrumento, não sendo devida qualquer prestação que esteja expressamente excluída ou que ultrapasse os limites contratualmente estabelecidos.
                                </p>
                            </TermSection>

                            <TermSection
                                number="02"
                                title="DA ELEGIBILIDADE E DAS CONDIÇÕES DE UTILIZAÇÃO"
                            >
                                <p className="text-justify text-black">
                                    2.1. Poderão usufruir dos serviços e benefícios disponibilizados pelo Maylon Home os assinantes que estejam regularmente cadastrados junto à MAYLON e que se encontrem em situação regular de adimplência quanto às obrigações financeiras decorrentes da contratação do Programa.
                                </p>

                                <p className="text-justify text-black">
                                    2.2. A utilização dos serviços e benefícios disponibilizados pelo Programa possui caráter pessoal e intransferível, estando vinculada ao assinante regularmente cadastrado e ao endereço residencial por ele informado no momento da contratação, ou posteriormente atualizado nos canais oficiais disponibilizados pela MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    2.3. A utilização dos serviços por terceiros não autorizados, bem como a utilização em desacordo com as disposições estabelecidas neste Termo de Uso, poderá ensejar a suspensão, bloqueio ou cancelamento do benefício, sem prejuízo da adoção das demais medidas cabíveis, observadas as disposições contratuais e a legislação aplicável.
                                </p>

                                <p className="text-justify text-black">
                                    2.4. Compete ao assinante manter atualizados seus dados cadastrais e o endereço residencial vinculado ao Programa, responsabilizando-se pela veracidade e exatidão das informações fornecidas à MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    2.5. A elegibilidade para utilização dos serviços permanecerá condicionada à manutenção dos requisitos previstos neste instrumento, especialmente quanto à regularidade cadastral e à adimplência do assinante.
                                </p>
                            </TermSection>

                            <TermSection
                                number="03"
                                title="DOS SERVIÇOS COBERTOS"
                            >
                                <p className="text-justify text-black">
                                    3.1. Observadas as condições, limitações, regras de utilização e hipóteses de exclusão previstas neste Termo de Uso, o Maylon Home poderá disponibilizar ao assinante, de acordo com a natureza da solicitação apresentada e mediante disponibilidade operacional, serviços de assistência residencial, incluindo:
                                </p>

                                <ul className="list-disc space-y-2 pl-6 text-justify text-black">
                                    <li>
                                        Serviços de encanador, destinados à realização de intervenções e reparos hidráulicos de natureza simples e emergencial;
                                    </li>
                                    <li>
                                        Serviços de eletricista, destinados à realização de intervenções e reparos elétricos de natureza simples e emergencial;
                                    </li>
                                    <li>
                                        Serviços de chaveiro, para atendimento de ocorrências relacionadas a chaves, fechaduras e mecanismos de acesso residencial, observados os limites estabelecidos neste instrumento;
                                    </li>
                                    <li>
                                        Serviços de vidraceiro, destinados ao atendimento de ocorrências relacionadas a vidros residenciais, observadas as condições e limitações aplicáveis;
                                    </li>
                                    <li>
                                        Execução de reparos hidráulicos simples, desde que compatíveis com a natureza assistencial do Programa;
                                    </li>
                                    <li>
                                        Execução de reparos elétricos simples, desde que compatíveis com a natureza assistencial do Programa;
                                    </li>
                                    <li>
                                        Realização de pequenos serviços emergenciais de assistência residencial, desde que enquadrados nas condições de cobertura estabelecidas neste Termo de Uso;
                                    </li>
                                    <li>
                                        Outros serviços de assistência residencial que venham a ser posteriormente disponibilizados pela MAYLON, de acordo com as condições, limites e regras de utilização vigentes à época da solicitação.
                                    </li>
                                </ul>

                                <p className="mt-3 text-justify text-black">
                                    3.2. A disponibilização dos serviços previstos neste Termo de Uso estará condicionada à abrangência geográfica do Programa, à existência de profissionais ou prestadores aptos a realizar o atendimento na localidade indicada pelo assinante e à respectiva disponibilidade operacional, não constituindo a solicitação do serviço, por si só, garantia de atendimento imediato ou de disponibilização de profissional em qualquer localidade ou horário, ainda que o Programa opere em regime de atendimento 24 horas por dia.
                                </p>

                                <p className="text-justify text-black">
                                    3.3. A prestação dos serviços ficará sujeita à análise e ao enquadramento da solicitação nas condições estabelecidas neste Termo de Uso, podendo a MAYLON recusar o atendimento quando a ocorrência não estiver abrangida pelos serviços disponibilizados, exceder os limites estabelecidos ou estiver enquadrada em hipótese de exclusão.
                                </p>

                                <p className="text-justify text-black">
                                    3.4. Os serviços de assistência serão prestados exclusivamente nos limites e condições estabelecidos neste instrumento, não abrangendo, salvo previsão expressa em contrário, serviços, materiais, peças, equipamentos ou intervenções que não estejam contemplados nas condições do Programa.
                                </p>

                                <p className="text-justify text-black">
                                    3.5. A relação de serviços prevista nesta cláusula poderá ser alterada, ampliada ou atualizada pela MAYLON, mediante comunicação ou disponibilização das condições atualizadas pelos canais oficiais do Programa, respeitados os direitos já constituídos e a legislação aplicável.
                                </p>
                            </TermSection>

                            <TermSection
                                number="04"
                                title="DO LIMITE DE UTILIZAÇÃO DOS SERVIÇOS"
                            >
                                <p className="text-justify text-black">
                                    4.1. O assinante terá direito à utilização dos serviços de assistência residencial disponibilizados pelo Maylon Home, limitada a 02 (duas) ocorrências por mês, independentemente da natureza, categoria ou modalidade do atendimento solicitado, observadas as demais condições e limitações estabelecidas neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    4.2. O limite de utilização estabelecido nesta cláusula possui caráter individual e vinculado à respectiva assinatura, não sendo permitida a transferência, cessão ou utilização do saldo de ocorrências por terceiros, tampouco sua acumulação para períodos posteriores.
                                </p>

                                <p className="text-justify text-black">
                                    4.3. As ocorrências não utilizadas durante determinado mês serão automaticamente consideradas expiradas ao término do respectivo período, não gerando direito a crédito, compensação, restituição, transferência ou qualquer forma de aproveitamento em meses subsequentes.
                                </p>

                                <p className="text-justify text-black">
                                    4.4. Eventuais solicitações de atendimento que ultrapassem o limite mensal de 02 (duas) ocorrências poderão, a exclusivo critério da MAYLON e mediante prévia ciência e concordância do assinante, ser realizadas mediante cobrança integral dos custos correspondentes à prestação do serviço, incluindo, quando aplicável, mão de obra, deslocamento, materiais, peças, equipamentos e demais despesas necessárias à execução do atendimento.
                                </p>

                                <p className="text-justify text-black">
                                    4.5. A realização de atendimento adicional mediante cobrança não implicará a redução, renovação ou alteração do limite de utilização previsto para o período correspondente, permanecendo válidas as demais condições estabelecidas neste Termo de Uso.
                                </p>
                            </TermSection>

                            <TermSection
                                number="05"
                                title="DO LIMITE FINANCEIRO DE COBERTURA"
                            >
                                <p className="text-justify text-black">
                                    5.1. A MAYLON será responsável pelo custeio exclusivamente da mão de obra do profissional disponibilizado para a execução do serviço, limitado ao valor máximo de R$ 150,00 (cento e cinquenta reais) por atendimento, observadas as condições e demais limitações estabelecidas neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    5.2. O limite financeiro previsto na cláusula anterior não compreende, salvo disposição expressa em contrário, os custos relativos à aquisição ou substituição de materiais, peças, componentes, equipamentos, ferramentas especiais, insumos, serviços de terceiros, deslocamentos extraordinários, bem como quaisquer outras despesas necessárias ou decorrentes da execução do serviço.
                                </p>

                                <p className="text-justify text-black">
                                    5.3. Na hipótese de o valor da mão de obra necessária à execução do atendimento exceder o limite de R$ 150,00 (cento e cinquenta reais), o valor correspondente ao excedente será de exclusiva responsabilidade do assinante, mediante sua prévia ciência e concordância quanto à realização do serviço.
                                </p>

                                <p className="text-justify text-black">
                                    5.4. O assinante, ao solicitar e autorizar a execução de serviço cujo custo ultrapasse o limite financeiro de cobertura, declara estar ciente e concorda expressamente que o respectivo valor excedente poderá ser cobrado pela MAYLON por meio de lançamento na fatura mensal subsequente ou mediante boleto bancário, PIX, cartão de crédito ou outro meio de pagamento disponibilizado pela MAYLON, observadas as condições previamente informadas ao assinante.
                                </p>

                                <p className="text-justify text-black">
                                    5.5. Os valores decorrentes de serviços ou despesas não abrangidos pelo limite financeiro de cobertura, desde que previamente autorizados pelo assinante, constituirão obrigação de pagamento de sua responsabilidade, devendo ser quitados no prazo e na forma estabelecidos pela MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    5.6. O eventual inadimplemento dos valores regularmente devidos poderá sujeitar o assinante às medidas de cobrança administrativa, extrajudicial e, quando cabível, judicial, observada a legislação aplicável, sem prejuízo das demais medidas previstas neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    5.7. A autorização para cobrança de valores excedentes não implica ampliação do limite de cobertura previsto neste instrumento, permanecendo o valor de R$ 150,00 (cento e cinquenta reais) como limite máximo de responsabilidade financeira da MAYLON por atendimento, salvo disposição contratual específica em sentido diverso.
                                </p>
                            </TermSection>

                            <TermSection
                                number="06"
                                title="DAS EXCLUSÕES DE COBERTURA"
                            >
                                <p className="text-justify text-black">
                                    6.1. Não estarão abrangidos pelos serviços de assistência residencial disponibilizados pelo Maylon Home, não sendo, portanto, de responsabilidade da MAYLON, os serviços, intervenções, despesas ou ocorrências que se enquadrem nas seguintes hipóteses:
                                </p>

                                <ul className="list-disc space-y-2 pl-6 text-justify text-black">
                                    <li>
                                        Execução de reformas residenciais, sejam elas parciais ou integrais;
                                    </li>
                                    <li>
                                        Execução de obras, intervenções ou reparações de natureza estrutural no imóvel;
                                    </li>
                                    <li>
                                        Serviços que demandem projetos, laudos, avaliações, acompanhamento ou responsabilidade técnica de engenharia;
                                    </li>
                                    <li>
                                        Instalação completa, substituição integral ou implantação de redes elétricas, hidráulicas ou respectivas infraestruturas;
                                    </li>
                                    <li>
                                        Substituição integral, reconstrução ou reforma completa de telhados e respectivas estruturas;
                                    </li>
                                    <li>
                                        Construção, ampliação, demolição ou alteração estrutural de imóveis ou de suas dependências;
                                    </li>
                                    <li>
                                        Serviços ou danos decorrentes de mau uso intencional, utilização inadequada, negligência ou intervenção deliberadamente indevida por parte do assinante ou de terceiros sob sua responsabilidade;
                                    </li>
                                    <li>
                                        Danos, prejuízos ou ocorrências decorrentes da prática de atos ilícitos, bem como aqueles resultantes de condutas contrárias à legislação vigente;
                                    </li>
                                    <li>
                                        Fornecimento, aquisição, substituição ou instalação de materiais, peças, componentes, equipamentos, insumos ou quaisquer outros itens necessários à execução do reparo, salvo quando expressamente previsto nas condições do Programa;
                                    </li>
                                    <li>
                                        Prestação de serviços em imóveis comerciais, industriais ou destinados a atividades empresariais, salvo se houver previsão expressa de cobertura para tais estabelecimentos;
                                    </li>
                                    <li>
                                        Danos, perdas ou ocorrências decorrentes de guerras, atos de terrorismo, conflitos armados, revoluções, rebeliões, tumultos, comoções civis, insurreições ou calamidades públicas, quando caracterizados como eventos alheios ao âmbito ordinário de assistência residencial do Programa.
                                    </li>
                                </ul>

                                <p className="mt-3 text-justify text-black">
                                    6.2. A relação de exclusões prevista nesta cláusula não afasta outras hipóteses de não atendimento que estejam expressamente previstas neste Termo de Uso ou que decorram da natureza, finalidade e limitações dos serviços disponibilizados pelo Programa.
                                </p>

                                <p className="text-justify text-black">
                                    6.3. A análise quanto ao enquadramento da solicitação nas condições de cobertura ou nas hipóteses de exclusão será realizada pela MAYLON, considerando as características da ocorrência relatada, a natureza do serviço solicitado e as disposições estabelecidas neste instrumento.
                                </p>

                                <p className="text-justify text-black">
                                    6.4. Na hipótese de o atendimento solicitado não estar abrangido pelo Programa, o assinante poderá, quando houver disponibilidade e mediante prévia ciência e concordância quanto aos respectivos custos, contratar diretamente o serviço junto ao profissional ou prestador indicado, não sendo tais valores considerados como parte da cobertura prevista neste Termo de Uso.
                                </p>
                            </TermSection>

                            <TermSection
                                number="07"
                                title="DAS RESPONSABILIDADES DO ASSINANTE"
                            >
                                <p className="text-justify text-black">
                                    7.1. Constituem obrigações do assinante fornecer à MAYLON, no momento da contratação e sempre que solicitado, informações verdadeiras, completas, precisas e atualizadas, responsabilizando-se integralmente pela autenticidade e exatidão dos dados fornecidos.
                                </p>

                                <p className="text-justify text-black">
                                    7.2. O assinante deverá assegurar e proporcionar acesso seguro e adequado ao imóvel para que o profissional ou prestador disponibilizado pela MAYLON possa realizar a avaliação, execução ou conclusão do serviço solicitado, observadas as condições de segurança e as limitações previstas neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    7.3. Caberá exclusivamente ao assinante o pagamento de quaisquer valores que excedam os limites financeiros ou quantitativos de cobertura estabelecidos neste Termo de Uso, incluindo, quando aplicável, valores relativos a mão de obra excedente, materiais, peças, equipamentos, deslocamentos extraordinários e demais despesas não abrangidas pelo Programa.
                                </p>

                                <p className="text-justify text-black">
                                    7.4. O assinante será integralmente responsável pelos danos, perdas ou prejuízos eventualmente ocasionados à MAYLON, aos profissionais, prestadores de serviços ou a terceiros em decorrência do fornecimento de informações falsas, incorretas ou incompletas, bem como da utilização indevida, irregular ou fraudulenta dos benefícios disponibilizados pelo Programa.
                                </p>

                                <p className="text-justify text-black">
                                    7.5. O assinante deverá utilizar os serviços disponibilizados exclusivamente para as finalidades previstas neste Termo de Uso, abstendo-se de praticar qualquer ato que possa caracterizar fraude, abuso, desvio de finalidade ou utilização incompatível com as condições estabelecidas para o Programa.
                                </p>

                                <p className="text-justify text-black">
                                    7.6. O descumprimento das obrigações previstas nesta cláusula poderá ensejar a suspensão ou cancelamento da utilização dos benefícios, sem prejuízo da apuração de eventuais perdas e danos e da adoção das medidas administrativas, extrajudiciais ou judiciais cabíveis, observado o disposto na legislação aplicável.
                                </p>
                            </TermSection>

                            <TermSection
                                number="08"
                                title="DAS RESPONSABILIDADES DA MAYLON"
                            >
                                <p className="text-justify text-black">
                                    8.1. Compete à MAYLON atuar na condição de organizadora e intermediadora dos serviços de assistência residencial disponibilizados por meio do Programa, observadas as condições, limites, procedimentos e exclusões estabelecidos neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    8.2. A MAYLON envidará seus melhores esforços para disponibilizar ao assinante profissionais e prestadores devidamente aptos e qualificados para a execução dos serviços abrangidos pelo Programa, observadas a disponibilidade operacional, a abrangência geográfica e as características do atendimento solicitado.
                                </p>

                                <p className="text-justify text-black">
                                    8.3. A disponibilização de profissional ou prestador estará condicionada à existência de disponibilidade na localidade do atendimento, não sendo garantida a prestação imediata do serviço em todas as circunstâncias, especialmente em situações excepcionais, de força maior ou que estejam fora da esfera de controle da MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    8.4. A MAYLON não será responsável por lucros cessantes, perdas financeiras, danos indiretos, danos consequenciais ou prejuízos decorrentes de fatos ou circunstâncias alheios à sua atuação ou ao seu controle razoável, inclusive aqueles decorrentes de caso fortuito, força maior, indisponibilidade de prestadores, restrições de acesso ao imóvel ou outras circunstâncias que impeçam ou dificultem a execução do serviço.
                                </p>

                                <p className="text-justify text-black">
                                    8.5. A atuação da MAYLON na organização e intermediação da assistência não implica garantia de resultado específico além daqueles expressamente previstos neste Termo de Uso, permanecendo a prestação dos serviços condicionada às características da ocorrência, aos limites de cobertura e às condições aplicáveis ao Programa.
                                </p>

                                <p className="text-justify text-black">
                                    8.6. A MAYLON não responderá por serviços, reparos, materiais ou intervenções contratados diretamente pelo assinante com terceiros sem prévia autorização ou intermediação da MAYLON, salvo quando houver previsão expressa em sentido contrário neste Termo de Uso.
                                </p>

                                <p className="text-justify text-black">
                                    8.7. A MAYLON compromete-se a observar, no desenvolvimento de suas atividades relacionadas ao Programa, as disposições legais e regulamentares aplicáveis, bem como os direitos assegurados ao assinante na condição de consumidor, quando aplicáveis.
                                </p>
                            </TermSection>

                            <TermSection
                                number="09"
                                title="DO CANCELAMENTO E DA SUSPENSÃO DOS SERVIÇOS"
                            >
                                <p className="text-justify text-black">
                                    9.1. A utilização dos benefícios e serviços disponibilizados pelo Maylon Seguro Home poderá ser suspensa ou interrompida, observadas as disposições deste Termo de Uso e a legislação aplicável, nas hipóteses de:
                                </p>

                                <ul className="list-disc space-y-2 pl-6 text-justify text-black">
                                    <li>
                                        Inadimplemento das obrigações financeiras assumidas pelo assinante, observado o disposto na legislação aplicável;
                                    </li>
                                    <li>
                                        Constatação ou existência de indícios de fraude, tentativa de fraude ou qualquer prática destinada a obter vantagem indevida mediante a utilização do Programa;
                                    </li>
                                    <li>
                                        Utilização indevida, irregular, abusiva ou incompatível dos serviços e benefícios disponibilizados pelo Programa;
                                    </li>
                                    <li>
                                        Descumprimento ou violação de qualquer disposição estabelecida neste Termo de Uso;
                                    </li>
                                    <li>
                                        Fornecimento de informações falsas, incorretas, incompletas ou fraudulentas que possam comprometer a regularidade da contratação ou da utilização dos serviços.
                                    </li>
                                </ul>

                                <p className="mt-3 text-justify text-black">
                                    9.2. Nas hipóteses previstas nesta cláusula, a MAYLON poderá adotar as medidas necessárias à proteção do Programa, de seus assinantes, profissionais, prestadores e demais envolvidos, inclusive mediante suspensão temporária ou cancelamento da utilização dos benefícios, sem prejuízo das demais medidas administrativas, extrajudiciais ou judiciais cabíveis.
                                </p>

                                <p className="text-justify text-black">
                                    9.3. O assinante poderá solicitar o cancelamento de sua adesão ao Programa, observadas as condições, procedimentos, prazos e regras estabelecidos para o plano contratado e os canais oficiais disponibilizados pela MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    9.4. O cancelamento da adesão não afastará eventuais obrigações financeiras regularmente constituídas anteriormente à efetivação do cancelamento, inclusive valores decorrentes de serviços adicionais ou excedentes previamente autorizados pelo assinante.
                                </p>

                                <p className="text-justify text-black">
                                    9.5. Eventuais restituições, estornos ou demais efeitos financeiros decorrentes do cancelamento observarão as condições aplicáveis ao plano contratado e a legislação vigente.
                                </p>
                            </TermSection>

                            <TermSection
                                number="10"
                                title="DA PROTEÇÃO DE DADOS PESSOAIS"
                            >
                                <p className="text-justify text-black">
                                    10.1. O tratamento dos dados pessoais dos assinantes realizado pela MAYLON no âmbito do Maylon Seguro Home será efetuado em conformidade com a Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD), bem como com as demais normas legais e regulamentares aplicáveis.
                                </p>

                                <p className="text-justify text-black">
                                    10.2. Os dados pessoais poderão ser coletados e tratados na medida necessária para as finalidades relacionadas à contratação, gestão e execução dos serviços, incluindo, entre outras, a prestação da assistência residencial, o atendimento e suporte ao assinante, o processamento de pagamentos, a comunicação relacionada ao Programa, o cumprimento de obrigações legais e regulatórias e o exercício regular de direitos.
                                </p>

                                <p className="text-justify text-black">
                                    10.3. Os dados pessoais também poderão ser utilizados para o aperfeiçoamento dos serviços, melhoria da experiência do assinante e desenvolvimento das funcionalidades do Programa, observados os princípios, bases legais e demais requisitos estabelecidos pela LGPD.
                                </p>

                                <p className="text-justify text-black">
                                    10.4. A MAYLON adotará medidas técnicas, administrativas e organizacionais razoáveis e compatíveis com a natureza dos dados tratados, destinadas a proteger as informações pessoais contra acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer outra forma de tratamento inadequado ou ilícito.
                                </p>

                                <p className="text-justify text-black">
                                    10.5. O tratamento e eventual compartilhamento de dados pessoais com profissionais, prestadores de serviços, parceiros ou terceiros envolvidos na operacionalização do Programa ocorrerão somente quando necessários à execução das finalidades legítimas relacionadas aos serviços, ao cumprimento de obrigações legais ou ao exercício regular de direitos, observadas as disposições da legislação aplicável.
                                </p>

                                <p className="text-justify text-black">
                                    10.6. Os direitos dos titulares de dados pessoais serão assegurados nos termos da legislação vigente, incluindo aqueles previstos na Lei Geral de Proteção de Dados Pessoais – LGPD, mediante os canais oficiais disponibilizados pela MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    10.7. As informações complementares sobre coleta, utilização, armazenamento, compartilhamento, segurança e direitos dos titulares poderão ser apresentadas em Política de Privacidade própria da MAYLON, a qual deverá ser observada em conjunto com este Termo de Uso.
                                </p>
                            </TermSection>

                            <TermSection
                                number="11"
                                title="DAS ALTERAÇÕES DO TERMO DE USO"
                            >
                                <p className="text-justify text-black">
                                    11.1. A MAYLON poderá, a qualquer tempo, promover alterações, atualizações, complementações ou adequações no presente Termo de Uso, especialmente em razão de alterações legislativas, regulamentares, operacionais ou na estrutura e funcionamento dos serviços disponibilizados pelo Programa.
                                </p>

                                <p className="text-justify text-black">
                                    11.2. As alterações realizadas serão disponibilizadas ao assinante por meio dos canais oficiais da MAYLON, mediante publicação da versão atualizada deste instrumento, passando a produzir efeitos a partir da data indicada na respectiva versão, ressalvadas as disposições legais aplicáveis.
                                </p>

                                <p className="text-justify text-black">
                                    11.3. A continuidade da utilização dos serviços e benefícios disponibilizados pelo Maylon Seguro Home após a entrada em vigor da versão atualizada deste Termo será considerada manifestação de ciência e aceitação das alterações realizadas, ressalvados os direitos assegurados ao assinante pela legislação vigente.
                                </p>

                                <p className="text-justify text-black">
                                    11.4. Caso o assinante não concorde com as alterações promovidas, poderá solicitar o cancelamento de sua adesão ao Programa, observadas as condições aplicáveis ao plano contratado, os procedimentos estabelecidos pela MAYLON e as obrigações eventualmente constituídas até a efetivação do cancelamento.
                                </p>
                            </TermSection>

                            <TermSection
                                number="12"
                                title="DAS DISPOSIÇÕES GERAIS"
                            >
                                <p className="text-justify text-black">
                                    12.1. A eventual tolerância, omissão ou liberalidade da MAYLON quanto ao descumprimento, pelo assinante, de qualquer obrigação ou condição estabelecida neste Termo de Uso não será interpretada como renúncia, novação, alteração contratual ou perda do direito de exigir o respectivo cumprimento, podendo a MAYLON exercer seus direitos a qualquer tempo.
                                </p>

                                <p className="text-justify text-black">
                                    12.2. A eventual declaração de nulidade, invalidade ou inexequibilidade de qualquer disposição deste Termo de Uso, por autoridade competente ou em decorrência de determinação legal ou judicial, não prejudicará a validade e a eficácia das demais disposições, que permanecerão plenamente vigentes naquilo que não forem afetadas.
                                </p>

                                <p className="text-justify text-black">
                                    12.3. As disposições deste Termo de Uso vinculam o assinante e a MAYLON, bem como seus respectivos sucessores e cessionários, na medida em que juridicamente aplicável, respeitadas as disposições legais pertinentes.
                                </p>

                                <p className="text-justify text-black">
                                    12.4. Este Termo de Uso deverá ser interpretado em conjunto com os demais documentos, políticas e condições que integrem ou complementem a contratação do Maylon Seguro Home, incluindo, quando aplicável, a Política de Privacidade e demais documentos disponibilizados pela MAYLON.
                                </p>

                                <p className="text-justify text-black">
                                    12.5. Os casos omissos neste Termo de Uso serão solucionados de acordo com as disposições da legislação brasileira aplicável, observados os princípios da boa-fé, equilíbrio contratual e demais normas pertinentes à relação jurídica estabelecida entre as partes.
                                </p>

                                <p className="text-justify text-black">
                                    12.6. A eventual comunicação, notificação ou informação dirigida ao assinante poderá ser realizada por meio dos canais de comunicação e contatos cadastrados junto à MAYLON, cabendo ao assinante manter seus dados cadastrais devidamente atualizados.
                                </p>
                            </TermSection>

                            <TermSection
                                number="13"
                                title="DO FORO"
                            >
                                <p className="text-justify text-black">
                                    13.1. Fica eleito o Foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer dúvidas, questões, controvérsias ou litígios decorrentes da interpretação, execução, cumprimento ou rescisão do presente Termo de Uso, com renúncia expressa a qualquer outro, por mais privilegiado que seja, ressalvadas as hipóteses em que a legislação aplicável assegure ao assinante o direito de demandar em foro diverso.
                                </p>
                            </TermSection>

                            <div className="mt-10 rounded-2xl border border-[#35a989]/20 bg-[#35a989]/5 p-6">
                                <div className="flex gap-4">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35a989]">
                                        <CheckCircle2 className="h-5 w-5 text-white" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-slate-950">
                                            Aceite dos Termos
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-slate-600">
                                            Ao prosseguir com a contratação do Seguro Home, o assinante declara, para todos os fins de direito, que teve acesso prévio a estes Termos de Uso, realizou sua leitura integral, compreendeu seu conteúdo e manifesta sua expressa concordância com todas as disposições neles estabelecidas.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
                        <p className="text-center text-xs text-slate-400 sm:text-left">
                            Última atualização: <strong>15/09/2026</strong>
                        </p>

                        <Link
                            href="/seguro-home"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#35a989] px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#27866c] hover:shadow-lg"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para o Seguro Home
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white px-4 py-5">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.png"
                            alt="Banner Maylon"
                            width={200}
                            height={500}
                            className="rounded-2xl object-cover"
                        />
                    </div>

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} Maylon. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </main>
    );
}

function TermSection({
    number,
    title,
    children,
}: {
    number: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="border-b border-slate-100 py-7 first:pt-0 last:border-b-0">
            <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#35a989]/10 text-xs font-black text-[#35a989]">
                    {number}
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-black text-slate-950">
                        {title}
                    </h3>

                    <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}