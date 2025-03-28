import { ReactNode, useEffect, useState } from "react";
import {
    LoginCredentials,
    LoginResponse,
    login as loginService,
} from "../services/auth/login.service";
import { AuthContext } from "./AuthContext";

export interface AuthContextType {
    user: LoginResponse | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials: LoginCredentials) => {
        const data = await loginService(credentials);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    useEffect(() => {
        const init = () => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token || !storedUser) {
            setLoading(false);
            return;
        }

        try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
        } catch (err) {
            console.error("Error al parsear user del localStorage", err);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
        };
        init();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};
