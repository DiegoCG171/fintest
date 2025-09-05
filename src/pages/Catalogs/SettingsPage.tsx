import {
  Box,
  Button,
  Card,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DynamicSettingTable } from "../../components/UI/Settings/DynamicSettingTable";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { useEffect, useState } from "react";
import { getAllUsersThunk, useAppDispatch, useAppSelector } from "../../store";
import { getAllInstitutionsThunk } from "../../store/slices/institutions/institutions.thunk";
import {
  getAllSecurityActionsThunk,
  getAllSecurityPermissionsMenuOptionsThunk,
  getAllSecurityPermissionsThunk,
  getAllSecurityResourcesThunk,
  getAllSecurityRolesThunk,
} from "../../store/slices/security/security.thunk";
import { useLocation } from "react-router-dom";
import { DynamicSettingForm } from "../../components/UI/Settings/DynamicSettingForm";
import {
  setUpdateInstitution,
  setUpdatePermission,
  setUpdateRol,
  setUpdateUser,
} from "../../store/slices/admin/admin.slice";

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { formActive, permissions } = useAppSelector((state) => state.admin);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getAllUsersThunk());
    dispatch(getAllInstitutionsThunk());
    dispatch(getAllSecurityRolesThunk());
    dispatch(getAllSecurityPermissionsThunk());
    dispatch(getAllSecurityActionsThunk());
    dispatch(getAllSecurityResourcesThunk());
  }, [dispatch]);

  useEffect(() => {
    const newLimit = permissions.limit * permissions.pages || 1;
    dispatch(
      getAllSecurityPermissionsMenuOptionsThunk({
        page: 1,
        limit: newLimit,
      })
    );
  }, [dispatch, permissions]);

  const responsiveWidth = () => "calc(100vw - 300px)";

  const getButtonConfig = () => {
    if (location.pathname.includes("/settings/users")) {
      return {
        text: "Crear usuario",
        icon: <PersonAddOutlinedIcon />,
        onClick: () => dispatch(setUpdateUser({ type: "create" })),
      };
    }
    if (location.pathname.includes("/settings/institutions")) {
      return {
        text: "Crear institución",
        icon: <DomainAddOutlinedIcon />,
        onClick: () => dispatch(setUpdateInstitution({ type: "create" })),
      };
    }
    if (location.pathname.includes("/settings/roles")) {
      return {
        text: "Crear rol",
        icon: <AddModeratorOutlinedIcon />,
        onClick: () => dispatch(setUpdateRol({ type: "create" })),
      };
    }
    if (location.pathname.includes("/settings/permissions")) {
      return {
        text: "Crear permiso",
        icon: <VpnKeyOutlinedIcon />,
        onClick: () => dispatch(setUpdatePermission({ type: "create" })),
      };
    }
    return {
      text: "Acción",
      icon: <PersonAddOutlinedIcon />,
      onClick: () => console.log("Acción genérica"),
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        backgroundColor: "#f7f7f7",
      }}
    >
      <Typography
        sx={{ marginLeft: 4, marginTop: 4, fontSize: 24, fontWeight: "bold" }}
      >
        {/* Gestión de */}
      </Typography>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          overflow: "hidden",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          my: 4,
        }}
      >
        <Card
          sx={{
            flex: 7,
            display: "flex",
            flexDirection: "column",
            minWidth: responsiveWidth(),
            maxWidth: responsiveWidth(),
            overflow: "hidden",
          }}
        >
          {!formActive && (
            <Stack direction={"row"} justifyContent="space-between">
              <Stack direction={"row"} gap={2}>
                <Paper
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                    height: 36,
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (location.pathname.includes("/settings/users")) {
                      dispatch(getAllUsersThunk({ search: searchValue }));
                    }
                    if (location.pathname.includes("/settings/institutions")) {
                      dispatch(
                        getAllInstitutionsThunk({ search: searchValue })
                      );
                    }
                    if (location.pathname.includes("/settings/roles")) {
                      dispatch(
                        getAllSecurityRolesThunk({ search: searchValue })
                      );
                    }
                    if (location.pathname.includes("/settings/permissions")) {
                      dispatch(
                        getAllSecurityPermissionsThunk({ search: searchValue })
                      );
                    }
                  }}
                >
                  <InputBase
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{ ml: 1, flex: 1, fontSize: 14 }}
                    placeholder="Buscar"
                    inputProps={{ "aria-label": "barra de búsqueda" }}
                  />
                  <IconButton
                    type="submit"
                    sx={{ p: "6px" }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Button
                  variant="outlined"
                  startIcon={<FilterListOutlinedIcon />}
                >
                  Filtrar
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={buttonConfig.icon}
                onClick={buttonConfig.onClick}
              >
                {buttonConfig.text}
              </Button>
            </Stack>
          )}
          {formActive ? <DynamicSettingForm /> : <DynamicSettingTable />}
        </Card>
      </Box>
    </Box>
  );
};
