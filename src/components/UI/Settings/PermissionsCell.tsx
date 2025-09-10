// components/PermissionsCell.tsx
import React, { useState } from "react";
import {
  Stack,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";
import { TagSettingTable } from "./TagSettingTable";
import { PermissionRol } from "../../../config/interfaces/security.interface";

interface PermissionsCellProps {
  permissions: PermissionRol[];
}

export const PermissionsCell = ({ permissions }: PermissionsCellProps) => {
  const maxVisible = 2;
  const visible = permissions.slice(0, maxVisible);
  const hidden = permissions.slice(maxVisible);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Stack direction="row" spacing={0.5} flexWrap="wrap">
        {visible.map((r) => (
          <TagSettingTable
            key={r.id}
            value={r.description.replace(/^Permiso para\s*/i, "")}
          />
        ))}

        {hidden.length > 0 && (
          <>
            <TagSettingTable
              value={`+${hidden.length}`}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  style: {
                    maxHeight: 300,
                    overflowY: "auto",
                    padding: 8,
                    margin: 8,
                  },
                },
              }}
            >
              <List dense>
                {hidden.map((r) => (
                  <ListItem key={r.id}>
                    <ListItemText
                      primary={
                        <TagSettingTable
                          value={r.description.replace(/^Permiso para\s*/i, "")}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </>
        )}
      </Stack>
    </>
  );
};