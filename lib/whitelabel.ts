export interface ProjectSidebarPage {
    route: string;
    order?: number;
}

export interface ProjectSidebarSection {
    pages: ProjectSidebarPage[];
}

export interface ProjectSidebarManifest {
    generatedAt?: string;
    defaultRoute?: string;
    sections?: ProjectSidebarSection[];
}

const PROJECT_DOMAIN_SUFFIX = ".artisaan.com.br";

export function getProjectSlugFromHost(host: string | null): string | null {
    if (!host) return null;

    const hostname = host.split(":")[0].toLowerCase();

    if (!hostname || hostname === "localhost") return null;

    let slugCandidate = "";

    if (hostname.endsWith(PROJECT_DOMAIN_SUFFIX)) {
        slugCandidate = hostname
            .slice(0, -PROJECT_DOMAIN_SUFFIX.length)
            .split(".")[0];
    } else if (hostname.endsWith(".localhost")) {
        slugCandidate = hostname.slice(0, -".localhost".length).split(".")[0];
    } else {
        const parts = hostname.split(".");

        if (parts.length < 3) return null;
        slugCandidate = parts[0];
    }

    if (!slugCandidate || ["www", "api", "artisaan", "localhost"].includes(slugCandidate)) {
        return null;
    }

    return slugCandidate;
}

export async function fetchProjectSidebarManifest(
    projectSlug: string
): Promise<ProjectSidebarManifest | null> {
    try {
        const response = await fetch(
            `https://artisaan-docs-bucket.s3.us-east-1.amazonaws.com/projects/${projectSlug}/latest/manifest.json`,
            { cache: "no-cache" }
        );

        if (!response.ok) return null;

        return await response.json();
    } catch {
        return null;
    }
}

export function resolveDefaultRoute(
    manifest: ProjectSidebarManifest | null,
    fallback = "getting-started"
): string {
    const directDefault = manifest?.defaultRoute?.trim();

    if (directDefault) {
        return directDefault;
    }

    const sections = manifest?.sections ?? [];

    for (const section of sections) {
        for (const page of section.pages ?? []) {
            if (page.route === "getting-started") {
                return page.route;
            }
        }
    }

    for (const section of sections) {
        const firstPage = section.pages?.[0];
        if (firstPage?.route) {
            return firstPage.route;
        }
    }

    return fallback;
}
