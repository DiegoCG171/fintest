export interface CreateCollection {
    name: string
}

export interface CollectionsState {
    collections: Collection[]
}

interface Collection {
    _id: string;
    name: string;
    cases: string[];
    uuid: string;
}
