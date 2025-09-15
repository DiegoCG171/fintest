import { AsyncStatus } from ".";

export interface CreateCollection {
    name: string;
    origin?: string
}

export interface PathCollection {
    name?: string;
    cases?: string[];
}

export interface CollectionsState {
    collections: CollectionResponse[] | null,
    status: AsyncStatus;
    error: string | null;
}

export interface CollectionResponse {
    _id: string;
    name: string;
    cases: CollectionCase[];
    uuid: string;
}


export interface CollectionCase {
    name: string;
    uuid: string;
}