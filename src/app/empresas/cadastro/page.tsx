"use client";

import { useState } from "react";

const initialForm = {
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    email: "",
    telefone: "",
    password: "",
    user_type: 2,
};

export default function CadastroEmpresa() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState(initialForm);

    async function buscarCNPJ(cnpj: string) {
        const numero = cnpj.replace(/\D/g, "");

        if (numero.length !== 14) return;

        try {
            setLoading(true);

            const response = await fetch(
                `https://brasilapi.com.br/api/cnpj/v1/${numero}`
            );

            const data = await response.json();

            setForm((prev) => ({
                ...prev,
                razaoSocial: data.razao_social || "",
                nomeFantasia: data.nome_fantasia || "",
            }));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setForm(initialForm);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            console.log(data);

            // limpa formulário após cadastro
            setForm(initialForm);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mx-auto my-10 max-w-7xl rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-8 text-3xl font-bold text-black">
                    Cadastro da Empresa
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                CNPJ
                            </label>
                            <input
                                type="text"
                                value={form.cnpj}
                                onChange={(e) =>
                                    setForm({ ...form, cnpj: e.target.value })
                                }
                                onBlur={() => buscarCNPJ(form.cnpj)}
                                placeholder="00.000.000/0001-00"
                                className="w-full rounded-xl border p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Nome Fantasia
                            </label>
                            <input
                                type="text"
                                value={form.nomeFantasia}
                                readOnly
                                className="w-full rounded-xl border bg-slate-50 p-3"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium">
                                Razão Social
                            </label>
                            <input
                                type="text"
                                value={form.razaoSocial}
                                readOnly
                                className="w-full rounded-xl border bg-slate-50 p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="w-full rounded-xl border p-3"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">
                                Telefone
                            </label>
                            <input
                                type="text"
                                value={form.telefone}
                                onChange={(e) =>
                                    setForm({ ...form, telefone: e.target.value })
                                }
                                className="w-full rounded-xl border p-3"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer rounded-xl text-sm bg-teal-500 px-6 py-3 text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:bg-teal-300"
                        >
                            {loading ? "Cadastrando..." : "Cadastrar Empresa"}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="cursor-pointer rounded-xl text-sm bg-red-500 px-6 py-3 text-white transition-colors hover:bg-red-600"
                        >
                            Cancelar
                        </button>                        
                    </div>
                </form>
            </div>
        </>
    );
}