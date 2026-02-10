

import {
    TerminalIcon,
    ShieldCheck,
    LayoutTemplateIcon,
    CpuIcon,
} from "lucide-react";

export default function Features() {
    return (
        <section id="features" className="py-24 px-6 relative">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                    <div className="md:col-span-4 aura-card rounded-xl p-8 flex flex-col justify-between group relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors"></div>

                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Local Configuration</h3>

                                <p className="text-sm text-zinc-400 max-w-sm">
                                    Initialize directly in your repository. Use <span className="font-mono text-white bg-white/10 px-1 rounded">artisaan init</span> to create a config file, then generate docs in a queue without leaving your terminal.
                                </p>
                            </div>

                            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                                <TerminalIcon size={16} />
                            </div>
                        </div>

                        <div className="mt-auto relative bg-[#09090b] border border-white/5 rounded shadow-inner p-4 font-mono text-xs overflow-hidden">
                            <div className="flex items-center gap-1.5 mb-4 opacity-50">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>

                            <div className="space-y-2 text-zinc-300">
                                <div>
                                    <span className="text-blue-500">➜</span> artisaan init
                                </div>

                                <div className="text-zinc-500 pl-4">Created artisaan.config.json</div>

                                <div className="pt-2">
                                    <span className="text-blue-500">➜</span> artisaan generate
                                </div>

                                <div className="pl-4 text-emerald-400">✔ Found 14 API endpoints</div>
                                <div className="pl-4 text-emerald-400">✔ Scanned app/Http/Controllers</div>

                                <div className="pl-4 pt-1 flex items-center gap-2">
                                    <span className="text-zinc-400">Processing queue...</span>

                                    <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-2/3 animate-pulse"></div>
                                    </div>

                                    <span className="text-blue-400">68%</span>
                                </div>

                                <div className="pl-4 pt-2 text-zinc-500">
                                    Generating: <span className="text-zinc-300">Auth/LoginController.php</span>
                                </div>

                                <div>
                                    <span className="text-blue-500">➜</span> <span className="cursor-blink">_</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 md:row-span-2 aura-card rounded-xl p-8 flex flex-col relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors"></div>

                        <div className="absolute top-4 right-4 z-20">
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-semibold text-blue-400 uppercase tracking-wide">
                                Coming Soon
                            </span>
                        </div>

                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white mb-4">
                                <LayoutTemplateIcon size={20} />
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-2">Web Preview</h3>

                            <p className="text-sm text-zinc-400 mb-8">
                                Visualize your documentation in your browser. Review, share, and export your docs directly from our intuitive web interface.
                            </p>

                            <div className="mt-auto space-y-4 font-mono text-[10px]">
                                <div className="p-3 bg-black/40 rounded border border-white/5">
                                    <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>Artisaan Sync</span>
                                        <span className="text-blue-400">Done</span>
                                    </div>

                                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 w-full h-full"></div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded border border-white/5">
                                    <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>Verify Documentations</span>
                                        <span className="text-blue-400">Done</span>
                                    </div>

                                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 w-full h-full"></div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded border border-white/5">
                                    <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>Layout Build</span>
                                        <span className="text-blue-400">Done</span>
                                    </div>

                                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-blue-500 w-full h-full"></div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded border border-white/5">
                                    <div className="flex justify-between text-zinc-400 mb-1">
                                        <span>Publish Site</span>
                                        <span className="text-blue-400">Processing...</span>
                                    </div>

                                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-linear-to-r from-blue-600 to-purple-600 w-3/4 h-full"></div>
                                    </div>
                                </div>

                                <div className="p-3 bg-black/40 rounded border border-white/5">
                                    <div className="flex justify-between text-zinc-400 mb-1">
                                        <span className="text-blue-400 underline">your-site.artisaan.com.br</span>
                                        <span className="text-blue-400">Online</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 aura-card rounded-xl p-8 flex flex-col justify-center group hover:bg-white/2">
                        <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white mb-4">
                            <CpuIcon size={20} />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-1">Engine Optimization</h3>

                        <p className="text-xs text-zinc-500">Built for speed. Generate thousands of pages in seconds.</p>
                    </div>

                    <div className="md:col-span-2 aura-card rounded-xl p-8 flex flex-col justify-center group hover:bg-white/2">
                        <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-white mb-4">
                            <ShieldCheck size={20} />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-1">Type Inference</h3>

                        <p className="text-xs text-zinc-500">Automatically detects types from your function signatures.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}