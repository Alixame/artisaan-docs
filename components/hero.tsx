"use client"

import React from "react"

import { CheckIcon, CopyIcon, FileCodeIcon, ZapIcon } from "lucide-react"

export const Hero: React.FC = () => {
    const [installCmd, setInstallCmd] = React.useState("");
    const [copied, setCopied] = React.useState(false);

    React.useEffect(() => {
        const platform = navigator.platform.toLowerCase();
        const ua = navigator.userAgent.toLowerCase();

        let cmd = "";

        if (platform.includes("win")) {
            cmd = `iwr -useb https://artisaan.com.br/install.ps1 | iex`;
        } else if (platform.includes("mac") || ua.includes("mac os")) {
            cmd = `curl -fsSL https://artisaan.com.br/install.sh | bash`;
        } else if (platform.includes("linux") || ua.includes("linux")) {
            cmd = `curl -fsSL https://artisaan.com.br/install.sh | bash`;
        } else {
            // fallback
            cmd = `curl -fsSL https://artisaan.com.br/install.sh | bash`;
        }

        setInstallCmd(cmd);
    }, []);

    const copyToClipboard = () => {
        setCopied(true);

        navigator.clipboard.writeText(installCmd);
    
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
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
                    Turn your codebase into comprehensive API references. 
                    <br/> Run <code className="text-blue-300 font-mono bg-blue-500/10 px-1 py-0.5 rounded text-sm">artisaan generate</code> and let our engine scan, queue, and build your docs instantly.
                </p>

                <div className="w-full flex justify-center items-center">
                    <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center gap-4 mb-24 cursor-pointer"
                    >
                        <div className="h-12 px-6 bg-[#0A0A0A] border border-white/10 text-zinc-300 text-sm font-mono rounded flex items-center justify-center gap-3 min-w-[300px] shadow-2xl relative group overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                            <span className="hidden md:block text-blue-500 font-bold">$</span>
                            
                            <span className="text-[10px] md:text-base">{installCmd || "detecting..."}</span>

                            {copied ? (
                                <CheckIcon
                                    size={16}
                                    className="w-3 h-3 text-green-500 ml-auto"
                                />    
                            ) : (
                                <CopyIcon
                                    size={16}
                                    className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors ml-auto cursor-pointer"
                                />
                            )}
                        </div>
                    </button>
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
    );
}