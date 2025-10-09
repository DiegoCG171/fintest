import { Institution } from "./users.interface";

export interface AuthContextType {
    user: LoginResponse | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ChangePasswordCredentials{
    oldPassword: string;
    newPassword: string;
}

export interface LoginResponse {
    id: string
    username: string
    email: string
    names: string
    surnames: string
    status: string
    isOnline: boolean
    attemps: number
    createdAt: string
    updatedAt: string
    deletedAt?: unknown
    token: string;
    role: string;
    permissions: string[];
    institution: Institution;
}

export interface AuthState {
    user: LoginResponse | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    changePasswordActive: boolean; 
}

export interface ResetPassword {
    newPassword: string;
    token: string;
}

export interface RecoveryTokenResponse {
  message: string;
}
