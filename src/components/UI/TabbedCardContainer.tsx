import { Box, Card } from "@mui/material";
import TabTableComponent from "../../components/table/TabTableComponent";
import { ReactNode } from "react";

interface TabbedCardContainerProps {
    tabs: { label: string; content: ReactNode }[];
    eventTabs: { label: string; content: ReactNode }[];
}

const TabbedCardContainer = ({ tabs, eventTabs }: TabbedCardContainerProps) => {
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
                }}
            >
                <TabTableComponent tabs={tabs} />
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
                <TabTableComponent tabs={eventTabs} />
            </Card>
        </Box>
    );
};

export default TabbedCardContainer;