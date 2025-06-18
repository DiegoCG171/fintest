import { Box } from "@mui/material";
import BasicTable from "../../components/UI/table/BasicTableComponent";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
//import { tabConfig } from "../../config/mock";
import { useMultiSocket } from "../../config/hooks/useMultiSocket";
import { MessagesState } from "../../config/interfaces/messages.interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { StaticTabItem } from "../../config/interfaces";
import { StatusRender } from "../../components/UI/table/StatusRender";
import TabbedCardContainer from "../../components/UI/Tabs/TabbedCardContainer";
import { addTab } from "../../store";
import { getConfigTab } from "../../config/utils/tabsContent";

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
    canEdit: true,
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
    canEdit: true,
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
    canEdit: true,
  },
];

function MainPage() {
  const location = useLocation();
  const messagesData = useAppSelector((state) => state.messagesReducer);
  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const categories = useAppSelector(
    (state) => state.sidebarMenu.categoriesMenu
  );
  const collections = useAppSelector(
    (state) => state.sidebarMenu.collectionsMenu
  );
  const dispatch = useAppDispatch();
  const { connect, disconnect } = useMultiSocket();
  const tabConfig = useMemo(() => {
    const categoriesTabs = getConfigTab(categories, "categories", true);
    const collectionsTabs = getConfigTab(collections, "collections", true);
    return {
      ...categoriesTabs,
      ...collectionsTabs,
    };
  }, [categories, collections]);

  const generateDynamicTabs = (
    dynamicTabs: { label: string; route: string }[]
  ) => {
    const tab = dynamicTabs.map((tab) => {
      return {
        label: tab.label,
        route: tab.route,
        content: tabConfig[tab.route]?.[0]?.content || null,
        canEdit: tabConfig[tab.route]?.[0]?.canEdit || false,
        origin: tabConfig[tab.route]?.[0]?.origin
      };
    });

    return tab;
  };

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
          canEdit: matching.canEdit,
        })
      );
    }
  }, [location.pathname, dispatch, tabConfig]);

  const currentRoute = location.pathname.slice(1);

  const dynamicIndex = dynamicTabs.findIndex(
    (tab) => tab.route === currentRoute
  );

  const currentTabIndex = dynamicIndex !== -1 ? dynamicIndex + 2 : undefined;
  console.log(messagesData, 'Message data')

  return (
    <Box
      sx={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
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
