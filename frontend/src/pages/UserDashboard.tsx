import { ChevronDown } from "lucide-react";
import PetSearch from "../components/PetSearch";
import PetCard from "../components/PetCard";
import AnimalFilterSidebar from "../components/AnimalFilterSidebar";

export default function UserDashboard() {
    return ( 
        <div className='w-full min-h-screen flex flex-col md:flex-row'>
            {/* Left Sidebar */}
            <div className="flex flex-1">
                <AnimalFilterSidebar />
            </div>
            {/* Main Page */}
            <div className="flex flex-6 flex-col gap-y-8 bg-gray-100 p-10">        
                {/* Search */}
                <div className="flex flex-col h-fit w-full rounded-lg bg-white gap-y-5 p-4 border border-gray-200">
                    {/* Header */}
                    <div>
                        <p className="font-bold text-2xl ">
                            Find your perfect companion
                        </p>
                        <p className="text-black/40 text-md">
                            Connect with local shelters and rescues looking for loving parents
                        </p>
                    </div>
                    {/* Search */}
                    <PetSearch 
                        empty=""
                    />
                </div>
                {/* Main Grid Header */}
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-md text-black/40 ">
                        Showing <span className="text-black/80">PLACEHOLDER</span> pets near you
                    </p>
                    <div className="flex gap-x-4 items-center">
                        <p className="text-black/40">
                            Sort by
                        </p>
                        <button 
                            className="border border-gray-200 text-black font-semibold text-md p-2 rounded-lg bg-white flex items-center gap-x-2"
                        >
                            PLACEHOLDER
                            <ChevronDown strokeWidth={2.8} className="text-black/60 w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/* Pet Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 px-6">
                    <PetCard 
                        name="Sunny"
                        price="250"
                        breed="Golden Retriever Puppy"
                        age="2 months"
                        gender="Male"
                        location="Portland, OR"
                        tags={['Puppy', 'Active', 'Kid-friendly']}
                        shelter_id="1"
                        shelter_name="Green Valley Rescue"
                        shelter_link="https://humanesocietysoco.org/"
                    />
                    {/*
                    <PetCard 
                        empty=""
                    />
                    <PetCard 
                        empty=""
                    />
                    <PetCard 
                        empty=""
                    />
                    */}
                </div>
            </div>
        </div>
    );
}