import { getJson, putJson } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PROJECTS_JSON_KEY = "public/projects.json";

const projectSchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    framework: z.string().min(1),
    language: z.string().min(1),
    source: z.string().min(1),
    created_at: z.string().min(1),
    updated_at: z.string().min(1),
    remote_registered: z.boolean().optional().default(false),
});

const manifestSchema = z.object({
    version: z.number().int().positive(),
    updated_at: z.string().min(1),
    projects: z.array(projectSchema),
});

function ensureAuthorized(req: NextRequest): NextResponse | null {
    const expectedToken = process.env.ARTISAAN_INTERNAL_API_TOKEN?.trim();

    if (!expectedToken) {
        return null;
    }

    const auth = req.headers.get("authorization") ?? "";
    const provided = auth.replace(/^Bearer\s+/i, "").trim();

    if (provided === expectedToken) {
        return null;
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

function parseManifestPayload(body: unknown) {
    if (!body || typeof body !== "object") {
        return manifestSchema.safeParse(body);
    }

    const payload = body as { manifest?: unknown };

    if (payload.manifest !== undefined) {
        return manifestSchema.safeParse(payload.manifest);
    }

    return manifestSchema.safeParse(body);
}

export async function GET(req: NextRequest) {
    const unauthorized = ensureAuthorized(req);
    if (unauthorized) {
        return unauthorized;
    }

    try {
        const manifest = await getJson(PROJECTS_JSON_KEY);

        if (!manifest) {
            return NextResponse.json({ error: "Manifest not found" }, { status: 404 });
        }

        return NextResponse.json({ manifest }, { status: 200 });
    } catch (error) {
        console.error("[/api/cli/projects/manifest GET]", error);
        return NextResponse.json(
            { error: "Failed to read projects manifest" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const unauthorized = ensureAuthorized(req);
    if (unauthorized) {
        return unauthorized;
    }

    const body = await req.json();
    const parsed = parseManifestPayload(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", details: parsed.error.flatten() },
            { status: 400 }
        );
    }

    const manifest = parsed.data;

    try {
        const existing = await getJson<Record<string, unknown>>(PROJECTS_JSON_KEY);

        const payloadToSave: Record<string, unknown> = {
            ...(existing && typeof existing === "object" ? existing : {}),
            ...manifest,
        };

        await putJson(PROJECTS_JSON_KEY, payloadToSave);

        return NextResponse.json(
            {
                ok: true,
                key: PROJECTS_JSON_KEY,
                total_projects: manifest.projects.length,
                updated_at: manifest.updated_at,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[/api/cli/projects/manifest POST]", error);
        return NextResponse.json(
            { error: "Failed to persist projects manifest" },
            { status: 500 }
        );
    }
}
