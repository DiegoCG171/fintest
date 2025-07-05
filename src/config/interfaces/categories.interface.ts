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

