import { MenuItem } from "../../config/interfaces"; // Asegúrate de que la interfaz esté actualizada
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

export const staticMenuItems: MenuItem[] = [
    {
        title: "Catálogo",
        iconMenu: <CreateNewFolderOutlinedIcon />,
        subItems: [
        {
            title: "Pos",
            iconMenu: <FolderOutlinedIcon />,
            subItems: [
            {
                title: "Venta",
                iconMenu: <DescriptionOutlinedIcon />,
                subItems: [
                {
                    title: "Venta",
                    iconMenu: <DescriptionOutlinedIcon />,
                    onClickMenu: () => console.log("Venta desde ecommerce"),
                },
                {
                    title: "Venta",
                    iconMenu: <DescriptionOutlinedIcon />,
                    onClickMenu: () => console.log("Venta desde ecommerce"),
                },
                ],
            },
            ],
        },
        {
            title: "ATM",
            iconMenu: <FolderOutlinedIcon />,
            subItems: [
            {
                title: "Venta",
                iconMenu: <DescriptionOutlinedIcon />,
                onClickMenu: () => console.log("Venta desde moto"),
            },
            ],
        },
        ],
    },
    {
        title: "Colecciones",
        iconMenu: <CreateNewFolderOutlinedIcon />,
        subItems: [
        {
            title: "Ecommerce",
            iconMenu: <FolderOutlinedIcon />,
            subItems: [
            {
                title: "Venta",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/ventas",
            },
            {
                title: "Reverso",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/reverso",
            },
            {
                title: "Cancelación",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/cancelacion",
            },
            {
                title: "Venta con #DS",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/ventas-ds",
            },
            {
                title: "Venta Visa",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/ventas-visa",
            },
            {
                title: "Centa con 3DS mastercard",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "ecommerce/ventas-mastercard",
            },
            ],
        },
        {
            title: "Moto",
            iconMenu: <FolderOutlinedIcon />,
            subItems: [
            {
                title: "Venta",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/ventas",
            },
            {
                title: "Reverso",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/reverso",
            },
            {
                title: "Cancelación",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/cancelacion",
            },
            {
                title: "Venta con #DS",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/ventas-ds",
            },
            {
                title: "Venta Visa",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/ventas-visa",
            },
            {
                title: "Centa con 3DS mastercard",
                iconMenu: <ArrowRightAltOutlinedIcon />,
                linkMenu: "moto/ventas-mastercard",
            },
            ],
        },
        ],
    },
];
