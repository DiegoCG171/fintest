import { Box, ButtonBase, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useAuth } from "../../config/hooks/useAuth";
import React from "react";

const BadgeContent = () => {
  return (
    <Box
      component="span"
      sx={{
        width: 40,
        height: 40,
        minWidth: 40,
        minHeight: 40,
        maxWidth: 40,
        maxHeight: 40,
        borderRadius: "12px",
        background: (theme) => theme.palette.primary.light,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    />
  );
};

function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {
    user,
    logout
  } = useAuth();

  const handleLogout = () => {
    handleClose(); 
    logout();  
  };
  return (
    <Stack
      spacing={2}
      direction="row"
    >
      <BadgeContent></BadgeContent>
      <ButtonBase onClick={handleClick}>
        <Stack spacing={0} alignItems="flex-start">
          <Typography variant="subtitle2">{`${user?.names} ${user?.surnames}`}</Typography>
          <Typography variant="caption">{user?.username}</Typography>
        </Stack>
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout} 
        sx= {{ fontSize: '0.75rem' }}>Cerrar sesión</MenuItem>
      </Menu>
    </Stack>
  );
}
export default AccountMenu;
