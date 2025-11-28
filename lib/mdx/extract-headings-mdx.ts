export function extractHeadingsFromMDX(mdx: string) {
    const headingRegex = /^(#{1,6})\s+(.*)$/gm;

    const headings: Array<{
        level: number;
        title: string;
        id: string;
    }> = [];

    let match;
    while ((match = headingRegex.exec(mdx)) !== null) {
        const hashes = match[1];
        const title = match[2].trim();

        // ID automático estilo GitHub
        const id = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        headings.push({
            level: hashes.length,
            title,
            id,
        });
    }

    return headings;
}