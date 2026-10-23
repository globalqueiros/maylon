"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { type ReactNode } from "react";

const VAN_ROUTE = "/maylon_pass";

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
        <section className="mb-10 last:mb-0" aria-labelledby={`secao-${number}`}>
            <div className="mb-4 flex items-start gap-3">
                <div className="flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg bg-[#35a989] px-2 text-sm font-bold text-white shadow-sm">
                    {number}
                </div>
                <h2
                    id={`secao-${number}`}
                    className="pt-1 text-lg font-bold leading-7 text-slate-900 sm:text-xl"
                >
                    {title}
                </h2>
            </div>
            <div className="space-y-3 text-justify text-[15px] leading-7 text-slate-700">
                {children}
            </div>
        </section>
    );
}

function Clause({
    number,
    children,
}: {
    number: string;
    children: ReactNode;
}) {
    return (
        <p>
            <span className="font-semibold text-slate-900">{number}</span>{" "}
            {children}
        </p>
    );
}

export default function TermosDeUsoPage() {
    return (
        <main className="min-h-screen bg-[#f7faf9] text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link
                        href={VAN_ROUTE}
                        className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-[#27866c]"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </Link>
                </div>
            </header>

            <section className="m-auto border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#35a989]/20 bg-[#35a989]/10 px-4 py-2 text-sm font-semibold text-[#27866c]">
                        <FileText size={16} />
                        Documento oficial
                    </div>
                    <h1 className="max-w-3xl text-1xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-3xl">
                        Termos de Uso
                        <p className="mt-2 text-[#35a989]">Maylon Van Escolar</p>
                    </h1>
                    <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-sm">
                        Este Termo de Uso estabelece as condições, regras,
                        direitos, deveres e responsabilidades aplicáveis à
                        contratação e utilização dos serviços de transporte
                        escolar disponibilizados pela Maylon Van Escolar.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <ShieldCheck size={18} className="text-[#35a989]" />
                            Segurança e responsabilidade
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <FileText size={18} className="text-[#35a989]" />
                            Regras de utilização
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <section className="mb-8 rounded-2xl border border-[#35a989]/20 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#35a989]/10 text-[#27866c]">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Antes de Continuar
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Recomenda-se a leitura integral deste Termo de
                                Uso antes da contratação, cadastro ou utilização
                                dos serviços de transporte escolar
                                disponibilizados pela Maylon Van Escolar.
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Ao prosseguir com o cadastro, contratação ou
                                utilização dos serviços, o responsável legal
                                declara que teve acesso ao presente documento,
                                realizou sua leitura e compreensão e concorda
                                com as condições nele estabelecidas.
                            </p>
                        </div>
                    </div>
                </section>

                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                    <div className="mb-10 border-b border-slate-200 pb-8">
                        <p className="text-justify text-[15px] leading-7 text-slate-700">
                            O presente Termo de Uso tem por objeto estabelecer
                            as condições, regras, direitos, deveres e
                            responsabilidades que regerão a contratação,
                            disponibilização e utilização dos serviços de
                            transporte escolar disponibilizados pela MAYLON,
                            por meio do programa denominado{" "}
                            <strong className="text-slate-900">
                                “Maylon Van Escolar”
                            </strong>
                            , doravante denominado simplesmente “Programa”,
                            destinado ao transporte de alunos regularmente
                            cadastrados, observadas as condições previstas neste
                            instrumento e na legislação aplicável.
                        </p>
                        <p className="mt-4 text-justify text-[15px] leading-7 text-slate-700">
                            A adesão ao Programa implicará a declaração expressa
                            do responsável legal pelo aluno de que teve prévio e
                            amplo acesso ao presente Termo de Uso, procedeu à sua
                            leitura e compreensão integral e concorda, de forma
                            livre e inequívoca, com todas as suas disposições,
                            obrigando-se a cumpri-las durante a vigência da
                            contratação.
                        </p>
                    </div>

                    <TermSection number="01" title="DO OBJETO E DA NATUREZA DO PROGRAMA">
                        <Clause number="1.1">
                            O Maylon Van Escolar tem por finalidade disponibilizar
                            serviço de transporte escolar para o deslocamento
                            regular de alunos entre os pontos de embarque e
                            desembarque previamente cadastrados e as respectivas
                            instituições de ensino, observando horários, rotas,
                            condições operacionais, limites e regras de
                            segurança estabelecidos para o serviço.
                        </Clause>
                        <Clause number="1.2">
                            O serviço será realizado por meio de veículos
                            destinados e autorizados ao transporte escolar,
                            conduzidos por motoristas que atendam aos requisitos
                            legais e regulamentares aplicáveis.
                        </Clause>
                        <Clause number="1.3">
                            Os horários informados possuem caráter estimado, não
                            constituindo garantia de chegada ou desembarque em
                            horário exato, considerando a possibilidade de
                            ocorrência de trânsito, condições climáticas, obras,
                            acidentes, bloqueios viários e demais situações
                            alheias ao controle operacional.
                        </Clause>
                        <Clause number="1.4">
                            A prestação dos serviços observará as condições
                            contratadas, a disponibilidade operacional, a rota
                            estabelecida e os requisitos de segurança aplicáveis.
                        </Clause>
                        <Clause number="1.5">
                            A MAYLON poderá prestar os serviços diretamente ou
                            por meio de motoristas, profissionais ou prestadores
                            devidamente cadastrados, autorizados ou contratados,
                            conforme a estrutura operacional adotada.
                        </Clause>
                    </TermSection>

                    <TermSection
                        number="02"
                        title="DA ELEGIBILIDADE E DAS CONDIÇÕES DE UTILIZAÇÃO"
                    >
                        <Clause number="2.1">
                            Poderão utilizar o Programa os alunos regularmente
                            cadastrados pelo respectivo responsável legal.
                        </Clause>
                        <Clause number="2.2">
                            A contratação poderá ser realizada pelo pai, mãe,
                            tutor, responsável legal ou pessoa devidamente
                            autorizada para representar o aluno.
                        </Clause>
                        <Clause number="2.3">
                            O responsável deverá fornecer informações completas,
                            verdadeiras e atualizadas sobre o aluno, incluindo
                            nome, data de nascimento, endereço, instituição de
                            ensino, horários, contatos de emergência e demais
                            informações necessárias à adequada execução do
                            serviço.
                        </Clause>
                        <Clause number="2.4">
                            O serviço é pessoal e vinculado ao aluno cadastrado,
                            não podendo ser utilizado por terceiro sem prévia
                            autorização e atualização cadastral.
                        </Clause>
                        <Clause number="2.5">
                            O responsável deverá comunicar alterações de
                            endereço, instituição de ensino, horário, rota,
                            contatos ou pessoas autorizadas a receber o aluno.
                        </Clause>
                        <Clause number="2.6">
                            A prestação do serviço poderá estar condicionada à
                            regularidade dos pagamentos e ao cumprimento das
                            demais obrigações previstas neste Termo e no contrato
                            aplicável.
                        </Clause>
                    </TermSection>

                    <TermSection
                        number="03"
                        title="DOS SERVIÇOS DE TRANSPORTE ESCOLAR"
                    >
                        <Clause number="3.1">
                            Os serviços poderão compreender, conforme o plano
                            contratado e a disponibilidade operacional:
                        </Clause>
                        <ul className="ml-5 list-disc space-y-2">
                            <li>transporte regular do ponto cadastrado até a instituição de ensino;</li>
                            <li>transporte da instituição de ensino até o ponto cadastrado para desembarque;</li>
                            <li>horários programados para as rotas contratadas;</li>
                            <li>transporte de ida e volta, quando previsto no plano contratado;</li>
                            <li>inclusão do aluno em rota compatível;</li>
                            <li>comunicação operacional com o responsável;</li>
                            <li>acompanhamento da rota, quando essa funcionalidade estiver disponível;</li>
                            <li>outros serviços relacionados disponibilizados pela MAYLON.</li>
                        </ul>
                        <Clause number="3.2">
                            A disponibilização do serviço dependerá da existência
                            de rota compatível, veículo disponível, motorista
                            habilitado, capacidade operacional e região de
                            cobertura.
                        </Clause>
                        <Clause number="3.3">
                            A contratação não implica garantia de atendimento a
                            qualquer endereço, instituição de ensino, horário ou
                            região, estando a prestação sujeita à viabilidade
                            operacional.
                        </Clause>
                        <Clause number="3.4">
                            As rotas poderão ser alteradas em razão de questões
                            operacionais, segurança, trânsito, obras, alterações
                            escolares ou inclusão e retirada de alunos.
                        </Clause>
                        <Clause number="3.5">
                            A MAYLON poderá atualizar, ampliar ou alterar rotas e
                            modalidades de atendimento, mediante comunicação
                            quando aplicável, respeitando os direitos adquiridos
                            e a legislação vigente.
                        </Clause>
                    </TermSection>

                    <TermSection number="04" title="DO EMBARQUE E DO DESEMBARQUE DO ALUNO">
                        <Clause number="4.1">
                            O aluno deverá estar disponível no ponto de embarque
                            cadastrado, preferencialmente alguns minutos antes do
                            horário estimado de passagem do veículo.
                        </Clause>
                        <Clause number="4.2">
                            A MAYLON não poderá ser responsabilizada por atraso
                            decorrente da indisponibilidade do aluno no local
                            indicado, cabendo ao responsável garantir que o aluno
                            esteja preparado para o embarque.
                        </Clause>
                        <Clause number="4.3">
                            Quando houver necessidade de entrega do aluno a uma
                            pessoa autorizada, o responsável deverá fornecer
                            previamente os dados necessários para sua
                            identificação.
                        </Clause>
                        <Clause number="4.4">
                            Caso não esteja disponível pessoa autorizada para
                            receber o aluno, poderão ser adotados procedimentos
                            de segurança, incluindo contato com o responsável,
                            direcionamento para local seguro previamente definido
                            ou outras orientações operacionais adequadas à
                            situação.
                        </Clause>
                        <Clause number="4.5">
                            O responsável deverá manter seus canais de contato
                            atualizados e acessíveis durante o período de
                            transporte.
                        </Clause>
                        <Clause number="4.6">
                            Eventuais atrasos decorrentes de trânsito, condições
                            climáticas, acidentes, bloqueios viários, obras ou
                            outras circunstâncias poderão ser comunicados ao
                            responsável quando possível.
                        </Clause>
                    </TermSection>

                    <TermSection number="05" title="DA SEGURANÇA E DA CONDUTA DO ALUNO">
                        <Clause number="5.1">
                            O aluno deverá respeitar as orientações fornecidas
                            pelo motorista e as regras de segurança aplicáveis ao
                            transporte escolar.
                        </Clause>
                        <Clause number="5.2">
                            O uso do cinto de segurança será obrigatório durante
                            o trajeto sempre que disponibilizado e exigido pela
                            legislação aplicável.
                        </Clause>
                        <Clause number="5.3">
                            Não serão permitidas condutas que possam colocar em
                            risco o próprio aluno, demais passageiros, motorista
                            ou terceiros.
                        </Clause>
                        <Clause number="5.4">
                            O aluno deverá permanecer sentado e utilizar
                            corretamente os equipamentos de segurança
                            disponibilizados.
                        </Clause>
                        <Clause number="5.5">
                            Danos intencionais causados ao veículo ou aos
                            equipamentos poderão ser comunicados ao responsável,
                            observadas a legislação aplicável e as
                            responsabilidades legalmente cabíveis.
                        </Clause>
                        <Clause number="5.6">
                            Comportamentos que representem risco poderão resultar
                            no contato com o responsável e na adoção das medidas
                            necessárias à preservação da segurança.
                        </Clause>
                    </TermSection>

                    <TermSection number="06" title="DOS VEÍCULOS E DOS MOTORISTAS">
                        <Clause number="6.1">
                            Os veículos utilizados deverão observar os requisitos
                            legais e regulamentares aplicáveis ao transporte
                            escolar, incluindo documentação, equipamentos
                            obrigatórios e condições de segurança.
                        </Clause>
                        <Clause number="6.2">
                            Os motoristas deverão atender aos requisitos legais e
                            regulamentares aplicáveis à condução de veículos
                            destinados ao transporte escolar.
                        </Clause>
                        <Clause number="6.3">
                            A MAYLON poderá substituir motorista ou veículo por
                            motivos operacionais, manutenção, segurança,
                            indisponibilidade, férias, afastamento ou outras
                            necessidades justificadas da operação.
                        </Clause>
                        <Clause number="6.4">
                            A substituição não implicará alteração do contrato
                            quando forem preservadas as condições essenciais do
                            serviço e observados os requisitos legais aplicáveis.
                        </Clause>
                        <Clause number="6.5">
                            O responsável poderá utilizar os canais oficiais da
                            MAYLON para solicitar informações operacionais,
                            observadas as regras de segurança e proteção de
                            dados pessoais.
                        </Clause>
                    </TermSection>

                    <TermSection number="07" title="DA RESPONSABILIDADE DO RESPONSÁVEL LEGAL">
                        <Clause number="7.1">
                            O responsável deverá fornecer informações verdadeiras,
                            completas e atualizadas.
                        </Clause>
                        <Clause number="7.2">
                            Deverá informar condições específicas do aluno que
                            sejam relevantes para a segurança ou adequada
                            prestação do serviço, respeitada a legislação de
                            proteção de dados pessoais.
                        </Clause>
                        <Clause number="7.3">
                            Deverá manter atualizados telefone, endereço,
                            contatos de emergência e demais canais necessários à
                            comunicação.
                        </Clause>
                        <Clause number="7.4">
                            Caberá ao responsável autorizar a utilização do
                            serviço e indicar as pessoas autorizadas a receber o
                            aluno, quando aplicável.
                        </Clause>
                        <Clause number="7.5">
                            Alterações que possam afetar a segurança ou a execução
                            do serviço deverão ser comunicadas imediatamente à
                            MAYLON.
                        </Clause>
                    </TermSection>

                    <TermSection number="08" title="DAS MENSALIDADES E DO PAGAMENTO">
                        <Clause number="8.1">
                            O responsável deverá efetuar o pagamento do plano,
                            rota ou modalidade contratada conforme as condições
                            comerciais estabelecidas.
                        </Clause>
                        <Clause number="8.2">
                            Os valores poderão variar de acordo com região,
                            distância, quantidade de dias, período escolar,
                            modalidade contratada e demais condições comerciais
                            aplicáveis.
                        </Clause>
                        <Clause number="8.3">
                            O inadimplemento poderá resultar na suspensão do
                            serviço, observadas as condições previamente
                            estabelecidas e a legislação aplicável.
                        </Clause>
                        <Clause number="8.4">
                            Alterações de preços, planos ou condições comerciais
                            serão comunicadas previamente quando exigido pela
                            legislação ou pelas condições contratuais.
                        </Clause>
                    </TermSection>

                    <TermSection number="09" title="DAS FALTAS, CANCELAMENTOS E ALTERAÇÕES DE ROTA">
                        <Clause number="9.1">
                            O responsável deverá comunicar, sempre que possível
                            com antecedência, eventuais ausências programadas do
                            aluno.
                        </Clause>
                        <Clause number="9.2">
                            A ausência do aluno não implicará automaticamente
                            desconto ou restituição de valores, salvo quando
                            previsto no plano contratado ou determinado pela
                            legislação aplicável.
                        </Clause>
                        <Clause number="9.3">
                            Alterações de endereço, instituição de ensino ou
                            horário estarão sujeitas à viabilidade operacional.
                        </Clause>
                        <Clause number="9.4">
                            Alterações significativas de rota poderão resultar em
                            alteração do preço, mediante comunicação prévia
                            quando aplicável.
                        </Clause>
                    </TermSection>

                    <TermSection number="10" title="DA PROTEÇÃO DE DADOS PESSOAIS">
                        <Clause number="10.1">
                            A MAYLON poderá realizar o tratamento dos dados
                            pessoais necessários à execução dos serviços,
                            cadastro do aluno, comunicação com o responsável,
                            organização de rotas, segurança, atendimento e
                            cumprimento de obrigações legais e regulatórias.
                        </Clause>
                        <Clause number="10.2">
                            O tratamento de dados observará a Lei nº 13.709/2018
                            (Lei Geral de Proteção de Dados Pessoais - LGPD) e
                            demais normas aplicáveis.
                        </Clause>
                        <Clause number="10.3">
                            O tratamento de dados de crianças e adolescentes
                            observará as proteções legais aplicáveis, inclusive
                            aquelas relacionadas ao melhor interesse da criança e
                            do adolescente.
                        </Clause>
                        <Clause number="10.4">
                            O responsável poderá consultar a Política de
                            Privacidade da MAYLON para obter informações sobre
                            coleta, utilização, armazenamento, compartilhamento e
                            proteção de dados pessoais.
                        </Clause>
                    </TermSection>

                    <TermSection number="11" title="DAS SITUAÇÕES DE EMERGÊNCIA">
                        <Clause number="11.1">
                            Em situações de emergência ocorridas durante o
                            transporte, a MAYLON e/ou o motorista poderão adotar
                            as medidas necessárias para preservar a segurança e a
                            integridade do aluno e das demais pessoas envolvidas.
                        </Clause>
                        <Clause number="11.2">
                            O responsável será comunicado assim que possível,
                            considerando as circunstâncias da ocorrência.
                        </Clause>
                        <Clause number="11.3">
                            Quando necessário, poderão ser acionados serviços
                            públicos de emergência, incluindo SAMU, Corpo de
                            Bombeiros ou Polícia.
                        </Clause>
                        <Clause number="11.4">
                            Em situações que exijam intervenção imediata para
                            preservação da vida ou integridade física, a adoção de
                            medidas emergenciais não dependerá de autorização
                            prévia do responsável, quando isso não for
                            materialmente possível.
                        </Clause>
                    </TermSection>

                    <TermSection number="12" title="DOS OBJETOS PESSOAIS">
                        <Clause number="12.1">
                            Recomenda-se que o aluno não transporte objetos de
                            elevado valor ou itens desnecessários durante o
                            trajeto escolar.
                        </Clause>
                        <Clause number="12.2">
                            A MAYLON não será responsável por objetos pessoais
                            deixados ou esquecidos no veículo, salvo quando
                            comprovada responsabilidade direta nos termos da
                            legislação aplicável.
                        </Clause>
                        <Clause number="12.3">
                            Objetos encontrados poderão ser encaminhados aos
                            procedimentos internos de achados e perdidos
                            disponibilizados pela MAYLON.
                        </Clause>
                    </TermSection>

                    <TermSection number="13" title="DA VIGÊNCIA, SUSPENSÃO E CANCELAMENTO">
                        <Clause number="13.1">
                            A contratação permanecerá vigente durante o período
                            contratado, observadas as condições estabelecidas no
                            respectivo plano ou contrato.
                        </Clause>
                        <Clause number="13.2">
                            O responsável poderá solicitar o cancelamento por meio
                            dos canais oficiais da MAYLON, observadas as condições
                            contratuais e a legislação aplicável.
                        </Clause>
                        <Clause number="13.3">
                            A MAYLON poderá suspender ou cancelar a prestação do
                            serviço em situações como inadimplência, uso
                            indevido, fornecimento de informações falsas,
                            descumprimento das regras de segurança ou outras
                            hipóteses previstas neste Termo ou na legislação.
                        </Clause>
                        <Clause number="13.4">
                            O cancelamento ou suspensão não afastará eventuais
                            obrigações financeiras legalmente devidas até a data
                            efetiva do encerramento.
                        </Clause>
                    </TermSection>

                    <TermSection number="14" title="DAS DISPOSIÇÕES GERAIS">
                        <Clause number="14.1">
                            A contratação, utilização ou aceite eletrônico do
                            serviço representa concordância com este Termo de Uso
                            e com as políticas aplicáveis ao Programa.
                        </Clause>
                        <Clause number="14.2">
                            A eventual tolerância quanto ao descumprimento de
                            determinada disposição não constituirá renúncia ou
                            alteração permanente de direito.
                        </Clause>
                        <Clause number="14.3">
                            A MAYLON poderá atualizar este Termo em razão de
                            alterações operacionais, legais ou regulatórias,
                            respeitando os direitos previstos em lei.
                        </Clause>
                        <Clause number="14.4">
                            Caso alguma disposição deste Termo seja considerada
                            inválida ou inexigível, as demais disposições
                            permanecerão válidas naquilo que não forem afetadas.
                        </Clause>
                        <Clause number="14.5">
                            A relação será regida pela legislação brasileira,
                            inclusive pelas normas de proteção ao consumidor e
                            pelas regras aplicáveis ao transporte escolar.
                        </Clause>
                    </TermSection>

                    <TermSection number="15" title="DO ACEITE DO TERMO DE USO">
                        <Clause number="15.1">
                            O cadastro, contratação, aceite ou utilização dos
                            serviços implica declaração do responsável legal de
                            que teve acesso a este Termo de Uso, realizou sua
                            leitura, compreendeu suas disposições e concorda com
                            as condições estabelecidas.
                        </Clause>
                        <Clause number="15.2">
                            O aceite eletrônico poderá ser registrado por meio de
                            informações técnicas necessárias à comprovação da
                            contratação e manifestação de vontade, observada a
                            legislação aplicável.
                        </Clause>
                        <Clause number="15.3">
                            Caso o responsável não concorde com as disposições
                            deste Termo, deverá interromper o processo de
                            contratação e não utilizar os serviços do Maylon Van
                            Escolar.
                        </Clause>
                    </TermSection>

                    <div className="mt-12 rounded-2xl border border-[#35a989]/20 bg-[#35a989]/5 p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#35a989] text-white">
                                <CheckCircle2 size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Aceite e ciência
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Ao realizar o cadastro, contratar ou utilizar
                                    os serviços do Maylon Van Escolar, o
                                    responsável legal declara estar ciente das
                                    condições deste Termo de Uso e das demais
                                    políticas aplicáveis ao serviço.
                                </p>
                            </div>
                        </div>
                    </div>
                </article>

                <div className="mt-8">
                    <Link
                        href={VAN_ROUTE}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#35a989] hover:text-[#27866c]"
                    >
                        <ArrowLeft size={18} />
                        Voltar para o Maylon Van Escolar
                    </Link>
                </div>
            </div>

            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
                    <Image
                        src="/logo.png"
                        alt="Logo Maylon"
                        width={120}
                        height={40}
                        className="mx-auto h-9 w-auto object-contain"
                    />
                    <p className="mt-4 text-sm text-slate-500">
                        © {new Date().getFullYear()} Maylon. Todos os direitos
                        reservados.
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        Maylon Van Escolar
                    </p>
                </div>
            </footer>
        </main>
    );
}