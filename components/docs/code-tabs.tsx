/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { extractTextFromMdx } from "@/lib/mdx/extract-text-mdx";

// -------------------------------------------
// Contexto responsável por controlar as abas
// -------------------------------------------

type TabsContextType = {
    active: number;
    setActive: (index: number) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("CodeTabItem must be used inside <CodeTabs>");
    return ctx;
}

// -------------------------------------------
// Componente Principal <CodeTabs>
// -------------------------------------------

export function CodeTabs({ children }: { children: ReactNode }) {
    const [active, setActive] = useState(0);

    const items = Array.isArray(children) ? children : [children];

    if (items.length === 0 || !items.every((item) => React.isValidElement(item))) {
        return null;
    }

    return (
        <TabsContext.Provider value={{ active, setActive }}>
            <div className="relative rounded-lg border border-white/10 bg-[#09090b] mt-6">
                {/* Header das Tabs */}
                <div className="flex items-center gap-4 px-4 border-b border-white/5">
                    {items.map((item: any, index: number) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActive(index)}
                            className={
                                active === index
                                    ? "py-2.5 text-xs font-medium text-white border-b border-blue-500 -mb-[1px]"
                                    : "py-2.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
                            }
                        >
                            {item.props.label}
                        </button>
                    ))}

                    {/* Botão Copiar */}
                    <CopyButton items={items} active={active} />
                </div>

                {/* Conteúdo */}
                <div className="p-4 overflow-x-auto">
                    {items[active]}
                </div>
            </div>
        </TabsContext.Provider>
    );
}

// -------------------------------------------
// Copiar conteúdo da tab ativa
// -------------------------------------------

function CopyButton({ items, active }: { items: any[]; active: number }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        const content = extractTextFromMdx(items[active].props.children);

        if (typeof content !== "string") return;

        await navigator.clipboard.writeText(content);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="ml-auto p-1.5 text-zinc-500 hover:text-white transition-colors"
        >
            {copied ? (
                <CheckIcon className="text-green-400 size-4" />
            ) : (
                <CopyIcon className="size-4" />
            )}
        </button>
    );
}

// -------------------------------------------
// Subcomponente <CodeTabItem>
// -------------------------------------------

export function CodeTabItem({
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    const text = extractTextFromMdx(children);

    return (
        <code className="text-sm font-mono leading-relaxed text-zinc-300 whitespace-pre [&>p]:m-0!">
            {text}
        </code>
    );
};
