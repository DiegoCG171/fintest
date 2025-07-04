import { MenuItem } from "../interfaces";
import { CollectionResponse } from "../interfaces/collections.interface";
import { generateLinkMenu } from "./generateLinkMenu";

export const mapCollections = (collections: CollectionResponse[]): MenuItem[] => {
  return collections.map((collection): MenuItem => ({
    id: collection.uuid,
    name: collection.name,
    items: (collection.cases || []).map((caseCollection): MenuItem => ({
      id: caseCollection.uuid,
      name: caseCollection.name,
      linkMenu: generateLinkMenu("collections", caseCollection.uuid)
    })),
  }));
};
