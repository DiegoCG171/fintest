import { Box, Typography } from "@mui/material";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { SeparatorMenuProps } from "../../../config/interfaces";

function SeparatorMenu({ label, onAction }: SeparatorMenuProps) {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: onAction ? "pointer" : '',
      }}
      onClick={onAction}
    >
      <Typography
        sx={{ color: (theme) => theme.palette.text.disabled, fontSize: 14 }}
      >
        {label.toUpperCase()}
      </Typography>
      <CreateNewFolderOutlinedIcon
        sx={{ fontSize: 18, color: (theme) => theme.palette.text.disabled }}
      />
    </Box>
  );
}
export default SeparatorMenu;
