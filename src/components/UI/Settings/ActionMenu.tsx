
import { Menu, MenuItem } from "@mui/material";
import PermissionGuard from "../../../config/guards/PermissionGuard";
import { getResourceFromPath } from "../../../config/utils/tableSettings.utils";

interface ActionMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  pathname: string;
}

export const ActionMenu = ({ anchorEl, onClose, onEdit, onDelete, pathname }: ActionMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    sx={{ "& .MuiMenuItem-root": { fontSize: 12, minHeight: 24 } }}
  >
    <PermissionGuard
      action="update"
      resource={getResourceFromPath(pathname)}
      fallback={null}
    >
      <MenuItem onClick={onEdit}>Editar</MenuItem>
    </PermissionGuard>
    <PermissionGuard
      action="delete"
      resource={getResourceFromPath(pathname)}
      fallback={null}
    >
      <MenuItem onClick={onDelete}>Eliminar</MenuItem>
    </PermissionGuard>
  </Menu>
);