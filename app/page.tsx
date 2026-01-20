import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

import Donate from "@/components/landing/donate";
import Features from "@/components/landing/features";
import Compatible from "@/components/landing/compatible";

export default function Home() {
    return (
        <main className="antialiased overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
            <Nav />

            <Hero />

            <Features />

            <Compatible />
        
            <Donate />

            <Footer />
        </main>
    );
}
