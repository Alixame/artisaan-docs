import { ChevronRight } from "lucide-react";

export function DocHeader({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="mb-8">
            {/* Breadcrumb */}
            <div className="mb-4 flex items-center space-x-1 text-sm text-zinc-500">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">Docs</div>
                
                <ChevronRight size={14} className="shrink-0" />

                <div className="font-medium text-zinc-200">{title}</div>
            </div>

            {/* Title + description */}
            <div className="space-y-2">
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-white">
                    {title}
                </h1>
                
                <p className="text-lg text-zinc-400 font-light leading-7">
                    {description}
                </p>
            </div>
        </div>
    );
}
