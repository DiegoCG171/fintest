import { useState } from "react";
import { Box, Collapse, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { RecursiveMenuItemProps } from "../../config/interfaces";


const RecursiveMenuItem = ({ item, depth = 0 }: RecursiveMenuItemProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const hasChildren = item.subItems && item.subItems.length > 0;
  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (item.onClickMenu) item.onClickMenu();
    if (item.linkMenu) navigate(`/${item.linkMenu}`);
    if (hasChildren) setOpen(!open);
  };

  return (
    <Box sx={{ width: "100%", pl: depth * 0.75, my: 0.5 }}>
      <Box
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 2,
          p: "4px 8px",
          cursor: "pointer",
          backgroundColor: isActive ? "primary.light" : "transparent",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
        }}
      >
        {/* Icono izquierdo y texto */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            sx={{ p: 0 }}
          >
            {item.iconMenu}
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.875rem",
              color: isActive ? "primary.main" : "inherit",
            }}
          >
            {item.title}
          </Typography>
        </Box>

        {/* Icono de colapso (solo si tiene hijos) */}
        {hasChildren && (
          <IconButton
            size="small"
            sx={{ p: 0 }}
          >
            {open ? (
              <KeyboardArrowDownRoundedIcon fontSize="small" />
            ) : (
              <KeyboardArrowRightRoundedIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>

      {/* Submenús colapsables */}
      {hasChildren && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
        >
          {item.subItems!.map((subItem, index) => (
            <RecursiveMenuItem
              key={index}
              item={subItem}
              depth={depth + 1}
            />
          ))}
        </Collapse>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
