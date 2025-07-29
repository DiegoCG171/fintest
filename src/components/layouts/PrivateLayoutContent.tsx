import { Outlet } from "react-router-dom";
import HeaderComponent from "../UI/HeaderComponent";
import { Box } from "@mui/material";
import SideNavComponent from "../UI/SidebarMenu/SideNavComponent";
import FullScreenModal from "../core/FullScreenModal";
import { PopMenuProvider } from "../../config/context/PopMenuProvider";
import { ModalConfirmSession } from "../UI/Runner/ModalConfirmSession";
import { ModalConfirmDelete } from "../UI/SidebarMenu/ModalConfirmDelete";

function PrivateLayoutContent() {
  const FOOTER_HEIGHT = 40;

  return (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <PopMenuProvider>
          <SideNavComponent />
        </PopMenuProvider>
        <Box
          sx={{
            flex: 1,
            height: `calc(100% - ${FOOTER_HEIGHT}px)`,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ position: "sticky", top: 0, zIndex: 800 }}>
            <HeaderComponent alerts={9} />
          </Box>

          <Box
            sx={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
      <FullScreenModal />
      <ModalConfirmSession />
      <ModalConfirmDelete />
    </>
  );
}

export default PrivateLayoutContent;
