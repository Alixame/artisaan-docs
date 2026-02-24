import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
    fetchProjectSidebarManifest,
    getProjectSlugFromHost,
    resolveDefaultRoute,
} from "@/lib/whitelabel";

export default async function DocsIndexPage() {
    const host = (await headers()).get("host");
    const projectSlug = getProjectSlugFromHost(host);

    if (!projectSlug) {
        redirect("/docs/introduction");
    }

    const manifest = await fetchProjectSidebarManifest(projectSlug);
    const defaultRoute = resolveDefaultRoute(manifest);

    redirect(`/docs/${defaultRoute}`);
}
