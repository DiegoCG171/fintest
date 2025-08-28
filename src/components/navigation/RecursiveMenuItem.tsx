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
import { useNavigate, useParams } from "react-router-dom";
import { setLoading, useAppDispatch } from "../../store";
import RecursiveMenuSubItem from "./RecursiveMenuSubItem";
import { useEffect, useState } from "react";
import {
  getCollectionsThunk,
  updateCollectionThunk,
} from "../../store/slices/collections/collections.thunk";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
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
  draggable = false,
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

  const sensors = useSensors(useSensor(PointerSensor));
  const { method, type } = useParams();

  const [itemsOrder, setItemsOrder] = useState(
    item.items?.map((i) => i.id) || []
  );

  useEffect(() => {
    setItemsOrder(item.items?.map((i) => i.id) || []);
  }, [item]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = itemsOrder.indexOf(String(active.id));
      const newIndex = itemsOrder.indexOf(String(over.id));

      const newOrder = arrayMove(itemsOrder, oldIndex, newIndex);
      setItemsOrder(newOrder);
      await dispatch(
        updateCollectionThunk({ id: item.id, payload: { cases: newOrder } })
      );
      await dispatch(getCollectionsThunk(`${method}/${type}`));
    }
  };

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

  return (
    <Box
      sx={{
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
            : "transparent",
          borderRadius: 2,
          border: "2px solid transparent",
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
              />
            ))}
          </Box>
        )}
      {expanded && Array.isArray(item.items) && item.items?.length > 0 && (
        <Box sx={{ pl: 1, maxWidth: "250px", overflow: "hidden" }}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={itemsOrder}
              strategy={verticalListSortingStrategy}
            >
              {itemsOrder.map((id) => {
                const subItem = item.items?.find((i) => i.id === id);
                if (!subItem) return null;
                return (
                  <RecursiveMenuSubItem
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
          </DndContext>
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
