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
import {
  addLinkMenu,
  getLinksArray,
  transformCollectionsToMenu,
} from "../../../config/utils";
import {
  setCategoriesData,
  setCollapsedState,
  setCollectionsData,
} from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";
import {
  setCategoriesRoutesThunk,
  setCollectionsRoutesThunk,
} from "../../../store/slices/routes/validRoutes.thunk";
import SearchBar from "./SearchBar";
import { RunnerSideBar } from "../Runner/RunnerSideBar";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const collections = useAppSelector((state) => state.collections);
  const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed);
  const [searchOnItem, setSearchOnItem] = useState(false);

  useEffect(() => {
    if (categories.status !== "success" && categories.status !== "loading") {
      dispatch(getAllCategoriesThunk())
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, categories.status]);

  useEffect(() => {
    if (collections.status !== "success" && collections.status !== "loading") {
      dispatch(getCollectionsThunk())
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, collections.status]);

  useEffect(() => {
    if (categories.status === "success" && categories.categories) {
      const menuCategories = addLinkMenu(categories.categories, ["categories"]);
      dispatch(setCategoriesData(menuCategories));
      dispatch(setCategoriesRoutesThunk(getLinksArray(menuCategories)));
    }
  }, [dispatch, categories.status, categories.categories]);

  useEffect(() => {
    if (collections.status === "success" && collections.collections) {
      const menuCollections = transformCollectionsToMenu(
        collections.collections
      );
      dispatch(setCollectionsData(menuCollections));
      dispatch(setCollectionsRoutesThunk(getLinksArray(menuCollections)));
    }
  }, [dispatch, collections]);

  const toggleMenu = useCallback(() => {
    dispatch(setCollapsedState())
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = useCallback((value: string, isFolderSearch: boolean) => {
    setSearchTerm(value);
    setSearchOnItem(isFolderSearch);
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
            <SidebarBlock searchTerm={searchTerm} searchOnItem={searchOnItem} />
            <Box>
              <MediaPlayer></MediaPlayer>
            </Box>
          </Box>
        )}
      </Drawer>
      <RunnerSideBar />
    </Box>
  );
}

export default SideNavComponent;
