import { Box } from "@mui/material";
import BasicTable from "../../components/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { ReactNode, useState } from "react";
import TabbedCardContainer from "../../components/UI/TabbedCardContainer";

// Definición del tipo para las pestañas
interface TabData {
    label: string;
    content: ReactNode;
}

// Definición del tipo para el mapa de configuración
interface TabConfig {
    [key: string]: TabData[];
}

// Definición de los datos base
const dataMap = {
    detail: [
        {
            campo: "",
            nombre: "",
            longitud: "",
            estado: "",
            contenido: "",
        },
    ],
    errors: [
        {
            campo: "",
            nombre: "",
            longitud: "",
            estado: "",
            contenido: "",
        },
    ],
    events: [
        {
            ID: "",
            Fecha: "",
            "Tipo de Mensaje": "",
            "Tipo de Transacción": "",
            contenido: "",
            estado: "",
        },
    ],
};

// Configuración de pestañas adicionales según la ruta
const tabConfig: TabConfig = {
    "ecommerce/ventas": [
        {
            label: "Ventas",
            content: <BasicTable initialRows={dataMap.events} />
        }
    ],
    "ecommerce/compras": [
        {
            label: "Compras",
            content: <BasicTable initialRows={dataMap.detail} />
        }
    ],
    "admin/usuarios": [
        {
            label: "Usuarios",
            content: <BasicTable initialRows={dataMap.errors} />
        }
    ],
};

// Generador dinámico de pestañas según el tipo y la ruta
const generateTabs = (type: string, route: string): TabData[] => {
    const baseTabs: TabData[] = [
        { label: "Detalles", content: <BasicTable initialRows={dataMap.detail} /> },
        { label: "Errores", content: <BasicTable initialRows={dataMap.errors} /> },
    ];

    if (type === "events") {
        return [
            { label: "Eventos", content: <BasicTable initialRows={dataMap.events} /> },
        ];
    }

    if (route in tabConfig) {
        baseTabs.push(...tabConfig[route]);
    }

    return baseTabs;
};

function MainPage() {
    const [viewType] = useState("detail");
    const currentRoute = "/"; 

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "hidden",
                padding: 2,
                backgroundColor: "#f7f7f7",
            }}
        >
            <TitleHeaderComponent />

            <TabbedCardContainer
                tabs={generateTabs(viewType, currentRoute)}
                eventTabs={generateTabs("events", currentRoute)}
            />
        </Box>
    );
}

export default MainPage;