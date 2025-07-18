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
import { useParams } from "react-router-dom";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories);
  const collections = useAppSelector((state) => state.collections);
  const hideMenu = useAppSelector((state) => state.sidebarMenu.isCollapsed);
  const [searchOnItem, setSearchOnItem] = useState(false);
  const params = useParams();
  const { method, type } = params;

  useEffect(() => {
  if (categories.status === "idle") {
    dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
      .unwrap()
      .catch((err) => console.error("Error cargando categorías:", err));
  }
}, [dispatch, categories.status, method, type]);


  useEffect(() => {
    if (collections.status === "idle") {
      dispatch(getCollectionsThunk(`${method}/${type}`))
        .unwrap()
        .catch((err) => console.error("Error cargando categorías:", err));
    }
  }, [dispatch, collections.status, method, type]);

  useEffect(() => {
    if (categories.status === "success" && categories.categories) {
      const menuCategories = addLinkMenu(
        categories.categories,
        `${method}/${type}/categories`
      );

      dispatch(setCategoriesData(menuCategories));
      dispatch(setCategoriesRoutesThunk(getLinksArray(menuCategories)));
    }
  }, [dispatch, categories.status, categories.categories, method, type]);

  useEffect(() => {
    if (collections.status === "success" && collections.collections) {
      const transformCollections = transformCollectionsToMenu(
        collections.collections,
        `${method}/${type}/collections`
      );

      dispatch(setCollectionsData(transformCollections));
      dispatch(setCollectionsRoutesThunk(getLinksArray(transformCollections)));
    }
  }, [dispatch, collections, method, type]);

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
        {!hideMenu && (
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
      </Drawer>
      <RunnerSideBar />
    </Box>
  );
}

export default SideNavComponent;
