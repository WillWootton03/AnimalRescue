import { createBrowserRouter, redirect } from "react-router";
import { type ApiResponse, request } from "./api/client";

import Layout from "./Layout";

import Landing from "./pages/Landing";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import type { User } from "./api/users";
import UserDashboard from "./pages/UserDashboard";
import ShelterDashboard from "./pages/ShelterDashboard";

async function requireAuth() {
        try {
            const res = await request<ApiResponse<User>>('/users', {
                method: "GET",
            });

            return res.data;
        } catch {
            throw redirect('/');
        }
    } 

export const router = createBrowserRouter([
    {path: '/', Component: Landing},
    {
        path: '/',
        Component: Layout,
        loader: requireAuth,
        children: [
            { path: '/u_dashboard', Component: UserDashboard },
            { path: '/s_dashboard', Component: ShelterDashboard }
        ]
    },
    { path: '/login', Component: Login },
    { path: '/signUp', Component: SignUp },
]);