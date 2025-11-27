import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Artisaan",
        short_name: "Artisaan",
        description: "Generate technical documentation directly from your source code using AI. Support for multiple programming languages and frameworks",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1e6cf2",
    }
}
