import { MenuItem } from "../interfaces";
import { CollectionResponse } from "../interfaces/collections.interface";
import { generateLinkMenu } from "./generateLinkMenu";

export const mapCollections = (collections: CollectionResponse[]): MenuItem[] => {
  return collections.map((collection): MenuItem => ({
    id: collection._id,
    name: collection.name,
    items: (collection.cases || []).map((caseCollection): MenuItem => ({
      id: caseCollection.uuid,
      name: caseCollection.name,
      linkMenu: generateLinkMenu(collection.name, caseCollection.name), 
    })),
  }));
};
