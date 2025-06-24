import { Outlet } from "react-router-dom";
import FooterComponent from "../core/FooterComponent";
import { Box } from "@mui/material";

function MainLayoutComponent() {
    return (
        <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        

        <Box
            sx={{
            display: "flex",
            height: "100%",
            }}
        >
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Outlet />
            </Box>
        </Box>

        <Box
            sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            }}
        >
            <FooterComponent />
        </Box>
        </Box>
    );
}

export default MainLayoutComponent;
