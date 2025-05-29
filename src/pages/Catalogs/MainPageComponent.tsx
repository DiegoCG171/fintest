import { Box } from "@mui/material";
import BasicTable from "../../components/UI/table/BasicTableComponent";
import TitleHeaderComponent from "../../components/UI/TitleHeaderComponent";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { tabConfig } from "../../config/mock";
import { useMultiSocket } from "../../config/hooks/useMultiSocket";
import { MessagesState } from "../../config/interfaces/messages.interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { StaticTabItem } from "../../config/interfaces";
import { StatusRender } from "../../components/UI/table/StatusRender";
import TabbedCardContainer from "../../components/UI/Tabs/TabbedCardContainer";
import { addTab } from "../../store";

const generateStaticTabs = (messagesData: MessagesState): StaticTabItem[] => [
  {
    label: "Detalles",
    content: (
      <BasicTable
        initialRows={messagesData.activeMessage.detail}
        type="detail"
        customRenderers={{ estado: StatusRender }}
      />
    ),
  },
  {
    label: "Errores",
    content: (
      <BasicTable
        initialRows={messagesData.activeMessage.errors}
        type="errors"
        customRenderers={{ estado: StatusRender }}
      />
    ),
  },
];

const generateEventTabs = (messagesData: MessagesState): StaticTabItem[] => [
  {
    label: "Eventos",
    content: (
      <BasicTable
        customRenderers={{ estado: StatusRender }}
        initialRows={messagesData.events}
      />
    ),
  },
];

const generateDynamicTabs = (
  dynamicTabs: { label: string; route: string }[]
) => {
  return dynamicTabs.map((tab) => ({
    label: tab.label,
    route: tab.route,
    content: tabConfig[tab.route]?.[0]?.content || null,
  }));
};

function MainPage() {
  const location = useLocation();
  const messagesData = useAppSelector((state) => state.messagesReducer);
  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const dispatch = useAppDispatch();
  const { connect, disconnect } = useMultiSocket();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  useEffect(() => {
    const currentRoute = location.pathname.slice(1);

    const matching = tabConfig[currentRoute]?.[0];
    if (matching) {
      dispatch(
        addTab({
          label: matching.label,
          route: currentRoute,
        })
      );
    }
  }, [location.pathname, dispatch]);

  const currentRoute = location.pathname.slice(1);

  const dynamicIndex = dynamicTabs.findIndex(
    (tab) => tab.route === currentRoute
  );

  const currentTabIndex = dynamicIndex !== -1 ? dynamicIndex + 2 : undefined;

  return (
    <Box
      sx={{
        height: "vh95",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      <TitleHeaderComponent />
      <TabbedCardContainer
        tabs={[
          ...generateStaticTabs(messagesData),
          ...generateDynamicTabs(dynamicTabs),
        ]}
        eventTabs={generateEventTabs(messagesData)}
        initialTabIndex={currentTabIndex}
      />
    </Box>
  );
}

export default MainPage;
