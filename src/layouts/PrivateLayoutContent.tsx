import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/core/HeaderComponent";
import { Box } from "@mui/material";
import SideNavComponent, { drawerWidth } from "../components/navigation/SideNavComponent";

function PrivateLayoutContent() {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
        <SideNavComponent />
        <Box
            sx={{
            flex: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            }}
        >
            <Box sx={{ position: "sticky", top: 0, zIndex: 800 }}>
            <HeaderComponent alerts={9} />
            </Box>

            <Box sx={{ marginLeft: `${drawerWidth}px`, flexGrow: 1, p: 3 }}>
                <Outlet />
            </Box>
        </Box>
        </Box>
    );
}

export default PrivateLayoutContent;
