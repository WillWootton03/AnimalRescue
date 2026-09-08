import { Outlet, useLoaderData } from "react-router";
import { AuthProvider } from "./context/authContext";
import type { User } from "./api/users";
import { Navbar } from "./components/Navbar";

export default function Layout() {
    const user = useLoaderData() as User;
    return (
        <div className="min-h-screen w-full flex flex-col items-stretch relative">
            <Navbar />
            <AuthProvider user={user}>
                <Outlet />
            </AuthProvider>
        </div>
    );
}