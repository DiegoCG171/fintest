import { Box } from "@mui/material";
import BasicTable from "../../components/UI/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import TabbedCardContainer from "../../components/UI/Tabs/TabbedCardContainer";
import { StaticTabItem } from "../../config/interfaces";
import { dataMap, tabConfig } from "../../config/mock";

const generateTabs = (type: string, route: string): StaticTabItem[] => {
    const baseTabs: StaticTabItem[] = [
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
            const newTabs = tabConfig[route].map((tab) => ({
                label: tab.label,
                content: tab.content,
            }));
            baseTabs.push(...newTabs);
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
