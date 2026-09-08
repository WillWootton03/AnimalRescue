import type { User } from "../api/users";
import { createContext, useContext, type ReactNode } from "react";


type AuthState = {
    user: User | null;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ user, children } : { user: User, children: ReactNode }) {
    
    return (
        <AuthContext.Provider
            value={{
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx; 
}