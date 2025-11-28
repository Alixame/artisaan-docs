import Link from "next/link"
import Image from "next/image"
import { SearchIcon } from "lucide-react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
                <div className="max-w-[1400px] mx-auto h-full py-4 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 mr-4">
                            <Image
                                alt="Artisaan Logo"
                                width={140}
                                height={32}
                                className="pointer-events-none h-5 w-auto"
                                src="https://d2u449wlhbxla3.cloudfront.net/public/artisaan-dark.svg"
                            />
                        </Link>
                    </div>

                    <button className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-white/10 rounded text-xs text-zinc-500 hover:border-white/20 hover:text-zinc-400 transition-all w-auto md:w-64 group">
                        <SearchIcon size={16} className="md:hidden" />
    
                        <span className="group-hover:text-zinc-300">Search</span><span className="group-hover:text-zinc-300 hidden md:flex">documentation...</span>
                        
                        <span className="hidden md:flex ml-auto text-[10px] border border-white/10 rounded px-1.5 bg-zinc-900">⌘K</span>
                    </button>
                </div>
            </header>

            <section className="container max-w-[1400px] mx-auto px-6 flex min-h-screen pt-14">
                <aside className="fixed top-14 left-0 z-30 hidden w-full shrink-0 md:sticky md:block h-[calc(100vh-3.5rem)] md:w-60 lg:w-[260px] overflow-y-auto py-6 lg:py-8 pr-6">
                    <div className="w-full space-y-8">
                        <div className="pb-4">
                            <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">Getting Started</h4>
                            <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                <Link href="/docs/introduction" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-blue-400 bg-blue-500/10">Introduction</Link>
                                {/* <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 font-medium text-zinc-400 hover:text-zinc-50">Installation</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Changelog</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Upgrade Guide</a> */}
                            </div>
                        </div>

                        {/* <div className="pb-4">
                            <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">Configuration</h4>
                            <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">artisaan.config.json</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Environment Variables</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Theming</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Dark Mode</a>
                            </div>
                        </div>

                        <div className="pb-4">
                            <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">API Reference</h4>
                            <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">CLI Commands</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Generators</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Plugins</a>
                            </div>
                        </div>

                        <div className="pb-4">
                            <h4 className="mb-3 text-sm font-semibold tracking-tight text-white">Integrations</h4>
                            <div className="grid grid-flow-row auto-rows-max text-[13px]">
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Laravel</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Next.js</a>
                                <a href="#" className="group flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 hover:underline text-zinc-400 hover:text-zinc-50">Python</a>
                            </div>
                        </div> */}
                    </div>
                </aside>
                
                <div className="w-full min-w-0">
                    {children}
                </div>
            </section>

            <footer className="w-full bg-[#020202] py-16 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-linear-to-t from-blue-900/10 to-transparent pointer-events-none"></div>

                <div className="max-w-[1400px] px-6 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between gap-12 relative z-10">
                        <div className="flex items-start flex-col gap-4">
                            <Image
                                alt="Artisaan Logo"
                                width={140}
                                height={32}
                                className="pointer-events-none h-5 md:h-8 w-auto"
                                src="https://d2u449wlhbxla3.cloudfront.net/public/artisaan-dark.svg"
                            />

                            <p className="text-xs text-zinc-500 max-w-[360px]">
                                Artisaan is a documentation generator that transforms your codebase into technical documentation.
                                Built for developers, by developers.
                            </p>
                        </div>

                        <div className="flex gap-12">
                            <div className="flex flex-col gap-3">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
                                <a href="#features" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Features</a>
                                <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">CLI Reference</a>
                            </div>

                            <div className="flex flex-col gap-3">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
                                <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Privacy</a>
                                <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Terms</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                        <span className="text-[10px] text-zinc-600">© 2025 Artisaan.</span>
                    </div>
                </div>
            </footer>
        </main>
    );
}