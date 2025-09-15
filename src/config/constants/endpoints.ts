import { getEndpoint } from "../utils/endpoints"
import { API_VERSION } from "./apiVersion"

export const ENDPOINTS = {
    //Autenticación
    login: getEndpoint('auth/login', API_VERSION.v1),
    resetPassword:getEndpoint('auth/reset-password'),
    recoveryToken:getEndpoint('auth/recovery-token'),
    renewToken:getEndpoint('auth/renew-token'),
    changePassword:getEndpoint('auth/change-password'),

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

    //Collections
    testCases: getEndpoint('test-case'),

    //Categorias
    category: getEndpoint('category'),

    //Sessions
    session: getEndpoint('session'),

    institution: getEndpoint('institution'),

    securityRol: getEndpoint('security/rol'),
    securityPermissions: getEndpoint('security/permission'),
    securityAction: getEndpoint('security/action'),
    securityResource: getEndpoint('security/resource'),
}
