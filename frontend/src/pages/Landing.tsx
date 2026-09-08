import { useNavigate } from "react-router";
import DescriptionCard from "../components/DescriptionCard";
import { Search, House, User2, User } from "lucide-react";
import { Navbar } from "../components/Navbar";

export default function Landing() {

    const navigate = useNavigate();

    return (            
        <div className="min-w-screen h-fit flex flex-col">
            <Navbar />
            {/* Section 1 */}
            <div className="flex gap-x-5 p-15 bg-amber-700/10 items-center">
                <div className="flex flex-2 flex-col gap-y-5 items-center px-10">
                <p className="text-5xl tracking-wide font-extrabold text-amber-950 ">
                    Connecting local rescues with loving adopters
                </p>
                <p className="tracking-wide font-medium text-black/80">
                    AnimalRescue is a shelter network designed to streamline user's abilities to find a furry friend, 
                    and allow shelters to accurately track their own animals and details. We make it easy to find your new pet,
                    and give shelters the ability to track logs, coordinate adoptions, and list new pets.
                </p>
                {/* TODO : Pet Search Here from landing */}
                <div></div>
                </div>
                <img src="/landing_1.jpg" className="rounded-xl flex-1" />
            </div>
            {/* Section 1 Footer */}
            <div className="flex gap-x-10 py-4 px-30 bg-amber-950/20 items-center">
            <p className="text-amber-950/80 font-semibold"> 
                Active Tracking Partner
            </p>
            <p className="text-sm text-black/50">
                Supporting local animal shelters and humane societies across the US & Canada
            </p>
            </div>
            {/* Section 2 */}
            <div className="flex flex-col items-center gap-y-5 mt-20">
                {/* Header */}
                <p className="font-bold text-3xl text-amber-950">
                    How AnimalRescue Works
                </p>
                <p className="text-sm text-black/50 text-center w-140">
                    A breakdown of the tools built directly into our shelter management and discovery platform.
                </p>
                {/* Cards */}
                <div className="flex gap-x-4 px-16">
                    <DescriptionCard 
                        id="card1"
                        icon={Search}
                        headerText="1. Search Local Shelters"
                        descriptionText="Browse dogs and cats listed by verified shelter organizations across the continent. Filter by breed, age, and location."
                    />
                    <DescriptionCard 
                        id="card2"
                        icon={House}
                        headerText="2. Setup Your Rescue"
                        descriptionText="Create a digital hub for your shelter. Add staff accounts, update operation logs, and list your official guidelines."
                    />
                    <DescriptionCard 
                        id="card3"
                        icon={User2}
                        headerText="3. List Animals"
                        descriptionText="Draft detailed pet listings. Include medical histories, descriptions, photos and behavior tags for your animals."
                    />
                </div>
                <div className="flex mt-20 gap-x-5 p-15 bg-amber-700/10 items-center w-full justify-center">
                    <div className="bg-[#FEF3C7] flex flex-col gap-y-5 items-center justify-center w-[80%] py-10 rounded-xl border border-[#E9DFD3]">
                        <p className="text-amber-950 font-bold text-3xl">
                            Join the North American rescue network
                        </p>
                        <p className="w-150 text-center text-amber-950">
                            Whether you are an established humane society, a foster based local resuce, or a looking adopter register today to coordinate animal discovery and secure lives.
                        </p>
                        <div className="flex flex-row gap-x-4 items-center">
                            <button className="bg-amber-800 font-semibold text-white rounded-lg py-2 px-4 hover:bg-[#FEF3C7] hover:text-amber-800 border border-transparent hover:border-amber-800">
                                Register Rescue Group
                            </button>
                            <button 
                                className="bg-[#FEF3C7] px-4 py-2 text-amber-800 font-semibold border border-amber-800 rounded-lg hover:bg-amber-800 hover:text-white"
                                onClick={() => navigate('/signUp')}
                            >
                                Sign Up as Adopter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}