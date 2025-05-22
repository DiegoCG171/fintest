import { AsyncStatus } from ".";

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
    token: string
}

export interface AuthState {
    user: LoginResponse | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

export interface RootRecoveryPssw {
    id: string
    token: string
    createdAt: string
    user: UserRecoveryPssw
}

export interface UserRecoveryPssw {
    id: string
    username: string
    password: string
    email: string
    names: string
    surnames: string
    status: string
    isOnline: boolean
    attemps: number
    portNumber: unknown
    createdAt: string
    updatedAt: string
    deletedAt: unknown
}

export interface PassRecoveryState {
    user: RootRecoveryPssw | null;
    status: AsyncStatus;
    error: string | null;
}  
export interface PassResetState {
    status: AsyncStatus;
    error: string | null;
}  
