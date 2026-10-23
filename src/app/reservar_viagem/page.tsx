"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Car,
    CheckCircle2,
    Clock3,
    MapPin,
    Minus,
    Navigation,
    Plus,
    School,
    ShieldCheck,
    Users,
    X,
} from "lucide-react";
import { useJsApiLoader } from "@react-google-maps/api";
import AddressAutocomplete from "../components/AddressAutocomplete";

type Vehicle = {
    id: string;
    name: string;
    description: string;
    icon: typeof Car;
};

type FormData = {
    name: string;
    phone: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
    returnDate: string;
    returnTime: string;
    observations: string;
};

const googleMapsLibraries: "places"[] = ["places"];

const vehicles: Vehicle[] = [
    {
        id: "carro",
        name: "Carro",
        description: "Ideal para viagens individuais ou pequenos grupos.",
        icon: Car,
    },
    {
        id: "van",
        name: "Van",
        description: "Mais espaço para grupos e viagens programadas.",
        icon: Users,
    },
    {
        id: "van-escolar",
        name: "Van Escolar",
        description: "Transporte escolar com rota e horário planejados.",
        icon: School,
    },
];

const initialForm: FormData = {
    name: "",
    phone: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    returnDate: "",
    returnTime: "",
    observations: "",
};

function getUserName(user: any) {
    return (
        user?.nome_completo ??
        user?.nomeCompleto ??
        user?.nome ??
        user?.name ??
        user?.full_name ??
        ""
    );
}

function getUserPhone(user: any) {
    return (
        user?.telefone ??
        user?.celular ??
        user?.phone ??
        user?.telefone_celular ??
        ""
    );
}

function requestCurrentPosition(
    options: PositionOptions
): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            options
        );
    });
}

async function reverseGeocodeNominatim(
    latitude: number,
    longitude: number
): Promise<string | null> {
    const url =
        `https://nominatim.openstreetmap.org/reverse` +
        `?format=jsonv2` +
        `&lat=${encodeURIComponent(latitude)}` +
        `&lon=${encodeURIComponent(longitude)}` +
        `&zoom=18` +
        `&addressdetails=1`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(
            "Não foi possível consultar o endereço."
        );
    }

    const data = await response.json();

    return data?.display_name || null;
}

