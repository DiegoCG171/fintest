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
import { useAppDispatch, useAppSelector } from "../../store";
import { removeUpdateTestCase } from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { updateTestCaseThunk } from "../../store/slices/testCases/testCases.thunk";
import { PropsRecursiveMenuSubItem } from "../../config/interfaces";



const RecursiveMenuSubItem = ({
  item,
  optionsActive,
  onClick,
  buildOptions,
}: PropsRecursiveMenuSubItem) => {
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(item.name);
  const location = useLocation();
  const navigate = useNavigate();
  const { openMenu } = usePopMenu();
  const { updateTestCase, loading, idTestCase } = useAppSelector(
    (state) => state.sidebarMenu
  );

  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;
  const dispatch = useAppDispatch()
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(updateTestCaseThunk({ id: item.id, payload: { name: value } }));
    }
  };

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
                      dispatch(removeUpdateTestCase());
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
