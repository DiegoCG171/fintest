import { Outlet } from "react-router-dom";
import HeaderComponent from "../UI/HeaderComponent";
import { Box } from "@mui/material";
import SideNavComponent, { drawerWidth } from "../UI/SideNavComponent";
import { useState } from "react";
import FullScreenModal from "../core/FullScreenModal";

function PrivateLayoutContent() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalContainer = document.getElementById("modal-root");
    const openModal = () => setIsModalOpen(true);
    return (
        <>
        <Box sx={{ display: "flex", height: "100vh" }}>
            <SideNavComponent onOpenModal={openModal}/>
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
        <FullScreenModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        container={modalContainer}
        />
        </>
    );
}

export default PrivateLayoutContent;
