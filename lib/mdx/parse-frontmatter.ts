import matter from "gray-matter";

export function parseMDXWithFrontMatter(mdx: string) {
    const { data, content } = matter(mdx);

    return {
        frontmatter: data || {},
        content: content || "",
    };
}
