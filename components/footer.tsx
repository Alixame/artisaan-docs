import Image from "next/image";

export function Footer() {
    return (
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

            <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 flex justify-between items-center relative z-10">
                <span className="text-[10px] text-zinc-600">© 2025 Artisaan.</span>
            </div>
        </footer>
    );
}
