import type { LucideIcon } from "lucide-react";

interface DescriptionCardProps {
    id: string;
    icon: LucideIcon;
    headerText: string;
    descriptionText: string;
}

export default function DescriptionCard({
    id,
    icon: Icon,
    headerText,
    descriptionText
}: DescriptionCardProps) {
    return (
        <div className="bg-[#FAF6EE] border border-[#E9DFD3] p-6 rounded-xl flex flex-col gap-y-2">
            <Icon strokeWidth={2.4} className="h-12 w-12 bg-[#FEF3C7] p-4 rounded-xl text-[#D97706]" />
            <p className="text-amber-950 font-bold text-xl">
                {headerText}
            </p>
            <p className="w-[80%] text-black/80 text-md">
                {descriptionText}
            </p>
        </div>
    )
}