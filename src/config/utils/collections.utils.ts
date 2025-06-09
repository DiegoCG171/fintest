import { MenuItem } from "../interfaces";
import { CollectionResponse } from "../interfaces/collections.interface";


export const mapCollections = (collections: CollectionResponse[]): MenuItem[] => {
    const collectionsMenu = collections.map(collection => ({
        id: collection._id,
        name: collection.name,
        items: collection.cases
    }))

    return collectionsMenu;
}