import remarkGfm from "remark-gfm";
import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchGithubMDX } from "@/lib/mdx/fetch-github-mdx";
import { mdxComponents } from "@/components/mdx-components";
import { extractHeadingsFromMDX } from "@/lib/mdx/extract-headings-mdx";
import { parseMDXWithFrontMatter } from "@/lib/mdx/parse-frontmatter";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;
    const rawMDX = await fetchGithubMDX(slug ? slug.join("/") : "introduction");

    if (!rawMDX) return { title: "Artisaan Docs", description: "" };

    const { frontmatter } = parseMDXWithFrontMatter(rawMDX);

    return {
        title: "Artisaan Docs | " + frontmatter.title,
        description: frontmatter.description || "",
        keywords: frontmatter.keywords || [],
        openGraph: {
            title: frontmatter.title,
            description: frontmatter.description,
        },
    };
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const { slug } = await params;

    const mdxContent = await fetchGithubMDX(slug ? slug.join("/") : "introduction");

    if (!mdxContent) {
        return <h1 className="text-white text-2xl font-bold">Page not found</h1>;
    }

    const headings = extractHeadingsFromMDX(mdxContent);
    const { content } = parseMDXWithFrontMatter(mdxContent);

    const latestResponse = await fetch("https://artisaan.com.br/latest.json").then(res => res.json());

    return (
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
                            <span className="text-white">$7 / $10</span>
                        </div>

                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-blue-600 to-purple-600 w-[70%] rounded-full"></div>
                        </div>

                        <a
                            href="#"
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
    );
}
