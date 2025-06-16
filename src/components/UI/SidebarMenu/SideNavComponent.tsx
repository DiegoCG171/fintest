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
import { setCategoriesData } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";
import { MenuServiceInterface } from "../../../config/interfaces";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const [hideMenu, setHideMenu] = useState(false);
  const categories = useAppSelector((state) => state.categories);
  const {collectionsMenu} = useAppSelector((state) => state.sidebarMenu);

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
      dispatch(getCollectionsThunk())

      //TODO: pasar a useEffect de su propio servicio
      dispatch(setCategoriesRoutes(getLinksArray(menuCategories)))
    }
  }, [dispatch, categories.status, categories.categories]);

  useEffect(() => {
    dispatch(setCollectionsRoutes(getLinksArray(collectionsMenu as MenuServiceInterface[])))
  }, [ dispatch, collectionsMenu]);  

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
