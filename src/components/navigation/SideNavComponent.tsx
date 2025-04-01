import { useContext, useState } from "react";
import {
  Box,
  Drawer,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import logo from "../../assets/logo.svg";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { TemplateContext } from "../../context/TemplateContext";
import MenuToggle from "./MenuToggle";

const drawerWidth = 240;

function SideNavComponent() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const context = useContext(TemplateContext);

  if (!context) {
    console.error("El contexto de Template no está disponible.");
    return null;
  }

  const { template, getTemplates } = context;
  if (!template) {
    getTemplates();
  }

  if (template && menuItems.length === 0) {
    setMenuItems([
      {
        title: "Catálogo",
        icon: <CreateNewFolderOutlinedIcon />,
        subItems: [
          {
            name: "Ecommerce",
            icon: <FolderOutlinedIcon />,
            expanded: true,
            subItems: [
                {
                  title: "Venta",
                  icon: <DescriptionOutlinedIcon />,
                  onClick: () => console.log("Venta desde ecommerce"),
                },
              ],
          },
          {
            name: "Moto",
            icon: <FolderOutlinedIcon />,
            expanded: true,
            subItems: [
              {
                title: "Venta",
                icon: <DescriptionOutlinedIcon />,
                onClick: () => console.log("Venta desde moto"),
              },
            ],
          },
        ],
      },
      {
        title: "Colecciones",
        icon: <CreateNewFolderOutlinedIcon />,
        subItems: [
          {
            name: "Ecommerce",
            icon: <FolderOutlinedIcon />,
            expanded: true,
            subItems: [
              {
                title: "Venta",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/ventas", 
              },
              {
                title: "Reverso",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/reverso",
              },
              {
                title: "Cancelación",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/cancelacion",
              },
              {
                title: "Venta con #DS",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/ventas-ds",
              },
              {
                title: "Venta Visa",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/ventas-visa",
              },
              {
                title: "Centa con 3DS mastercard",
                icon: <ArrowRightAltOutlinedIcon />,
                link: "ecommerce/ventas-mastercard",
              },
            ],
          },
          {
            name: "Moto",
            icon: <FolderOutlinedIcon />,
            expanded: true,
            subItems: [
                {
                    title: "Venta",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/ventas", 
                  },
                  {
                    title: "Reverso",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/reverso",
                  },
                  {
                    title: "Cancelación",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/cancelacion",
                  },
                  {
                    title: "Venta con #DS",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/ventas-ds",
                  },
                  {
                    title: "Venta Visa",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/ventas-visa",
                  },
                  {
                    title: "Centa con 3DS mastercard",
                    icon: <ArrowRightAltOutlinedIcon />,
                    link: "moto/ventas-mastercard",
                  },
              ],
          },
        ],
      },
    ]);
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          boxShadow: "none",
          borderRight: "none",
          height: "100vh",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header del menú lateral */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1,
        }}
      >
        <img
          src={logo}
          alt="Fintest"
          style={{ height: "32px", marginBottom: "10px" }}
        />
        <IconButton
          size="small"
          sx={{ padding: 0 }}
        >
          <MenuOpenOutlinedIcon />
        </IconButton>
      </Box>

      {/* Caja de búsqueda */}
      <Box sx={{ px: 2, pb: 2 }}>
        <TextField
          id="search"
          size="small"
          fullWidth
          placeholder="Buscar..."
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              height: "36px",
              backgroundColor: "#f1f3f4",
            },
          }}
        />
      </Box>

      {/* Menú desplegable */}
      <Box sx={{ px: 1, overflowY: "auto", flexGrow: 1 }}>
        {menuItems.map((menu, index) => (
          <MenuToggle
            key={`${index}-menu-toggle`}
            index={index}
            title={menu.title}
            icon={menu.icon}
            items={menu.subItems}
          />
        ))}
      </Box>
    </Drawer>
  );
}

export default SideNavComponent;
