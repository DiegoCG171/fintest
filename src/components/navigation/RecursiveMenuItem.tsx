import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ItemsServiceMenu,
  MenuServiceInterface,
  RecursiveMenuItemProps,
} from "../../config/interfaces";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useNavigate } from "react-router-dom";
import {
  setLoading,
  updateTestCaseThunk,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import RecursiveMenuSubItem from "./RecursiveMenuSubItem";
import { useState } from "react";
import { usePopMenu } from "../../config/hooks/usePopMenu";
import {
  removeUpdateCollection,
  removeUpdateTestCase,
} from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { updateCollectionThunk } from "../../store/slices/collections/collections.thunk";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRefreshCollectionsMenu } from "../../config/hooks/useRefreshCollectionsMenu";

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
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

const RecursiveMenuItem = ({
  item,
  depth = 0,
  optionsActive,
  onSelectItem,
  buildOptions,
  buildSubItemOptions,
  draggable = false
}: RecursiveMenuItemProps) => {
  const refreshCollectionsMenu = useRefreshCollectionsMenu();

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(item.name);
  const { openMenu } = usePopMenu();
  const { loading, updateCollection } = useAppSelector(
    (state) => state.sidebarMenu
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const [itemsOrder, setItemsOrder] = useState(
    item.items?.map((i) => i.id) || []
  );

  const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    const oldIndex = itemsOrder.indexOf(String(active.id));
    const newIndex = itemsOrder.indexOf(String(over.id));

    const newOrder = arrayMove(itemsOrder, oldIndex, newIndex);
    setItemsOrder(newOrder);
  }
};


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

  const isEditing = updateCollection?.id === item.id;

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isCollection = Array.isArray(item.items);

    if (e.key === "Enter" && isEditing) {
      try {
        if (isCollection) {
          await dispatch(
            updateCollectionThunk({ id: item.id, payload: { name: value } })
          ).unwrap();
          dispatch(removeUpdateCollection());
        } else {
          await dispatch(
            updateTestCaseThunk({ id: item.id, payload: { name: value } })
          ).unwrap();
          dispatch(removeUpdateTestCase());
        }

        await refreshCollectionsMenu();
        dispatch(removeUpdateCollection());
      } catch (error) {
        console.error("Error actualizando colección:", error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%", pl: depth * 0.25, my: 1 }}>
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
          if (!updateCollection) {
            setExpanded(!expanded);
          }
        }}
      >
        {updateCollection && updateCollection.id === item.id ? (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <TextField
              variant="standard"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "12px",
                  color: "text.disabled",
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      size="small"
                      disabled={loading}
                      onClick={() => {
                        if (isEditing) {
                          dispatch(removeUpdateCollection());
                          setValue(item.name);
                        }
                      }}
                    >
                      {loading ? (
                        <CircularProgress size="10px" />
                      ) : (
                        <CancelIcon
                          sx={{
                            fontSize: 12,
                            color: "text.disabled",
                            cursor: "pointer",
                            "&:hover": {
                              color: "text.primary",
                            },
                          }}
                        />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
          </Stack>
        ) : (
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
                  if (options) openMenu(e, options);
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
              />
            ))}
          </Box>
        )}
      {expanded && Array.isArray(item.items) && item.items?.length > 0 && (
        <Box sx={{ pl: 1, maxWidth: '250px', overflow: 'hidden' }}>
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
