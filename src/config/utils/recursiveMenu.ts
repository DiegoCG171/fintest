import { CategoryesInterface, ItemsServiceMenu, MenuServiceInterface } from "../interfaces";
import { CollectionResponse } from "../interfaces/collections.interface";

export const addLinkMenu = (
    categories: CategoryesInterface[],
    parentPath: string,
): CategoryesInterface[] => {
    if (!categories || !Array.isArray(categories)) return [];
    return categories.map((category) => {
        const itemsWithLink = Array.isArray(category.items)
            ? category.items.map((item) => ({
                ...item,
                linkMenu: [parentPath, item.id].join("/"),
            }))
            : [];

        const childrenWithLink = Array.isArray(category.children)
            ? addLinkMenu(category.children, parentPath)
            : [];

        return {
            ...category,
            items: itemsWithLink,
            children: childrenWithLink,
        };
    });
};

export const transformCollectionsToMenu = (
    collections: CollectionResponse[],
    parentPath: string
    ): MenuServiceInterface[] => {
    if (!Array.isArray(collections)) return [];

    return collections.map((collection) => {

        const items: ItemsServiceMenu[] = Array.isArray(collection.cases)
        ? collection.cases.map((c) => ({
            id: c?.uuid,
            name: c?.name,
            linkMenu: [parentPath, c?.uuid].join("/"),
            }))
        : [];

        return {
        id: collection?.uuid,
        name: collection?.name,
        children: [],
        items,
        };
    });
};




export const getLinksArray = (data: MenuServiceInterface[]): string[] => {
    const result: string[] = [];

    const getLink = (node: MenuServiceInterface) => {
        if (node.linkMenu) {
            result.push(node.linkMenu);
        }

        if (Array.isArray(node.items)) {
            for (const item of node.items) {
                if (item.linkMenu) {
                    result.push(item.linkMenu);
                }
            }
        }

        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                getLink(child);
            }
        }
    };

    for (const node of data) {
        getLink(node);
    }
    return result;
}