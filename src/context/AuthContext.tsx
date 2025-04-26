/* eslint-disable react-refresh/only-export-components */
import { getCurrentUser } from "@/lib/appwrite/api";
import { useSignout } from "@/lib/react-query/queries";
import { IContextType, IUser } from "@/types";
import { checkTokenExpiration, createExpirationDate } from "@/utils/Auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const INITIAL_USER: IUser = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
};

const INITIAL_STATE: IContextType = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: logout } = useSignout();

    const navigate = useNavigate();

    const checkAuthUser = async () => {
        try {
            setIsLoading(true);
            const currentUser = await getCurrentUser();

            if (currentUser) {
                setUser({
                    id: currentUser.$id,
                    name: currentUser.name,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio,
                });
                setIsAuthenticated(true);
                createExpirationDate();
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const cookieFallback = localStorage.getItem("cookieFallback");
        const leftedTime = checkTokenExpiration();

        if (
            cookieFallback === "[]" ||
            !cookieFallback ||
            leftedTime === undefined
        ) {
            navigate("/signin");
            return;
        }

        if (leftedTime === null) return logout();

        const expiredSession = setTimeout(() => {
            alert("Session is expired. Please signin again.");
            logout();
        }, leftedTime);

        checkAuthUser();

        return () => clearTimeout(expiredSession);
    }, [logout]);

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthContext was used outside AuthProvider");
    return context;
}

export default AuthProvider;
