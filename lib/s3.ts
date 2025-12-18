import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

/**
 * Put any object (text, mdx, etc)
 */
export async function putObject(
    key: string,
    body: string | Buffer,
    contentType = "text/plain"
) {
    await s3.send(
        new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET!,
            Key: key,
            Body: body,
            ContentType: contentType,
        })
    );
}

/**
 * Put JSON helper
 */
export async function putJson(
    key: string,
    body: object
) {
    return putObject(
        key,
        JSON.stringify(body, null, 2),
        "application/json"
    );
}
