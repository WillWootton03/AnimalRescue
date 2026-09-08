import { useNavigate } from "react-router"


export function Navbar() {

    const navigate = useNavigate();

    return (
     <div className="h-20 z-100 sticky top-0 w-full flex justify-between border-b border border-gray-300/80 bg-white/80 backdrop-blur-md">
        <div className="flex flex-row gap-x-2 items-center px-20">
            <img src="/animal_rescue_sq.png" className="h-12 w-12" alt="Logo" />
            <h1 className="font-bold text-amber-950 text-xl">
                AnimalRescue
            </h1>
        </div>
        <div className="flex flex-row h-full justify-center items-center px-20 gap-x-4">
            <a className="hover:text-amber-900" href="#">Find Pets</a>
            <a className="hover:text-amber-900" href="#">For Shelters</a>
            <a className="hover:text-amber-900" href="How it Works"></a>
            <button 
                className="hover:text-amber-900 px-4 py-2 rounded-lg border border-gray-300/80"
                onClick={() => navigate('/login')}
                >
                Login
            </button>
            <button 
                className="px-4 py-2 text-white rounded-lg bg-amber-700 hover:bg-amber-900" 
                onClick={() => navigate('/signUp')}
                >
                Sign Up
            </button>
        </div>
    </div>
    )
}