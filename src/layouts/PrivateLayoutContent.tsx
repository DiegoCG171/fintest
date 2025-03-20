import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/core/HeaderComponent";
import { Box } from "@mui/material";
import SideNavComponent from "../components/navigation/SideNavComponent";

function PrivateLayoutContent() {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
        <SideNavComponent />
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
            <HeaderComponent alerts={9} />
            </Box>

            <Box sx={{ flex: 1, p: 4 }}>
            <Outlet />
            </Box>
        </Box>
        </Box>
    );
}

export default PrivateLayoutContent;
