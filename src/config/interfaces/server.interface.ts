import { AsyncStatus } from "."

export interface StartServerSuccessResponse {
    portNumber: number
    protocol: string
    userId: string
    ip: string
    deletedAt: string | null
    id: string
    createdAt: string
    updatedAt: string
}

export interface StopServerSuccessResponse {
    messsage: string
    ip: string
    port: number
}

export interface ServerState {
    server: StartServerSuccessResponse | null,
    status: AsyncStatus,
    error: string | null;
    stopServerResponse: StopServerSuccessResponse | null,
    stopServerStatus: AsyncStatus,
    stopServererror: string | null;
    configHost?: string;
    configPort?: number;
}