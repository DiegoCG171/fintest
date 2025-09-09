import { Box, Stack, Tooltip, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
  RecursiveMenuItemProps,
} from "../../config/interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { useNavigate } from "react-router-dom";
import { setLoading, useAppDispatch } from "../../store";
import RecursiveMenuSubItem from "./RecursiveMenuSubItem";
import { useEffect, useState } from "react";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { usePopMenu } from "../../config/hooks/usePopMenu";

const RecursiveMenuItem = ({
  item,
  depth = 0,
  optionsActive,
  creatingChildId,
  onSelectItem,
  buildOptions,
  buildSubItemOptions,
  renderCreateChildEditor,
  renderEditNodeEditor,
  renderChildrenEditNodeEditor,
  draggable = false,
  overId,
}: RecursiveMenuItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { openMenu } = usePopMenu();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (creatingChildId === item.id) {
      setExpanded(true);
    }
  }, [creatingChildId, item.id]);

  const [itemsOrder, setItemsOrder] = useState(
    item.items?.map((i) => i.id) || []
  );

  useEffect(() => {
    setItemsOrder(item.items?.map((i) => i.id) || []);
  }, [item]);


  useEffect(() => {
    if (overId?.toString() === item.id && !expanded) {
      const timer = setTimeout(() => setExpanded(true), 500);
      return () => clearTimeout(timer);
    }
  }, [overId, item.id, expanded]);

  const onDecisionHandler = async (
    item: MenuServiceInterface | ItemsServiceMenu
  ) => {
    if (onSelectItem) {
      onSelectItem(item);
    }
    if (item.linkMenu) {
      dispatch(setLoading(true));
      await new Promise((resolve) => setTimeout(resolve, 300));
      dispatch(setLoading(false));
      navigate(`/${item.linkMenu}`);
      return;
    }
  };

  const { attributes, setNodeRef, transform, listeners } = useSortable({
      id: item.id,
      data: {
        name: item.name,
      },
    });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      sx={{
        transform,
        width: "100%",
        pl: depth * 0.25,
        my: 1,
        opacity: 0,
        animation: "fadeIn 0.3s ease-in forwards",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(0)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: expanded
            ? depth === 0
              ? (theme) => theme.palette.secondary.light
              : (theme) => theme.palette.background.default
            : overId === item.id
            ? "rgba(0,150,255,0.2)"
            : "transparent",
          borderRadius: 2,
          border:
            overId === item.id
              ? "2px solid rgba(111, 125, 136, 0.45)"
              : "2px solid transparent",
          padding: 1,
          margin: 0.5,
          cursor: "pointer",
          transition: "border-color 0.2s ease",
          "&:hover": {
            borderColor: (theme) => theme.palette.background.default,
          },
        }}
        onClick={() => {
          setExpanded(!expanded);
        }}
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
              sx={{
                flexGrow: 1,
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <FolderOutlinedIcon
                sx={{ fontSize: 16, color: "text.disabled" }}
              />
              <Tooltip
                title={item.name}
                placement="top"
              >
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
                  if (options && options.length) {
                    openMenu(e, options);
                  }
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
            {/* Flecha expand/collapse */}
            <Box
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {expanded ? (
                <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
              ) : (
                <KeyboardArrowRightOutlinedIcon sx={{ fontSize: 16 }} />
              )}
            </Box>
          </Stack>
        )}
      </Box>

      {expanded && creatingChildId === item.id && (
        <Box
          sx={{
            pl: (depth + 1) * 0.25,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 2,
            border: "2px solid transparent",
            padding: 1,
            margin: 0.5,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              flexGrow: 1,
              minWidth: 0,
              overflow: "hidden",
            }}
          >
            <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />

            {typeof renderCreateChildEditor === "function" &&
              renderCreateChildEditor(item)}
          </Stack>
        </Box>
      )}

      {/* Render hijos recursivamente */}
      {expanded &&
        Array.isArray(item.children) &&
        item.children?.length > 0 && (
          <Box>
                {item.children?.map((child) => (
                  <RecursiveMenuItem
                    overId={overId}
                    optionsActive={optionsActive}
                    key={child.id}
                    item={child}
                    depth={depth + 1}
                    onSelectItem={onDecisionHandler}
                    buildOptions={buildOptions}
                    buildSubItemOptions={buildSubItemOptions}
                    renderCreateChildEditor={renderCreateChildEditor}
                    renderEditNodeEditor={renderEditNodeEditor}
                    creatingChildId={creatingChildId}
                    draggable={draggable}
                  />
                ))}
          </Box>
        )}
      {expanded && Array.isArray(item.items) && item.items?.length > 0 && (
        <Box sx={{ pl: 1, maxWidth: "250px", overflow: "hidden" }}>
            <SortableContext
              items={item.items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {itemsOrder.map((id) => {
                const subItem = item.items?.find((i) => i.id === id);
                if (!subItem) return null;
                return (
                  <RecursiveMenuSubItem
                    renderEditNodeEditor={renderChildrenEditNodeEditor}
                    key={`box-${subItem.id}`}
                    item={subItem}
                    optionsActive={optionsActive}
                    onClick={onDecisionHandler}
                    buildOptions={buildSubItemOptions}
                    draggable={draggable}
                  />
                );
              })}
            </SortableContext>
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
