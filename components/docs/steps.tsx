import { ReactNode } from "react";

export function Steps({ children }: { children: ReactNode }) {
    return <div className="space-y-8 pl-2 mt-6">{children}</div>;
}

type StepProps = {
    title: string;
    children: ReactNode;
    code?: string;
    variant?: "default" | "active";
};

export function Step({
    title,
    children,
    code,
    variant = "default",
}: StepProps) {
    const dotClass =
        variant === "active"
            ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            : "bg-zinc-500";

    return (
        <div className="relative pl-8 border-l border-white/10 m-0! [&>p]:m-0! pb-4">
            <span
                className={`absolute -left-1.5 top-1 h-3 w-3 rounded-full border border-zinc-900 ${dotClass}`}
            ></span>

            <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>

            {children}

            {code && (
                <div className="rounded bg-[#09090b] border border-white/10 p-4 font-mono text-xs text-zinc-300 whitespace-pre">
                    {code}
                </div>
            )}
        </div>
    );
}
