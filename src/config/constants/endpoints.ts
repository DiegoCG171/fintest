import { getEndpoint } from "../utils/endpoints"
import { API_VERSION } from "./apiVersion"

export const ENDPOINTS = {
    //Autenticación
    login: getEndpoint('auth/login', API_VERSION.v1),
    recoveryToken: getEndpoint('auth/recovery-token', API_VERSION.v1),
    resetPassword: getEndpoint('auth/reset-password', API_VERSION.v1),

    //Breaker
    getIso: getEndpoint('interpreter/iso'),

    //Clients
    startClient: getEndpoint('connection/start-client'),
    stopClient: getEndpoint('connection/stop-client'),
    stopAllClients: getEndpoint('connection/stop-all-clients'),
    getAllClients: getEndpoint('connection/all-clients'),

    //Messages
    message: getEndpoint('message'),

    //Rules
    getRules: getEndpoint('rules'),
    createRules: getEndpoint('rules/create'),

    //Server
    startServer: getEndpoint('connection/start-tcp'),
    stopServer: getEndpoint('connection/stop-tcp'),
    stopAllServers: getEndpoint('connection/stop-all-tcp'),

    //Templates
    template: getEndpoint('template'),

    //Users
    user: getEndpoint('users'),
    
    //Collections
    collections: getEndpoint('collection'),

}
