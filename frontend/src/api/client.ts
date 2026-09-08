import { useNavigate } from 'react-router';

export class ApiError extends Error {
    status: number;
    code?: string;
    email?: string;
    constructor(status: number, message: string, code?: string, email?: string) {
        super(message);
        this.status = status;
        this.code = code;
        this.email = email;
    }
}

export interface ApiResponse<T> {
    message: string;
    data: T;    
}

type RequestOptions = RequestInit & {
    params?: Record<string, string | number | boolean | undefined>;
};

const API_URL = import.meta.env.VITE_API_BASE_ROUTE ?? "http://localhost:3000";

const NO_REFRESH_PATHS = new Set(['/auth/login', '/auth/register', '/auth/refresh']);

let refreshPromise: Promise<boolean> | null = null;

async function doFetch(path: string, init: RequestInit = {}): Promise<Response> {
    const res = await fetch(path, {
        ...init,
        credentials: 'include',
        headers: {
            ...init.headers,
            ...(init.body ? {
                'Content-Type': 'application/json'
            } : {}),
        },
    });
    return res;
}

function refreshAccessToken(): Promise<boolean> {
    if(!refreshPromise) {
        refreshPromise = doFetch('/auth/refresh', {method: 'POST'})
        .then((res) => res.ok)
        .catch(() => false)
        .finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

export async function request<T>(path: string, init: RequestOptions = {}): Promise<T> {
    const { params, ...fetchInit} = init;
    const url = new URL(`${API_URL}${path}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if(value !== undefined) {
                url.searchParams.set(key, String(value));
            }
        });
    }
    let res = await doFetch(url.toString(), fetchInit);

    if (res.status === 401 && NO_REFRESH_PATHS.has(path)) {
        let shouldRefresh = false;

        try {
            const body = res.clone().json();
            shouldRefresh = body?.code === 'TOKEN_EXPIRED';
        } catch {
        } 

        if(shouldRefresh) {
            const refreshed = await refreshAccessToken();

            if(refreshed) {
                res = await doFetch(path, init);
            } else {
                window.location.href = '/login';
                throw new ApiError(401, 'Session Expired');
            }
        } 
    }

    if (!res.ok) {
        let message = 'Something went wrong';
        let code: string | undefined;
        let email: string | undefined;
        try {
            const body = await res.json();
            if (body?.error) message = body.error;
            if (typeof body?.code === 'string') code = body.code;
            if (typeof body?.email === 'string') email = body.email;
        } catch {
        }
        throw new ApiError(res.status, message, code, email);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json() as T);
}