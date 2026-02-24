import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { putJson, putObject } from "@/lib/s3";

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

interface SidebarPage {
    title: string;
    label: string;
    route: string;
    order: number;
}

interface SidebarSection {
    title: string;
    slug: string;
    pages: SidebarPage[];
}

interface SidebarManifest {
    generatedAt: string;
    sections: SidebarSection[];
}

const schema = z.object({
    slug: z.string().min(2),
    name: z.string(),
    framework: z.string(),
    language: z.string(),
});

const STARTER_ROUTE = "getting-started";

function escapeForYaml(value: string) {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"')
        .replace(/\r?\n/g, " ");
}

function buildGettingStartedTemplate(projectName: string, isoDate: string) {
    const safeName = escapeForYaml(projectName);
    const shortDate = isoDate.slice(0, 10);

    return `---
title: "Getting Started"
description: "Welcome to ${safeName}"
summary: "Starter page generated automatically by Artisaan."
keywords:
  - getting started
  - docs template
  - onboarding
tags:
  - getting started
  - template
type: "public"
complexity: "low"
section: "Getting Started"
sidebarOrder: 1
sidebarLabel: "Getting Started"
route: "getting-started"
lastUpdated: ${shortDate}
---

<div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
  Getting Started
</div>

# Welcome to ${safeName}

<hr className="my-8 border-white/10" />

<div className="mb-8 rounded-lg border border-blue-500/30 bg-blue-500/10 px-4 py-3 text-sm text-zinc-200">
  <span className="mr-2">🧊</span>
  <strong>Template:</strong> Delete this callout and edit this page with your content and links.
</div>

<div className="mb-12 grid gap-4 md:grid-cols-3">
  <a href="/docs/getting-started" className="block">
    <div className="aura-card rounded-xl p-5 transition-colors hover:border-blue-400/40">
      <div className="mb-3 text-xl">🚀</div>
      <div className="mb-1 text-lg font-semibold text-white">Quick Start</div>
      <div className="text-sm text-zinc-400">Learn how to get started with your product.</div>
    </div>
  </a>

  <a href="/docs/getting-started" className="block">
    <div className="aura-card rounded-xl p-5 transition-colors hover:border-blue-400/40">
      <div className="mb-3 text-xl">&lt;/&gt;</div>
      <div className="mb-1 text-lg font-semibold text-white">API Reference</div>
      <div className="text-sm text-zinc-400">Explore endpoints and build your integration.</div>
    </div>
  </a>

  <a href="/docs/getting-started" className="block">
    <div className="aura-card rounded-xl p-5 transition-colors hover:border-blue-400/40">
      <div className="mb-3 text-xl">✨</div>
      <div className="mb-1 text-lg font-semibold text-white">Build with AI</div>
      <div className="text-sm text-zinc-400">Use LLM features to automate your workflow.</div>
    </div>
  </a>
</div>

## Recent Releases

<div className="mb-12 grid gap-6 md:grid-cols-3">
  <a href="/docs/getting-started" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-2 text-xl">🔎</div>
    <div className="mb-1 text-lg font-semibold text-white">v2.0 Migration</div>
    <div className="text-sm text-zinc-400">Everything you need to upgrade safely.</div>
  </a>

  <a href="/docs/getting-started" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-2 text-xl">📣</div>
    <div className="mb-1 text-lg font-semibold text-white">Webhooks</div>
    <div className="text-sm text-zinc-400">Real-time events are now available.</div>
  </a>

  <a href="/docs/getting-started" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-2 text-xl">🤖</div>
    <div className="mb-1 text-lg font-semibold text-white">Android SDK</div>
    <div className="text-sm text-zinc-400">Our native Android library is out of beta.</div>
  </a>
</div>

## The Basics

<div className="grid gap-4 md:grid-cols-3">
  <a href="/docs/getting-started#customize" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">Customize</div>
    <div className="text-sm text-zinc-400">Style the widget to match your brand.</div>
  </a>

  <a href="/docs/getting-started#integrations" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">Integrations</div>
    <div className="text-sm text-zinc-400">Connect with third-party services.</div>
  </a>

  <a href="/docs/getting-started#cli" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">CLI</div>
    <div className="text-sm text-zinc-400">Manage resources from your terminal.</div>
  </a>

  <a href="/docs/getting-started#security" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">Security</div>
    <div className="text-sm text-zinc-400">Learn how we secure your data.</div>
  </a>

  <a href="/docs/getting-started#common-issues" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">Common Issues</div>
    <div className="text-sm text-zinc-400">Troubleshoot frequent setup problems.</div>
  </a>

  <a href="/docs/getting-started#sync" className="block rounded-lg border border-white/10 p-4 transition-colors hover:border-blue-400/40">
    <div className="mb-1 text-base font-semibold text-white">Sync</div>
    <div className="text-sm text-zinc-400">Connect docs to your storage provider.</div>
  </a>
</div>

<p className="mt-10 text-xs text-zinc-500">Updated on ${shortDate}.</p>
`;
}

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

    const latestManifest: SidebarManifest = {
        generatedAt: now,
        sections: [
            {
                title: "Getting Started",
                slug: "getting-started",
                pages: [
                    {
                        title: "Getting Started",
                        label: "Getting Started",
                        route: STARTER_ROUTE,
                        order: 1,
                    },
                ],
            },
        ],
    };

    const starterPage = buildGettingStartedTemplate(name, now);

    try {
        await Promise.all([
            putJson(
                `projects/${slug}/manifest.json`,
                manifest
            ),
            putJson(
                `projects/${slug}/latest/manifest.json`,
                latestManifest
            ),
            putObject(
                `projects/${slug}/latest/${STARTER_ROUTE}.mdx`,
                starterPage,
                "text/markdown"
            ),
        ]);

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
