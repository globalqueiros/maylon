// src/lib/cpf.ts
// No Pix Automático o banco do pagador confere o CPF informado na autorização
// com o titular da conta. Por isso o CPF precisa ser real e validado.

export function somenteDigitos(value: string): string {
  return (value || "").replace(/\D/g, "");
}

export function cpfValido(value: string): boolean {
  const cpf = somenteDigitos(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const digito = (base: string, pesoInicial: number) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (pesoInicial - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const d1 = digito(cpf.slice(0, 9), 10);
  const d2 = digito(cpf.slice(0, 10), 11);
  return d1 === Number(cpf[9]) && d2 === Number(cpf[10]);
}

export function mascararCpf(value: string): string {
  const d = somenteDigitos(value).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}
