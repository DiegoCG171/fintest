import { Box, Stack, Typography } from "@mui/material";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
  RecursiveMenuItemProps,
} from "../../config/interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecursiveMenuItem = ({
  item,
  depth = 0,
  onSelectItem,
}: RecursiveMenuItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (link?: string) => {
    return link && location.pathname === `/${link}`;
  };

  const onDecisionHandler = (item: MenuServiceInterface | ItemsServiceMenu) => {
    if (item.linkMenu) {
      navigate(`/${item.linkMenu}`);
    }
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  return (
    <Box sx={{ width: "100%", pl: depth * 0.25, my: 0.5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: expanded
            ? depth === 0
              ? (theme) => theme.palette.secondary.light
              : (theme) => theme.palette.background.default
            : "transparent",
          borderRadius: 2,
          border: "1px solid transparent",
          padding: 1,
          margin: 0.5,
          cursor: "pointer",
          transition: "border 0.2s ease",
          "&:hover": {
            border: 2,
            borderColor: (theme) => theme.palette.background.default,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
          <Typography sx={{ fontSize: 12, color: "text.disabled" }}>
            {item.name}
          </Typography>
        </Stack>

        {expanded ? (
          <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
        ) : (
          <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 16 }} />
        )}
      </Box>

      {/* Render hijos recursivamente */}
      {expanded &&
        Array.isArray(item.children) &&
        item.children?.length > 0 && (
          <Box>
            {item.children?.map((child) => (
              <RecursiveMenuItem
                key={child.id}
                item={child}
                depth={depth + 1}
                onSelectItem={onDecisionHandler}
              />
            ))}
          </Box>
        )}

      {/* Render ítems */}
      {expanded && Array.isArray(item.items) && item.items?.length > 0 && (
        <Box
          sx={{
            pl: 1,
          }}
        >
          {item.items?.map((subItem, index) => (
            <Box
              key={`box-${index}-${subItem.id}`}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                borderRadius: 2,
                p: 1,
                backgroundColor: isActive(subItem.linkMenu)
                  ? (theme) => theme.palette.action.selected
                  : "transparent",
                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
              onClick={() => onDecisionHandler?.(subItem)}
            >
              <Stack
                key={subItem.id}
                direction="row"
                spacing={1}
                alignItems="center"
              >
                <DescriptionOutlinedIcon
                  sx={{ fontSize: 16, color: "text.disabled" }}
                />
                <Typography sx={{ fontSize: 12, color: "text.disabled" }}>
                  {subItem.name}
                </Typography>
              </Stack>
              <MoreHorizOutlinedIcon
                sx={{ fontSize: 16, color: "text.disabled" }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
