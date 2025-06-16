import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useEffect, useState } from "react";
import { ItemsServiceMenu, ContextMenuOption } from "../../config/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { usePopMenu } from "../../config/hooks/usePopMenu";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeUpdateTestCase } from "../../store/slices/UI/sidebarMenu/sidebarMenu.slice";
import { updateTestCaseThunk } from "../../store/slices/collections/collections.thunk";

interface Props {
  item: ItemsServiceMenu;
  optionsActive?: boolean;
  onClick?: (item: ItemsServiceMenu) => void;
  buildOptions?: (item: ItemsServiceMenu) => ContextMenuOption[];
}

const RecursiveMenuSubItem = ({
  item,
  optionsActive,
  onClick,
  buildOptions,
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [value, setValue] = useState(item.name);
  const location = useLocation();
  const navigate = useNavigate();
  const { openMenu } = usePopMenu();
  const dispatch = useAppDispatch();
  const { updateTestCase, loading, idTestCase } = useAppSelector(
    (state) => state.sidebarMenu
  );

  const isActive = item.linkMenu && location.pathname === `/${item.linkMenu}`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(updateTestCaseThunk({ id: item.id, payload: { name: value } }));
    }
  };

  useEffect(() => {
    console.log(item, idTestCase);
  }, [item, idTestCase]);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
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
          <Stack direction="row" spacing={1} alignItems="center">
            <DescriptionOutlinedIcon
              sx={{ fontSize: 16, color: "text.disabled" }}
            />
            <Typography
              sx={{ fontSize: 12, color: "text.disabled" }}
              onClick={() => {
                if (onClick) onClick(item);
                else if (item.linkMenu) navigate(`/${item.linkMenu}`);
              }}
            >
              {item.name}
            </Typography>
            {loading && idTestCase === item.id && (
              <CircularProgress size="10px" />
            )}
          </Stack>
          {optionsActive && buildOptions && hovered && !loading && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                openMenu(e, buildOptions(item));
              }}
              sx={{ cursor: "pointer" }}
            >
              <MoreHorizOutlinedIcon
                sx={{ fontSize: 16, color: "text.disabled" }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default RecursiveMenuSubItem;
