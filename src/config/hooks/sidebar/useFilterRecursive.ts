import { useCallback, useMemo } from "react";
import { MenuServiceInterface, ItemsServiceMenu } from "../../interfaces";

const useFilterRecursive = (
    menu: MenuServiceInterface[] = [],
    searchTerm: string,
    searchOnFile: boolean
) => {

    const filterRecursive = useCallback(
        (
            node: MenuServiceInterface,
            term: string,
            searchOnFile: boolean
        ): MenuServiceInterface | null => {

            const normalized = term.toLowerCase();

            const isNodeMatch = node.name?.toLowerCase().includes(normalized);

            const matchedItems =
                node.items?.filter(item => {
                    const match = item.name.toLowerCase().includes(normalized);
                    return match;
                }) ?? [];

            const matchedChildren = (node.children ?? [])
                .map(child => filterRecursive(child, term, searchOnFile))
                .filter((child): child is MenuServiceInterface => child !== null);

            if (searchOnFile) {
                if (isNodeMatch) {
                    return {
                        ...node,
                        items: node.items ?? [],
                        children: node.children ?? [],
                    };
                }
            }

            if (matchedItems.length > 0 || matchedChildren.length > 0) {
                return {
                    ...node,
                    items: matchedItems,
                    children: matchedChildren,
                };
            }

            return null;
        },
        []
    );

    const returnOnlyItems = useCallback((node: MenuServiceInterface): ItemsServiceMenu[] => {
        const results: ItemsServiceMenu[] = [];

        if (node.items?.length) {
            results.push(...node.items);
        }

        if (node.children?.length) {
            for (const child of node.children) {
                results.push(...returnOnlyItems(child));
            }
        }

        return results;
    }, []);

    const filteredMenu = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();

        if (!normalized) return menu;

        const treeMenu =
            menu
                .map(item => filterRecursive(item, normalized, searchOnFile))
                .filter((item): item is MenuServiceInterface => item !== null) ?? [];

        if (!searchOnFile) {
            const items = treeMenu.flatMap(root => returnOnlyItems(root));
            return items;
        }
        return treeMenu;
    }, [menu, searchTerm, searchOnFile, filterRecursive, returnOnlyItems]);
    return filteredMenu;
};

export default useFilterRecursive;
