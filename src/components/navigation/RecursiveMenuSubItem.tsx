import { Box, Stack, Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import { ItemsServiceMenu, ContextMenuOption } from "../../config/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { usePopMenu } from "../../config/hooks/usePopMenu";

interface Props {
  item: ItemsServiceMenu;
  optionsActive?: boolean;
  onClick?: (item: ItemsServiceMenu) => void;
  buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
}

const RecursiveMenuSubItem = ({
  item,
  optionsActive,
  onClick,
  buildOptions,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openMenu } = usePopMenu();

  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 2,
        p: 1,
        backgroundColor: isActive
          ? (theme) => theme.palette.action.selected
          : "transparent",
        transition: "background-color 0.2s ease",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
      >
        <DescriptionOutlinedIcon
          sx={{ fontSize: 16, color: "text.disabled" }}
        />
        <Typography
          sx={{ fontSize: 12, color: "text.disabled" }}
          onClick={() => {
            if (onClick) onClick(item);
            else if (item.linkMenu) navigate(`/${item.linkMenu}`);
          }}
        >
          {item.name}
        </Typography>
      </Stack>

      {optionsActive && buildOptions && hovered && (
        <Box
          onClick={(e) => {
            e.stopPropagation();
            openMenu(e, buildOptions(item));
          }}
          sx={{ cursor: "pointer" }}
        >
          <MoreHorizOutlinedIcon
            sx={{ fontSize: 16, color: "text.disabled" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuSubItem;
