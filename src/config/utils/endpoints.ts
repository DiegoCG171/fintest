import { API_VERSION } from "../constants/apiVersion";

const DEFAULT_API_VERSION = API_VERSION.v1;

export function getEndpoint(path: string, version: string = DEFAULT_API_VERSION): string {
    return `/${version}/${path}`.replace(/\/+/g, '/')
}