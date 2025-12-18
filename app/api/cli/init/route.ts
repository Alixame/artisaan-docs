import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { putJson } from "@/lib/s3";

export interface ProjectManifest {
    slug: string;
    name: string;
    visibility: "public" | "private";
    created_at: string;
    updated_at: string;
    framework: string;
    language: string;
    versions: string[];
}


const schema = z.object({
    slug: z.string().min(2),
    name: z.string(),
    framework: z.string(),
    language: z.string(),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload", details: parsed.error },
            { status: 400 }
        );
    }

    const { slug, name, framework, language } = parsed.data;
    const now = new Date().toISOString();

    const manifest: ProjectManifest = {
        slug,
        name,
        visibility: "public",
        created_at: now,
        updated_at: now,
        framework,
        language,
        versions: [],
    };

    try {
        await putJson(
            `projects/${slug}/manifest.json`,
            manifest
        );

        return NextResponse.json({
            ok: true,
            url: `https://${slug}.artisaan.com.br`,
        });
    } catch (err) {
        console.error(err);
        
        return NextResponse.json(
            { error: "Failed to initialize project" },
            { status: 500 }
        );
    }
}
