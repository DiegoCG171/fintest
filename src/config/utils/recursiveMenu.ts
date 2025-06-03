import { CategoryesInterface } from "../interfaces"; // ajusta tu path si es necesario

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
    if(!categories) return []
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
