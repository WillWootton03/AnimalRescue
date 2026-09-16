import { useState } from "react";
import Filter from "./Filter"

type FilterType = {
    label: string;
    options: string[];
    values: string[];
}

export default function AnimalFilterSidebar() {

    const [filters, setFilters] = useState<FilterType[]>([
        {
            label: 'SPECIES',
            options: ['All', 'Dog', 'Cat', 'Other'],
            values: []
        },
        /*
        {
            label: 'Breed',
            options: [],
            value: ''
        },
        */
        {
            label: 'AGE GROUP',
            options: ['All', 'Puppy/Kitten', 'Young', 'Adult', 'Senior'],
            values: []
        },
        
    ]);

    const handleFilterChange = (index: number, values: string[]) => {
        setFilters(prev => 
            prev.map((filter, i) => 
                i === index
                    ? {...filter, values}
                    : filter
            )
        );
    };

    return (
        <div className="flex flex-col px-4 py-2 gap-y-4 w-full border-r border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="font-bold text-md">
                    Filter Companions
                </p>
                <button className="text-xs text-green-900 ">
                  Clear All  
                </button>
            </div>
            {filters.map((filter: FilterType, index: number) => (
                <Filter 
                    label={filter.label}
                    options={filter.options}
                    values={filter.values}
                    onChange={(values) => handleFilterChange(index, values)}
                />
            ))}
        </div>
    )
}