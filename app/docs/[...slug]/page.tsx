/* eslint-disable @typescript-eslint/no-explicit-any */
import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchGithubMDX } from "@/lib/mdx/fetch-github-mdx";
import { mdxComponents } from "@/components/mdx-components";
import { extractHeadingsFromMDX } from "@/lib/mdx/extract-headings-mdx";
import { parseMDXWithFrontMatter } from "@/lib/mdx/parse-frontmatter";
import { headers } from "next/headers";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    fetchProjectSidebarManifest,
    getProjectSlugFromHost,
    resolveDefaultRoute,
} from "@/lib/whitelabel";

import manifestJson from '@/docs/manifest.json'


/* =========================================================
   Helpers
========================================================= */

function resolveDocPath(slug?: string[]) {
    const joined = slug?.join("/");
    return joined && joined.length > 0 ? joined : undefined;
}

async function fetchS3MDX(
    projectSlug: string,
    path: string
): Promise<string | null> {
    const base = `https://artisaan-docs-bucket.s3.us-east-1.amazonaws.com/projects/${projectSlug}/latest`;
    const candidates = [
        `${base}/${path}.mdx`,
        `${base}/${path}.md`,
        `${base}/docs/${path}.mdx`,
        `${base}/docs/${path}.md`,
    ];

    for (const url of candidates) {
        try {
            const res = await fetch(url);

            if (res.ok) {
                return await res.text();
            }
        } catch {
            continue;
        }
    }

    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}) {
    const { slug } = await params;

    const host = (await headers()).get("host");
    const projectSlug = getProjectSlugFromHost(host);
    const manifest = projectSlug ? await fetchProjectSidebarManifest(projectSlug) : manifestJson;
    const path = resolveDocPath(slug) ?? (projectSlug ? resolveDefaultRoute(manifest) : "introduction");
    
    const rawMDX = projectSlug
        ? await fetchS3MDX(projectSlug, path)
        : await fetchGithubMDX(path);

    if (!rawMDX) {
        return {
            title: "Artisaan Docs",
            description: "",
        };
    }

    const { frontmatter } = parseMDXWithFrontMatter(rawMDX);

    return {
        title: `Artisaan Docs | ${frontmatter.title ?? ""}`,
        description: frontmatter.description ?? "",
        keywords: frontmatter.keywords ?? [],
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.description,
        },
    };
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    const host = (await headers()).get("host");
    const projectSlug = getProjectSlugFromHost(host);
    const manifest = projectSlug ? await fetchProjectSidebarManifest(projectSlug) : manifestJson;
    const path = resolveDocPath(slug) ?? (projectSlug ? resolveDefaultRoute(manifest) : "introduction");

    const mdxContent = projectSlug
        ? await fetchS3MDX(projectSlug, path)
        : await fetchGithubMDX(path);

    console.log("PROJECT SLUG", projectSlug);
    console.log("MANIFEST", manifest);
    console.log("PATH", path);
    console.log("MDX CONTENT", mdxContent ? "FOUND" : "NOT FOUND");

    const response = await fetch(`https://artisaan-docs-bucket.s3.us-east-1.amazonaws.com/public/static.json`, { cache: "no-store" })

    const data = await response.json();

    const monthlyGoal = data.monthly_goal;
    const goalAchieved = data.goal_achieved;

    if (!mdxContent) {
        return (
            <section className="container max-w-[1400px] mx-auto px-6 flex min-h-screen pt-14">
                <aside className="hidden md:block md:sticky top-14 left-0 z-30 w-full md:w-60 lg:w-[260px] py-6 lg:py-8 pr-6">
                    <ScrollArea className="shrink-0 h-[calc(100vh-3.5rem)] w-full space-y-8">
                        {manifest?.sections?.map((section: any, index: number) => (
                            <div className="pb-4" key={index} title={section.title}>
                                <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
                                    {section.title}
                                </h4>

                                <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                    {section.pages.map((page: any) => (
                                        <a
                                            key={page.route}
                                            href={`/docs/${page.route}`}
                                            className={cn(
                                                page.route === path
                                                    ? "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-blue-400 bg-blue-500/10"
                                                    : "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 font-medium text-zinc-400 hover:text-zinc-50"
                                                )}
                                        >
                                            {page.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </aside>

                <div className="w-full min-w-0">
                    Page not found.
                </div>
            </section>
        );
    }

    const headings = extractHeadingsFromMDX(mdxContent);
    const { content } = parseMDXWithFrontMatter(mdxContent);

    const latestResponse = await fetch("https://artisaan.com.br/latest.json").then(res => res.json());

    return (
        <section className="container max-w-[1400px] mx-auto px-6 flex min-h-screen pt-14">
            <aside className="hidden md:block md:sticky top-14 left-0 z-30 w-full md:w-60 lg:w-[260px] py-6 lg:py-8 pr-6">
                <ScrollArea className="shrink-0 h-[calc(100vh-3.5rem)] w-full space-y-8">
                    {manifest?.sections?.map((section: any, index: number) => (
                        <div className="pb-4" key={index} title={section.title}>
                            <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">
                                {section.title}
                            </h4>

                            <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                {section.pages.map((page: any) => (
                                    <a
                                        key={page.route}
                                        href={`/docs/${page.route}`}
                                        className={cn(
                                            page.route === path
                                                ? "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-blue-400 bg-blue-500/10"
                                                : "group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 font-medium text-zinc-400 hover:text-zinc-50"
                                            )}
                                    >
                                        {page.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </aside>

            <div className="w-full min-w-0">
                <article
                    className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] w-full overflow-visible"
                >
                    {/* Conteúdo principal */}
                    <div className="mx-auto w-full min-w-0">
                        <MDXRemote
                            source={content}
                            components={mdxComponents}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                },
                            }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="hidden xl:block">
                        <div className="sticky top-[100px] pl-6 h-max">
                            {/* TOC */}
                            <div className="space-y-2 mb-10">
                                <p className="text-xs font-semibold text-white mb-4">On This Page</p>

                                <ul className="space-y-2.5 text-[13px]">
                                    {headings
                                        .filter(h => h.level <= 3)
                                        .map(h => (
                                            <li key={h.id} className={`pl-${(h.level - 2) * 4}`}>
                                                <a
                                                    href={`#${h.id}`}
                                                    className="text-zinc-400 hover:text-white transition-colors block"
                                                >
                                                    {h.title}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            {/* Card 1 */}
                            <div className="aura-card rounded-lg p-5 relative overflow-hidden group">
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-semibold text-blue-400 uppercase tracking-wide">
                                        Coming Soon
                                    </span>
                                </div>

                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-2xl rounded-full group-hover:bg-blue-600/30 transition-all"></div>

                                <h4 className="text-sm font-semibold text-white mb-2 relative z-10">
                                    Deploy your docs
                                </h4>

                                <p className="text-xs text-zinc-400 mb-4 leading-relaxed relative z-10">
                                    Host your Artisaan documentation on our edge network. Fast, secure, and always in sync with git.
                                </p>

                                <a
                                    href="#"
                                    className="cursor-not-allowed inline-flex items-center justify-center w-full rounded bg-white/60 text-black text-xs font-semibold py-2 hover:bg-zinc-200 transition-colors relative z-10"
                                >
                                    Deploy Now
                                </a>
                            </div>

                            {/* Card 2 */}
                            <div className="mt-4 aura-card rounded-lg p-5 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-2xl rounded-full group-hover:bg-blue-600/30 transition-all"></div>

                                <h4 className="text-sm font-semibold text-white mb-2 relative z-10">
                                    Help Maintain the Server
                                </h4>

                                <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                                    <span>Monthly Goal</span>
                                    <span className="text-white">${goalAchieved} / ${monthlyGoal}</span>
                                </div>

                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-linear-to-r from-blue-600 to-purple-600" style={{ width: `${(goalAchieved / monthlyGoal) * 100}%` }}></div>
                                </div>

                                <a
                                    href={process.env.NEXT_PUBLIC_STRIPE_DONATE_1}
                                    className="mt-3 inline-flex items-center justify-center w-full rounded bg-white text-black text-xs font-semibold py-2 hover:bg-zinc-200 transition-colors relative z-10"
                                >
                                    Donate $1
                                </a>
                            </div>

                            {/* Footer */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between text-xs text-zinc-500">
                                    <span>Powered by Artisaan CLI</span>
                                    <span>v{latestResponse.version}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
