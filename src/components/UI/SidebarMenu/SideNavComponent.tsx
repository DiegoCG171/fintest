import { useCallback, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import HeaderSidebarMenu from "./HeaderSidebarMenu";
import SidebarBlock from "./SidebarBlock";
import MediaPlayer from "../MediaPlayer";
import {
  getCategoriesByMethodThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import {
  addLinkMenu,
  getLinksArray,
  transformCollectionsToMenu,
} from "../../../config/utils";
import { getCollectionsThunk } from "../../../store/slices/collections/collections.thunk";
import {
  setCategoriesRoutesThunk,
  setCollectionsRoutesThunk,
} from "../../../store/slices/routes/validRoutes.thunk";
import SearchBar from "./SearchBar";
import { RunnerSideBar } from "../Runner/RunnerSideBar";
import { useLocation, useParams } from "react-router-dom";
import { SidebarSettingsMenu } from "./SidebarSettingsMenu";
import { setCollapsedState, setRecursiveMenuData } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const collections = useAppSelector((state) => state.collections);
  const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed);
  const [searchOnItem, setSearchOnItem] = useState(false);
  const params = useParams();
  const location = useLocation()
  const { method, type } = params;
  const isSettings = location.pathname.startsWith('/settings');

  useEffect(() => {
    if (categories.status === "idle" && !isSettings) {
      dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, categories.status, method, type, location, isSettings]);

  useEffect(() => {
    if (collections.status === "idle" && !isSettings) {
      dispatch(getCollectionsThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, collections.status, method, type, location, isSettings]);

  useEffect(() => {
    if (categories.status === "success" && categories.categories && !isSettings) {
      const menuCategories = addLinkMenu(
        categories.categories,
        `${method}/${type}/categories`
      );

      dispatch(setRecursiveMenuData({type: "category", items: menuCategories}));
      dispatch(setCategoriesRoutesThunk(getLinksArray(menuCategories)));
    }
  }, [dispatch, categories.status, categories.categories, method, type, location, isSettings]);

  useEffect(() => {
    if (collections.status === "success" && collections.collections && !isSettings) {
      const transformCollections = transformCollectionsToMenu(
        collections.collections,
        `${method}/${type}/collections`
      );

      dispatch(setRecursiveMenuData({type: "collection", items: transformCollections}));
      dispatch(setCollectionsRoutesThunk(getLinksArray(transformCollections)));
    }
  }, [dispatch, collections, method, type, location, isSettings]);

  const toggleMenu = useCallback(() => {
    dispatch(setCollapsedState());
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
        {(!hideMenu && !isSettings) &&  (
          <Box sx={{ px: 2, overflowY: "auto", flexGrow: 1, my: 4 }}>
            <SearchBar onSearch={handleSearch}></SearchBar>
            <SidebarBlock
              searchTerm={searchTerm}
              searchOnItem={searchOnItem}
            />
            <Box>
              <MediaPlayer></MediaPlayer>
            </Box>
          </Box>
        )}
        {
          (!hideMenu && isSettings) && (
            <SidebarSettingsMenu />
          )
        }
      </Drawer>
      <RunnerSideBar />
    </Box>
  );
}

export default SideNavComponent;
