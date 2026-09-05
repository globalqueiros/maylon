"use client";

import {
    ChangeEvent,
    FormEvent,
    ReactNode,
    useEffect,
    useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from "@fortawesome/free-brands-svg-icons";
import StripeProvider from "../../../app/components/StripeProvider";
import CartaoForm from "../../../app/components/CartaoForm";


type PaymentMethod = "pix" | "cartao_business" | "";

type FormState = {
    cnpj: string;
    razaoSocial: string;
    nomeFantasia: string;
    email: string;
    telefone: string;
    password: string;
    confirmPassword: string;
    user_type: number;
    meioPagamento: PaymentMethod;
};

type PixData = {
    qrCode?: string;
    copiaCola?: string;
};

type CartaoData = {
    success: boolean;
    empresa: string;
    mensagem?: string;
};

type RegisterResponse = {
    success?: boolean;
    message?: string;

    empresa?: {
        id?: number;
        cnpj?: string;
        razaoSocial?: string;
        nomeFantasia?: string | null;
        email?: string;
        telefone?: string;
        user_type?: number;
        foto?: boolean;
        fotoTipo?: string | null;
    };

    pix?: PixData | null;

    cartaoBusiness?: {
        empresa?: string;
        mensagem?: string;
    } | null;
};

const initialForm: FormState = {
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: "",
    user_type: 2,
    meioPagamento: "",
};

export default function CadastroEmpresa() {
    const [loading, setLoading] = useState(false);
    const [consultandoCnpj, setConsultandoCnpj] = useState(false);
    const [form, setForm] = useState<FormState>(initialForm);
    const [pixData, setPixData] = useState<PixData | null>(null);
    const [cartaoData, setCartaoData] =
        useState<CartaoData | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] =
        useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [fotoPerfil, setFotoPerfil] =
        useState<File | null>(null);
    const [previewFoto, setPreviewFoto] =
        useState<string | null>(null);

    useEffect(() => {
        return () => {
            if (previewFoto) {
                URL.revokeObjectURL(previewFoto);
            }
        };
    }, [previewFoto]);

    function updateField<K extends keyof FormState>(
        field: K,
        value: FormState[K]
    ) {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    function formatCNPJ(value: string) {
        const numbers = value
            .replace(/\D/g, "")
            .slice(0, 14);

        return numbers
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(
                /^(\d{2})\.(\d{3})(\d)/,
                "$1.$2.$3"
            )
            .replace(
                /\.(\d{3})(\d)/,
                ".$1/$2"
            )
            .replace(
                /(\d{4})(\d)/,
                "$1-$2"
            );
    }

    function formatTelefone(value: string) {
        const numbers = value
            .replace(/\D/g, "")
            .slice(0, 11);

        if (numbers.length <= 2) {
            return numbers.length
                ? `(${numbers}`
                : "";
        }

        if (numbers.length <= 7) {
            return `(${numbers.slice(
                0,
                2
            )}) ${numbers.slice(2)}`;
        }

        return `(${numbers.slice(
            0,
            2
        )}) ${numbers.slice(2, 7)}-${numbers.slice(
            7
        )}`;
    }

    function validarCNPJ(cnpj: string) {
        const numbers = cnpj.replace(/\D/g, "");

        if (numbers.length !== 14) {
            return false;
        }

        if (/^(\d)\1{13}$/.test(numbers)) {
            return false;
        }

        function calcularDigito(base: string) {
            const pesos =
                base.length === 12
                    ? [
                        5,
                        4,
                        3,
                        2,
                        9,
                        8,
                        7,
                        6,
                        5,
                        4,
                        3,
                        2,
                    ]
                    : [
                        6,
                        5,
                        4,
                        3,
                        2,
                        9,
                        8,
                        7,
                        6,
                        5,
                        4,
                        3,
                        2,
                    ];

            let soma = 0;

            for (
                let i = 0;
                i < base.length;
                i++
            ) {
                soma +=
                    Number(base[i]) * pesos[i];
            }

            const resto = soma % 11;

            return resto < 2
                ? 0
                : 11 - resto;
        }

        const primeiroDigito =
            calcularDigito(
                numbers.substring(0, 12)
            );

        if (
            primeiroDigito !==
            Number(numbers[12])
        ) {
            return false;
        }

        const segundoDigito =
            calcularDigito(
                numbers.substring(0, 13)
            );

        if (
            segundoDigito !==
            Number(numbers[13])
        ) {
            return false;
        }

        return true;
    }

    async function buscarCNPJ(cnpj: string) {
        const numero = cnpj.replace(/\D/g, "");

        if (numero.length !== 14) {
            return;
        }

        if (!validarCNPJ(numero)) {
            setError(
                "Informe um CNPJ válido."
            );
            setSuccess("");
            return;
        }

        try {
            setConsultandoCnpj(true);

            setError("");
            setSuccess("");

            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${numero}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                    },
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(
                    "CNPJ não encontrado."
                );
            }

            const data =
                await response.json();

            setForm((prev) => ({
                ...prev,
                cnpj: formatCNPJ(numero),
                razaoSocial:
                    data.razao_social ?? "",
                nomeFantasia:
                    data.nome_fantasia ?? "",
            }));
        } catch (err) {
            console.error(
                "Erro ao consultar CNPJ:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível consultar o CNPJ."
            );

            setSuccess("");
        } finally {
            setConsultandoCnpj(false);
        }
    }

    function handleFotoChange(
        e: ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");
        setSuccess("");

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Selecione uma imagem PNG, JPG ou WEBP."
            );

            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError(
                "A imagem deve ter no máximo 5MB."
            );

            e.target.value = "";
            return;
        }

        if (previewFoto) {
            URL.revokeObjectURL(previewFoto);
        }

        const preview =
            URL.createObjectURL(file);

        setFotoPerfil(file);
        setPreviewFoto(preview);
    }

    function removerFoto() {
        if (previewFoto) {
            URL.revokeObjectURL(previewFoto);
        }

        setFotoPerfil(null);
        setPreviewFoto(null);
    }

    function limparPagamentos() {
        setPixData(null);
        setCartaoData(null);
    }

    function handleReset() {
        if (loading) {
            return;
        }

        removerFoto();

        setForm(initialForm);

        limparPagamentos();

        setError("");
        setSuccess("");

        setShowPassword(false);
        setShowConfirmPassword(false);
    }

    function validarFormulario() {
        const cnpj =
            form.cnpj.replace(/\D/g, "");

        const telefone =
            form.telefone.replace(
                /\D/g,
                ""
            );

        if (!validarCNPJ(cnpj)) {
            return "Informe um CNPJ válido.";
        }

        if (!form.razaoSocial.trim()) {
            return "A razão social é obrigatória.";
        }

        if (!form.email.trim()) {
            return "Informe o e-mail da empresa.";
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email.trim()
            )
        ) {
            return "Informe um e-mail válido.";
        }

        if (
            telefone.length < 10 ||
            telefone.length > 11
        ) {
            return "Informe um telefone válido.";
        }

        if (form.password.length < 6) {
            return "A senha deve ter pelo menos 6 caracteres.";
        }

        if (
            form.password !==
            form.confirmPassword
        ) {
            return "As senhas não coincidem.";
        }

        if (!form.meioPagamento) {
            return "Selecione um meio de pagamento.";
        }

        return null;
    }

    useEffect(() => {
        if (!success) return;
        const timer = setTimeout(() => {
            setSuccess("");
        }, 15000);
        return () => clearTimeout(timer);
    }, [success]);


    async function handleSubmit(
        e: FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        if (loading) {
            return;
        }

        setError("");
        setSuccess("");
        limparPagamentos();

        const validationError =
            validarFormulario();

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);

            const dados = new FormData();

            dados.append(
                "cnpj",
                form.cnpj.replace(/\D/g, "")
            );

            dados.append(
                "razaoSocial",
                form.razaoSocial.trim()
            );

            dados.append(
                "nomeFantasia",
                form.nomeFantasia.trim()
            );

            dados.append(
                "email",
                form.email.trim().toLowerCase()
            );

            dados.append(
                "telefone",
                form.telefone.replace(
                    /\D/g,
                    ""
                )
            );

            dados.append(
                "password",
                form.password
            );

            dados.append(
                "user_type",
                String(form.user_type)
            );

            dados.append(
                "meioPagamento",
                form.meioPagamento
            );

            if (fotoPerfil) {
                dados.append(
                    "fotoPerfil",
                    fotoPerfil
                );
            }

            const response = await fetch(
                "/api/register",
                {
                    method: "POST",
                    body: dados,
                }
            );

            const contentType =
                response.headers.get(
                    "content-type"
                ) ?? "";

            let data: RegisterResponse = {};

            if (
                contentType.includes(
                    "application/json"
                )
            ) {
                data =
                    await response.json();
            } else {
                const text =
                    await response.text();

                if (text) {
                    console.warn(
                        "Resposta inesperada da API:",
                        text
                    );
                }
            }

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    `Erro ao cadastrar empresa. Código: ${response.status}`
                );
            }

            /*
             * PAGAMENTO PIX
             */
            if (
                form.meioPagamento === "pix"
            ) {
                if (data.pix) {
                    setPixData(data.pix);
                }

                setSuccess(
                    "Empresa cadastrada com sucesso."
                );
            }

            /*
             * CARTÃO BUSINESS
             */
            if (
                form.meioPagamento ===
                "cartao_business"
            ) {
                setCartaoData({
                    success: true,
                    empresa:
                        data.cartaoBusiness
                            ?.empresa ??
                        (form.nomeFantasia ||
                            form.razaoSocial),
                    mensagem:
                        data.cartaoBusiness
                            ?.mensagem ??
                        "Cartão Business selecionado.",
                });

                setSuccess(
                    "Empresa cadastrada com sucesso."
                );
            }

            setForm((prev) => ({
                ...initialForm,
                meioPagamento:
                    prev.meioPagamento,
            }));

            setShowPassword(false);
            setShowConfirmPassword(false);

            removerFoto();
        } catch (err) {
            console.error(
                "Erro no cadastro:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Não foi possível concluir o cadastro."
            );

            setSuccess("");
        } finally {
            setLoading(false);
        }
    }

    async function copiarPix() {
        if (!pixData?.copiaCola) {
            return;
        }

        try {
            await navigator.clipboard.writeText(
                pixData.copiaCola
            );

            setSuccess(
                "PIX Copia e Cola copiado."
            );

            setError("");
        } catch (err) {
            console.error(
                "Erro ao copiar PIX:",
                err
            );

            setError(
                "Não foi possível copiar automaticamente. Copie o código manualmente."
            );

            setSuccess("");
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#163D35]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#49aa95]/30 blur-3xl" />

                <div className="absolute -bottom-52 -right-40 h-[650px] w-[650px] rounded-full bg-[#49aa95]/25 blur-3xl" />

                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#49aa95]/10 blur-3xl" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(73,170,149,0.18),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(73,170,149,0.15),transparent_35%)]" />

                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                        backgroundSize:
                            "50px 50px",
                    }}
                />
            </div>

            {/* =====================================================
                CONTAINER
            ====================================================== */}

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">
                <div className="grid w-full overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-[0.8fr_1.4fr]">

                    {/* =================================================
                        LADO ESQUERDO
                    ================================================== */}

                    <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#102F2A] via-[#163D35] to-[#245B4E] p-12 text-white lg:flex lg:flex-col lg:justify-between">

                        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full border-[60px] border-[#49aa95]/10" />

                        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[80px] border-[#49aa95]/10" />

                        <div className="relative z-10">

                            <div className="mb-12 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#49aa95] shadow-lg shadow-[#49aa95]/25">
                                    <svg
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M3 21h18" />
                                        <path d="M5 21V9l7-5 7 5v12" />
                                        <path d="M9 21v-6h6v6" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-lg font-bold text-white">
                                        Portal Maylon Connect
                                    </p>

                                    <p className="text-xs text-white/50">
                                        Gestão de empresas
                                    </p>
                                </div>
                            </div>

                            <h1 className="max-w-md text-left text-3xl font-bold leading-tight text-white">
                                Cadastre sua empresa no{" "}
                                <span className="text-[#49aa95]">
                                    Portal Empresarial.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-md text-justify text-sm leading-6 text-white/80">
                                Uma plataforma completa para uma gestão empresarial simples, segura e eficiente.
                            </p>
                        </div>
                    </section>

                    {/* =================================================
                        FORMULÁRIO
                    ================================================== */}

                    <section className="bg-white p-7 sm:p-10 lg:p-12">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                Cadastro da Empresa
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                Preencha os dados abaixo para cadastrar sua empresa no portal.
                            </p>
                        </div>
                        {success && !error && (
                            <div className="fixed right-5 top-5 z-[9999] w-[360px] max-w-[calc(100vw-2rem)] animate-[slideIn_.3s_ease-out]">
                                <div className="relative overflow-hidden rounded-xl border border-[#49aa95]/20 bg-white shadow-2xl">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-[#49aa95]" />
                                    <div className="flex items-start gap-3 p-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#49aa95]/10 text-[#49aa95]">
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M5 12l4 4L19 6" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold text-[#287c69]">
                                                Sucesso
                                            </p>

                                            <p className="mt-1 text-sm leading-5 text-slate-600">
                                                {success}
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setSuccess("")}
                                            className="shrink-0 cursor-pointer text-slate-400 transition hover:text-[#287c69]"
                                            aria-label="Fechar mensagem"
                                        >
                                            <svg
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M6 6l12 12" />
                                                <path d="M18 6L6 18" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="grid gap-5 md:grid-cols-2">

                                {/* FOTO */}

                                <div className="m-auto md:col-span-2">

                                    <label className="mb-3 block text-center text-sm font-semibold text-slate-700">
                                        Foto da Empresa
                                    </label>

                                    <label
                                        htmlFor="fotoPerfil"
                                        className="group flex w-fit cursor-pointer flex-col items-center"
                                    >
                                        <div className="flex h-[250px] w-[250px] max-w-full items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition hover:border-[#49aa95] hover:bg-[#49aa95]/5">

                                            {previewFoto ? (
                                                <img
                                                    src={
                                                        previewFoto
                                                    }
                                                    alt="Preview da foto da empresa"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex flex-col items-center justify-center">

                                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#49aa95]/10 text-[#49aa95]">
                                                        <svg
                                                            className="h-8 w-8"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                        >
                                                            <rect
                                                                x="3"
                                                                y="3"
                                                                width="18"
                                                                height="18"
                                                                rx="3"
                                                            />

                                                            <circle
                                                                cx="8.5"
                                                                cy="8.5"
                                                                r="1.5"
                                                            />

                                                            <path d="M21 15l-5-5L5 21" />
                                                        </svg>
                                                    </div>

                                                    <p className="mt-4 text-sm font-semibold text-slate-700">
                                                        Clique para adicionar sua logo
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        PNG, JPG ou WEBP — máximo 5MB
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <input
                                        id="fotoPerfil"
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        className="hidden"
                                        onChange={
                                            handleFotoChange
                                        }
                                    />

                                    {previewFoto && (
                                        <button
                                            type="button"
                                            onClick={
                                                removerFoto
                                            }
                                            disabled={
                                                loading
                                            }
                                            className="mt-3 block w-full cursor-pointer text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50"
                                        >
                                            Remover foto
                                        </button>
                                    )}
                                </div>

                                {/* CNPJ */}

                                <div>
                                    <label
                                        htmlFor="cnpj"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        CNPJ
                                    </label>

                                    <input
                                        id="cnpj"
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete="organization"
                                        value={form.cnpj}
                                        onChange={(e) =>
                                            updateField(
                                                "cnpj",
                                                formatCNPJ(
                                                    e.target
                                                        .value
                                                )
                                            )
                                        }
                                        onBlur={() =>
                                            buscarCNPJ(
                                                form.cnpj
                                            )
                                        }
                                        placeholder="00.000.000/0001-00"
                                        maxLength={18}
                                        required
                                        disabled={
                                            loading ||
                                            consultandoCnpj
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#49aa95] focus:bg-white focus:ring-4 focus:ring-[#49aa95]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <p className="mt-1.5 text-xs text-slate-400">
                                        {consultandoCnpj
                                            ? "Consultando CNPJ..."
                                            : "Informe o CNPJ para buscar os dados automaticamente."}
                                    </p>
                                </div>

                                {/* NOME FANTASIA */}

                                <div>
                                    <label
                                        htmlFor="nomeFantasia"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Nome Fantasia
                                    </label>

                                    <input
                                        id="nomeFantasia"
                                        type="text"
                                        value={
                                            form.nomeFantasia
                                        }
                                        readOnly
                                        placeholder="Será preenchido automaticamente"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-600 outline-none"
                                    />
                                </div>

                                {/* RAZÃO SOCIAL */}

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="razaoSocial"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Razão Social
                                    </label>

                                    <input
                                        id="razaoSocial"
                                        type="text"
                                        value={
                                            form.razaoSocial
                                        }
                                        readOnly
                                        placeholder="Será preenchida automaticamente"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm text-slate-600 outline-none"
                                    />
                                </div>

                                {/* EMAIL */}

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        E-mail
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            updateField(
                                                "email",
                                                e.target
                                                    .value
                                            )
                                        }
                                        placeholder="empresa@email.com"
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#49aa95] focus:bg-white focus:ring-4 focus:ring-[#49aa95]/10 disabled:opacity-60"
                                    />
                                </div>

                                {/* TELEFONE */}

                                <div>
                                    <label
                                        htmlFor="telefone"
                                        className="mb-2 block text-sm font-semibold text-slate-700"
                                    >
                                        Telefone
                                    </label>

                                    <input
                                        id="telefone"
                                        type="tel"
                                        inputMode="tel"
                                        autoComplete="tel"
                                        value={
                                            form.telefone
                                        }
                                        onChange={(e) =>
                                            updateField(
                                                "telefone",
                                                formatTelefone(
                                                    e.target
                                                        .value
                                                )
                                            )
                                        }
                                        placeholder="(00) 00000-0000"
                                        maxLength={15}
                                        required
                                        disabled={loading}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-[#49aa95] focus:bg-white focus:ring-4 focus:ring-[#49aa95]/10 disabled:opacity-60"
                                    />
                                </div>

                                {/* SENHA */}

                                <PasswordField
                                    id="password"
                                    label="Senha"
                                    value={
                                        form.password
                                    }
                                    show={
                                        showPassword
                                    }
                                    onToggle={() =>
                                        setShowPassword(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "password",
                                            value
                                        )
                                    }
                                    error={
                                        form.password
                                            .length >
                                        0 &&
                                        form.password
                                            .length <
                                        6
                                    }
                                    disabled={
                                        loading
                                    }
                                />

                                {/* CONFIRMAR SENHA */}

                                <PasswordField
                                    id="confirmPassword"
                                    label="Confirmar senha"
                                    value={
                                        form.confirmPassword
                                    }
                                    show={
                                        showConfirmPassword
                                    }
                                    onToggle={() =>
                                        setShowConfirmPassword(
                                            (prev) =>
                                                !prev
                                        )
                                    }
                                    onChange={(
                                        value
                                    ) =>
                                        updateField(
                                            "confirmPassword",
                                            value
                                        )
                                    }
                                    error={
                                        form
                                            .confirmPassword
                                            .length >
                                        0 &&
                                        form.password !==
                                        form.confirmPassword
                                    }
                                    success={
                                        form
                                            .confirmPassword
                                            .length >
                                        0 &&
                                        form.password ===
                                        form.confirmPassword
                                    }
                                    disabled={
                                        loading
                                    }
                                />

                                {/* PAGAMENTO */}

                                <div className="md:col-span-2">

                                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                                        Meio de pagamento
                                    </label>

                                    <div className="grid gap-3 sm:grid-cols-2">

                                        <PaymentOption
                                            value="cartao_business"
                                            label="Cartão Business"
                                            description="Cartão empresarial"
                                            selected={
                                                form.meioPagamento ===
                                                "cartao_business"
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateField(
                                                    "meioPagamento",
                                                    value
                                                )
                                            }
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <rect
                                                    x="3"
                                                    y="5"
                                                    width="18"
                                                    height="14"
                                                    rx="2"
                                                />

                                                <path d="M3 10h18" />

                                                <path d="M7 15h3" />
                                            </svg>
                                        </PaymentOption>

                                        <PaymentOption
                                            value="pix"
                                            label="PIX"
                                            description="Pagamento instantâneo"
                                            selected={
                                                form.meioPagamento ===
                                                "pix"
                                            }
                                            onChange={(
                                                value
                                            ) =>
                                                updateField(
                                                    "meioPagamento",
                                                    value
                                                )
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    faPix
                                                }
                                                className="text-xl"
                                            />
                                        </PaymentOption>

                                    </div>
                                </div>
                            </div>

                            {/* =================================================
                                SEGURANÇA
                            ================================================== */}

                            <div className="mt-7 rounded-2xl border border-[#49aa95]/10 bg-[#49aa95]/5 p-4">
                                <div className="flex gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#49aa95]/15 text-[#49aa95]">
                                        <svg
                                            className="h-5 w-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />

                                            <path d="M9 12l2 2 4-4" />
                                        </svg>
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-slate-700">
                                            Cadastro seguro
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Seus dados empresariais são tratados com segurança e utilizados apenas para as funcionalidades do portal.
                                        </p>

                                    </div>
                                </div>
                            </div>

                            {/* =================================================
                                CARTÃO BUSINESS
                            ================================================== */}

                            {cartaoData && (
                                <PaymentResult
                                    title="Cartão Business selecionado"
                                    description="O Cartão Business foi vinculado à empresa:"
                                >

                                    <StripeProvider>
                                        <CartaoForm />
                                    </StripeProvider>


                                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#49aa95]/10 px-4 py-3">

                                        <svg
                                            className="h-5 w-5 shrink-0 text-[#49aa95]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M5 12l4 4L19 6" />
                                        </svg>

                                        <p className="text-xs font-medium text-[#287c69]">
                                            {
                                                cartaoData.mensagem
                                            }
                                        </p>

                                    </div>

                                </PaymentResult>
                            )}

                            {/* =================================================
                                PIX
                            ================================================== */}

                            {pixData && (
                                <PaymentResult
                                    title="PIX gerado com sucesso"
                                    description="Escaneie o QR Code ou copie o código PIX para realizar o pagamento."
                                >

                                    {pixData.qrCode && (
                                        <div className="mt-4 flex justify-center rounded-xl bg-white p-4">

                                            <img
                                                src={`data:image/png;base64,${pixData.qrCode}`}
                                                alt="QR Code PIX para pagamento"
                                                className="h-48 w-48"
                                            />

                                        </div>
                                    )}

                                    {pixData.copiaCola && (
                                        <div className="mt-4">

                                            <label
                                                htmlFor="pixCopiaCola"
                                                className="mb-2 block text-xs font-semibold text-slate-600"
                                            >
                                                PIX Copia e Cola
                                            </label>

                                            <div className="flex gap-2">

                                                <input
                                                    id="pixCopiaCola"
                                                    type="text"
                                                    value={
                                                        pixData.copiaCola
                                                    }
                                                    readOnly
                                                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-600 outline-none"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={
                                                        copiarPix
                                                    }
                                                    className="rounded-xl bg-[#49aa95] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#3D9683]"
                                                >
                                                    Copiar
                                                </button>

                                            </div>
                                        </div>
                                    )}

                                </PaymentResult>
                            )}

                            {/* =================================================
                                BOTÕES
                            ================================================== */}

                            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={
                                        handleReset
                                    }
                                    disabled={
                                        loading
                                    }
                                    className="cursor-pointer rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-[#49aa95]/30 hover:bg-[#49aa95]/5 hover:text-[#49aa95] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    disabled={
                                        loading ||
                                        consultandoCnpj
                                    }
                                    className="cursor-pointer rounded-xl bg-[#49aa95] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#49aa95]/20 transition-all hover:-translate-y-0.5 hover:bg-[#3D9683] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading
                                        ? "Cadastrando..."
                                        : "Cadastrar Empresa"}
                                </button>

                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </main >
    );
}

/* =========================================================
   ALERT
========================================================= */

function Alert({
    type,
    message,
    onClose,
}: {
    type:
    | "success"
    | "warning"
    | "info"
    | "error";

    message: string;

    onClose: () => void;
}) {
    const styles = {
        success: {
            container:
                "border-[#35A87E] bg-[#EAF7F2] text-[#287C69]",
            icon: "text-[#35A87E]",
            title: "Sucesso",
        },

        warning: {
            container:
                "border-[#D29418] bg-[#FFF7E8] text-[#A66F08]",
            icon: "text-[#D29418]",
            title: "Atenção",
        },

        info: {
            container:
                "border-[#5278FF] bg-[#EEF2FF] text-[#4569E8]",
            icon: "text-[#5278FF]",
            title: "Informação",
        },

        error: {
            container:
                "border-[#FF5A4F] bg-[#FFF0EE] text-[#E8483D]",
            icon: "text-[#FF5A4F]",
            title: "Erro",
        },
    };

    const current = styles[type];

    return (
        <div
            role={
                type === "error"
                    ? "alert"
                    : "status"
            }
            aria-live={
                type === "error"
                    ? "assertive"
                    : "polite"
            }
            className={`relative flex min-h-[72px] w-full items-end overflow-hidden rounded-lg border-l-4 px-4 py-3 shadow-xl ${current.container}`}
        >
            {/* ÍCONE */}

            <div
                className={`mr-3 flex h-8 w-8 shrink-0 items-center justify-center ${current.icon}`}
            >
                {type === "success" && (
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            d="M5 12l4 4L19 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}

                {type === "warning" && (
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <path
                            d="M12 3L2.5 20h19L12 3z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M12 9v5"
                            strokeLinecap="round"
                        />

                        <circle
                            cx="12"
                            cy="17"
                            r=".8"
                            fill="currentColor"
                            stroke="none"
                        />
                    </svg>
                )}

                {type === "info" && (
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <path
                            d="M12 11v5"
                            strokeLinecap="round"
                        />

                        <circle
                            cx="12"
                            cy="8"
                            r=".8"
                            fill="currentColor"
                            stroke="none"
                        />
                    </svg>
                )}

                {type === "error" && (
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="9"
                        />

                        <path
                            d="M9 9l6 6M15 9l-6 6"
                            strokeLinecap="round"
                        />
                    </svg>
                )}
            </div>

            {/* CONTEÚDO */}

            <div className="min-w-0 flex-1 pr-8">
                <p className="text-xs font-bold">
                    {current.title}
                </p>

                <p className="mt-1 text-xs leading-5 opacity-90">
                    {message}
                </p>
            </div>

            {/* BOTÃO FECHAR */}

            <button
                type="button"
                onClick={onClose}
                aria-label="Fechar alerta"
                className={`absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md transition hover:bg-black/5 ${current.icon}`}
            >
                <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        d="M6 6l12 12M18 6L6 18"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
}

/* =========================================================
   PASSWORD FIELD
========================================================= */

function PasswordField({
    id,
    label,
    value,
    show,
    error,
    success,
    disabled,
    onToggle,
    onChange,
}: {
    id: string;
    label: string;
    value: string;
    show: boolean;
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    onToggle: () => void;
    onChange: (value: string) => void;
}) {
    return (
        <div>

            <label
                htmlFor={id}
                className="mb-2 block text-sm font-semibold text-slate-700"
            >
                {label}
            </label>

            <div className="relative">

                <input
                    id={id}
                    type={
                        show
                            ? "text"
                            : "password"
                    }
                    value={value}
                    onChange={(e) =>
                        onChange(
                            e.target.value
                        )
                    }
                    placeholder={
                        id === "password"
                            ? "Digite sua senha"
                            : "Confirme sua senha"
                    }
                    minLength={6}
                    required
                    disabled={disabled}
                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3.5 pr-12 text-sm outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 ${error
                        ? "border-red-300 focus:border-red-400 focus:ring-red-400/10"
                        : success
                            ? "border-[#49aa95] focus:border-[#49aa95] focus:ring-[#49aa95]/10"
                            : "border-slate-200 focus:border-[#49aa95] focus:ring-[#49aa95]/10"
                        }`}
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-[#49aa95] disabled:cursor-not-allowed"
                    aria-label={
                        show
                            ? "Ocultar senha"
                            : "Mostrar senha"
                    }
                >
                    {show ? (
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M3 3l18 18" />
                            <path d="M10.6 10.6a2 2 0 1 0 2.8 2.8" />
                            <path d="M9.9 4.2A10.5 10.5 0 0 1 12 4c5 0 8.5 4 9.5 8a12 12 0 0 1-3 5" />
                            <path d="M6.6 6.6C4.5 8 3.2 10 2.5 12c1 4 4.5 8 9.5 8 1 0 2-.2 2.9-.5" />
                        </svg>
                    ) : (
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />

                            <circle
                                cx="12"
                                cy="12"
                                r="3"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {error && (
                <p className="mt-1.5 text-xs text-red-500">
                    {id === "password"
                        ? "A senha deve ter pelo menos 6 caracteres."
                        : "As senhas não coincidem."}
                </p>
            )}

            {success && !error && (
                <p className="mt-1.5 text-xs text-[#49aa95]">
                    ✓ As senhas coincidem.
                </p>
            )}
        </div>
    );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

function PaymentOption({
    value,
    label,
    description,
    selected,
    onChange,
    children,
}: {
    value: PaymentMethod;
    label: string;
    description: string;
    selected: boolean;
    onChange: (
        value: PaymentMethod
    ) => void;
    children: ReactNode;
}) {
    return (
        <label
            className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${selected
                ? "border-[#49aa95] bg-[#49aa95]/5 shadow-sm"
                : "border-slate-200 bg-slate-50 hover:border-[#49aa95]/40"
                }`}
        >
            <input
                type="radio"
                name="meioPagamento"
                value={value}
                checked={selected}
                onChange={(e) =>
                    onChange(
                        e.target.value as PaymentMethod
                    )
                }
                className="sr-only"
            />

            <div className="flex items-center gap-3">

                <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected
                        ? "bg-[#49aa95] text-white"
                        : "bg-slate-200 text-slate-500"
                        }`}
                >
                    {children}
                </div>

                <div>

                    <p className="text-sm font-semibold text-slate-700">
                        {label}
                    </p>

                    <p className="text-xs text-slate-400">
                        {description}
                    </p>

                </div>
            </div>

            {selected && <CheckIcon />}
        </label>
    );
}

/* =========================================================
   PAYMENT RESULT
========================================================= */

function PaymentResult({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: ReactNode;
}) {
    return (
        <div className="mt-6 rounded-2xl border border-[#49aa95]/20 bg-[#49aa95]/5 p-5">

            <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#49aa95] text-white">
                    <svg
                        className="h-6 w-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M5 12l4 4L19 6" />
                    </svg>
                </div>

                <div className="flex-1">

                    <h3 className="text-sm font-bold text-slate-800">
                        {title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {description}
                    </p>

                    {children}

                </div>
            </div>
        </div>
    );
}

/* =========================================================
   CHECK ICON
========================================================= */
function CheckIcon() {
    return (
        <div className="absolute right-3 top-3">

            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#49aa95]">

                <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                >
                    <path d="M5 12l4 4L19 6" />
                </svg>

            </div>
        </div>
    );
}
