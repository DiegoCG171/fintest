import { Box, Card } from "@mui/material";
import BasicTable from "../../components/table/BasicTableComponent";
import TabTableComponent from "../../components/table/TabTableComponent";
import { TableRowData } from "../../config/interfaces/type.interface";
import TitleHeaderComponent from "../../components/core/TitleHeaderComponent";

const initialRows: TableRowData[] = [];
const initialEventRows: TableRowData[] = [];

const tabsData = [
    { label: "Detalle", content: <BasicTable initialRows={initialRows}></BasicTable> },
    { label: "Error", content: <BasicTable initialRows={initialRows}></BasicTable> },
];

const tabsDataEvents = [
    { label: "Eventos", content: <BasicTable initialRows={initialEventRows}></BasicTable> }
];

function MainPage() {
    return (
        <Box
            sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            overflow: "hidden",
            }}
        >
            <TitleHeaderComponent/>
    
            <Box
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                overflow: "hidden",
            }}
            >
            <Card
                sx={{
                flex: 2,
                minHeight: 0,
                overflow: "auto", 
                display: "flex",
                flexDirection: "column",
                }}
            >
                <TabTableComponent tabs={tabsData} />
            </Card>
    
            <Card
                sx={{
                flex: 1,
                minHeight: 0,
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                }}
            >
                <TabTableComponent tabs={tabsDataEvents} />
            </Card>
            </Box>
        </Box>
        );
    }


export default MainPage;
