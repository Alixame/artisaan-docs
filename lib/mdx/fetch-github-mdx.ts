export async function fetchGithubMDX(path: string) {
    const extensions = ["mdx", "md"];

    if (process.env.NODE_ENV === "development") {
        const fs = await import("fs/promises");
        
        for (const extension of extensions) {
            const localFilePath = `./docs/${path}.${extension}`;

            try {
                const fileContent = await fs.readFile(localFilePath, "utf-8");
                return fileContent;
            } catch {
                continue;
            }
        }
        
        return null;
    }

    for (const extension of extensions) {
        const file = await fetch(
            `https://raw.githubusercontent.com/Alixame/artisaan-docs/main/docs/${path}.${extension}`,
            {
                next: { revalidate: 60 },
            }
        );

        if (file.ok) {
            return file.text();
        }
    }

    return null;
}
