import { Search } from "lucide-react";

interface PetSearchProps {
    empty: string;
}

export default function PetSearch({
    empty,
} : PetSearchProps) {
    return (
        <div 
            className="flex py-1 px-2 rounded-xl bg-gray-100 border border-gray-200 justify-between focus-within:border-blue-600"
        >
            {/* Search and Placeholder */}
            <div className="flex gap-x-2 w-full items-center">
                <Search strokeWidth={2.2} className="w-5 h-5 text-gray-500" />
                <input 
                    className="w-full outline-none"
                    placeholder="Search by name or shelter"
                />
                <button className="px-4 py-2 bg-green-800 rounded-lg text-white font-semibold">
                    Search
                </button>
            </div> 
        </div>
    )
}