import { Box, Typography } from "@mui/material";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import DownloadIcon from "@mui/icons-material/Download";
import { SeparatorMenuProps } from "../../../config/interfaces";

function SeparatorMenu({ label, onAction, onDownload }: SeparatorMenuProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{ color: (theme) => theme.palette.text.disabled, fontSize: 14 }}
      >
        {label.toUpperCase()}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {onDownload && (
          <DownloadIcon
            sx={{
              fontSize: 18,
              marginRight: 2,
              color: (theme) => theme.palette.text.disabled,
              cursor: "pointer",
            }}
            onClick={onDownload}
          />
        )}
        <CreateNewFolderOutlinedIcon
          onClick={onAction}
          sx={{
            fontSize: 18,
            color: (theme) => theme.palette.text.disabled,
            cursor: onAction ? "pointer" : "",
          }}
        />
      </Box>
    </Box>
  );
}
export default SeparatorMenu;
