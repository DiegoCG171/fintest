import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  updateUserThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useEffect, useMemo, useRef, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { closeModalSettings } from "../../../store/slices/admin/admin.slice";
import { useLocation } from "react-router-dom";
import { updateInstitutionsThunk } from "../../../store/slices/institutions/institutions.thunk";
import { updateSecurityPermissionThunk, updateSecurityRolesThunk } from "../../../store/slices/security/security.thunk";
import { Institution } from "../../../config/interfaces";
import { Rol } from "../../../config/interfaces/security.interface";

const modalStyle = {
  p: 3,
  width: "100%",
  mt: 4,
};

const formConfigs: Record<
  string,
  {
    title: string;
    description: string;
    confirmText: string;
    storeKey:
      | "updateUser"
      | "updateInstitution"
      | "updateRol"
      | "updatePermission";
    fields: {
      type: "text" | "select" | "institutionSelect" | "roleSelect";
      name: string;
      label: string;
      options?: { value: string; label: string }[];
    }[];
  }
> = {
  "/settings/users": {
    title: "Editar usuario",
    description:
      "Completa los campos para actualizar la información del usuario.",
    confirmText: "Actualizar usuario",
    storeKey: "updateUser",
    fields: [
      { type: "text", name: "names", label: "Nombre" },
      { type: "text", name: "surnames", label: "Apellidos" },
      { type: "text", name: "username", label: "Nombre de usuario" },
      { type: "text", name: "email", label: "Correo electrónico" },
      {
        type: "institutionSelect",
        name: "institutionId",
        label: "Institución",
      },
      { type: "roleSelect", name: "roleId", label: "Rol" },
      {
        type: "select",
        name: "status",
        label: "Estado",
        options: [
          { value: "active", label: "Activo" },
          { value: "deactive", label: "Inactivo" },
        ],
      },
    ],
  },
  "/settings/institutions": {
    title: "Editar institución",
    description:
      "Completa los campos para actualizar la información de la institución.",
    confirmText: "Actualizar institución",
    storeKey: "updateInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución" },
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
  "/settings/roles": {
    title: "Editar rol",
    description: "Completa los campos para actualizar la información del rol.",
    confirmText: "Actualizar rol",
    storeKey: "updateRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol" },
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
  "/settings/permissions": {
    title: "Editar permiso",
    description:
      "Completa los campos para actualizar la información del permiso.",
    confirmText: "Actualizar permiso",
    storeKey: "updatePermission",
    fields: [
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
};

const formConfigsCreate: Record<
  string,
  {
    title: string;
    description: string;
    confirmText: string;
    storeKey:
      | "updateUser"
      | "updateInstitution"
      | "updateRol"
      | "updatePermission";
    fields: {
      type: "text" | "select" | "institutionSelect" | "roleSelect";
      name: string;
      label: string;
      options?: { value: string; label: string }[];
    }[];
  }
> = {
  "/settings/users": {
    title: "Crear usuario",
    description:
      "Completa los campos para actualizar la información del usuario.",
    confirmText: "Crear usuario",
    storeKey: "updateUser",
    fields: [
      { type: "text", name: "names", label: "Nombre" },
      { type: "text", name: "surnames", label: "Apellidos" },
      { type: "text", name: "username", label: "Nombre de usuario" },
      { type: "text", name: "email", label: "Correo electrónico" },
      { type: "text", name: "password", label: "Contraseña" },
      // 👇 Guardamos SOLO el id en el estado local
    ],
  },
};

export const DynamicSettingForm = () => {
  const dispatch = useAppDispatch();

  const {
    updateUser,
    updateInstitution,
    updateRol,
    updatePermission,
    institutions = [],
    roles = [],
    type
  } = useAppSelector((state) => state.admin);

  const location = useLocation();

  const configKey = useMemo(() => {
    const match = Object.keys(type === 'update' ? formConfigs : formConfigsCreate).find((path) =>
      location.pathname.includes(path)
    );
    return match || "/settings/users";
  }, [location.pathname, type]);

  const config = type === 'update' ? formConfigs[configKey] : formConfigsCreate[configKey];

  const entityId =
    (config.storeKey === "updateUser" && updateUser?.id) ||
    (config.storeKey === "updateInstitution" && updateInstitution?.id) ||
    (config.storeKey === "updateRol" && updateRol?.id) ||
    (config.storeKey === "updatePermission" && updatePermission?.id) ||
    "new";

  const initKey = `${config.storeKey}-${entityId}`;
  const lastInitKey = useRef<string>("");

  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (lastInitKey.current === initKey) return;

    if (config.storeKey === "updateUser") {
      setFormData({
        id: updateUser?.id ?? "",
        names: updateUser?.names ?? "",
        surnames: updateUser?.surnames ?? "",
        username: updateUser?.username ?? "",
        email: updateUser?.email ?? "",
        status: updateUser?.status ?? "",
        institutionId:
          updateUser?.institution?.id != null
            ? String(updateUser.institution.id)
            : "",
        roleId:
          updateUser?.roles?.[0]?.id != null
            ? String(updateUser.roles[0].id)
            : "",
      });
    } else if (config.storeKey === "updateInstitution") {
      setFormData({
        id: updateInstitution?.id ?? "",
        name: updateInstitution?.name ?? "",
        description: updateInstitution?.description ?? "",
      });
    } else if (config.storeKey === "updateRol") {
      setFormData({
        id: updateRol?.id ?? "",
        name: updateRol?.name ?? "",
        description: updateRol?.description ?? "",
      });
    } else if (config.storeKey === "updatePermission") {
      setFormData({
        id: updatePermission?.id ?? "",
        description: updatePermission?.description ?? "",
      });
    }

    lastInitKey.current = initKey;
  }, [
    initKey,
    config.storeKey,
    updateUser,
    updateInstitution,
    updateRol,
    updatePermission,
  ]);

  const handleConfirm = async () => {
    let payload: any = { ...formData };

    if (config.storeKey === "updateUser") {
      // const institution =
      //   institutions.find((i: any) => String(i.id) === formData.institutionId) ||
      //   null;

      // const role =
      //   roles.find((r: any) => String(r.id) === formData.roleId) || null;

      payload = {
        names: formData.names,
        surnames: formData.surnames,
        username: formData.username,
        email: formData.email,
        status: formData.status,
        // institution: institution
        //   ? { id: institution.id, name: institution.name }
        //   : null,
        // roles: role ? [{ id: role.id, name: role.name }] : [],
      };

      if (formData.id) {
        dispatch(updateUserThunk({ id: formData.id, payload }));
      }
    }

    // Agrega aquí los otros casos si ya tienes sus thunks:
    if (config.storeKey === "updateInstitution") {
      payload = {
        name: formData.name,
        description: formData.description,
      };

      dispatch(updateInstitutionsThunk({ id: formData.id, payload }));
    }

    if (config.storeKey === "updateRol") {
      payload = {
        name: formData.name,
        description: formData.description,
      };
      dispatch(updateSecurityRolesThunk({ id: formData.id, payload }));
    }

    if (config.storeKey === "updatePermission")  {
      payload = {
        description: formData.description,
      };
      dispatch(updateSecurityPermissionThunk({ id: formData.id, payload }))
    }

    dispatch(closeModalSettings());
  };

  const handleCancel = () => {
    dispatch(closeModalSettings());
  };

  return (
    <Box sx={modalStyle}>
      <Typography variant="h6">{config.title}</Typography>
      <Typography sx={{ mt: 2 }}>{config.description}</Typography>

      <Box
        key={initKey}
        component="form"
        sx={{
          mt: 3,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 3,
          px: 4,
          py: 4,
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        {config.fields.map((field) => {
          if (field.type === "text") {
            return (
              <TextField
                key={field.name}
                label={field.label}
                value={formData[field.name] ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
              />
            );
          }

          if (field.type === "select") {
            return (
              <FormControl key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  value={formData[field.name] ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                >
                  {field.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (field.type === "institutionSelect") {
            return (
              <FormControl key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  value={formData.institutionId ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      institutionId: String(e.target.value),
                    }))
                  }
                >
                  {institutions.map((inst: Institution) => (
                    <MenuItem key={inst.id} value={String(inst.id)}>
                      {inst.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          if (field.type === "roleSelect") {
            return (
              <FormControl key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  label={field.label}
                  value={formData.roleId ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      roleId: String(e.target.value),
                    }))
                  }
                >
                  {roles.map((role: Rol) => (
                    <MenuItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }

          return null;
        })}
      </Box>

      <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
        <Button
          startIcon={<CheckCircleIcon />}
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          {config.confirmText}
        </Button>
        <Button
          startIcon={<CancelIcon />}
          onClick={handleCancel}
          variant="contained"
        >
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};
