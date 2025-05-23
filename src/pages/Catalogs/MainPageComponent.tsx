import { Box } from "@mui/material";
import BasicTable from "../../components/UI/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
<<<<<<< HEAD
import TabbedCardContainer from "../../components/UI/TabbedCardContainer";
import { TabItem } from "../../config/interfaces";
import { tabConfig } from "../../config/mock";
import { useMultiSocket } from "../../config/hooks/useMultiSocket";
import { MessagesState } from "../../config/interfaces/messages.interface";
import { useAppSelector } from "../../store/hooks";
import { StatusRender } from "../../components/core/table/StatusRender";

const generateTabs = (
  type: string,
  route: string,
  messagesData: MessagesState
): TabItem[] => {
  const baseTabs: TabItem[] = [
    {
      label: "Detalles",
      content: (
        <BasicTable
          customRenderers={{
            estado: StatusRender,
          }}
          initialRows={messagesData.activeMessage.detail}
          type="detail"
        />
      ),
    },
    {
      label: "Errores",
      content: (
        <BasicTable
          customRenderers={{
            estado: StatusRender,
          }}
          initialRows={messagesData.activeMessage.errors}
          type="errors"
        />
      ),
    },
  ];

  if (type === "events") {
    return [
      {
        label: "Eventos",
        content: (
          <BasicTable
            customRenderers={{
              estado: StatusRender,
            }}
            initialRows={messagesData.events}
          />
        ),
      },
=======
import TabbedCardContainer from "../../components/UI/Tabs/TabbedCardContainer";
import { StaticTabItem } from "../../config/interfaces";
import { dataMap, tabConfig } from "../../config/mock";

const generateTabs = (type: string, route: string): StaticTabItem[] => {
    const baseTabs: StaticTabItem[] = [
        { label: "Detalles", content: <BasicTable initialRows={dataMap.detail} /> },
        { label: "Errores", content: <BasicTable initialRows={dataMap.errors} /> },
>>>>>>> e4b0c1ca5860c57fbb6329ededce04178db71b17
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

const calculateTabIndex = (
  route: string,
  messagesData: MessagesState
): number => {
  const tabs = generateTabs("detail", route, messagesData);

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
  const messagesData = useAppSelector((state) => state.messagesReducer);
  const { connect, disconnect } = useMultiSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const currentRoute = location.pathname.slice(1);

  const initialTabIndex = calculateTabIndex(currentRoute, messagesData);

  return (
    <Box
      sx={{
        // height: "95%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      <TitleHeaderComponent />
      <TabbedCardContainer
        tabs={generateTabs(viewType, currentRoute, messagesData)}
        eventTabs={generateTabs("events", currentRoute, messagesData)}
        initialTabIndex={initialTabIndex}
      />
    </Box>
  );
}

export default MainPage;
