"use client";

import Image from "next/image";

export function Nav() {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020202]/80 backdrop-blur-md">
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
                    <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#compatible" className="hover:text-blue-400 transition-colors">Compatible</a>
                    <a href="#donate" className="hover:text-blue-400 transition-colors">Donate</a>
                </div>

                <div className="w-1/2 md:w-1/3 flex justify-end items-center gap-4">
                    {/* <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                        Sign In
                    </a> */}

                    <a
                        href="/docs/introduction"
                        className="text-xs font-semibold bg-white text-black px-4 py-2 rounded hover:bg-zinc-200 transition-colors shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]"
                    >
                        Documentation
                    </a>
                </div>
            </nav>
        </header>
    );
}
