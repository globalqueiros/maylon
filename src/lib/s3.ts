import {
    S3Client,
    PutObjectCommand,
} from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;

if (!region) {
    throw new Error("AWS_REGION não configurada.");
}

if (!bucket) {
    throw new Error("AWS_S3_BUCKET não configurada.");
}

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId:
            process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey:
            process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function uploadFotoEmpresa(
    file: File,
    cnpj: string
): Promise<string> {
    const buffer = Buffer.from(
        await file.arrayBuffer()
    );

    const extensao =
        file.type === "image/png"
            ? "png"
            : file.type === "image/webp"
            ? "webp"
            : "jpg";

    const key =
        `empresas/${cnpj}/logo-${Date.now()}.${extensao}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}
