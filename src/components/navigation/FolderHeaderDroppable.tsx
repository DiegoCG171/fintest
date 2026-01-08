import {
  Box,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useState, useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";
import { usePopMenu } from "../../config/hooks/usePopMenu";
import { FolderHeaderDroppableProps } from "../../config/interfaces";

export default function FolderHeaderDroppable({
  item,
  depth,
  expanded,
  overId,
  optionsActive,
  onToggleExpand,
  buildOptions,
  buildSubItemOptions,
  renderEditNodeEditor,
}: FolderHeaderDroppableProps) {
  const { openMenu } = usePopMenu();
  const [hovered, setHovered] = useState(false);

  const { isOver, setNodeRef } = useDroppable({ id: item.id });

  const theme = useTheme();

  const backgroundColor = useMemo(() => {
    if (expanded) {
      return depth === 0
        ? theme.palette.secondary.light
        : theme.palette.background.default;
    }
    if (isOver || overId === item.id) return "rgba(0,150,255,0.18)";
    return "transparent";
  }, [
    expanded,
    isOver,
    overId,
    item.id,
    depth,
    theme.palette.secondary.light,
    theme.palette.background.default,
  ]);

  const border = useMemo(
    () =>
      isOver || overId === item.id
        ? "2px solid rgba(111, 125, 136, 0.45)"
        : "2px solid transparent",
    [isOver, overId, item.id]
  );

  return (
    <Box
      ref={setNodeRef}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor,
        borderRadius: 2,
        border,
        p: 1,
        m: 0.5,
        cursor: "pointer",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        "&:hover": { borderColor: (theme) => theme.palette.background.default },
      }}
      onClick={onToggleExpand}
    >
      {renderEditNodeEditor?.(item) ?? (
        <Stack
          direction="row"
          alignItems="center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{ width: "100%" }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}
          >
            <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
            <Tooltip title={item.name} placement="top">
              <Typography
                sx={{
                  fontSize: 12,
                  color: "text.disabled",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </Typography>
            </Tooltip>
          </Stack>

          {optionsActive && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                const options =
                  buildOptions?.(item) || buildSubItemOptions?.(item);
                if (options?.length) openMenu(e, options);
              }}
              sx={{
                width: 24,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                ml: 1,
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

          <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
            {expanded ? (
              <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
            ) : (
              <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 16 }} />
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
}
