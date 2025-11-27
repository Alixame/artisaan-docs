import {
    Copy,
    ZapIcon,
    FileCodeIcon,
    TerminalIcon,
    ShieldCheck,
    LayoutTemplateIcon,
    CpuIcon,
    PlusIcon,
} from "lucide-react";

import Image from "next/image";

export default function Home() {
    return (
        <main className="antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
            <div className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
                <nav className="max-w-6xl mx-auto h-16 px-6 flex items-center">
                    <div className="w-1/2 md:w-1/3">
                        <Image
                            alt="Artisaan Logo"
                            width={140}
                            height={32}
                            className="pointer-events-none h-5 w-auto"
                            src="https://d2u449wlhbxla3.cloudfront.net/public/artisaan-dark.svg"
                        />
                    </div>

                    <div className="w-1/3 hidden md:flex items-center justify-center gap-8 text-xs font-medium text-zinc-400">
                        <a href="#" className="hover:text-blue-400 transition-colors">Features</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Compatible</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
                    </div>

                    <div className="w-1/2 md:w-1/3 flex justify-end items-center gap-4">
                        <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">Sign In</a>
                        <a href="#" className="text-xs font-semibold bg-white text-black px-4 py-2 rounded hover:bg-zinc-200 transition-colors shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]">
                            Documentation
                        </a>
                    </div>
                </nav>
            </div>

            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10">

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-blue-500/20 bg-blue-500/5 text-[10px] text-blue-400 mb-8 cursor-default backdrop-blur-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
                        </span>

                        <span className="font-mono tracking-wide uppercase">Beta CLI Released</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 text-white leading-[1.1]">
                        Technical documentation <br />
                        <span className="gradient-text">generated from source.</span>
                    </h1>

                    <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed font-light">
                        Turn your codebase into comprehensive API references. Run <code className="text-blue-300 font-mono bg-blue-500/10 px-1 py-0.5 rounded text-sm">artisaan generate</code> and let our engine scan, queue, and build your docs instantly.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                        <div className="h-12 px-6 bg-[#0A0A0A] border border-white/10 text-zinc-300 text-sm font-mono rounded flex items-center justify-center gap-3 min-w-[300px] shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <span className="text-blue-500 font-bold">$</span>
                            <span>npm install -g artisaan</span>
                            <Copy size={16} className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors ml-auto cursor-pointer" />
                        </div>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="relative p-px rounded-xl bg-linear-to-b from-blue-500/30 to-transparent shadow-[0_0_40px_-10px_rgba(59,130,246,0.2)]">
                            <div className="relative rounded-xl bg-[#050505] overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[420px]">
                                <div className="flex flex-col border-r border-white/5 relative">
                                    <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#050505]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800"></div>
                                        </div>

                                        <div className="ml-auto flex items-center gap-2">
                                            <FileCodeIcon size={12} className="text-red-500" />
                                            <span className="text-[10px] text-zinc-500 font-mono">UserController.php</span>
                                        </div>
                                    </div>

                                    <div className="p-6 font-mono text-xs md:text-[13px] leading-7 text-left overflow-hidden relative h-full bg-[#050505]">
                                        <div className="scan-line"></div>
                                        <div className="absolute inset-0 bg-blue-500/5 animate-pulse z-0 pointer-events-none"></div>

                                        <div className="relative z-1 opacity-90">
                                            <span className="code-keyword">namespace</span> App\Http\Controllers;<br /><br />
                                            <span className="code-keyword">class</span> <span className="text-yellow-200">UserController</span> <span className="code-keyword">extends</span> Controller <span className="text-white">{"{"}</span><br />

                                            <span className="pl-4 code-comment">{"/**"}</span><br />
                                            <span className="pl-4 code-comment">&nbsp;* Store a new user in database.</span><br />
                                            <span className="pl-4 code-comment">&nbsp;*/</span><br />
                                            <span className="pl-4 code-keyword">public function</span> <span className="code-func">store</span><span className="text-white">{"("}</span><span className="text-yellow-200">Request</span> <span className="code-var">$request</span><span className="text-white">{")"}</span> <span className="text-white">{"{"}</span><br />
                                            <span className="pl-8 code-var">$validated</span> <span className="text-white">=</span> <span className="code-var">$request</span><span className="text-white">-&gt;</span><span className="code-func">validate</span><span className="text-white">{"(["}</span><br />
                                            <span className="pl-12 code-string">{"'email'"}</span> <span className="text-white">=&gt;</span> <span className="code-string">{"'required|email|unique:users'"}</span><span className="text-white">,</span><br />
                                            <span className="pl-12 code-string">{"'password'"}</span> <span className="text-white">=&gt;</span> <span className="code-string">{"'required|min:8'"}</span><span className="text-white">,</span><br />
                                            <span className="pl-8 text-white">{"])"};</span><br /><br />
                                            <span className="pl-8 code-var">$user</span> <span className="text-white">=</span> <span className="text-yellow-200">User</span><span className="text-white">::</span><span className="code-func">create</span><span className="text-white">{"("}</span><span className="code-var">$validated</span><span className="text-white">{")"};</span><br />
                                            <span className="pl-8 code-keyword">return</span> <span className="code-func">response</span><span className="text-white">()-&gt;</span><span className="code-func">json</span><span className="text-white">(</span><span className="code-var">$user</span><span className="text-white">,</span> <span className="text-purple-400">201</span><span className="text-white">{")"};</span><br />
                                            <span className="pl-4 text-white">{"}"}</span><br />
                                            <span className="text-white">{"}"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#08080a] flex flex-col relative">
                                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent"></div>

                                    <div className="flex items-center px-4 py-3 border-b border-white/5 bg-[#08080a]">
                                        <div className="flex items-center gap-2">
                                            <ZapIcon size={12} className="text-blue-400" />
                                            <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">Generated Preview</span>
                                        </div>
                                    </div>

                                    <div className="p-8 text-left h-full overflow-y-auto">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-2 py-1 rounded bg-blue-500 text-black font-bold text-[10px]">POST</span>
                                            <span className="font-mono text-xs text-zinc-400">/api/users</span>
                                        </div>

                                        <h3 className="text-xl font-semibold text-white mb-2">Create User</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                                            Creates a new user record. Requires a unique email address and a password with a minimum length of 8 characters.
                                        </p>

                                        <div className="space-y-4">
                                            <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider mb-2">Request Body</div>
                                            <div className="grid grid-cols-3 gap-2 text-xs border-b border-white/5 pb-2">
                                                <div className="font-mono text-blue-400">email</div>
                                                <div className="text-zinc-500">string</div>
                                                <div className="text-red-400 text-right">required</div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="font-mono text-blue-400">password</div>
                                                <div className="text-zinc-500">string</div>
                                                <div className="text-red-400 text-right">required</div>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-white/5">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                                                    Response (201)
                                                </div>
                                            </div>

                                            <div className="p-3 bg-black rounded border border-white/10 font-mono text-[10px] text-zinc-300">
                                                {"{"}<br />
                                                &nbsp;&nbsp;{"'id': 1"},<br />
                                                &nbsp;&nbsp;{"'email': 'alice@example.com'"},<br />
                                                &nbsp;&nbsp;{"'created_at': '2024-03-10T...'"}<br />
                                                {"}"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 relative">
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

            <section className="py-24 px-6 border-t border-white/5 relative">
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
                        <div className="group flex items-center gap-3 p-3 rounded border border-blue-500/20 bg-blue-500/5 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-[#FF2D20]/10 text-[#FF2D20] font-bold text-xs border border-[#FF2D20]/20">Lr</div>
                            <span className="text-sm text-white font-medium">Laravel</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-black text-white font-bold text-[10px] border border-white/10">N</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Next.js</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-green-500/10 text-green-500 font-bold text-[10px] border border-green-500/20">JS</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Node.js</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-500/10 text-yellow-500 font-bold text-[10px] border border-yellow-500/20">Py</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Python</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-cyan-500/10 text-cyan-400 font-bold text-[10px] border border-cyan-500/20">Go</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Go</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-slate-500/10 text-slate-400 font-bold text-[10px] border border-slate-500/20">C</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">C/C++</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-purple-500/10 text-purple-400 font-bold text-[10px] border border-purple-500/20">Rb</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Ruby</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-yellow-500/10 text-yellow-400 font-bold text-[10px] border border-yellow-500/20">Js</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">JavaScript</span>
                        </div>

                        <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                            <div className="w-8 h-8 flex items-center justify-center rounded bg-blue-500/10 text-blue-400 font-bold text-[10px] border border-blue-500/20">Ts</div>
                            <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">TypeScript</span>
                        </div>

                        <a href="#" className="cursor-pointer">
                            <div className="group flex items-center gap-3 p-3 rounded border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all cursor-default">
                                <div className="w-8 h-8 flex items-center justify-center rounded bg-neutral-500/10 text-neutral-400 font-bold text-[10px] border border-neutral-500/20">
                                    <PlusIcon size={16} />
                                </div>

                                <span className="text-sm text-zinc-400 font-medium group-hover:text-white transition-colors">Request</span>
                            </div>
                        </a>                    
                    </div>
                </div>
            </section>

            <footer className="bg-[#020202] py-16 px-6 border-t border-white/5 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-linear-to-t from-blue-900/10 to-transparent pointer-events-none"></div>

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12 relative z-10">
                    <div className="flex items-start flex-col gap-4">
                        <Image
                            alt="Artisaan Logo"
                            width={140}
                            height={32}
                            className="pointer-events-none h-5 md:h-8 w-auto"
                            src="https://d2u449wlhbxla3.cloudfront.net/public/artisaan-dark.svg"
                        />

                        <p className="text-xs text-zinc-500 max-w-[360px]">
                            Artisaan is a documentation generator that transforms your codebase into technical documentation, using markdown for estilization. Built for developers, by developers.
                        </p>
                    </div>

                    <div className="flex gap-12">
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
                            <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Features</a>
                            <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">CLI Reference</a>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal</h4>
                            <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Privacy</a>
                            <a href="#" className="text-xs text-zinc-500 hover:text-blue-400 transition-colors">Terms</a>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                    <span className="text-[10px] text-zinc-600">© 2025 Artisaan.</span>

                    {/* <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-[10px] text-zinc-500">v0.1.0-beta</span>
                    </div> */}
                </div>
            </footer>
        </main>
    );
}
