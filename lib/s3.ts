import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

function isNotFoundError(error: unknown): boolean {
    if (!error || typeof error !== "object") {
        return false;
    }

    const candidate = error as {
        name?: string;
        $metadata?: { httpStatusCode?: number };
    };

    return (
        candidate.name === "NoSuchKey" ||
        candidate.$metadata?.httpStatusCode === 404
    );
}

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

/**
 * Read text object from S3. Returns null when key does not exist.
 */
export async function getObject(key: string): Promise<string | null> {
    try {
        const response = await s3.send(
            new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET!,
                Key: key,
            })
        );

        if (!response.Body) {
            return null;
        }

        return await response.Body.transformToString();
    } catch (error) {
        if (isNotFoundError(error)) {
            return null;
        }

        throw error;
    }
}

/**
 * Read JSON object from S3. Returns null when key does not exist.
 */
export async function getJson<T = unknown>(key: string): Promise<T | null> {
    const raw = await getObject(key);
    if (!raw) {
        return null;
    }

    return JSON.parse(raw) as T;
}
