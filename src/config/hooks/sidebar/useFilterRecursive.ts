import { useCallback, useMemo } from "react";
import { MenuServiceInterface } from "../../interfaces";

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
                node.items?.filter((item) =>
                    item.name.toLowerCase().includes(normalized)
                ) ?? [];

            const matchedChildren = (node.children ?? [])
                .map((child) => filterRecursive(child, term, searchOnFile))
                .filter((child): child is MenuServiceInterface => child !== null);

            if (searchOnFile) {
                if (isNodeMatch) {
                    return {
                        ...node,
                        items: matchedItems,
                        children: matchedChildren,
                    };
                }
                if (matchedItems.length > 0 || matchedChildren.length > 0) {
                    return {
                        ...node,
                        items: matchedItems,
                        children: matchedChildren,
                    };
                }
                return null;
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

    const filteredMenu = useMemo(() => {
        const normalized = searchTerm.trim().toLowerCase();
        if (!normalized) return menu;

        return (
            menu
                .map((item) => filterRecursive(item, normalized, searchOnFile))
                .filter((item): item is MenuServiceInterface => item !== null) ?? []
        );
    }, [menu, searchTerm, searchOnFile, filterRecursive]);

    return filteredMenu;
};

export default useFilterRecursive;
