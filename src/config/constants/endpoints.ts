import { getEndpoint } from "../utils/endpoints"
import { API_VERSION } from "./apiVersion"

export const ENDPOINTS = {
    //Autenticación
    login: getEndpoint('auth/login', API_VERSION.v1),
    //Catalogs
    rules: getEndpoint('rules'),
    //Templates
    template: getEndpoint('template')

}
