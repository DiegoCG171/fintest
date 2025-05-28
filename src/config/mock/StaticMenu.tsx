import { MenuItem } from "../../config/interfaces"; 

export const staticMenuItems: MenuItem[] = [
    {
            name: "Ecommerce",
            id: "",
            items: [
            {
                name: "Venta",
                id: "",
                linkMenu: "ecommerce/ventas",
            },
            {
                name: "Reverso",
                id: "",
                linkMenu: "ecommerce/reverso",
            },
            {
                name: "Cancelación",
                id: "",
                linkMenu: "ecommerce/cancelacion",
            },
            {
                name: "Venta con #DS",
                id: "",
                linkMenu: "ecommerce/ventas-ds",
            },
            {
                name: "Venta Visa",
                id: "",
                linkMenu: "ecommerce/ventas-visa",
            },
            {
                name: "Centa con 3DS mastercard",
                id: "",
                linkMenu: "ecommerce/ventas-mastercard",
            },
            ],
        },
        {
            name: "Moto",
            id: "",
            items: [
            {
                name: "Venta",
                id: "",
                linkMenu: "moto/ventas",
            },
            {
                name: "Reverso",
                id: "",
                linkMenu: "moto/reverso",
            },
            {
                name: "Cancelación",
                id: "",
                linkMenu: "moto/cancelacion",
            },
            {
                name: "Venta con #DS",
                id: "",
                linkMenu: "moto/ventas-ds",
            },
            {
                name: "Venta Visa",
                id: "",
                linkMenu: "moto/ventas-visa",
            },
            {
                name: "Centa con 3DS mastercard",
                id: "",
                linkMenu: "moto/ventas-mastercard",
            },
            ],
        },
];
