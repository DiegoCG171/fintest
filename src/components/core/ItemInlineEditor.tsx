import { CircularProgress, IconButton, Stack, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { ItemInlineEditorProps } from "../../config/interfaces";

function ItemInlineEditor({
  initialValue = "",
  placeholder = "Escribe un nombre",
  onSubmit,
  onCancel,
}: ItemInlineEditorProps) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      setLoading(true);
      try {
        await onSubmit(value.trim());
        setValue("");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
    if (e.key === "Escape") {
      onCancel?.();
    }
  };

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <TextField
        variant="standard"
        value={value}
        disabled={loading}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
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
                onClick={onCancel}
                disabled={loading}
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
  );
}

export default ItemInlineEditor;
