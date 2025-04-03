import { Box } from "@mui/material";
import BasicTable from "../../components/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TabbedCardContainer from "../../components/UI/TabbedCardContainer";
import TabbedTableForm from "../../components/UI/TabbedTableForm";
import { TabConfigInterface, TabDataInterface } from "../../config/interfaces";

const dataMap = {
    detail: [{ campo: "", nombre: "", longitud: "", estado: "", contenido: "" }],
    errors: [{ campo: "", nombre: "", longitud: "", estado: "", contenido: "" }],
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

const tabConfig: TabConfigInterface = {
    "ecommerce/ventas": [
        { label: "Ventas", content: <TabbedTableForm /> },
    ],
    "ecommerce/reverso": [
        { label: "Reverso", content: <TabbedTableForm /> },
    ],
    "ecommerce/cancelacion": [
        {
        label: "Cancelación",
        content: <TabbedTableForm />,
        },
    ],
    "ecommerce/ventas-ds": [
        {
        label: "Venta con #DS",
        content: <TabbedTableForm />,
        },
    ],
    "ecommerce/ventas-visa": [
        {
        label: "Venta visa",
        content: <TabbedTableForm />,
        },
    ],
    "ecommerce/ventas-mastercard": [
        {
        label: "Cuenta con 3DS mastercard",
        content: <TabbedTableForm />,
        },
    ],
    "moto/ventas": [
        { label: "Ventas", content: <TabbedTableForm /> },
    ],
    "moto/reverso": [
        { label: "Reverso", content: <TabbedTableForm /> },
    ],
    "moto/cancelacion": [
        {
        label: "Cancelación",
        content: <TabbedTableForm />,
        },
    ],
    "moto/ventas-ds": [
        {
        label: "Venta con #DS",
        content: <TabbedTableForm />,
        },
    ],
    "moto/ventas-visa": [
        {
        label: "Venta visa",
        content: <TabbedTableForm />,
        },
    ],
    "moto/ventas-mastercard": [
        {
        label: "Cuenta con 3DS mastercard",
        content: <TabbedTableForm />,
        },
    ],
};

const generateTabs = (type: string, route: string): TabDataInterface[] => {
    const baseTabs: TabDataInterface[] = [
        { label: "Detalles", content: <BasicTable initialRows={dataMap.detail} /> },
        { label: "Errores", content: <BasicTable initialRows={dataMap.errors} /> },
    ];

    if (type === "events") {
        return [
        {
            label: "Eventos",
            content: <BasicTable initialRows={dataMap.events} />,
        },
        ];
    }

    if (route in tabConfig) {
        const existingTab = baseTabs.find(
        (tab) => tab.label === tabConfig[route][0].label
        );
        if (!existingTab) {
        baseTabs.push(...tabConfig[route]);
        }
    }

    return baseTabs;
};

const calculateTabIndex = (route: string): number => {
    const tabs = generateTabs("detail", route);

    const matchedIndex = tabs.findIndex((tab) =>
        tab.label
        .toLowerCase()
        .includes(route.split("/").pop()?.toLowerCase() || "")
    );

    return matchedIndex !== -1 ? matchedIndex : tabs.length - 1;
};

function MainPage() {
    const location = useLocation();
    const [
        viewType, 
        //setViewType
    ] = useState("detail");
    const currentRoute = location.pathname.slice(1);


    const initialTabIndex = calculateTabIndex(currentRoute);

    return (
        <Box
        sx={{
            height: "95%",
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
            initialTabIndex={initialTabIndex}
        />
        </Box>
  );
}

export default MainPage;
