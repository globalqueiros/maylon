import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import twilio from "twilio";

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: Request) {
    const db = await mysql.createConnection({
        host: process.env.DB2_HOST,
        user: process.env.DB2_USER,
        password: process.env.DB2_PASSWORD,
        database: process.env.DB2_NAME,
    });
    try {
        const { phone } = await req.json();
        if (!phone) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Telefone obrigatório."
                },
                { status: 400 }
            );
        }
        let phoneNumber = phone.replace(/\D/g, "");
        if (!phoneNumber.startsWith("55")) {
            phoneNumber = "55" + phoneNumber;
        }
        phoneNumber = "+" + phoneNumber;
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        const expires = new Date(
            Date.now() + 5 * 60 * 1000
        );
        await db.execute(
            `DELETE FROM otp_verifications
             WHERE phone_or_email = ?`,
            [phoneNumber]
        );
        await db.execute(
            `INSERT INTO otp_verifications (
                phone_or_email,
                otp,
                is_temp_blocked,
                expires_at,
                created_at,
                updated_at,
                failed_attempt,
                blocked_at
            )
            VALUES (?, ?, 0, ?, NOW(), NOW(), 0, NULL)`,
            [
                phoneNumber,
                otp,
                expires
            ]
        );
        await client.messages.create({
            body: `Seu código Maylon Drive é ${otp}. Válido por 5 minutos.`,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: phoneNumber
        });
        return NextResponse.json({
            success: true,
            message: "Código enviado com sucesso."
        });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json(
            {
                success: false,
                message: error.message
            },
            {
                status: 500
            }
        );

    } finally {
        await db.end();
    }
}