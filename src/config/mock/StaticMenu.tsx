import { MenuItem } from "../../config/interfaces"; 

export const staticMenuItems: MenuItem[] = [
    {
            name: "Ecommerce",
            id: "",
            items: [
            {
                name: "Venta",
                id: "6835dbfdc9433ace61787028",
                linkMenu: "ecommerce/ventas",
            },
            {
                name: "Reverso",
                id: "6835dbfdc9433ace61787086",
                linkMenu: "ecommerce/reverso",
            },
            {
                name: "Cancelación",
                id: "",
                linkMenu: "ecommerce/cancelacion",
            },
            {
                name: "Venta con #DS",
                id: "6835dbfdc9433ace61787086",
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
