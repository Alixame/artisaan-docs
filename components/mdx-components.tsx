/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MDXComponents } from "mdx/types";

import { DocHeader } from "./docs/doc-header";
import { CodeTabs, CodeTabItem } from "./docs/code-tabs";
import { CodeBlock } from "./docs/code-block";
import { Steps, Step } from "./docs/steps";

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

function isBlockElement(children: any): boolean {
    if (!children) return false;

    const blockTags = ["h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "pre", "code", "div"];

    if (Array.isArray(children)) {
        return children.some((child) => isBlockElement(child));
    }

    if (typeof children === "object" && children.type) {
        return blockTags.includes(children.type);
    }

    return false;
}

// 🎨 Azul, cinza e dark igual sua doc estática
const baseStyles = {
    h1: "scroll-m-20 text-4xl font-bold tracking-tight text-white mb-4",
    p: "leading-7 text-sm text-zinc-400 mb-4",
    strong: "text-white font-semibold",
    ul: "list-disc ml-6 text-zinc-400 space-y-2 mb-4",
    ol: "list-decimal ml-6 text-zinc-400 space-y-2 mb-4",
    li: "text-sm text-zinc-400",
    codeInline:
        "relative rounded bg-zinc-900 px-[0.3rem] py-[0.2rem] font-mono text-sm text-zinc-300 border border-white/10",
};

export const mdxComponents: MDXComponents = {
    h1: (props) => <h1 className={baseStyles.h1} {...props} />,
    h2: ({ children }) => {
        const id = slugify(String(children));

        return (
            <h2
                id={id}
                className="scroll-m-20 border-b border-white/5 pb-2 text-2xl font-semibold tracking-tight text-zinc-50 mt-12 mb-4"
            >
                {children}
            </h2>
        );
    },
    h3: ({ children }) => {
        const id = slugify(String(children));

        return (
            <h3 id={id} className="text-sm font-semibold text-white mb-2 mt-8">
                {children}
            </h3>
        );
    },
    p: ({ children, ...props }: any) => {
        // se tem bloco dentro → troca por div
        if (isBlockElement(children)) {
            return (
                <div className="leading-7 text-sm text-zinc-400 mb-4" {...props}>
                    {children}
                </div>
            );
        }

        return (
            <p className="leading-7 text-sm text-zinc-400 mb-4" {...props}>
                {children}
            </p>
        );
    },

    code: (props) => (
        <code
            className="rounded bg-zinc-900/70 px-1 py-px font-mono text-[12px] text-zinc-200"
            {...props}
        />
    ),

    ul: (props) => <ul className={baseStyles.ul} {...props} />,
    ol: (props) => <ol className={baseStyles.ol} {...props} />,
    li: (props) => <li className={baseStyles.li} {...props} />,

    blockquote: (props) => (
        <blockquote
            className="border-l-2 border-blue-500/40 pl-4 ml-1 text-zinc-400 italic my-4"
            {...props}
        />
    ),

    table: (props) => (
        <div className="rounded-lg my-6 overflow-x-auto">
            <table
                className="w-full text-sm text-zinc-300 border-collapse"
                {...props}
            />
        </div>
    ),

    thead: (props) => (
        <thead className="bg-white/5" {...props} />
    ),

    tr: (props) => (
        <tr className="border-b border-white/10 last:border-b-0" {...props} />
    ),

    th: (props) => (
        <th
            className="px-3 py-2 text-left font-semibold text-zinc-100 border border-white/10"
            {...props}
        />
    ),

    td: (props) => (
        <td
            className="px-3 py-2 text-zinc-400 border border-white/10 align-top"
            {...props}
        />
    ),

    DocHeader,
    CodeTabs,
    CodeTabItem,
    CodeBlock,
    Steps,
    Step,
};
