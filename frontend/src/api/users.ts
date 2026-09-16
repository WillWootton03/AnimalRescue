import { request } from "./client";


export type User = {
    email: string;
    name: string | null;
    verified: boolean;
    created_at: string | null;
    shelter_id: string | null;
    role: string | null;
};

export interface RegisterUser {
    email: string;
    name: string;
    password: string;
};

export interface LoginUser {
    email: string;
    password: string;
};

export function randomLoginImg() {
    console.log(Math.floor(Math.random() * (2 - 1 + 1)) + 1);
    return Math.floor(Math.random() * (2 - 1 + 1)) + 1;
}

export function getMe() {
    return request<User>('/users/me');
}