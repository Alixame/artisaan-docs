"use client";

import React from "react";
import { CopyIcon, CheckIcon } from "lucide-react";
import { extractTextFromMdx } from "@/lib/mdx/extract-text-mdx";

export function CodeBlock({ children }: { children: React.ReactNode }) {
    const [copySuccess, setCopySuccess] = React.useState(false);

    // Extrai e normaliza texto de nós MDX/React para exibição estável.
    const extractedText = React.useMemo(
        () => extractTextFromMdx(children).replace(/\r\n/g, "\n"),
        [children]
    );
    const hasVisibleText = /\S/.test(extractedText);
    const text = hasVisibleText
        ? extractedText.replace(/^\n+|\n+$/g, "")
        : "";
    const shouldRenderRawChildren = !hasVisibleText;

    const handleCopy = async () => {
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            
            setCopySuccess(true);

            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            setCopySuccess(false);
        }
    };

    return (
        <div className="relative rounded-lg border border-white/10 bg-[#09090b] p-4 group">
            <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
            >
                {copySuccess ? (
                    <CheckIcon className="text-green-400 w-4 h-4" />
                ) : (
                    <CopyIcon className="w-4 h-4" />
                )}
            </button>

            <pre className="m-0 pr-7 overflow-x-auto text-sm font-mono leading-relaxed text-zinc-300 whitespace-pre [&>p]:m-0! [&>p]:leading-relaxed">
                {shouldRenderRawChildren ? children : text}
            </pre>
        </div>
    );
}
