import {
  Box,
  ButtonBase,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { activeChangePassword } from "../../store/slices/auth/auth.slice";
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../store/slices/auth/login.thunk";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutThunk());
  };

  const handleChangePassword = () => {
    handleClose();
    dispatch(activeChangePassword());
    navigate('/change-password')
  };

  return (
    <Stack spacing={2} direction="row">
      <BadgeContent></BadgeContent>
      <ButtonBase onClick={handleClick}>
        <Stack spacing={0} alignItems="flex-start">
          <Typography variant="subtitle2">{`${user?.names} ${user?.surnames}`}</Typography>
          <Typography variant="caption">{`${user?.username} `}</Typography>
        </Stack>
      </ButtonBase>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleChangePassword} sx={{ fontSize: "0.75rem" }}>
          Cambiar contraseña
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ fontSize: "0.75rem" }}>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </Stack>
  );
}
export default AccountMenu;
