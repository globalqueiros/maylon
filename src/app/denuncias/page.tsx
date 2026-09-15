"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    ShieldAlert,
    Upload,
    Send,
    FileText,
    Mail,
    Phone,
    User,
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";

export default function DenunciaPage() {
    const [loading, setLoading] = useState(false);
    const [numeroDenuncia, setNumeroDenuncia] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [tipoDenuncia, setTipoDenuncia] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [alertState, setAlertState] = useState<{
        open: boolean;
        type: "success" | "error";
        message: string;
    }>({
        open: false,
        type: "success",
        message: "",
    });

    function generateDenunciaNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const random = Math.floor(1000000 + Math.random() * 9000000);
        return `MAYDEN-${year}${random}`;
    }

    useEffect(() => {
        const STORAGE_KEY = "numero_denuncia";
        const STORAGE_TIME = "numero_denuncia_time";
        const savedNumber = localStorage.getItem(STORAGE_KEY);
        const savedTime = localStorage.getItem(STORAGE_TIME);
        const now = Date.now();
        const EXPIRATION_TIME = 5400000;
        if (
            savedNumber &&
            savedTime &&
            now - Number(savedTime) < EXPIRATION_TIME
        ) {
            setNumeroDenuncia(savedNumber);
        } else {
            const newNumber = generateDenunciaNumber();
            localStorage.setItem(STORAGE_KEY, newNumber);
            localStorage.setItem(STORAGE_TIME, now.toString());
            setNumeroDenuncia(newNumber);
        }
    }, []);

    function handleTelefoneChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 11);
        if (value.length > 10) {
            value = value.replace(
                /^(\d{2})(\d{5})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        } else {
            value = value.replace(
                /^(\d{2})(\d{4})(\d{0,4}).*/,
                "($1) $2-$3"
            );
        }
        setTelefone(value);
    }

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();
        const form = e.currentTarget;
        setLoading(true);
        try {
            const formData = new FormData(form);
            const response = await fetch("/api/denuncia", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "Erro ao enviar denúncia"
                );
            }
            setAlertState({
                open: true,
                type: "success",
                message: "Denúncia enviada com sucesso!",
            });
            form.reset();
            setNome("");
            setTelefone("");
            setTipoDenuncia("");
            setSelectedFiles([]);
            const newNumber = generateDenunciaNumber();
            setNumeroDenuncia(newNumber);
            localStorage.setItem(
                "numero_denuncia",
                newNumber
            );
            localStorage.setItem(
                "numero_denuncia_time",
                Date.now().toString()
            );
            setTimeout(() => {
                setAlertState((prev) => ({
                    ...prev,
                    open: false,
                }));
            }, 4000);
        } catch (error: any) {
            console.error(error);
            setAlertState({
                open: true,
                type: "error",
                message:
                    error.message || "Erro ao enviar denúncia",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <section className="relative min-h-screen overflow-hidden bg-[#f7faf9] py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20">
                <div
                    className={`
                        fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 z-50
                        transition-all duration-500
                        ${alertState.open
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-5 pointer-events-none opacity-0"
                        }
                    `}
                >
                    <div
                        className={`
                        w-full sm:max-w-md
                        flex items-start gap-3 sm:gap-4
                        rounded-2xl border
                        px-4 py-3 sm:px-5 sm:py-4
            ${alertState.type === "success"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                : "border-red-200 bg-red-50 text-red-900"
                            }
          `}
                    >
                        <div
                            className={`
              mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl
              ${alertState.type === "success"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-red-500 text-white"
                                }
            `}
                        >
                            {alertState.type === "success" ? (
                                <CheckCircle2 size={20} />
                            ) : (
                                <AlertCircle size={20} />
                            )}
                        </div>

                        <div className="pr-4">
                            <h3 className="font-bold">
                                {alertState.type === "success"
                                    ? "Sucesso"
                                    : "Erro"}
                            </h3>
                            <p className="mt-1 text-sm opacity-80">
                                {alertState.message}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                setAlertState((prev) => ({
                                    ...prev,
                                    open: false,
                                }))
                            }
                            className="opacity-60 transition hover:opacity-100"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className="absolute inset-0">
                    <div className="absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-emerald-300/20 blur-3xl" />
                    <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-emerald-400/10 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]">
                        <div className="absolute inset-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:42px_42px]" />
                    </div>
                </div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10">
                    <div className="grid items-center gap-10 md:gap-12 lg:gap-14 xl:gap-20 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-700">
                                <ShieldAlert size={16} />
                                Canal de denúncias
                            </span>
                            <h1 className="mt-5 text-3xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-4xl font-black leading-tight text-black">
                                Faça sua denúncia com
                                <span className="block bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
                                    segurança e sigilo
                                </span>
                            </h1>
                            <p className="my-4 sm:my-4 md:my-4 ld:my-4 xl:my-4 2xl:my-4 max-w-xl text-base sm:text-base md:text-base ld:text-base xl:text-base 2xl:text-base leading-7 leading-7 text-black text-justify">
                                Sua segurança e privacidade são prioridades.
                                Utilize este canal para registrar denúncias,
                                relatar incidentes ou comunicar qualquer
                                conduta inadequada relacionada à plataforma
                                Maylon.
                            </p>
                            <div className="mt-8 overflow-hidden rounded-[24px] sm:rounded-[30px] lg:rounded-[40px] bg-gradient-to-br from-emerald-400 via-emerald-500 to-[#029d6c] p-4 sm:p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
                                <Image
                                    src="/denuncia.png"
                                    alt="Canal de denúncia"
                                    width={600}
                                    height={550}
                                    className="mx-auto w-full max-w-xs sm:max-w-md lg:max-w-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="rounded-[24px] sm:rounded-[30px] lg:rounded-[40px] border border-white/50 bg-white/90 p-5 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-black text-zinc-900">
                                    Formulário de denúncia
                                </h2>
                                <p className="mt-2 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-base lg:mt-1 text-zinc-600">
                                    Preencha os campos abaixo.
                                </p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Número da denúncia
                                    </label>
                                    <div className="relative">
                                        <FileText
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                        />
                                        <input
                                            type="text"
                                            name="numero_denuncia"
                                            value={numeroDenuncia}
                                            readOnly
                                            required
                                            className="h-12 sm:h-14 md:h-14 lg:h-14 xl:h-14 2xl:h-14 w-full rounded-2xl border border-zinc-200 bg-zinc-100 pl-12 pr-4 text-zinc-900 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Nome completo
                                    </label>
                                    <div className="relative">
                                        <User
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                        />
                                        <input
                                            type="text"
                                            name="nome"
                                            value={nome}
                                            onChange={(e) =>
                                                setNome(
                                                    e.target.value
                                                        .toLowerCase()
                                                        .replace(/\b\w/g, (char) => char.toUpperCase())
                                                )
                                            }
                                            placeholder="Digite seu nome"
                                            required
                                            className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            E-mail
                                        </label>
                                        <div className="relative">
                                            <Mail
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="Digite seu e-mail"
                                                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                            Telefone
                                        </label>
                                        <div className="relative">
                                            <Phone
                                                size={18}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                            />
                                            <input
                                                type="tel"
                                                name="telefone"
                                                value={telefone}
                                                onChange={handleTelefoneChange}
                                                required
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                maxLength={15}
                                                placeholder="(11) 123456-7890"
                                                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 text-zinc-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Tipo de denúncia
                                    </label>
                                    <select
                                        name="tipo_denuncia"
                                        value={tipoDenuncia}
                                        onChange={(e) =>
                                            setTipoDenuncia(
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="h-14 w-full cursor-pointer rounded-2xl border border-zinc-200 bg-white px-4 text-zinc-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                    >
                                        <option
                                            value=""
                                            disabled
                                        >
                                            Selecione
                                        </option>
                                        <option value="comportamento">
                                            Comportamento inadequado
                                        </option>
                                        <option value="seguranca">
                                            Problema de segurança
                                        </option>
                                        <option value="pagamento">
                                            Problema de pagamento
                                        </option>
                                        <option value="motorista">
                                            Problema com motorista
                                        </option>
                                        <option value="passageiro">
                                            Problema com passageiro
                                        </option>
                                        <option value="outros">
                                            Outros
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Mensagem
                                    </label>
                                    <textarea
                                        name="mensagem"
                                        rows={6}
                                        required
                                        placeholder="Descreva detalhadamente sua denúncia..."
                                        className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-zinc-700">
                                        Anexos (Fotos, Vídeos ou Documentos) <span className="text-xs">*Se houver</span>
                                    </label>
                                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center transition-all hover:border-emerald-400 hover:bg-emerald-50">
                                        <Upload size={28} className="sm:h-[34px] sm:w-[34px]" />
                                        <span className="font-semibold text-zinc-800">
                                            Clique para anexar
                                        </span>
                                        <span className="mt-1 text-sm text-zinc-500">
                                            PNG, JPG ou PDF
                                        </span>
                                        <input
                                            type="file"
                                            name="anexos"
                                            multiple
                                            accept="image/*,.pdf"
                                            className="hidden"
                                            onChange={(e) => {
                                                const files = Array.from(
                                                    e.target.files || []
                                                );

                                                setSelectedFiles((prev) => [
                                                    ...prev,
                                                    ...files,
                                                ]);
                                            }}
                                        />
                                    </label>

                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 space-y-3">
                                            {selectedFiles.map((file, index) => {
                                                const isImage =
                                                    file.type.startsWith("image/");
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-emerald-100">
                                                                {isImage ? (
                                                                    <Image
                                                                        src={URL.createObjectURL(file)}
                                                                        alt={file.name}
                                                                        width={48}
                                                                        height={48}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <FileText
                                                                        size={22}
                                                                        className="text-emerald-600"
                                                                    />
                                                                )}
                                                            </div>

                                                            <div className="overflow-hidden">
                                                                <p className="truncate text-sm font-semibold text-zinc-800">
                                                                    {file.name}
                                                                </p>
                                                                <p className="text-xs text-zinc-500">
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedFiles((prev) =>
                                                                    prev.filter(
                                                                        (_, i) => i !== index
                                                                    )
                                                                );
                                                            }}
                                                            className="rounded-lg p-2 cursor-pointer text-zinc-400 transition hover:bg-red-50 hover:text-red-500"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex h-12 sm:h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-4 text-sm sm:text-base font-semibold text-white"
                                >
                                    {loading ? (
                                        "Enviando denúncia..."
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Enviar denúncia
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}