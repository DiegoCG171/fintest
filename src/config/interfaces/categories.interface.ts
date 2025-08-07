import { AsyncStatus } from "."

export type RootCategoryesInterface = CategoryesInterface[]

export interface CategoryesInterface {
    id: string
    name: string
    children: Children[]
    items: Item[]
}

export interface Children {
    id: string
    name: string
    children: Children[]
    items: Item[]
}

export interface Item {
    name: string
    id: string
}

export interface CategoriesState {
    categories: RootCategoryesInterface | null;
    status: AsyncStatus;
    error: string | null;
}

export interface createCategoryInterface {
    name: string,
    parent?: string | null
}

export interface createCategoryResponse {
    id: string
    name: string
    parent: ParentCategory | null
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export interface ParentCategory {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

export interface UpdateCategoriePayload {
    data: createCategoryInterface;
    id: string;
}