export default function ReservarViagemPage() {
    const {
        isLoaded: googleMapsLoaded,
        loadError: googleMapsError,
    } = useJsApiLoader({
        id: "maylon-google-maps",
        googleMapsApiKey:
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        libraries: googleMapsLibraries,
    });

    const [vehicle, setVehicle] = useState("carro");
    const [passengers, setPassengers] = useState(1);
    const [roundTrip, setRoundTrip] = useState(false);
    const [form, setForm] = useState<FormData>({
        ...initialForm,
    });

    const [checkingUser, setCheckingUser] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [userChecked, setUserChecked] = useState(false);
    const [showRegisterModal, setShowRegisterModal] =
        useState(false);
    const [showUserConfirmation, setShowUserConfirmation] =
        useState(false);
    const [checkedUser, setCheckedUser] = useState<any>(null);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<
        "success" | "error"
    >("error");

    const [gettingLocation, setGettingLocation] =
        useState(false);

    const [submitting, setSubmitting] = useState(false);
    const [reservationProtocol, setReservationProtocol] =
        useState("");
    const [showReservationSuccess, setShowReservationSuccess] =
        useState(false);

    const setAlert = (
        message: string,
        type: "success" | "error" = "error"
    ) => {
        setAlertMessage(message);
        setAlertType(type);

        window.setTimeout(() => {
            setAlertMessage("");
        }, 4000);
    };

    const selectedVehicle = useMemo(() => {
        return (
            vehicles.find(
                (item) => item.id === vehicle
            ) ?? vehicles[0]
        );
    }, [vehicle]);

    const updateField = (
        field: keyof FormData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const formatPhone = (value: string) => {
        const numbers = value
            .replace(/\D/g, "")
            .slice(0, 11);

        if (!numbers) {
            return "";
        }

        if (numbers.length <= 2) {
            return `(${numbers}`;
        }

        if (numbers.length <= 7) {
            return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
        }

        if (numbers.length <= 10) {
            return `(${numbers.slice(
                0,
                2
            )}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
        }

        return `(${numbers.slice(
            0,
            2
        )}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    };

    const handleCheckUser = async () => {
        const name = form.name.trim();
        const phone = form.phone.trim();

        if (!name) {
            setAlert("Digite seu nome completo.");
            return;
        }

        if (!phone) {
            setAlert("Digite seu WhatsApp ou telefone.");
            return;
        }

        try {
            setCheckingUser(true);

            const response = await fetch(
                "/api/verificar-cadastro",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        nome: name,
                        telefone: phone,
                    }),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Não foi possível verificar seu cadastro."
                );
            }

            if (data?.registered && data?.user) {
                setIsRegistered(true);
                setCheckedUser(data.user);
                setUserChecked(true);

                setForm((current) => ({
                    ...current,
                    name:
                        getUserName(data.user) ||
                        current.name,
                    phone:
                        getUserPhone(data.user) ||
                        current.phone,
                }));

                setShowUserConfirmation(true);
            } else {
                setIsRegistered(false);
                setCheckedUser(null);
                setShowRegisterModal(true);
            }
        } catch (error) {
            console.error(
                "Erro ao verificar cadastro:",
                error
            );

            setAlert(
                error instanceof Error
                    ? error.message
                    : "Não foi possível verificar seu cadastro."
            );
        } finally {
            setCheckingUser(false);
        }
    };

    const handlePassengers = (value: number) => {
        setPassengers(
            Math.min(15, Math.max(1, value))
        );
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!userChecked) {
            setAlert(
                "Informe seu nome e telefone e verifique seu cadastro antes de continuar."
            );
            return;
        }

        if (!form.name.trim()) {
            setAlert("Informe seu nome completo.");
            return;
        }

        if (!form.phone.trim()) {
            setAlert(
                "Informe seu telefone ou WhatsApp."
            );
            return;
        }

        if (!form.origin.trim()) {
            setAlert(
                "Informe o local de embarque."
            );
            return;
        }

        if (!form.destination.trim()) {
            setAlert("Informe o destino.");
            return;
        }

        if (!form.date) {
            setAlert(
                "Informe a data da viagem."
            );
            return;
        }

        if (!form.time) {
            setAlert(
                "Informe o horário da viagem."
            );
            return;
        }

        if (
            roundTrip &&
            (!form.returnDate ||
                !form.returnTime)
        ) {
            setAlert(
                "Informe a data e o horário do retorno."
            );
            return;
        }

        if (submitting) {
            return;
        }

        try {
            setSubmitting(true);

            const reservationData = {
                user_id:
                    checkedUser?.id ?? null,
                name: form.name.trim(),
                phone: form.phone.trim(),
                origin: form.origin.trim(),
                destination:
                    form.destination.trim(),
                date: form.date,
                time: form.time,
                returnDate: roundTrip
                    ? form.returnDate
                    : null,
                returnTime: roundTrip
                    ? form.returnTime
                    : null,
                observations:
                    form.observations.trim(),
                vehicle: selectedVehicle.id,
                vehicle_name:
                    selectedVehicle.name,
                passengers,
                round_trip: roundTrip,
            };

            const response = await fetch(
                "/api/reservas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(
                        reservationData
                    ),
                }
            );

            const data = await response
                .json()
                .catch(() => null);

            if (!response.ok) {
                throw new Error(
                    data?.message ||
                        "Não foi possível realizar a reserva."
                );
            }

            const protocol =
                data?.protocolo ??
                data?.protocol;

            if (!protocol) {
                throw new Error(
                    "A reserva foi processada, mas o protocolo não foi retornado."
                );
            }

            setReservationProtocol(protocol);
            setShowReservationSuccess(true);
        } catch (error) {
            console.error(
                "Erro ao enviar reserva:",
                error
            );

            setAlert(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar a reserva."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const resetReservation = () => {
        setForm({
            ...initialForm,
        });

        setVehicle("carro");
        setPassengers(1);
        setRoundTrip(false);

        setCheckingUser(false);
        setIsRegistered(false);
        setUserChecked(false);
        setCheckedUser(null);

        setShowRegisterModal(false);
        setShowUserConfirmation(false);

        setReservationProtocol("");
        setShowReservationSuccess(false);

        setGettingLocation(false);
        setSubmitting(false);
        setAlertMessage("");
        setAlertType("error");
    };

    const getCurrentLocation = async () => {
        if (gettingLocation) {
            return;
        }

        if (!navigator.geolocation) {
            setAlert(
                "Seu navegador não suporta geolocalização."
            );
            return;
        }

        const isLocalhost = [
            "localhost",
            "127.0.0.1",
            "::1",
        ].includes(
            window.location.hostname
        );

        if (
            !window.isSecureContext &&
            !isLocalhost
        ) {
            setAlert(
                "A localização só funciona em HTTPS ou em localhost."
            );
            return;
        }

        try {
            setGettingLocation(true);

            let position: GeolocationPosition;

            try {
                position =
                    await requestCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 30000,
                    });
            } catch (error) {
                const geolocationError =
                    error as GeolocationPositionError;

                if (
                    geolocationError?.code === 3
                ) {
                    position =
                        await requestCurrentPosition(
                            {
                                enableHighAccuracy:
                                    false,
                                timeout: 25000,
                                maximumAge:
                                    120000,
                            }
                        );
                } else {
                    throw error;
                }
            }

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            console.log(
                "Coordenadas obtidas:",
                {
                    latitude,
                    longitude,
                    accuracy:
                        position.coords.accuracy,
                }
            );

            let address: string | null =
                null;

            if (
                googleMapsLoaded &&
                window.google?.maps
            ) {
                try {
                    const geocoder =
                        new window.google.maps.Geocoder();

                    address =
                        await new Promise<string | null>(
                            (
                                resolve,
                                reject
                            ) => {
                                geocoder.geocode(
                                    {
                                        location: {
                                            lat: latitude,
                                            lng: longitude,
                                        },
                                    },
                                    (
                                        results,
                                        status
                                    ) => {
                                        if (
                                            status ===
                                                "OK" &&
                                            results &&
                                            results.length >
                                                0
                                        ) {
                                            resolve(
                                                results[0]
                                                    .formatted_address
                                            );
                                            return;
                                        }

                                        reject(
                                            new Error(
                                                `Google Geocoder: ${status}`
                                            )
                                        );
                                    }
                                );
                            }
                        );
                } catch (error) {
                    console.warn(
                        "Google Geocoder falhou:",
                        error
                    );
                }
            }

            if (!address) {
                try {
                    address =
                        await reverseGeocodeNominatim(
                            latitude,
                            longitude
                        );
                } catch (error) {
                    console.warn(
                        "Nominatim falhou:",
                        error
                    );
                }
            }

            if (!address) {
                throw new Error(
                    "Não foi possível identificar o endereço da sua localização."
                );
            }

            updateField(
                "origin",
                address
            );

            setAlert(
                "Localização encontrada com sucesso.",
                "success"
            );
        } catch (error) {
            console.error(
                "Erro de geolocalização:",
                error
            );

            const geolocationError =
                error as GeolocationPositionError;

            if (
                geolocationError?.code === 1
            ) {
                setAlert(
                    "Permissão de localização negada. Permita a localização no navegador e tente novamente."
                );
            } else if (
                geolocationError?.code === 2
            ) {
                setAlert(
                    "Não foi possível determinar sua localização. Verifique o GPS, Wi-Fi ou a localização do dispositivo."
                );
            } else if (
                geolocationError?.code === 3
            ) {
                setAlert(
                    "A localização demorou muito para responder. Tente novamente."
                );
            } else {
                setAlert(
                    error instanceof Error
                        ? error.message
                        : "Não foi possível obter sua localização."
                );
            }
        } finally {
            setGettingLocation(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f7faf9]">
            {showReservationSuccess && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center overflow-y-auto bg-black/55 px-3 py-3 backdrop-blur-sm sm:px-5 sm:py-5">
                    <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-[26px] bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)] sm:rounded-[32px]">
                        <div className="shrink-0 bg-[#0b6e4f] px-5 py-5 text-center text-white sm:px-8 sm:py-7">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 sm:h-20 sm:w-20">
                                <CheckCircle2
                                    size={32}
                                    className="sm:hidden"
                                />

                                <CheckCircle2
                                    size={42}
                                    className="hidden sm:block"
                                />
                            </div>

                            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 sm:mt-5 sm:text-xs">
                                Solicitação registrada
                            </p>

                            <h2 className="mt-1 text-2xl font-black sm:mt-2 sm:text-3xl">
                                Reserva recebida!
                            </h2>

                            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-white/80 sm:mt-3 sm:text-sm sm:leading-6">
                                Sua solicitação de viagem foi registrada com sucesso.
                            </p>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-8">
                            <div className="rounded-2xl border border-[#35a989]/20 bg-[#e8f7f3] p-4 text-center sm:rounded-3xl sm:p-5">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#23886f] sm:text-xs">
                                    Seu protocolo
                                </p>

                                <p className="mt-1.5 break-all text-xl font-black tracking-wide text-[#0b6e4f] sm:mt-2 sm:text-2xl">
                                    {reservationProtocol}
                                </p>

                                <p className="mt-2 text-xs font-medium text-[#0b6e4f]/70 sm:text-sm">
                                    Guarde este protocolo para consultar sua reserva.
                                </p>
                            </div>

                            <div className="mt-3 rounded-2xl bg-[#f7faf9] p-3.5 sm:mt-5 sm:p-4">
                                <div className="flex gap-3">
                                    <CheckCircle2
                                        size={18}
                                        className="mt-0.5 shrink-0 text-[#35a989]"
                                    />

                                    <p className="text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                                        Nossa equipe Maylon entrará em contato pelo{" "}
                                        <strong className="text-gray-900">
                                            telefone ou WhatsApp informado
                                        </strong>{" "}
                                        para confirmar os detalhes da sua viagem.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-3 rounded-2xl border border-gray-100 p-3.5 sm:mt-5 sm:p-4">
                                <p className="text-[11px] text-gray-500 sm:text-xs">
                                    Telefone informado
                                </p>

                                <p className="mt-1 text-sm font-bold text-gray-900">
                                    {form.phone}
                                </p>
                            </div>

                            <div className="mt-3 rounded-2xl border border-gray-100 p-3.5 sm:mt-5 sm:p-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500 sm:text-sm">
                                        Veículo
                                    </span>

                                    <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                        {selectedVehicle.name}
                                    </span>
                                </div>

                                <div className="mt-2.5 flex items-center justify-between sm:mt-3">
                                    <span className="text-xs text-gray-500 sm:text-sm">
                                        Passageiros
                                    </span>

                                    <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                        {passengers}
                                    </span>
                                </div>

                                <div className="mt-2.5 flex items-center justify-between sm:mt-3">
                                    <span className="text-xs text-gray-500 sm:text-sm">
                                        Data
                                    </span>

                                    <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                        {form.date}
                                    </span>
                                </div>

                                <div className="mt-2.5 flex items-center justify-between sm:mt-3">
                                    <span className="text-xs text-gray-500 sm:text-sm">
                                        Horário
                                    </span>

                                    <span className="text-xs font-bold text-gray-900 sm:text-sm">
                                        {form.time}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={resetReservation}
                                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#35a989] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition hover:bg-[#2f9679] sm:mt-6 sm:py-4"
                            >
                                Entendi
                                <ArrowRight size={18} />
                            </button>

                            <button
                                type="button"
                                onClick={resetReservation}
                                className="mt-2.5 flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 sm:mt-3 sm:py-3.5"
                            >
                                Fazer nova reserva
                            </button>

                            <Link
                                href="/"
                                onClick={() => {
                                    setShowReservationSuccess(
                                        false
                                    );
                                }}
                                className="mt-2.5 flex w-full cursor-pointer items-center justify-center rounded-full border border-gray-200 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 sm:mt-3 sm:py-3.5"
                            >
                                Voltar para a Maylon
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {alertMessage && (
                <div className="fixed right-5 top-5 z-[400] w-[calc(100%-40px)] max-w-md">
                    <div
                        role="alert"
                        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur ${
                            alertType === "success"
                                ? "border-[#35a989]/20 bg-[#e8f7f3]"
                                : "border-red-100 bg-white"
                        }`}
                    >
                        <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                                alertType === "success"
                                    ? "bg-[#35a989]/10 text-[#35a989]"
                                    : "bg-red-50 text-red-500"
                            }`}
                        >
                            {alertType === "success" ? (
                                <CheckCircle2 size={18} />
                            ) : (
                                <X size={18} />
                            )}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p
                                className={`text-sm font-black ${
                                    alertType ===
                                    "success"
                                        ? "text-[#23886f]"
                                        : "text-red-600"
                                }`}
                            >
                                {alertType ===
                                "success"
                                    ? "Tudo certo!"
                                    : "Atenção"}
                            </p>

                            <p className="mt-1 text-sm leading-5 text-gray-600">
                                {alertMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                setAlertMessage("")
                            }
                            aria-label="Fechar alerta"
                            className="shrink-0 cursor-pointer rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {showUserConfirmation &&
                checkedUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-6 backdrop-blur-sm">
                        <div className="w-full max-w-md rounded-[30px] bg-white p-7 shadow-2xl sm:p-8">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e8f7f3] text-[#35a989]">
                                <CheckCircle2 size={34} />
                            </div>

                            <div className="mt-5 text-center">
                                <p className="text-xs font-bold uppercase tracking-wider text-[#35a989]">
                                    Cadastro encontrado
                                </p>

                                <h2 className="mt-2 text-2xl font-black text-gray-950">
                                    Olá,{" "}
                                    {getUserName(
                                        checkedUser
                                    ) ||
                                        form.name}
                                    !
                                </h2>

                                <p className="mt-3 text-sm leading-6 text-gray-600">
                                    Encontramos seu cadastro na Maylon. Deseja continuar utilizando esses dados para realizar sua reserva?
                                </p>
                            </div>

                            <div className="mt-6 rounded-2xl bg-[#f7faf9] p-4">
                                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                                    <span className="text-sm text-gray-500">
                                        Nome
                                    </span>

                                    <span className="max-w-[60%] text-right text-sm font-bold text-gray-900">
                                        {getUserName(
                                            checkedUser
                                        ) ||
                                            form.name}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-3">
                                    <span className="text-sm text-gray-500">
                                        Telefone
                                    </span>

                                    <span className="text-sm font-bold text-gray-900">
                                        {getUserPhone(
                                            checkedUser
                                        ) ||
                                            form.phone}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowUserConfirmation(
                                            false
                                        )
                                    }
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#35a989] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition hover:bg-[#2f9679]"
                                >
                                    Sim, continuar
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowUserConfirmation(
                                            false
                                        );
                                        setUserChecked(
                                            false
                                        );
                                        setIsRegistered(
                                            false
                                        );
                                        setCheckedUser(
                                            null
                                        );
                                    }}
                                    className="w-full cursor-pointer rounded-full border border-gray-200 px-6 py-4 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Não, alterar dados
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            {showRegisterModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5 py-6 backdrop-blur-sm">
                    <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[30px] bg-white shadow-2xl">
                        <button
                            type="button"
                            onClick={() =>
                                setShowRegisterModal(
                                    false
                                )
                            }
                            aria-label="Fechar"
                            className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
                        >
                            <X size={18} />
                        </button>

                        <div className="p-7 sm:p-8">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                <Users size={26} />
                            </div>

                            <h2 className="mt-5 text-2xl font-black text-gray-950">
                                Cadastro não encontrado
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Não encontramos um cadastro com o nome e telefone informados. Deseja criar sua conta na Maylon?
                            </p>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-start gap-3 rounded-2xl bg-[#f7faf9] p-4">
                                    <CheckCircle2
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#35a989]"
                                    />

                                    <p className="text-sm leading-5 text-gray-600">
                                        Seus dados ficam associados à sua conta Maylon.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3 rounded-2xl bg-[#f7faf9] p-4">
                                    <CheckCircle2
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#35a989]"
                                    />

                                    <p className="text-sm leading-5 text-gray-600">
                                        Você poderá realizar novas reservas com mais facilidade.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-7 space-y-3">
                                <Link
                                    href="/cadastro"
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#35a989] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition hover:bg-[#2f9679]"
                                >
                                    Quero me cadastrar
                                    <ArrowRight size={18} />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowRegisterModal(
                                            false
                                        );
                                        setUserChecked(
                                            true
                                        );
                                        setIsRegistered(
                                            false
                                        );
                                        setCheckedUser(
                                            null
                                        );
                                    }}
                                    className="w-full cursor-pointer rounded-full border border-gray-200 px-6 py-4 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                                >
                                    Continuar sem cadastro
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f7fdfb] to-[#e9f7f2]">
                <div className="absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-[#35a989]/15 blur-3xl" />

                <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-[#35a989]/15 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#35a989]"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </Link>

                    <div className="mt-8 max-w-3xl">
                        <h1 className="mt-4 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
                            Planeje sua viagem
                            <br />
                            com a{" "}
                            <span className="text-[#35a989]">
                                Maylon
                            </span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                            Informe os detalhes da sua viagem e escolha o veículo ideal para você ou para o seu grupo.
                        </p>

                        {userChecked &&
                            isRegistered && (
                                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e8f7f3] px-4 py-2.5 text-xs font-bold text-[#23886f]">
                                    <CheckCircle2 size={16} />
                                    Seus dados foram preenchidos automaticamente.
                                </div>
                            )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
                <form
                    onSubmit={handleSubmit}
                    className="grid items-start gap-7 lg:grid-cols-[1fr_380px]"
                >
                    <div className="space-y-6">
                        <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                    <Users size={21} />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-gray-950">
                                        Seus dados
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Informe seu nome e telefone para verificar seu cadastro.
                                    </p>
                                </div>
                            </div>

                            {isRegistered && (
                                <div className="mt-5 flex items-center gap-2 rounded-2xl bg-[#e8f7f3] px-4 py-3 text-xs font-semibold text-[#23886f]">
                                    <CheckCircle2 size={16} />
                                    Cadastro Maylon encontrado.
                                </div>
                            )}

                            <div className="mt-6 grid gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                                        Nome completo
                                    </label>

                                    <input
                                        required
                                        type="text"
                                        value={form.name}
                                        disabled={
                                            userChecked
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "name",
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Digite seu nome completo"
                                        className="h-12 w-full capitalize rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10 disabled:cursor-not-allowed disabled:opacity-70"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                                        WhatsApp / Telefone
                                    </label>

                                    <input
                                        required
                                        type="tel"
                                        value={form.phone}
                                        disabled={
                                            userChecked
                                        }
                                        onChange={(event) =>
                                            updateField(
                                                "phone",
                                                formatPhone(
                                                    event.target
                                                        .value
                                                )
                                            )
                                        }
                                        placeholder="(11) 99999-9999"
                                        maxLength={15}
                                        inputMode="numeric"
                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10 disabled:cursor-not-allowed disabled:opacity-70"
                                    />
                                </div>

                                {!userChecked ? (
                                    <button
                                        type="button"
                                        onClick={
                                            handleCheckUser
                                        }
                                        disabled={
                                            checkingUser
                                        }
                                        className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#35a989] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition hover:bg-[#2f9679] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {checkingUser ? (
                                            <>
                                                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Verificando cadastro...
                                            </>
                                        ) : (
                                            <>
                                                Continuar
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserChecked(
                                                false
                                            );
                                            setIsRegistered(
                                                false
                                            );
                                            setCheckedUser(
                                                null
                                            );
                                        }}
                                        className="w-full cursor-pointer rounded-full border border-gray-200 px-6 py-3.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                                    >
                                        Alterar nome ou telefone
                                    </button>
                                )}
                            </div>
                        </div>

                        {userChecked && (
                            <>
                                <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                            <Car size={21} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-black text-gray-950">
                                                Escolha seu veículo
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Selecione a opção mais adequada para sua viagem.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                        {vehicles.map(
                                            (
                                                item
                                            ) => {
                                                const Icon =
                                                    item.icon;

                                                const selected =
                                                    vehicle ===
                                                    item.id;

                                                return (
                                                    <button
                                                        key={
                                                            item.id
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            setVehicle(
                                                                item.id
                                                            )
                                                        }
                                                        className={`relative cursor-pointer rounded-2xl border p-4 text-left transition-all ${
                                                            selected
                                                                ? "border-[#35a989] bg-[#e8f7f3] shadow-sm"
                                                                : "border-gray-200 bg-white hover:border-[#35a989]/40 hover:bg-gray-50"
                                                        }`}
                                                    >
                                                        {selected && (
                                                            <CheckCircle2
                                                                size={
                                                                    19
                                                                }
                                                                className="absolute right-3 top-3 text-[#35a989]"
                                                            />
                                                        )}

                                                        <div
                                                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                                                                selected
                                                                    ? "bg-[#35a989] text-white"
                                                                    : "bg-gray-100 text-gray-600"
                                                            }`}
                                                        >
                                                            <Icon
                                                                size={
                                                                    21
                                                                }
                                                            />
                                                        </div>

                                                        <p className="mt-4 text-sm font-black text-gray-900">
                                                            {
                                                                item.name
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                                            {
                                                                item.description
                                                            }
                                                        </p>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                            <MapPin size={21} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-black text-gray-950">
                                                Origem e destino
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Digite um endereço ou use sua localização atual.
                                            </p>
                                        </div>
                                    </div>

                                    {googleMapsError && (
                                        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                            <p className="text-xs leading-5 text-amber-700">
                                                O Google Maps não pôde ser carregado. Você ainda pode digitar os endereços manualmente.
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-6 space-y-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                Local de embarque
                                            </label>

                                            <div className="relative">
                                                {googleMapsError ? (
                                                    <input
                                                        required
                                                        type="text"
                                                        value={
                                                            form.origin
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            updateField(
                                                                "origin",
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="Endereço de origem"
                                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                                                    />
                                                ) : googleMapsLoaded ? (
                                                    <AddressAutocomplete
                                                        required
                                                        value={
                                                            form.origin
                                                        }
                                                        onChange={(
                                                            value
                                                        ) =>
                                                            updateField(
                                                                "origin",
                                                                value
                                                            )
                                                        }
                                                        placeholder="Endereço de origem"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-100" />
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={
                                                        getCurrentLocation
                                                    }
                                                    disabled={
                                                        gettingLocation
                                                    }
                                                    title="Usar minha localização atual"
                                                    className="absolute right-2 top-1/2 z-30 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-xl text-[#35a989] transition hover:bg-[#e8f7f3] disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {gettingLocation ? (
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#35a989]/30 border-t-[#35a989]" />
                                                    ) : (
                                                        <Navigation size={17} />
                                                    )}
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                Destino
                                            </label>

                                            <div className="relative">
                                                {googleMapsError ? (
                                                    <input
                                                        required
                                                        type="text"
                                                        value={
                                                            form.destination
                                                        }
                                                        onChange={(
                                                            event
                                                        ) =>
                                                            updateField(
                                                                "destination",
                                                                event
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                        placeholder="Endereço de destino"
                                                        className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                                                    />
                                                ) : googleMapsLoaded ? (
                                                    <AddressAutocomplete
                                                        required
                                                        value={
                                                            form.destination
                                                        }
                                                        onChange={(
                                                            value
                                                        ) =>
                                                            updateField(
                                                                "destination",
                                                                value
                                                            )
                                                        }
                                                        placeholder="Endereço de destino"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-100" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                            <CalendarDays size={21} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-black text-gray-950">
                                                Data e horário
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Escolha quando deseja realizar sua viagem.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                Data da viagem
                                            </label>

                                            <input
                                                required
                                                type="date"
                                                value={
                                                    form.date
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        "date",
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                Horário
                                            </label>

                                            <input
                                                required
                                                type="time"
                                                value={
                                                    form.time
                                                }
                                                onChange={(
                                                    event
                                                ) =>
                                                    updateField(
                                                        "time",
                                                        event
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="h-12 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setRoundTrip(
                                                (current) =>
                                                    !current
                                            )
                                        }
                                        className={`mt-5 flex w-full cursor-pointer items-center justify-between rounded-2xl border p-4 text-left transition ${
                                            roundTrip
                                                ? "border-[#35a989] bg-[#e8f7f3]"
                                                : "border-gray-200 bg-gray-50"
                                        }`}
                                    >
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                Quero ida e volta
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Informe também os dados do retorno.
                                            </p>
                                        </div>

                                        <div
                                            className={`h-6 w-11 rounded-full p-1 transition ${
                                                roundTrip
                                                    ? "bg-[#35a989]"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            <div
                                                className={`h-4 w-4 rounded-full bg-white transition ${
                                                    roundTrip
                                                        ? "translate-x-5"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    </button>

                                    {roundTrip && (
                                        <div className="mt-5 grid gap-4 rounded-2xl bg-[#f7faf9] p-4 sm:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                    Data de retorno
                                                </label>

                                                <input
                                                    required
                                                    type="date"
                                                    value={
                                                        form.returnDate
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "returnDate",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#35a989] focus:ring-4 focus:ring-[#35a989]/10"
                                                />
                                            </div>

                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-800">
                                                    Horário de retorno
                                                </label>

                                                <input
                                                    required
                                                    type="time"
                                                    value={
                                                        form.returnTime
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateField(
                                                            "returnTime",
                                                            event
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#35a989] focus:ring-4 focus:ring-[#35a989]/10"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f7f3] text-[#35a989]">
                                            <Users size={21} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-black text-gray-950">
                                                Passageiros
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                Quantas pessoas irão viajar?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#f7faf9] p-4">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                Número de passageiros
                                            </p>

                                            <p className="mt-1 text-xs text-gray-500">
                                                Máximo de 15 passageiros.
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePassengers(
                                                        passengers -
                                                            1
                                                    )
                                                }
                                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-[#35a989] hover:text-[#35a989]"
                                            >
                                                <Minus size={17} />
                                            </button>

                                            <span className="w-7 text-center text-lg font-black text-gray-900">
                                                {
                                                    passengers
                                                }
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePassengers(
                                                        passengers +
                                                            1
                                                    )
                                                }
                                                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:border-[#35a989] hover:text-[#35a989]"
                                            >
                                                <Plus size={17} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                                    <label className="mb-2 block text-sm font-semibold text-gray-800">
                                        Observações
                                    </label>

                                    <textarea
                                        value={
                                            form.observations
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            updateField(
                                                "observations",
                                                event.target
                                                    .value
                                            )
                                        }
                                        rows={4}
                                        placeholder="Alguma informação importante sobre sua viagem?"
                                        className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#35a989] focus:bg-white focus:ring-4 focus:ring-[#35a989]/10"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-6">
                        <div className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-lg">
                            <div className="bg-[#0b6e4f] p-6 text-white">
                                <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                                    Resumo da reserva
                                </p>

                                <h2 className="mt-2 text-2xl font-black">
                                    Sua viagem
                                </h2>
                            </div>

                            <div className="space-y-5 p-6">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f7f3] text-[#35a989]">
                                        <Car size={19} />
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Veículo
                                        </p>

                                        <p className="text-sm font-bold text-gray-900">
                                            {
                                                selectedVehicle.name
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100" />

                                <div className="flex gap-3">
                                    <MapPin
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#35a989]"
                                    />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Origem
                                        </p>

                                        <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                                            {form.origin ||
                                                "Informe o local de embarque"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Navigation
                                        size={19}
                                        className="mt-0.5 shrink-0 text-[#35a989]"
                                    />

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Destino
                                        </p>

                                        <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                                            {form.destination ||
                                                "Informe o destino"}
                                        </p>
                                    </div>
                                </div>

                                <div className="h-px bg-gray-100" />

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-[#f7faf9] p-3">
                                        <CalendarDays
                                            size={18}
                                            className="text-[#35a989]"
                                        />

                                        <p className="mt-2 text-[11px] text-gray-500">
                                            Data
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-gray-900">
                                            {form.date ||
                                                "--/--/----"}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl bg-[#f7faf9] p-3">
                                        <Clock3
                                            size={18}
                                            className="text-[#35a989]"
                                        />

                                        <p className="mt-2 text-[11px] text-gray-500">
                                            Horário
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-gray-900">
                                            {form.time ||
                                                "--:--"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between rounded-2xl bg-[#f7faf9] p-4">
                                    <span className="text-sm text-gray-600">
                                        Passageiros
                                    </span>

                                    <span className="text-sm font-black text-gray-900">
                                        {passengers}
                                    </span>
                                </div>

                                {roundTrip && (
                                    <div className="rounded-2xl border border-[#35a989]/20 bg-[#e8f7f3] p-4">
                                        <p className="text-xs font-bold text-[#23886f]">
                                            VIAGEM DE IDA E VOLTA
                                        </p>

                                        <p className="mt-1 text-xs text-gray-600">
                                            Retorno:{" "}
                                            {form.returnDate ||
                                                "--/--/----"}{" "}
                                            às{" "}
                                            {form.returnTime ||
                                                "--:--"}
                                        </p>
                                    </div>
                                )}

                                <div className="rounded-2xl border border-gray-100 p-4">
                                    <div className="flex gap-3">
                                        <ShieldCheck
                                            size={19}
                                            className="shrink-0 text-[#35a989]"
                                        />

                                        <p className="text-xs leading-5 text-gray-600">
                                            Sua solicitação será analisada pela equipe Maylon antes da confirmação da viagem.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={
                                        submitting ||
                                        !userChecked
                                    }
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#35a989] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#35a989]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2f9679] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                                >
                                    {submitting ? (
                                        <>
                                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Solicitar reserva
                                            <ArrowRight size={19} />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-[11px] leading-5 text-gray-400">
                                    Ao enviar, você solicita a reserva. A viagem será confirmada após análise e contato da Maylon.
                                </p>
                            </div>
                        </div>
                    </aside>
                </form>
            </section>

            <style jsx global>{`
                .pac-container {
                    z-index: 99999 !important;
                    border: 1px solid #e5e7eb !important;
                    border-radius: 16px !important;
                    margin-top: 6px !important;
                    overflow: hidden !important;
                    box-shadow: 0 20px 45px rgba(15, 23, 42, 0.14) !important;
                    font-family: inherit !important;
                }

                .pac-item {
                    padding: 10px 14px !important;
                    cursor: pointer !important;
                    border-top: 1px solid #f1f5f9 !important;
                    font-size: 13px !important;
                }

                .pac-item:hover {
                    background: #f7faf9 !important;
                }

                .pac-item-query {
                    font-weight: 700 !important;
                }
            `}</style>
        </main>
    );
}