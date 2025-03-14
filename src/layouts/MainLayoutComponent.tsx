import FooterComponent from "../components/core/FooterComponent";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

function MainLayoutComponent() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box component="main" sx={{ flex: 1, minHeight: '100%'}}>
            <Outlet />
        </Box>
        <FooterComponent />
        </Box>
    );
}

export default MainLayoutComponent;
