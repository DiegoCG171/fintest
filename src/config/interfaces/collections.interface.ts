import { AsyncStatus } from ".";

export interface CreateCollection {
    name: string
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


interface CollectionCase {
    name: string;
    uuid: string;
}