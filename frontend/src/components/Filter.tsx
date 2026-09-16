import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { title } from "../helpers/strings";

interface FilterProps {
    label: string;
    options: string[];
    values: string[];
    onChange: (values: string[]) => void;
}

export default function Filter({
    label,
    options,
    values, 
    onChange,
} : FilterProps) {

    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col gap-y-1 relative" 
            onBlur={(e) => setOpen(e.currentTarget.contains(e.relatedTarget as Node) ? true : false)}
        >
            <p>
                {label}
            </p>
            <button 
                className="border border-gray-300 rounded-lg flex items-center text-left w-full relative px-2 py-1 justify-between"
                onClick={() => setOpen(prev => !prev)}
            >
                {values.length > 0 ? values.join(', ') : `Select ${title(label)}...`}
                <ChevronDown
                    strokeWidth={2.6}
                    className="w-4 h-4 text-black/70"
                />
            </button>
            {open && (
                <div className="absolute top-14 z-10 gap-x-4  w-full border border-gray-500 rounded-lg bg-white">
                    {options?.map((opt) => (
                            <button
                                className={`w-full text-left border-b border-gray-200 px-1 py-1 flex flex-col ${values.includes(opt) ? 'text-blue-500' : 'text-black/70'}`}
                                onClick={() => {
                                    let newValues;
                                        if (opt === 'All') {
                                            if (!values.includes('All')) {
                                                newValues = ['All']; 
                                            } else {
                                                newValues = [opt];
                                            }
                                        } else {
                                            if (values.includes('All')) {
                                                values = values.filter(v => v !== 'All');
                                            }
                                            newValues = values.includes(opt)
                                                ? values.filter(v => v !== opt)
                                                : [...values, opt];
                                        }

                                        onChange(newValues);
                                }}
                            >
                            {opt}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

}