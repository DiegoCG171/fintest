import { useCallback, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import HeaderSidebarMenu from "./HeaderSidebarMenu";
import SidebarBlock from "./SidebarBlock";
import MediaPlayer from "../MediaPlayer";
import {
  getAllCategoriesThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { addLinkMenu, getLinksArray } from "../../../config/utils";
import { setCategoriesData, setCollapsedState } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";
import { MenuServiceInterface } from "../../../config/interfaces";
import { setCategoriesRoutesThunk, setCollectionsRoutesThunk } from "../../../store/slices/routes/validRoutes.thunk";
import SearchBar from "./SearchBar";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const {collectionsMenu} = useAppSelector((state) => state.sidebarMenu);
  const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed);

  useEffect(() => {
    if (categories.status !== "success" && categories.status !== "loading") {
      dispatch(getAllCategoriesThunk())
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, categories.status]);

  useEffect(() => {
    if (categories.status === "success" && categories.categories) {
      const menuCategories = addLinkMenu(categories.categories, ['categories']);
      dispatch(setCategoriesData(menuCategories));
      dispatch(getCollectionsThunk())
      dispatch(setCategoriesRoutesThunk(getLinksArray(menuCategories)))
    }
  }, [dispatch, categories.status, categories.categories]);

  useEffect(() => {
    dispatch(setCollectionsRoutesThunk(getLinksArray(collectionsMenu as MenuServiceInterface[])))
  }, [ dispatch, collectionsMenu]);  


  const toggleMenu = useCallback(() => {
    //setHideMenu((prev) => !prev);
    dispatch(setCollapsedState())
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
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
            <SearchBar onSearch={handleSearch}></SearchBar>
            {/* Menú desplegable */}
            <SidebarBlock searchTerm={searchTerm} />
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
