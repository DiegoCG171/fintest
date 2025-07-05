import { IconButton, Stack, TextField } from "@mui/material";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch } from "../../../store";
import { useState } from "react";
import { createCollectionThunk } from "../../../store/slices/collections/collections.thunk";
import { toggleCreateCollectionMenu } from "../../../store/slices/UI/sidebarMenu/sidebarMenu.slice";

export const SidebarCreateCollection = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(createCollectionThunk({ name: value }));
      setValue("");
    }
  };
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ width: "90%", pl: 1.5, my: 1 }}
    >
      <FolderOutlinedIcon sx={{ fontSize: 16, color: "text.disabled" }} />
      <TextField
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
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
                onClick={() => {
                  setValue("");
                  dispatch(toggleCreateCollectionMenu(false));
                }}
              >
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
              </IconButton>
            ),
          },
        }}
      />
    </Stack>
  );
};
