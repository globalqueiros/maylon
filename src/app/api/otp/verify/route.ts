import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
    const db = await mysql.createConnection({
        host: process.env.DB2_HOST,
        user: process.env.DB2_USER,
        password: process.env.DB2_PASSWORD,
        database: process.env.DB2_NAME,
    });

    try {
        const { phone, otp } = await req.json();
        if (!phone || !otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Telefone e código são obrigatórios.",
                },
                { status: 400 }
            );
        }
        let phoneNumber = phone.replace(/\D/g, "");
        if (!phoneNumber.startsWith("55")) {
            phoneNumber = "55" + phoneNumber;
        }

        phoneNumber = "+" + phoneNumber;

        const [rows] = await db.execute(
            `SELECT *
             FROM otp_verifications
             WHERE phone_or_email = ?
             LIMIT 1`,
            [phoneNumber]
        );

        const otpData = (rows as any[])[0];

        if (!otpData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Nenhum código encontrado para este telefone.",
                },
                { status: 404 }
            );
        }

        if (otpData.is_temp_blocked == 1) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Telefone temporariamente bloqueado.",
                },
                { status: 403 }
            );
        }

        if (new Date(otpData.expires_at) < new Date()) {
            await db.execute(
                `DELETE FROM otp_verifications
                 WHERE phone_or_email = ?`,
                [phoneNumber]
            );

            return NextResponse.json(
                {
                    success: false,
                    message: "Código expirado.",
                },
                { status: 400 }
            );
        }

        const codigoBanco = String(otpData.otp).trim();
        const codigoRecebido = String(otp).trim();

        if (codigoBanco !== codigoRecebido) {
            const failed = Number(otpData.failed_attempt) + 1;

            if (failed >= 5) {
                await db.execute(
                    `UPDATE otp_verifications
             SET
                failed_attempt = ?,
                is_temp_blocked = 1,
                blocked_at = NOW(),
                updated_at = NOW()
             WHERE phone_or_email = ?`,
                    [failed, phoneNumber]
                );

                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Limite de tentativas de verificação excedido. Aguarde alguns minutos antes de solicitar um novo código.",
                    },
                    { status: 403 }
                );
            }

            await db.execute(
                `UPDATE otp_verifications
                SET
                failed_attempt = ?,
                updated_at = NOW()
                WHERE phone_or_email = ?`,
                [failed, phoneNumber]
            );

            return NextResponse.json(
                {
                    success: false,
                    message: "Ops! O código informado está incorreto. Tente novamente.",
                },
                { status: 400 }
            );
        }

        await db.execute(
            `DELETE FROM otp_verifications
             WHERE phone_or_email = ?`,
            [phoneNumber]
        );
        return NextResponse.json({
            success: true,
            message: "Telefone verificado com sucesso.",
        });

    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    } finally {
        await db.end();
    }
}