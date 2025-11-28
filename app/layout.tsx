import type { Metadata } from "next";

import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Artisaan | Technical documentation generated from source",
    description: "Generate technical documentation directly from your source code using AI. Support for multiple programming languages and frameworks",
    metadataBase: new URL("https://artisaan.com.br"),
    keywords: [
        "artisaan",
        "documentation",
        "technical documentation",
        "source code",
        "AI documentation",
        "code documentation",
        "programming languages",
        "frameworks",
        "developer tools",
        "software development",
    ],
    openGraph: {
        title: "Artisaan | Technical documentation generated from source",
        description: "Generate technical documentation directly from your source code using AI. Support for multiple programming languages and frameworks",
        url: "https://artisaan.com.br",
        siteName: "Artisaan",
        images: [
            {
                url: "https://artisaan.com.br/images/og.png",
                width: 1200,
                height: 630,
                alt: "Artisaan Open Graph Image",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Artisaan | Technical documentation generated from source",
        description: "Generate technical documentation directly from your source code using AI. Support for multiple programming languages and frameworks",
        images: [
            "https://artisaan.com.br/images/og.png",
        ],
    },    
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
