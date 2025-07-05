import { Box, Card } from "@mui/material";
import TabTableComponent from "./TabTableComponent";
import { TabbedCardContainerProps } from "../../../config/interfaces";
import { useAppSelector } from "../../../store";

const TabbedCardContainer = ({
    tabs,
    eventTabs,
    initialTabIndex,
}: TabbedCardContainerProps) => {
    const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed);
    const responsiveWidth = () => {
        if (hideMenu) return "calc(100vw - 100px)";
        return "calc(100vw - 300px)";
    };

    return (
        <Box
        sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            overflow: "hidden",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            my:2
        }}
        >
        {/* Card para Detalles y Errores */}
        <Card
            sx={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            minWidth: responsiveWidth(),
            maxWidth: responsiveWidth(),
            overflow: "hidden",
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
            flex: 3,
            display: "flex",
            flexDirection: "column",
            minWidth: responsiveWidth(),
            maxWidth: responsiveWidth(),
            overflow: "hidden",
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
