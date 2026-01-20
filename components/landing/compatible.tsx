import {
    PlusIcon,
} from "lucide-react";

export default function Compatible() {
    return (
        <section id="compatible" className="py-24 px-6 border-t border-white/5 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
                            Compatible with your stack.
                        </h2>

                        <p className="text-zinc-400">
                            Artisaan reads and understands your code, no comments or annotations needed.<br />
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
    )
}