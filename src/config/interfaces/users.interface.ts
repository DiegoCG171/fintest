import { AsyncStatus } from "."

export interface createUserInterface {
    username: string
    password: string
    email: string
    names: string
    surnames: string
}

export interface UserState {
    status: AsyncStatus,
    error: null | string
}