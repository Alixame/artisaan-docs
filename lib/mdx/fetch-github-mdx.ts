export async function fetchGithubMDX(path: string) {
    if (process.env.NODE_ENV === "development") {
        const fs = await import("fs/promises");
        const localFilePath = `./docs/${path}.md`;

        try {
            const fileContent = await fs.readFile(localFilePath, "utf-8");

            return fileContent;
        } catch (error) {
            return null;
        }
    };

    const file = await fetch(
        `https://raw.githubusercontent.com/Alixame/artisaan-docs/main/docs/${path}.md`,
        {
            next: { revalidate: 60 }, // caching inteligente
        }
    );

    if (!file.ok) return null;

    return file.text();
}
