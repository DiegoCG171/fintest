import { Box, Typography } from "@mui/material";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import { SeparatorMenuProps } from "../../../config/interfaces";
import PermissionGuard from "../../../config/guards/PermissionGuard";

function SeparatorMenu({ label, onAction, permissions }: SeparatorMenuProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: onAction ? "pointer" : "",
      }}
      onClick={onAction}
    >
      <Typography
        sx={{ color: (theme) => theme.palette.text.disabled, fontSize: 14 }}
      >
        {label.toUpperCase()}
      </Typography>
      <PermissionGuard
        permissions={[...permissions]}
      >
        <CreateNewFolderOutlinedIcon
          sx={{ fontSize: 18, color: (theme) => theme.palette.text.disabled }}
        />
      </PermissionGuard>
    </Box>
  );
}
export default SeparatorMenu;
