import { Box } from "@mui/material";
import BasicTable from "../../components/UI/table/BasicTableComponent";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
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
        typeTable="detail"
        customRenderers={{ estado: StatusRender }}
      />
    ),
    canEdit: true,
    route: `${messagesData.route}/detalles`,
  },
  {
    label: "Errores",
    content: (
      <BasicTable
        initialRows={messagesData.activeMessage.errors}
        typeTable="errors"
        customRenderers={{ estado: StatusRender }}
      />
    ),
    canEdit: true,
    route: `${messagesData.route}/errores`,
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
  const { method, type, categoryId, caseId } = useParams();
  const rawMessagesData = useAppSelector((state) => state.messagesReducer);
  const messagesData = {
    ...rawMessagesData,
    route: `${method}/${type}`
  }

  const currentRoute = categoryId
  ? `${method}/${type}/categories/${categoryId}`
  : `${method}/${type}/collections/${caseId}`;

  const dynamicTabs = useAppSelector((state) => state.tabs.dynamicTabs);
  const dynamicIndex = dynamicTabs.findIndex((tab) => tab.route === currentRoute);
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
        origin: tabConfig[tab.route]?.[0]?.origin,
      };
    });

    return tab;
  };

  useEffect(() => {
    connect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (!method || !type || (!categoryId && !caseId)) return;
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
  }, [caseId, categoryId, currentRoute, dispatch, method, tabConfig, type]);

  const currentTabIndex = dynamicIndex !== -1 ? dynamicIndex + 2 : undefined;

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
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
