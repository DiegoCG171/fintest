import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePopMenu } from "../../config/hooks/usePopMenu";
import {
  updateTestCaseThunk,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import {
  removeUpdateCollection,
  removeUpdateTestCase,
} from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { PropsRecursiveMenuSubItem } from "../../config/interfaces";
import { updateCollectionThunk } from "../../store/slices/collections/collections.thunk";
import { useRefreshCollectionsMenu } from "../../config/hooks/useRefreshCollectionsMenu";
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const RecursiveMenuSubItem = ({
  item,
  optionsActive,
  onClick,
  buildOptions,
  draggable,
}: PropsRecursiveMenuSubItem) => {
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(item.name);
  const location = useLocation();
  const navigate = useNavigate();
  const { openMenu } = usePopMenu();
  const { updateTestCase, loading, idTestCase } = useAppSelector(
    (state) => state.sidebarMenu
  );

  const refreshCollectionsMenu = useRefreshCollectionsMenu();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({ id: item.id });

  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;
  const dispatch = useAppDispatch();
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const payload = { name: value };

        const isTestCase = updateTestCase && updateTestCase.id === item.id;

        if (isTestCase) {
          await dispatch(
            updateTestCaseThunk({ id: item.id, payload })
          ).unwrap();
          dispatch(removeUpdateTestCase());
        } else {
          await dispatch(
            updateCollectionThunk({ id: item.id, payload })
          ).unwrap();
          dispatch(removeUpdateCollection());
        }

        await refreshCollectionsMenu();
      } catch (error) {
        console.error("Error actualizando ítem:", error);
      }
    }
  };

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
      {updateTestCase && updateTestCase.id === item.id ? (
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
                      const isTestCase =
                        updateTestCase && updateTestCase.id === item.id;
                      if (isTestCase) {
                        dispatch(removeUpdateTestCase());
                      } else {
                        dispatch(removeUpdateCollection());
                      }
                      setValue(item.name);
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
        <>
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
              <Box {...listeners} sx={{ cursor: "grab" }}>
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
            {loading && idTestCase === item.id && (
              <CircularProgress size="10px" />
            )}
          </Stack>
          {optionsActive && buildOptions && !loading && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                openMenu(e, buildOptions(item));
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
        </>
      )}
    </Box>
  );
};

export default RecursiveMenuSubItem;
