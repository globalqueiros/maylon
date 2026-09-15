import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";
import bcrypt from "bcryptjs";
import fs from "fs/promises";
import path from "path";

const db = mysql.createPool({
    host: process.env.DB2_HOST,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASSWORD,
    database: process.env.DB2_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function generateUniqueRefCode(db: mysql.Connection) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    while (true) {
        const code = Array.from({ length: 10 }, () =>
            chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        const [rows] = await db.execute(
            "SELECT id FROM users WHERE ref_code = ? LIMIT 1",
            [code]
        );
        if ((rows as any[]).length === 0) {
            return code;
        }
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const full_name = formData.get("full_name") as string;
        const parts = full_name.trim().split(/\s+/);
        const first_name = parts.shift() || "";
        const last_name = parts.join(" ");
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const password = formData.get("password") as string;
        const identification_number = formData.get("identification_number") as string;
        const identification_type = formData.get("identification_type") as string;
        const service = formData.get("service") as string;

        const [existingUsers] = await db.execute(
            `SELECT email, phone
                FROM users
                WHERE email = ? OR phone = ?
                LIMIT 1`,
            [email, phone]
        );
        const users = existingUsers as any[];
        if (users.length > 0) {
            if (users[0].email === email) {
                return NextResponse.json(
                    {
                        success: false,
                        field: "email",
                        message: "Este e-mail já está cadastrado.",
                    },
                    { status: 400 }
                );
            }
            if (users[0].phone === phone) {
                return NextResponse.json(
                    {
                        success: false,
                        field: "phone",
                        message: "Este telefone já está cadastrado.",
                    },
                    { status: 400 }
                );
            }
        }
        const profile_image = formData.get("profile_image") as File | null;
        let profileImageName: string | null = null;
        if (profile_image) {
            const bytes = await profile_image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const extension = profile_image.name.split(".").pop();
            profileImageName = `${randomUUID()}.${extension}`;
            const uploadDir =
                "/var/www/auth.maylon.com.br/storage/app/public/driver/profile";
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(
                path.join(uploadDir, profileImageName),
                buffer
            );
        }
        const now = new Date()
            .toLocaleString("sv-SE", {
                timeZone: "America/Sao_Paulo",
            })
            .replace(" ", " ");
        const id = randomUUID();
        const userLevelId = randomUUID();
        const userAccountId = randomUUID();
        const driverDetailsId = randomUUID();
        const refCode = await generateUniqueRefCode(db);
        const hash = await bcrypt.hash(password, 10);
        if (!service) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Selecione pelo menos um serviço.",
                },
                { status: 400 }
            );
        }
        await db.execute(
            `INSERT INTO users (
                id,
                user_level_id,
                ref_code,
                profile_image,
                full_name,
                first_name,
                last_name,
                email,
                phone,
                identification_number,
                identification_type,
                password,
                user_type,
                is_active,
                loyalty_points,
                current_language_key,
                created_at,
                updated_at
            )
            VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                'driver',
                1,
                0,
                'pt',
                ?,
                ?
            )`,
            [
                id,
                userLevelId,
                refCode,
                profileImageName,
                `${first_name} ${last_name}`,
                first_name,
                last_name,
                email,
                phone,
                identification_number,
                identification_type,
                hash,
                now,
                now,
            ]
        );

        await db.execute(
            `INSERT INTO user_accounts (
                id,
                user_id,
                payable_balance,
                receivable_balance,
                received_balance,
                pending_balance,
                wallet_balance,
                total_withdrawn,
                referral_earn,
                created_at,
                updated_at
            )
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
            [
                userAccountId,
                id,
                0.00,
                0.00,
                0.00,
                0.00,
                0.00,
                0.00,
                0,
                now,
                now,
            ]
        );

        await db.execute(
            `INSERT INTO driver_details (
                id,
                user_id,
                is_online,
                availability_status,
                online,
                offline,
                online_time,
                accepted,
                completed,
                start_driving,
                on_driving_time,
                idle_time,
                service,
                ride_count,
                parcel_count,
                is_verified,
                base_image,
                verified_image,
                is_suspended,
                suspend_reason,
                trigger_verification_at,
                created_at,
                updated_at
            )
            VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
            [
                driverDetailsId,
                id,
                0,
                "unavailable",
                null,
                null,
                0.00,
                null,
                null,
                null,
                0.00,
                0.00,
                service,
                0,
                0,
                0,
                null,
                null,
                0,
                null,
                null,
                now,
                now,
            ]
        );

        return NextResponse.json({
            success: true,
            refCode,
        });
    } catch (error: any) {
        console.error("Erro ao cadastrar:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
                sqlMessage: error.sqlMessage,
                code: error.code,
            },
            { status: 500 }
        );
    }
}