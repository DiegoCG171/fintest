import { useCallback, useEffect, useState } from "react";
import { Box, Drawer } from "@mui/material";
import { MenuItem } from "../../../config/interfaces";
import { staticMenuItems } from "../../../config/mock";
import HeaderSidebarMenu from "./HeaderSidebarMenu";
import SidebarBlock from "./SidebarBlock";
import MediaPlayer from "../MediaPlayer";
import { getAllCategoriesThunk, useAppDispatch, useAppSelector } from "../../../store";

export const drawerWidth = 240;

function SideNavComponent() {
  const dispatch = useAppDispatch();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [hideMenu, setHideMenu] = useState(false);
  const categories = useAppSelector(state => state.categories);

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      await dispatch(getAllCategoriesThunk()).unwrap(); 
    } catch (err) {
      console.error("Error cargando categorías:", err);
    }
  };

  if (!categories.categories) {
    if(categories.status !== 'success') {
      fetchCategories();
    } else console.error('No hay categorías disponibles')
  }

}, [dispatch, categories]);


  const toggleMenu = useCallback(() => {
    setHideMenu((prev) => !prev);
  }, []);

  if (menuItems.length === 0) {
    setMenuItems(staticMenuItems);
  }

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
