import { Box } from "@mui/material";
import BasicTable from "../../components/core/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TabbedCardContainer from "../../components/UI/TabbedCardContainer";
import { TabItem } from "../../config/interfaces";
import { dataMap, tabConfig } from "../../config/mock";
import { useMultiSocket } from "../../config/hooks/useMultiSocket";

const generateTabs = (type: string, route: string): TabItem[] => {
  const baseTabs: TabItem[] = [
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
  const [viewType] = useState("detail");
  const { connect, disconnect } = useMultiSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

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
