import { Outlet } from "react-router-dom";
import HeaderComponent from "../UI/HeaderComponent";
import { Box } from "@mui/material";
import SideNavComponent from "../UI/SidebarMenu/SideNavComponent";
import FullScreenModal from "../core/FullScreenModal";
import { PopMenuProvider } from "../../config/context/PopMenuProvider";

function PrivateLayoutContent() {

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <PopMenuProvider>
          <SideNavComponent />
        </PopMenuProvider>
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

          <Box sx={{ flexGrow: 1, p: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      <FullScreenModal
      />
    </>
  );
}

export default PrivateLayoutContent;
