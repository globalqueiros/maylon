"use client";
import { Eye, EyeOff, PhoneIcon, UserIcon, Lock, Mail, LocateFixed } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import Image from 'next/image'
const TOTAL_STEPS = 3;

export default function QueroSerMotorista() {
    const [step, setStep] = useState(1);
    const [success, setSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [serviceError, setServiceError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [successMessage, setSuccessMessage] = useState("");
    const [phoneVerification, setPhoneVerification] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    interface FormData {
        services: {
            ride: boolean;
            delivery: boolean;
        };
        full_name: string;
        phone: string;
        email: string;
        address: string;
        latitude: string;
        longitude: string;
        referral_code: string;
        password: string;
        confirm_password: string;
        identification_type: string;
        identification_number: string;
        profile_image: File | null;
        identity_images: File[];
    }

    const [form, setForm] = useState<FormData>({
        services: {
            ride: false,
            delivery: false,
        },
        full_name: "",
        phone: "",
        email: "",
        address: "",
        latitude: "",
        longitude: "",
        referral_code: "",
        password: "",
        confirm_password: "",
        identification_type: "",
        identification_number: "",
        profile_image: null,
        identity_images: [],
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;

        setForm((old) => ({
            ...old,
            [name]: value,
        }));
    }

    function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const files = Array.from(e.target.files);
        setForm((old) => {
            const combined = [...old.identity_images, ...files].slice(0, 1);
            return {
                ...old,
                identity_images: combined,
            };
        });
    }

    function Senha(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        const newForm = {
            ...form,
            [name]: value,
        };
        setForm(newForm);
        if (
            newForm.confirm_password &&
            newForm.password !== newForm.confirm_password
        ) {
            setPasswordError("As senhas não coincidem.");
        } else {
            setPasswordError("");
        }
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            setRegisterError("Seu navegador não suporta geolocalização.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                console.log(coords);
                const { latitude, longitude, accuracy } = coords;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
                console.log("Precisão:", accuracy);
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
                        {
                            headers: {
                                Accept: "application/json",
                            },
                        }
                    );
                    const data = await response.json();
                    setForm((prev) => ({
                        ...prev,
                        address: data.display_name ?? "",
                        latitude: latitude.toString(),
                        longitude: longitude.toString(),
                    }));
                } catch (err) {
                    console.error(err);
                }
            },
            (err) => {
                console.log(err);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0,
            }
        );
    };

    async function enviarCodigo() {
        setRegisterError("");
        if (!form.phone.trim()) {
            setRegisterError("Informe o telefone.");
            return false;
        }
        try {
            const response = await fetch("/api/otp/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: form.phone,
                }),
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                setRegisterError(data.message);
                return false;
            }
            return true;
        } catch (error) {
            console.error(error);
            setRegisterError("Não foi possível enviar o código. Tente novamente.");
            return false;
        }
    }
    async function verificarCodigo(codigoRecebido?: string) {
        if (isVerifying) return;
        const codigo = (codigoRecebido ?? otp.join("")).trim();
        if (codigo.length !== 6) {
            setRegisterError("Digite o código completo.");
            return;
        }
        setIsVerifying(true);
        setRegisterError("");
        setSuccessMessage("");
        try {
            const response = await fetch("/api/otp/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: form.phone,
                    otp: codigo,
                }),
            });
            const data = await response.json();
            if (!response.ok || !data.success) {
                setRegisterError(data.message || "Código inválido.");
                return;
            }
            const body = new FormData();
            body.append("full_name", form.full_name);
            body.append("phone", form.phone);
            body.append("referral_code", form.referral_code);
            body.append("password", form.password);
            body.append("confirm_password", form.confirm_password);
            body.append("email", form.email);
            body.append("address", form.address);
            body.append("latitude", form.latitude);
            body.append("longitude", form.longitude);
            body.append("identification_type", form.identification_type);
            body.append("identification_number", form.identification_number);
            const services: string[] = [];
            if (form.services.ride) {
                services.push("ride_request");
            }
            if (form.services.delivery) {
                services.push("parcel");
            }
            body.append("service", JSON.stringify(services));
            if (form.profile_image) {
                body.append("profile_image", form.profile_image);
            }
            form.identity_images.forEach((file) => {
                body.append("identity_images[]", file);
            });
            const cadastroResponse = await fetch("/api/motorista", {
                method: "POST",
                body,
            });
            const cadastroData = await cadastroResponse.json();
            if (!cadastroResponse.ok || !cadastroData.success) {
                setRegisterError(
                    cadastroData.message || "Erro ao cadastrar motorista."
                );
                return;
            }
            setSuccessMessage("Telefone verificado com sucesso!");
            setOtp(["", "", "", "", "", ""]);
            setPhoneVerification(false);
            setSuccess(true);
        } catch (error) {
            console.error("Erro:", error);
            setRegisterError("Não foi possível verificar o código.");
        } finally {
            setIsVerifying(false);
        }
    }
    const handleOtpChange = (
        value: string,
        index: number
    ) => {
        if (!/^\d?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            (
                document.getElementById(`otp-${index + 1}`) as HTMLInputElement
            )?.focus();
        }
    };
    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const previous = document.getElementById(
                `otp-${index - 1}`
            ) as HTMLInputElement;

            previous?.focus();
        }
    };
    async function finalizarCadastro() {
        setRegisterError("");
        setPasswordError("");
        setServiceError("");
        if (!form.full_name.trim()) {
            setRegisterError("Informe seu nome completo.");
            return;
        }
        if (!form.phone.trim()) {
            setRegisterError("Informe seu telefone.");
            return;
        }
        if (!form.email.trim()) {
            setRegisterError("Informe seu e-mail.");
            return;
        }
        if (!form.address.trim()) {
            setRegisterError("Informe seu endereço.");
            return;
        }
        if (!form.identification_type) {
            setRegisterError("Selecione o tipo do documento.");
            return;
        }
        if (!form.identification_number.trim()) {
            setRegisterError("Informe o número do documento.");
            return;
        }
        if (!form.profile_image) {
            setRegisterError("Adicione uma foto de perfil.");
            return;
        }
        if (form.identity_images.length === 0) {
            setRegisterError("Adicione pelo menos uma foto do documento.");
            return;
        }
        if (!form.password) {
            setPasswordError("Informe uma senha.");
            return;
        }
        if (!form.confirm_password) {
            setPasswordError("Confirme sua senha.");
            return;
        }
        if (form.password !== form.confirm_password) {
            setPasswordError("As senhas não coincidem.");
            return;
        }
        const services: string[] = [];
        if (form.services.ride) services.push("ride_request");
        if (form.services.delivery) services.push("parcel");
        if (services.length === 0) {
            setServiceError("Selecione pelo menos um serviço.");
            return;
        }
        const enviado = await enviarCodigo();
        if (!enviado) return;
        setPhoneVerification(true);
    }
    const continuarStep1 = () => {
        setServiceError("");
        const services: string[] = [];
        if (form.services.ride) {
            services.push("ride_request");
        }
        if (form.services.delivery) {
            services.push("parcel");
        }
        if (services.length === 0) {
            setServiceError("Selecione pelo menos um serviço.");
            return;
        }
        setStep(2);
    };

    const continuarStep2 = () => {
        if (!form.full_name.trim()) {
            setRegisterError("Informe seu nome completo.");
            return;
        }
        if (!form.phone.trim()) {
            setRegisterError("Informe seu celular.");
            return;
        }
        if (!form.password.trim()) {
            setRegisterError("Informe sua senha.");
            return;
        }
        if (!form.confirm_password.trim()) {
            setRegisterError("Confirme sua senha.");
            return;
        }
        if (form.password !== form.confirm_password) {
            setRegisterError("As senhas não coincidem.");
            return;
        }
        setRegisterError("");
        setStep(3);
    }


    if (success) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center overflow-hidden bg-gray-50 px-4">
                <div className="w-full max-w-xl">
                    <div className="rounded-3xl bg-white p-8 text-center shadow-xl sm:p-10">
                        <div className="flex justify-center">
                            <Image
                                src="/giphy.gif"
                                alt="Sucesso"
                                width={80}
                                height={80}
                                priority
                            />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-black sm:text-3xl">
                            Cadastro realizado com sucesso!
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Seu cadastro foi enviado para análise.
                        </p>
                        <div className="mt-3">
                            <Image
                                src="/qr_code_app_motorista.png"
                                alt="QR Code para baixar o aplicativo do motorista"
                                width={200}
                                height={200}
                                className="mx-auto w-40 sm:w-52"
                                priority
                            />

                            <p className="mt-2 text-sm text-gray-500">
                                Escaneie o QR Code para baixar o aplicativo do motorista.
                            </p>
                        </div>
                        <a
                            href="https://play.google.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center justify-center rounded-full bg-[#009688] px-8 py-2 text-base text-white transition hover:bg-[#00796B]"
                        >
                            Baixar Aplicativo
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto py-10">
            <div className="flex items-start justify-between mb-8 gap-4">
                <div className="flex-1">
                    {passwordError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm w-full">
                            {passwordError}
                        </div>
                    )}
                    {serviceError && (
                        <div className="mb-4 w-full rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
                            {serviceError}
                        </div>
                    )}

                    {registerError && (
                        <div className="mb-4 w-full rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-sm text-red-700">
                            {registerError}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 w-full rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-sm text-green-700">
                            {successMessage}
                        </div>
                    )}
                </div>
                <div className="text-black w-16 h-16 rounded-full border-4 border-[#00A99D] flex items-center justify-center text-sm font-semibold shrink-0">
                    {step} de {TOTAL_STEPS}
                </div>
            </div>
            {step === 1 && (
                <div className="space-y-6">
                    <h2 className="text-black mb-1 text-3xl font-bold">
                        Escolher Serviços
                    </h2>
                    <p className="text-gray-500">
                        Escolha os serviços que deseja fornecer.
                    </p>
                    <label className="border rounded-xl p-5 flex justify-between cursor-pointer">
                        <div>
                            <h3 className="font-semibold">
                                Viagem Compartilhada
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Transporte de passageiros
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={form.services.ride}
                            onChange={() =>
                                setForm({
                                    ...form,
                                    services: {
                                        ...form.services,
                                        ride: !form.services.ride,
                                    },
                                })
                            }
                        />
                    </label>
                    <label className="border rounded-xl p-5 flex justify-between cursor-pointer">
                        <div>
                            <h3 className="font-semibold">
                                Entrega de Encomendas
                            </h3>
                            <p className="text-gray-500 text-sm">
                                Delivery
                            </p>
                        </div>
                        <input
                            type="checkbox"
                            checked={form.services.delivery}
                            onChange={() =>
                                setForm({
                                    ...form,
                                    services: {
                                        ...form.services,
                                        delivery: !form.services.delivery,
                                    },
                                })
                            }
                        />
                    </label>
                    <button
                        onClick={continuarStep1}
                        className="w-full bg-[#009688] text-white rounded-full py-4 cursor-pointer"
                    >
                        Próximo
                    </button>
                </div>
            )}
            {step === 2 && (
                <div className="space-y-5">
                    <h2 className="text-black text-3xl font-bold">
                        Informações Básicas
                    </h2>
                    <div className="space-y-2">
                        <label
                            htmlFor="first_name"
                            className="block text-black font-semibold"
                        >
                            Nome completo
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                            <input
                                id="full_name"
                                name="full_name"
                                type="text"
                                value={form.full_name}
                                onChange={handleChange}
                                placeholder="Nome Completo"
                                className="w-full h-14 text-base rounded-full border border-[#18C29C] bg-white pl-14 pr-5 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="phone"
                            className="block text-black font-semibold"
                        >
                            Telefone
                        </label>
                        <div className="relative">
                            <PhoneIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="(11) 91234-5678"
                                className="w-full h-14 pl-14 pr-36 text-black rounded-full border border-[#18C29C]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-black font-semibold mb-2" htmlFor="referral_code">
                            Código de indicação
                        </label>
                        <input
                            className="w-full p-4 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                            placeholder="Código de indicação"
                            name="referral_code"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-black font-semibold"
                        >
                            Senha
                        </label>
                        <div className="relative">
                            <Lock
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={Senha}
                                placeholder="Digite sua senha"
                                className="w-full h-14 pl-14 pr-14 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="confirm_password"
                            className="block text-black font-semibold"
                        >
                            Confirmar Senha
                        </label>
                        <div className="relative">
                            <Lock
                                size={20}
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={form.confirm_password}
                                onChange={Senha}
                                placeholder="Confirme sua senha"
                                className="w-full h-14 pl-14 pr-14 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute cursor-pointer right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(1)}
                            className="text-black w-full border border-1px rounded-full py-4 cursor-pointer"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={continuarStep2}
                            className="w-full bg-[#009688] text-white rounded-full py-4 cursor-pointer"
                        >
                            Próximo
                        </button>
                    </div>
                </div>
            )}
            {step === 3 && !phoneVerification && (
                <div className="space-y-5">
                    <h2 className="text-black text-3xl font-bold">
                        Forneça sua Identidade
                    </h2>
                    <div className="space-y-2">
                        <p className="font-semibold text-black">
                            Foto de Perfil
                        </p>
                        <label
                            htmlFor="profile_image"
                            className="flex flex-col items-center justify-center w-44 h-44 mx-auto border-2 border-dashed border-[#9EF0D2] rounded-full bg-[#F8FFFC] cursor-pointer hover:bg-[#F2FFFA] transition overflow-hidden"
                        >
                            {form.profile_image ? (
                                <img
                                    src={URL.createObjectURL(form.profile_image)}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-black mb-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                        />
                                    </svg>
                                    <span className="font-semibold text-gray-800 text-center">
                                        Clique para enviar
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        PNG ou JPG
                                    </span>
                                </>
                            )}
                        </label>
                        <input
                            id="profile_image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                setForm((old) => ({
                                    ...old,
                                    profile_image: file,
                                }));
                            }}
                        />
                        {form.profile_image && (
                            <div className="flex justify-center mt-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm((old) => ({
                                            ...old,
                                            profile_image: null,
                                        }))
                                    }
                                    className="px-6 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                >
                                    Remover Foto
                                </button>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-black font-semibold"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    size={20}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Digite seu e-mail"
                                    className="w-full h-14 pl-14 pr-5 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-black font-semibold mb-2" htmlFor="address">
                            Endereço
                        </label>
                        <div className="relative">
                            <input
                                className="w-full h-14 pl-4 pr-9 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                                placeholder="Endereço"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={getLocation}
                                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-[#18C29C] hover:text-[#14a884]"
                            >
                                <LocateFixed className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label
                            htmlFor="identification_type"
                            className="block text-black font-semibold"
                        >
                            Tipo de Documento
                        </label>
                        <select
                            id="identification_type"
                            name="identification_type"
                            value={form.identification_type}
                            onChange={handleChange}
                            className="w-full p-4 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C] cursor-pointer"
                        >
                            <option value="" disabled>Selecione</option>
                            <option value="cpf">CPF</option>
                            <option value="rg">RG</option>
                            <option value="cnh">CNH</option>
                            <option value="passaporte">Passaporte</option>
                        </select>
                    </div>
                    <div>
                        <label className="mb-2 block text-gray-700" htmlFor="identification_number">
                            Número do Documento
                        </label>
                        <input
                            className="w-full p-4 rounded-full border border-[#18C29C] bg-white text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#18C29C]"
                            placeholder="Número do Documento"
                            name="identification_number"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <p className="font-semibold text-black">
                            Anexos (CNH, RG, CPF ou Passaporte)
                        </p>
                        <label
                            htmlFor="identity_images"
                            className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#9EF0D2] rounded-3xl bg-[#F8FFFC] cursor-pointer hover:bg-[#F2FFFA] transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 text-black mb-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                                />
                            </svg>
                            <span className="font-semibold text-gray-800">
                                Clique para anexar
                            </span>
                            <span className="text-gray-400 mt-1">
                                PNG, JPG ou PDF
                            </span>
                        </label>
                        <input
                            id="identity_images"
                            type="file"
                            accept=".png,.jpg,.jpeg"
                            multiple
                            className="hidden"
                            onChange={handleFiles}
                            disabled={(form.identity_images?.length || 0) >= 1}
                        />
                        {form.identity_images.length > 0 && (
                            <div className="mt-4">
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {form.identity_images.map((file, index) => {
                                        const url = URL.createObjectURL(file);
                                        return (
                                            <div key={index} className="relative min-w-[120px] w-32">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setForm((old) => ({
                                                            ...old,
                                                            identity_images: old.identity_images.filter(
                                                                (_, i) => i !== index
                                                            ),
                                                        }));
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center z-10 cursor-pointer"
                                                >
                                                    ✕
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setPreviewImage(url)}
                                                    className="absolute bottom-1 right-1 bg-black/60 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs z-10 cursor-pointer"
                                                >
                                                    ⤢
                                                </button>
                                                <img
                                                    src={url}
                                                    className="w-32 h-32 object-cover rounded-xl border cursor-pointer"
                                                />

                                                <p className="text-xs text-green-600 mt-1 truncate cursor-pointer">
                                                    ✔ {file.name}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(2)}
                            className="text-black w-full border border-1px rounded-full py-4 cursor-pointer"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={finalizarCadastro}
                            className="w-full bg-[#009688] text-white rounded-full py-4 cursor-pointer"
                        >
                            Enviar Cadastro
                        </button>
                    </div>
                    {previewImage && (
                        <div
                            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                            onClick={() => setPreviewImage(null)}
                        >
                            <div className="relative">
                                <img
                                    src={previewImage}
                                    className="max-w-[90vw] max-h-[90vh] rounded-xl shadow-lg"
                                />
                                <button
                                    onClick={() => setPreviewImage(null)}
                                    className="absolute -top-3 -right-3 bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {phoneVerification && (
                <div className="w-full max-w-[700px] mx-auto rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-lg">
                    <h2 className="text-center text-2xl font-bold text-gray-900">
                        Confirmar Telefone
                    </h2>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Digite o código de <strong>6 dígitos</strong> enviado para seu celular.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="
                                    h-16 w-16
                                    rounded-xl
                                    border
                                    border-gray-300
                                    text-center
                                    !text-2xl
                                    font-bold
                                    outline-none
                                    transition
                                    focus:border-[#009688]
                                    focus:ring-2
                                    focus:ring-[#009688]
                                "
                            />
                        ))}
                    </div>
                    <div className="mt-8 space-y-3">
                        <button
                            type="button"
                            onClick={() => verificarCodigo(otp.join(""))}
                            disabled={isVerifying}
                            className="w-full cursor-pointer rounded-full bg-[#009688] py-4 font-semibold text-white transition hover:bg-[#00796B]"
                        >
                            {isVerifying ? "Verificando..." : "Confirmar Código"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}