import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db2 } from "../../../lib/db";
import { uploadFotoEmpresa } from "../../../lib/s3";

function limparCNPJ(cnpj: string): string {
return cnpj.replace(/\D/g, "");
}

function validarCNPJ(cnpj: string): boolean {
const numero = limparCNPJ(cnpj);

if (numero.length !== 14) {
return false;
}

if (/^(\d)\1+$/.test(numero)) {
return false;
}

let tamanho = 12;
let numeros = numero.substring(0, tamanho);
let digitos = numero.substring(tamanho);

let soma = 0;
let pos = tamanho - 7;

for (let i = tamanho; i >= 1; i--) {
soma += Number(numeros.charAt(tamanho - i)) * pos--;

if (pos < 2) {
  pos = 9;
}

}

let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

if (resultado !== Number(digitos.charAt(0))) {
return false;
}

tamanho = 13;
numeros = numero.substring(0, tamanho);

soma = 0;
pos = tamanho - 7;

for (let i = tamanho; i >= 1; i--) {
soma += Number(numeros.charAt(tamanho - i)) * pos--;

if (pos < 2) {
  pos = 9;
}

}

resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

return resultado === Number(digitos.charAt(1));
}

function validarEmail(email: string): boolean {
return /^[^\s@]+@[^\s@]+.[^\s@]+$/.test(email);
}

function limparTelefone(telefone: string): string {
return telefone.replace(/\D/g, "");
}

export async function POST(request: Request) {
try {
const formData = await request.formData();

// ==========================================
// CAMPOS
// ==========================================

const cnpjValue = formData.get("cnpj");
const razaoSocialValue = formData.get("razaoSocial");
const nomeFantasiaValue = formData.get("nomeFantasia");
const emailValue = formData.get("email");
const telefoneValue = formData.get("telefone");
const passwordValue = formData.get("password");
const userTypeValue = formData.get("user_type");
const meioPagamentoValue = formData.get("meioPagamento");
const fotoValue = formData.get("fotoPerfil");

// ==========================================
// CONVERSÃO
// ==========================================

const cnpj =
  typeof cnpjValue === "string"
    ? cnpjValue
    : "";

const razaoSocial =
  typeof razaoSocialValue === "string"
    ? razaoSocialValue
    : "";

const nomeFantasia =
  typeof nomeFantasiaValue === "string"
    ? nomeFantasiaValue
    : "";

const email =
  typeof emailValue === "string"
    ? emailValue
    : "";

const telefone =
  typeof telefoneValue === "string"
    ? telefoneValue
    : "";

const password =
  typeof passwordValue === "string"
    ? passwordValue
    : "";

const meioPagamento =
  typeof meioPagamentoValue === "string"
    ? meioPagamentoValue
    : "";

const userType =
  typeof userTypeValue === "string" &&
  userTypeValue.trim() !== ""
    ? Number(userTypeValue)
    : 2;

const fotoPerfil =
  fotoValue instanceof File && fotoValue.size > 0
    ? fotoValue
    : null;

// ==========================================
// VALIDAÇÃO CNPJ
// ==========================================

if (!validarCNPJ(cnpj)) {
  return NextResponse.json(
    {
      success: false,
      message: "CNPJ inválido.",
    },
    { status: 400 }
  );
}

// ==========================================
// VALIDAÇÃO RAZÃO SOCIAL
// ==========================================

if (!razaoSocial.trim()) {
  return NextResponse.json(
    {
      success: false,
      message: "Informe a Razão Social.",
    },
    { status: 400 }
  );
}

// ==========================================
// VALIDAÇÃO E-MAIL
// ==========================================

if (
  !email.trim() ||
  !validarEmail(email.trim())
) {
  return NextResponse.json(
    {
      success: false,
      message: "Informe um e-mail válido.",
    },
    { status: 400 }
  );
}

// ==========================================
// VALIDAÇÃO TELEFONE
// ==========================================

const telefoneLimpo = limparTelefone(telefone);

if (
  telefoneLimpo.length < 10 ||
  telefoneLimpo.length > 11
) {
  return NextResponse.json(
    {
      success: false,
      message: "Telefone inválido.",
    },
    { status: 400 }
  );
}

// ==========================================
// VALIDAÇÃO SENHA
// ==========================================

if (!password || password.length < 6) {
  return NextResponse.json(
    {
      success: false,
      message:
        "A senha deve possuir pelo menos 6 caracteres.",
    },
    { status: 400 }
  );
}

// ==========================================
// VALIDAÇÃO FOTO
// ==========================================

if (fotoPerfil) {
  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!tiposPermitidos.includes(fotoPerfil.type)) {
    return NextResponse.json(
      {
        success: false,
        message:
          "A foto deve ser PNG, JPG ou WEBP.",
      },
      { status: 400 }
    );
  }

  if (fotoPerfil.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      {
        success: false,
        message:
          "A foto deve ter no máximo 5MB.",
      },
      { status: 400 }
    );
  }
}

// ==========================================
// VALIDAÇÃO PAGAMENTO
// ==========================================

const pagamentosValidos = [
  "boleto",
  "cartao_business",
  "pix",
];

if (!pagamentosValidos.includes(meioPagamento)) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Selecione um meio de pagamento válido.",
    },
    { status: 400 }
  );
}

