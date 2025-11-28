import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";

import {
    TerminalIcon,
    ShieldCheck,
    LayoutTemplateIcon,
    CpuIcon,
    PlusIcon,
    Heart,
    CoffeeIcon,
    GithubIcon,
    Building,
    BuildingIcon,
} from "lucide-react";

export default function Home() {
    return (
        <main className="antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
            <Nav />

            <Hero />

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

            <section id="compatible" className="py-24 px-6 border-t border-white/5 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
                                Compatible with your stack.
                            </h2>
                            
                            <p className="text-zinc-400">
                                Artisaan reads and understands your code, no comments or annotations needed.<br/>
                                Write your way, and let Artisaan handle the rest.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-[#FF2D20]/10 text-[#FF2D20] font-bold text-xs border border-[#FF2D20]/20">Lr</div>
                            <span className="text-sm text-white font-medium">Laravel</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-black text-white font-bold text-[10px] border border-white/10">N</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Next.js</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-green-500/10 text-green-500 font-bold text-[10px] border border-green-500/20">JS</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Node.js</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-500/10 text-yellow-500 font-bold text-[10px] border border-yellow-500/20">Py</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Python</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-cyan-500/10 text-cyan-400 font-bold text-[10px] border border-cyan-500/20">Go</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Go</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-slate-500/10 text-slate-400 font-bold text-[10px] border border-slate-500/20">C</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">C/C++</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-purple-500/10 text-purple-400 font-bold text-[10px] border border-purple-500/20">Rb</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Ruby</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-500/10 text-yellow-400 font-bold text-[10px] border border-yellow-500/20">Js</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">JavaScript</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-500/10 text-blue-400 font-bold text-[10px] border border-blue-500/20">Ts</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">TypeScript</span>
                        </div>

                        <a href="#" className="cursor-pointer">
                            <div className="group flex items-center gap-3 p-3 rounded border aura-card transition-all cursor-default">
                                <div className="w-8 h-8 flex items-center justify-center rounded bg-neutral-500/10 text-neutral-400 font-bold text-[10px] border border-neutral-500/20">
                                    <PlusIcon size={16} />
                                </div>

                                <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Request</span>
                            </div>
                        </a>                    
                    </div>
                </div>
            </section>

            <section id="donate" className="py-24 px-6 border-t border-white/5 relative">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-6 bg-blue-500/10 border border-blue-500/20 text-blue-400" >
                            <Heart size={12} />
                            <span className="font-medium">Community Supported</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Powered by You.</h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Artisaan is building for you. Your donations keep the parser engines running and fund new features.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="aura-card p-8 rounded-2xl flex flex-col text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                <CoffeeIcon size={20} />
                            </div>

                            <h3 className="text-lg font-medium text-white mb-1">
                                Help Maintain the Server
                            </h3>

                            <div className="text-2xl font-semibold tracking-tight mb-4">
                                $1<span className="text-sm font-normal text-gray-500">/donate</span>
                            </div>

                            <p className="text-sm text-gray-500 mb-6 grow">
                                Support basic server costs and get a backer badge on our README.
                            </p>

                            <button className="w-full py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                                Donate
                            </button>
                        </div>

                        <div className="aura-card p-8 rounded-2xl flex flex-col text-center border-blue-500/30 bg-blue-500/5 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 border border-blue-500/20 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">Most Popular</div>
                            
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                <GithubIcon size={20} />
                            </div>

                            <h3 className="text-lg font-medium text-white mb-1">
                                GitHub Sponsor
                            </h3>

                            <div className="text-2xl font-semibold tracking-tight mb-4">
                                $5<span className="text-sm font-normal text-gray-500">/donate</span>
                            </div>

                            <p className="text-sm text-gray-400 mb-6 grow">
                                Priority issue triage, early access to new parsers (C#, Go), and private discord access.
                            </p>

                            <button className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium shadow-lg shadow-pink-500/20">
                                Become a Sponsor
                            </button>
                        </div>

                        <div className="aura-card p-8 rounded-2xl flex flex-col text-center">
                            <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                                <BuildingIcon size={20} />
                            </div>

                            <h3 className="text-lg font-medium text-white mb-1">
                                Enterprise
                            </h3>

                            <div className="text-2xl font-semibold tracking-tight mb-4">
                                $20+<span className="text-sm font-normal text-gray-500">/donate</span>
                            </div>

                            <p className="text-sm text-gray-500 mb-6 grow">
                                Logo on our homepage, priority roadmap input, and dedicated support channel.
                            </p>

                            <button className="w-full py-2 rounded border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium">
                                Donate
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 max-w-lg mx-auto">
                        <div className="flex justify-between text-xs font-medium text-gray-400 mb-2">
                            <span>Monthly Goal</span>
                            <span className="text-white">$7 / $10</span>
                        </div>

                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-blue-600 to-purple-600 w-[70%] rounded-full"></div>
                        </div>

                        <div className="flex justify-center -space-x-2 mt-6">
                            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#030304]"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#030304]"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#030304]"></div>
                            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#030304]"></div>
                            <div className="w-8 h-8 rounded-full bg-[#030304] border border-dashed border-gray-600 flex items-center justify-center text-[10px] text-gray-500 font-medium pl-1">
                                +42
                            </div>
                        </div>

                        <p className="text-center text-xs text-gray-600 mt-3">
                            Join 46 other sponsors backing Artisaan.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
