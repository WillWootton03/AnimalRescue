import { ChevronRight, Heart, Home, MapPin } from "lucide-react";
import PetTag from "./PetTag";
import { useNavigate } from "react-router";
import { useState } from "react";

interface PetCardProps {
    name: string;
    price: string;
    breed: string;
    age: string;
    gender: string;
    location: string;
    tags: Array<string>;
    shelter_id: string;
    shelter_name: string;
    shelter_link: string;
}

export default function PetCard({
    name,
    price,
    breed,
    age,
    gender,
    location,
    tags,
    shelter_id,
    shelter_name,
    shelter_link,
} : PetCardProps) {

    const navigate = useNavigate();
    const [favorited, setFavorited] = useState(false);

    return (
        <div className="flex flex-col h-100 rounded-2xl bg-white border border-gray-200">
            {/* Pet Img  */}
            <div className="flex flex-2 relative">
                <button 
                    className={`flex p-2 rounded-full absolute top-3 right-3 bg-gray-100 border
                    hover:cursor-pointer 
                    ${favorited ? 
                        'bg-green-700/50 hover:text-red-500 hover:border-red-700 border-green-700' 
                        : 'hover:text-green-900 text-black/80 border-gray-200 hover:bg-green-600/60  hover:border-green-600'}`}
                    onClick={() => setFavorited(prev => !prev)}
                >
                    <Heart strokeWidth={2.6} className="w-4 h-4" />
                </button>
            </div>
            {/* Pet Details */}
            <div className="flex flex-col flex-1 gap-y-1 px-4">   
                <div className="flex justify-between">
                    <h1 className="font-bold text-lg">
                        {name}
                    </h1>
                    <p className="font-semibold text-lg text-green-800">
                        ${price}
                    </p>
                </div>
                <p className="text-black/50">
                    {breed} • {age} • {gender}
                </p>
                <p className="flex gap-x-1 items-center text-black/40 text-sm">
                    <MapPin strokeWidth={2.2} className="h-4 w-4"/> 
                    {location}
                </p>
                <div className="flex gap-x-2 ">
                    {tags.map((tag) => <PetTag title={tag} />)}
                </div>
            </div>
            {/* Card Footer */}
            <div className="border-t border-gray-200 flex justify-between items-center bg-gray-100 py-1 px-4">
                <button 
                    className="flex gap-x-2 text-green-900 items-center font-semibold"
                    onClick={() => navigate(`/shelters/${shelter_id}`)}
                >
                    <Home strokeWidth={2.4} className="w-4 h-4 " />
                    {shelter_name}
                </button>
                <a 
                    className="p-1 rounded-full hover:bg-gray-300 transition-colors duration-100"
                    href={shelter_link}
                    target="_blank"                 
                    rel="noopener noreferrer"
                    >
                    <ChevronRight strokeWidth={2.4} className="text-black/40 h-4 w-4" />
                </a>
            </div>
        </div>
    )
}