// ==========================================
// LIMPEZA DOS DADOS
// ==========================================

const cnpjLimpo = limparCNPJ(cnpj);

const emailLimpo = email
  .trim()
  .toLowerCase();

const razaoSocialLimpa =
  razaoSocial.trim();

const nomeFantasiaLimpo =
  nomeFantasia.trim() || null;

// ==========================================
// VERIFICA CNPJ
// ==========================================

const [empresaCnpj] = await db2.execute(
  `
    SELECT id
    FROM empresas
    WHERE cnpj = ?
    LIMIT 1
  `,
  [cnpjLimpo]
);

if ((empresaCnpj as any[]).length > 0) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Este CNPJ já está cadastrado.",
    },
    { status: 409 }
  );
}

// ==========================================
// VERIFICA E-MAIL
// ==========================================

const [empresaEmail] = await db2.execute(
  `
    SELECT id
    FROM empresas
    WHERE email = ?
    LIMIT 1
  `,
  [emailLimpo]
);

if ((empresaEmail as any[]).length > 0) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Este e-mail já está cadastrado.",
    },
    { status: 409 }
  );
}

// ==========================================
// CRIA HASH DA SENHA
// ==========================================

const senhaHash = await bcrypt.hash(
  password,
  12
);

// ==========================================
// CRIA EMPRESA
// ==========================================

const [result] = await db2.execute(
  `
    INSERT INTO empresas (
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      telefone,
      password,
      foto_perfil
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
  [
    cnpjLimpo,
    razaoSocialLimpa,
    nomeFantasiaLimpo,
    emailLimpo,
    telefoneLimpo,
    senhaHash,
    null,
  ]
);

const insertId = (result as any).insertId;

// ==========================================
// AWS S3
// ==========================================

let fotoPerfilUrl: string | null = null;

if (fotoPerfil) {
  fotoPerfilUrl = await uploadFotoEmpresa(
    fotoPerfil,
    insertId
  );

  await db2.execute(
    `
      UPDATE empresas
      SET foto_perfil = ?
      WHERE id = ?
    `,
    [
      fotoPerfilUrl,
      insertId,
    ]
  );
}

// ==========================================
// BOLETO
// ==========================================

let boletoUrl: string | null = null;

/*
  Aqui entrará a integração oficial
  com o BTG para geração do boleto.

  Por enquanto o cadastro continua
  funcionando normalmente.
*/

if (meioPagamento === "boleto") {
  boletoUrl = null;
}

// ==========================================
// RESPOSTA
// ==========================================

return NextResponse.json(
  {
    success: true,

    message:
      "Empresa cadastrada com sucesso.",

    empresa: {
      id: insertId,

      cnpj: cnpjLimpo,

      razaoSocial:
        razaoSocialLimpa,

      nomeFantasia:
        nomeFantasiaLimpo,

      email: emailLimpo,

      telefone:
        telefoneLimpo,

      user_type:
        userType || 2,

      foto:
        !!fotoPerfil,

      fotoTipo:
        fotoPerfil?.type ?? null,

      fotoPerfil:
        fotoPerfilUrl,
    },

    pagamento: {
      meioPagamento,
      boletoUrl,
    },

    boletoUrl,

    pix: null,

    cartaoBusiness:
      meioPagamento === "cartao_business"
        ? {
            empresa:
              nomeFantasiaLimpo ||
              razaoSocialLimpa,

            mensagem:
              "Cartão Business selecionado.",
          }
        : null,
  },
  {
    status: 201,
  }
);

} catch (error: any) {
console.error(
"ERRO AO CADASTRAR EMPRESA:",
error
);

// ==========================================
// DUPLICIDADE
// ==========================================

if (error?.code === "ER_DUP_ENTRY") {
  return NextResponse.json(
    {
      success: false,
      message:
        "CNPJ ou e-mail já cadastrado.",
    },
    { status: 409 }
  );
}

// ==========================================
// TABELA NÃO EXISTE
// ==========================================

if (
  error?.code ===
  "ER_NO_SUCH_TABLE"
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "A tabela empresas não foi encontrada.",
    },
    { status: 500 }
  );
}

// ==========================================
// COLUNA NÃO EXISTE
// ==========================================

if (
  error?.code ===
  "ER_BAD_FIELD_ERROR"
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "A tabela empresas não possui uma das colunas necessárias.",

      error:
        process.env.NODE_ENV ===
        "development"
          ? error.message
          : undefined,
    },
    { status: 500 }
  );
}

// ==========================================
// ERRO AWS
// ==========================================

if (
  typeof error?.message === "string" &&
  (
    error.message.includes(
      "AWS_REGION"
    ) ||
    error.message.includes(
      "AWS_S3_BUCKET"
    )
  )
) {
  return NextResponse.json(
    {
      success: false,
      message:
        "O armazenamento de imagens não está configurado corretamente no servidor.",
    },
    { status: 500 }
  );
}

// ==========================================
// ERRO GENÉRICO
// ==========================================

return NextResponse.json(
  {
    success: false,

    message:
      "Erro interno ao cadastrar empresa.",

    error:
      process.env.NODE_ENV ===
      "development"
        ? error?.message
        : undefined,
  },
  { status: 500 }
);

}
}