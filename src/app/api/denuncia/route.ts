import { NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import db from "../../../lib/db";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId:
      process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:
      process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const numero_denuncia = formData.get(
      "numero_denuncia"
    ) as string;
    const nome = formData.get(
      "nome"
    ) as string;
    const email = formData.get(
      "email"
    ) as string;
    const telefone = formData.get(
      "telefone"
    ) as string;
    const tipo_denuncia = formData.get(
      "tipo_denuncia"
    ) as string;
    const mensagem = formData.get(
      "mensagem"
    ) as string;
    const files = formData.getAll(
      "anexos"
    ) as File[];

    if (
      !numero_denuncia ||
      !nome ||
      !email ||
      !telefone ||
      !tipo_denuncia ||
      !mensagem
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Preencha todos os campos obrigatórios",
        },
        {
          status: 400,
        }
      );
    }
    
    const [result]: any = await db.execute(
      `
      INSERT INTO denuncias (
        numero_denuncia,
        nome,
        email,
        telefone,
        tipo_denuncia,
        mensagem,
        created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, NOW())
      `,
      [
        numero_denuncia,
        nome,
        email,
        telefone,
        tipo_denuncia,
        mensagem,
      ]
    );

    const denunciaId = result.insertId;

    const uploadedFiles: string[] = [];

    for (const file of files) {
      if (!file || file.size === 0) continue;

      const buffer = Buffer.from(
        await file.arrayBuffer()
      );

      const sanitizedName = file.name
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "");

      const fileName = `denuncias/${Date.now()}-${sanitizedName}`;

      await s3.send(
        new PutObjectCommand({
          Bucket:
            process.env.AWS_S3_BUCKET!,
          Key: fileName,
          Body: buffer,
          ContentType: file.type,
        })
      );

      const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

      uploadedFiles.push(fileUrl);

      await db.execute(
        `
        INSERT INTO denuncia_anexos (
          denuncia_id,
          arquivo,
          created_at
        )
        VALUES (?, ?, NOW())
        `,
        [denunciaId, fileUrl]
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Recebemos sua denúncia com sucesso. Nossa equipe irá analisar as informações e retornar em até 4 dias úteis.",
      denuncia_id: denunciaId,
      anexos: uploadedFiles,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Estamos enfrentando uma instabilidade no momento. Tente enviar sua denúncia novamente em alguns minutos.",
      },
      {
        status: 500,
      }
    );
  }
}