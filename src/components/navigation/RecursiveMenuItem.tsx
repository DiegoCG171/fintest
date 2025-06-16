import { Box, Stack, Typography } from "@mui/material";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
  RecursiveMenuItemProps,
} from "../../config/interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useNavigate } from "react-router-dom";
import { setLoading, useAppDispatch } from "../../store";
import RecursiveMenuSubItem from "./RecursiveMenuSubItem";
import { useState } from "react";

const RecursiveMenuItem = ({
  item,
  depth = 0,
  optionsActive,
  onSelectItem,
  buildOptions,
}: RecursiveMenuItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDecisionHandler = async (
    item: MenuServiceInterface | ItemsServiceMenu
  ) => {
    if (item.linkMenu) {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(setLoading(false));
      navigate(`/${item.linkMenu}`);
      return;
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
                optionsActive={optionsActive}
                key={child.id}
                item={child}
                depth={depth + 1}
                onSelectItem={onDecisionHandler}
                buildOptions={buildOptions}
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
            <RecursiveMenuSubItem
                    key={`box-${index}-${subItem.id}`}
                    item={subItem}
                    optionsActive={optionsActive}
                    onClick={onDecisionHandler}
                    buildOptions={buildOptions}
                  />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
