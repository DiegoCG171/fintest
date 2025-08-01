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
import { useEffect, useState } from "react";
import { usePopMenu } from "../../config/hooks/usePopMenu";
import {
  removeUpdateCollection,
  removeUpdateTestCase,
} from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { updateCollectionThunk } from "../../store/slices/collections/collections.thunk";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRefreshCollectionsMenu } from "../../config/hooks/useRefreshCollectionsMenu";

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
}: RecursiveMenuItemProps) => {
  const refreshCollectionsMenu = useRefreshCollectionsMenu();

  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(item.name);
  const { openMenu } = usePopMenu();
  const { updateCollection } = useAppSelector((state) => state.sidebarMenu);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (creatingChildId === item.id) {
      setExpanded(true);
    }
  }, [creatingChildId, item.id]);

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
        setIsLoading(true);
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
        setIsLoading(false);
        console.error("Error actualizando colección:", error);
      } finally {
        setIsLoading(false);
      }
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
              disabled={isLoading}
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
                      disabled={isLoading}
                      onClick={() => {
                        if (isEditing) {
                          dispatch(removeUpdateCollection());
                          setValue(item.name);
                        }
                      }}
                    >
                      {isLoading ? (
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
          renderEditNodeEditor?.(item) ?? (
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
          )
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

      {/* Render ítems */}
      {expanded && Array.isArray(item.items) && item.items?.length > 0 && (
        <Box sx={{ pl: 1 }}>
          {item.items?.map((subItem, index) => (
            <RecursiveMenuSubItem
              key={`box-${index}-${subItem.id}`}
              item={subItem}
              optionsActive={optionsActive}
              onClick={onDecisionHandler}
              buildOptions={buildSubItemOptions}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RecursiveMenuItem;
