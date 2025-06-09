import { CategoryesInterface, MenuServiceInterface } from "../interfaces"; // ajusta tu path si es necesario

const normalize = (str: string): string => {
    return str
        .toLowerCase()
        .normalize("NFD") // separa acentos
        .replace(/[\u0300-\u036f]/g, "") // elimina acentos
        .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres especiales
        .trim()
        .replace(/\s+/g, "-"); // espacios a guiones
};

export const addLinkMenu = (
    categories: CategoryesInterface[],
    parentPath: string[] = []
): CategoryesInterface[] => {
    if (!categories) return []
    return categories.map((category) => {
        const currentPath = [...parentPath, normalize(category.name)];

        const itemsWithLink = category.items.map((item) => ({
            ...item,
            linkMenu: [...currentPath, normalize(item.name)].join("/"),
        }));

        const childrenWithLink = addLinkMenu(category.children, currentPath);

        return {
            ...category,
            items: itemsWithLink,
            children: childrenWithLink,
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