// app/api/projects/sync/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { putObject } from "@/lib/s3";

const schema = z.object({
    slug: z.string(),
    files: z.array(
        z.object({
            path: z.string(),
            content: z.string(),
        })
    ),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Invalid payload" },
            { status: 400 }
        );
    }

    const { slug, files } = parsed.data;

    await Promise.all(
        files.map(file =>
            putObject(
                `projects/${slug}/latest/${file.path}`,
                file.content,
                "text/markdown"
            )
        )
    );

    return NextResponse.json({ ok: true });
}
