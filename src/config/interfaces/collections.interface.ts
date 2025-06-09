import { ItemsServiceMenu, MenuItem } from "./menu.interface";

export interface CreateCollection {
    name: string
}

export interface CollectionsState {
    collections: CollectionResponse[],
    collectionsMenu: MenuItem[];

}

export interface CollectionResponse {
    _id: string;
    name: string;
    cases: ItemsServiceMenu[];
    uuid: string;
}
