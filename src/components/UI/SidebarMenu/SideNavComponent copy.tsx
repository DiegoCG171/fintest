import { useState } from "react";
import { Box, InputAdornment, TextField, IconButton, Button } from "@mui/material";
import logo from "../../assets/logo.svg";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, SidebarProps } from "../../../config/interfaces";
import { staticMenuItems } from "../../../config/mock";

export const drawerWidth = 240;

function SideNavComponent({ onOpenModal }: SidebarProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  if (menuItems.length === 0) {
    setMenuItems(staticMenuItems);
  }

  return (
    <Box
      sx={{
        width: drawerWidth,
        position: "fixed",
        height: "100vh",
        backgroundColor: "#fff",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        zIndex: 1100,
        overflowY: "auto",
        padding: "8px",
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
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

        <Button variant="text" onClick={onOpenModal}>Crear Template</Button>

        <Button variant="text" onClick={onOpenModal}>Crear Template</Button>

    </Box>
  );
}

export default SideNavComponent;
