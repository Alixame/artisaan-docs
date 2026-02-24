import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Nav } from "@/components/landing/nav";
import { Hero } from "@/components/landing/hero";
import { Footer } from "@/components/landing/footer";

import Donate from "@/components/landing/donate";
import Features from "@/components/landing/features";
import Compatible from "@/components/landing/compatible";
import {
    fetchProjectSidebarManifest,
    getProjectSlugFromHost,
    resolveDefaultRoute,
} from "@/lib/whitelabel";

export default async function Home() {
    const host = (await headers()).get("host");
    const projectSlug = getProjectSlugFromHost(host);

    if (projectSlug) {
        const manifest = await fetchProjectSidebarManifest(projectSlug);
        const defaultRoute = resolveDefaultRoute(manifest);
        redirect(`/docs/${defaultRoute}`);
    }

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
