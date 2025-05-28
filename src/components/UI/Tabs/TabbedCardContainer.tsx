import { Box, Card } from "@mui/material";
import TabTableComponent from "./TabTableComponent";
import {
  TabbedCardContainerProps,
} from "../../../config/interfaces";

const TabbedCardContainer = ({
    tabs,
    eventTabs,
    initialTabIndex,
    }: TabbedCardContainerProps) => {
    return (
        <Box
        sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
        }}
        >
        {/* Card para Detalles y Errores */}
        <Card
            sx={{
            flex: 2,
            minHeight: 0,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            maxWidth: "85dvw",
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
