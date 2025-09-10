
import React from "react";
import { TableCell, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PermissionGuard from "../../../config/guards/PermissionGuard";
import { EntityType } from "../../../config/interfaces/tableSettings.interface";
import { getResourceFromPath } from "../../../config/utils/tableSettings.utils";

interface ActionsCellProps {
  item: EntityType;
  onMenuClick: (e: React.MouseEvent<HTMLButtonElement>, item: EntityType) => void;
  pathname: string;
}

export const ActionsCell = ({ item, onMenuClick, pathname }: ActionsCellProps) => (
  <TableCell align="center">
    <PermissionGuard
      permissions={[
        {
          action: "update",
          resource: getResourceFromPath(pathname),
        },
        {
          action: "delete",
          resource: getResourceFromPath(pathname),
        },
      ]}
      fallback={null}
    >
      <IconButton onClick={(e) => onMenuClick(e, item)}>
        <MoreVertIcon />
      </IconButton>
    </PermissionGuard>
  </TableCell>
);