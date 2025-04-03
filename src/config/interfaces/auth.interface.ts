export interface AuthContextType {
    user: LoginResponse | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export interface LoginCredentials {
    user: string;
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

export interface AuthContextType {
    user: LoginResponse | null;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}