import { useNavigate } from "react-router"
import { useAuth } from "../context/authContext";
import { Heart } from "lucide-react";


export function Navbar() {

    const navigate = useNavigate();

    return (
     <div className="h-20 z-100 sticky top-0 w-full flex justify-between border-b border border-gray-300/80 bg-white/80 backdrop-blur-md">
        <div className="flex flex-row gap-x-2 items-center px-8">
            <img src="/animal_rescue_sq.png" className="h-12 w-12" alt="Logo" />
            <h1 className="font-bold text-amber-950 text-xl">
                AnimalRescue
            </h1>
            <div className="px-8 flex gap-x-5">
                <a href="#" className="">Find a Pet</a>
            </div>
        </div>
        <div className="flex flex-row h-full justify-center items-center px-20 gap-x-4">
            <button 
                className="px-3 py-1 flex text-sm items-center gap-x-1 bg-orange-400/30 rounded-lg text-orange-500 font-medium"
            >
                <Heart strokeWidth={3} className="h-4 w-4 text-orange-500"/>
                Saved Pets
            </button>
            <span className="text-black/30">|</span>
            {/* User Profile */}
            <div></div>
        </div>
    </div>
    )
}