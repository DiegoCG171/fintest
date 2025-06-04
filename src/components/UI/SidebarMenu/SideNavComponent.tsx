import { useCallback, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import HeaderSidebarMenu from "./HeaderSidebarMenu";
import SidebarBlock from "./SidebarBlock";
import MediaPlayer from "../MediaPlayer";
import {
  getAllCategoriesThunk,
  setCategoriesRoutes,
  setCollectionsRoutes,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { addLinkMenu, getLinksArray } from "../../../config/utils";
import { setCategoriesData, setCollectionsData } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { staticMenuItems } from "../../../config/mock";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const [hideMenu, setHideMenu] = useState(false);
  const categories = useAppSelector((state) => state.categories);

  useEffect(() => {
    if (categories.status !== "success" && categories.status !== "loading") {
      dispatch(getAllCategoriesThunk())
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, categories.status]);

  useEffect(() => {
    if (categories.status === "success" && categories.categories) {
      const menuCategories = addLinkMenu(categories.categories);
      dispatch(setCategoriesData(menuCategories));
      dispatch(setCollectionsData(staticMenuItems))

      //TODO: pasar a useEffect de su propio servicio
      dispatch(setCategoriesRoutes(getLinksArray(menuCategories)))
      dispatch(setCollectionsRoutes(getLinksArray(staticMenuItems)))
    }
  }, [dispatch, categories.status, categories.categories]);

  const toggleMenu = useCallback(() => {
    setHideMenu((prev) => !prev);
  }, []);

  

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open={!hideMenu}
        sx={{
          width: !hideMenu ? 240 : 54,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: !hideMenu ? 240 : 54,
            border: 0,
            display: "flex",
            height: "calc(100vh - 40px)",
          },
        }}
      >
        <HeaderSidebarMenu
          onToggleMenu={toggleMenu}
          isHide={hideMenu}
        />
        {!hideMenu && (
          <Box sx={{ px: 2, overflowY: "auto", flexGrow: 1, my: 4 }}>
            {/* Menú desplegable */}
            <SidebarBlock />
            <Box>
              <MediaPlayer></MediaPlayer>
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

export default SideNavComponent;
