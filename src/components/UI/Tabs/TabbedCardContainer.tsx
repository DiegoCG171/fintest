import { Box, Card } from "@mui/material";
import TabTableComponent from "./TabTableComponent";
import {
  TabbedCardContainerProps,
} from "../../../config/interfaces";
import { useAppSelector } from "../../../store";

const TabbedCardContainer = ({
    tabs,
    eventTabs,
    initialTabIndex,
    }: TabbedCardContainerProps) => {
    
        const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed)
        const responsiveWidth = () => {
            if(hideMenu) return "calc(100vw - 100px)";
            return "calc(100vw - 300px)"
        }

    return (
        <Box
        sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            maxHeight: "calc(100% - 90px)"
        }}
        >
        {/* Card para Detalles y Errores */}
        <Card
            sx={{
            flex: 3,
            minHeight: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: responsiveWidth(),
            }}
        >
            <TabTableComponent
            tabs={tabs}
            initialTabIndex={initialTabIndex}
            />
        </Card>

        {/* Card para Eventos */}
        <Card
            sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: responsiveWidth(),
            }}
        >
            <TabTableComponent
            tabs={eventTabs}
            initialTabIndex={0}
            />
        </Card>
        </Box>
    );
};

export default TabbedCardContainer;
