import {
  Box,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropsRecursiveMenuSubItem } from "../../config/interfaces";
import { useSortable } from "@dnd-kit/sortable";
import { usePopMenu } from "../../config/hooks/usePopMenu";

const RecursiveMenuSubItem = ({
  item,
  optionsActive,
  onClick,
  buildOptions,
  draggable,
}: PropsRecursiveMenuSubItem) => {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { openMenu } = usePopMenu();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: item.id });

  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;
  const options = buildOptions?.(item)

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={setNodeRef}
      {...attributes}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 2,
        p: 1,
        backgroundColor: isActive
          ? (theme) => theme.palette.action.selected
          : "transparent",
        transition: "background-color 0.2s ease, transform 0.2s ease",
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
    >
      <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            {draggable && (
              <Box {...listeners} sx={{  cursor: isDragging ? "grabbing" : "grab", }}>
                <DragIndicatorIcon
                  sx={{ fontSize: 12, color: "text.disabled" }}
                />
              </Box>
            )}
            <DescriptionOutlinedIcon
              sx={{ fontSize: 16, color: "text.disabled" }}
            />
            <Tooltip title={item.name} placement="top">
              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.disabled",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (onClick) onClick(item);
                  else if (item.linkMenu) navigate(`/${item.linkMenu}`);
                }}
              >
                {item.name}
              </Typography>
            </Tooltip>
          </Stack>
          {
          optionsActive && buildOptions?.(item)  && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                if (options && options.length) {
                  openMenu(e, buildOptions(item));
                }
              }}
              sx={{
                width: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <MoreHorizOutlinedIcon
                sx={{
                  fontSize: 16,
                  color: "text.disabled",
                  visibility: hovered ? "visible" : "hidden",
                }}
              />
            </Box>
          )}
    </Box>
  );
};

export default RecursiveMenuSubItem;
