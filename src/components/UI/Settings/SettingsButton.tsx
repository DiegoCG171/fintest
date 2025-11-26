import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PermissionGuard from "../../../config/guards/PermissionGuard";



export const SettingsButton = () => {
  const navigate = useNavigate();

  return (
    <PermissionGuard
      permissions={[
        { action: "read", resource: "user" },
        { action: "create", resource: "user" },
        { action: "update", resource: "user" },
        { action: "delete", resource: "user" },
        { action: "read", resource: "institution" },
        { action: "create", resource: "institution" },
        { action: "update", resource: "institution" },
        { action: "delete", resource: "institution" },
        { action: "read", resource: "rol" },
        { action: "create", resource: "rol" },
        { action: "update", resource: "rol" },
        { action: "delete", resource: "rol" },
        { action: "read", resource: "permission" },
        { action: "create", resource: "permission" },
        { action: "update", resource: "permission" },
        { action: "delete", resource: "permission" },
        { action: "read", resource: "action" },
        { action: "create", resource: "action" },
        { action: "update", resource: "action" },
        { action: "delete", resource: "action" },
        { action: "read", resource: "resource" },
        { action: "create", resource: "resource" },
        { action: "update", resource: "resource" },
        { action: "delete", resource: "resource" },
      ]}
      requireAll={true}
    >
      <Box sx={{ position: "absolute", top: 24, right: 24, cursor: "pointer" }}>
          <SettingsOutlinedIcon onClick={() => navigate("/settings/users")} />
      </Box>
    </PermissionGuard>
  );
};
