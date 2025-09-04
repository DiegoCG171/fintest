import {
  Box,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  createUserThunk,
  updateUserThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { useEffect, useMemo, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { closeModalSettings } from "../../../store/slices/admin/admin.slice";
import { useLocation } from "react-router-dom";
import {
  createInstitutionThunk,
  updateInstitutionsThunk,
} from "../../../store/slices/institutions/institutions.thunk";
import {
  createSecurityPermissionThunk,
  createSecurityRolThunk,
  updateSecurityPermissionThunk,
  updateSecurityRolesThunk,
} from "../../../store/slices/security/security.thunk";
import {
  Action,
  Permission,
  PermissionRol,
  Rol,
} from "../../../config/interfaces/security.interface";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Institution } from "../../../config/interfaces/institutions.interface";
import { useToast } from "../../../config/hooks/useToast";
import { TagSettingTable } from "./TagSettingTable";
import { labelMap } from "../../../config/utils/labelMap";
import { toCapitalCase } from "../../../config/utils";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";

const modalStyle = {
  p: 3,
  width: "100%",
  mt: 4,
};

const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 200, // altura máxima
      width: 250, // ancho opcional
    },
  },
  anchorOrigin: {
    vertical: "bottom" as const,
    horizontal: "left" as const,
  },
  transformOrigin: {
    vertical: "top" as const,
    horizontal: "left" as const,
  },
  getContentAnchorEl: null, // ⚡️ para que siempre aparezca debajo
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
      type:
        | "text"
        | "select"
        | "institutionSelect"
        | "actionSelect"
        | "resourceSelect"
        | "permissionSelect"
        | "roleSelect";
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
      {
        type: "permissionSelect",
        name: "permissionId",
        label: "Permisos",
      },
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
      {
        type: "actionSelect",
        name: "action",
        label: "Acción",
      },
      {
        type: "resourceSelect",
        name: "resource",
        label: "Recurso",
      },
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
      | "createUser"
      | "createInstitution"
      | "createRol"
      | "createPermission";
    fields: {
      type:
        | "text"
        | "select"
        | "institutionSelect"
        | "actionSelect"
        | "resourceSelect"
        | "permissionSelect"
        | "roleSelect"
        | "password";
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
    storeKey: "createUser",
    fields: [
      { type: "text", name: "names", label: "Nombre" },
      { type: "text", name: "surnames", label: "Apellidos" },
      { type: "text", name: "username", label: "Nombre de usuario" },
      { type: "text", name: "email", label: "Correo electrónico" },
      { type: "password", name: "password", label: "Contraseña" },
    ],
  },
  "/settings/institutions": {
    title: "Crear institución",
    description:
      "Completa los campos para actualizar la información de la institución.",
    confirmText: "Crear institución",
    storeKey: "createInstitution",
    fields: [
      { type: "text", name: "name", label: "Nombre de la institución" },
      { type: "text", name: "description", label: "Descripción" },
    ],
  },
  "/settings/roles": {
    title: "Crear rol",
    description: "Completa los campos para actualizar la información del rol.",
    confirmText: "Crear rol",
    storeKey: "createRol",
    fields: [
      { type: "text", name: "name", label: "Nombre del rol" },
      { type: "text", name: "description", label: "Descripción" },
      {
        type: "permissionSelect",
        name: "permissionId",
        label: "Permisos",
      },
    ],
  },
  "/settings/permissions": {
    title: "Crear permiso",
    description:
      "Completa los campos para actualizar la información del permiso.",
    confirmText: "Crear permiso",
    storeKey: "createPermission",
    fields: [
      { type: "text", name: "description", label: "Descripción" },
      {
        type: "actionSelect",
        name: "action",
        label: "Acción",
      },
      {
        type: "resourceSelect",
        name: "resource",
        label: "Recurso",
      },
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
    institutions,
    permissions,
    actions,
    resources,
    roles,
    type,
  } = useAppSelector((state) => state.admin);

  const location = useLocation();

  const configKey = useMemo(() => {
    const match = Object.keys(
      type === "update" ? formConfigs : formConfigsCreate
    ).find((path) => location.pathname.includes(path));
    return match || "/settings/users";
  }, [location.pathname, type]);
  const { showToast } = useToast();

  const config =
    type === "update" ? formConfigs[configKey] : formConfigsCreate[configKey];

  const entityId =
    (config.storeKey === "updateUser" && updateUser?.id) ||
    (config.storeKey === "updateInstitution" && updateInstitution?.id) ||
    (config.storeKey === "updateRol" && updateRol?.id) ||
    (config.storeKey === "updatePermission" && updatePermission?.id) ||
    "new";

  const initKey = `${config.storeKey}-${entityId}`;
  const lastInitKey = useRef<string>("");

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showPassword, setShowPassword] = useState(false);

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
        roleId: (updateUser?.roles ?? [])
          .map((role) => String(role.id))
          .filter(Boolean),
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
        permissionId: (updateRol?.permissions ?? [])
          .map((perm: PermissionRol) => {
            const match = permissions.data.find(
              (p) => p.description === perm.description
            );
            return match ? String(match.id) : null;
          })
          .filter(Boolean),
      });
    } else if (config.storeKey === "updatePermission") {
      setFormData({
        id: updatePermission?.id ?? "",
        description: updatePermission?.description ?? "",
        action:
          updatePermission?.action?.id != null
            ? String(updatePermission.action.id)
            : "",
        resource:
          updatePermission?.resource?.id != null
            ? String(updatePermission.resource.id)
            : "",
      });
    } else {
      setFormData({});
    }

    lastInitKey.current = initKey;
  }, [
    initKey,
    permissions,
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
        roleIds: formData.roleId,
      };
      try {
        if (formData.id) {
          await dispatch(updateUserThunk({ id: formData.id, payload }));
        }
        showToast("Usuario actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    // Agrega aquí los otros casos si ya tienes sus thunks:
    if (config.storeKey === "updateInstitution") {
      payload = {
        name: formData.name,
        description: formData.description,
      };

      try {
        await dispatch(updateInstitutionsThunk({ id: formData.id, payload }));
        showToast("Institución actualizada exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "updateRol") {
      payload = {
        name: formData.name,
        description: formData.description,
        permissionsIds: formData.permissionId.map((p: string) => +p),
      };
      try {
        await dispatch(updateSecurityRolesThunk({ id: formData.id, payload }));
        showToast("Rol actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "updatePermission") {
      payload = {
        description: formData.description,
        actionId: +formData.action,
        resourceId: +formData.resource,
      };
      try {
        await dispatch(
          updateSecurityPermissionThunk({ id: formData.id, payload })
        );
        showToast("Permiso actualizado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "createUser") {
      payload = {
        names: formData.names,
        surnames: formData.surnames,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        institutionId: 1,
      };
      try {
        await dispatch(createUserThunk(payload)).unwrap();
        showToast("Usuario creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "createInstitution") {
      payload = {
        name: formData.name,
        description: formData.description,
      };
      try {
        await dispatch(createInstitutionThunk(payload)).unwrap();
        showToast("Institución creada exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "createRol") {
      payload = {
        name: formData.name,
        description: formData.description,
        permissionsIds: formData.permissionId.map((p: string) => +p),
      };
      try {
        await dispatch(createSecurityRolThunk(payload)).unwrap();
        showToast("Rol creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
    }

    if (config.storeKey === "createPermission") {
      payload = {
        description: formData.description,
        actionId: +formData.action,
        resourceId: +formData.resource,
      };
      try {
        await dispatch(createSecurityPermissionThunk(payload)).unwrap();
        showToast("Rol creado exitosamente", "success");
      } catch (error) {
        showToast(error as string, "error");
      }
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
        autoComplete="new-password"
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
                autoComplete={`new--${field.name}`}
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

          if (field.type === "password") {
            return (
              <TextField
                key={field.name}
                label={field.label}
                type={showPassword ? "text" : "password"}
                value={formData[field.name] ?? ""}
                autoComplete="new-password"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.name]: e.target.value,
                  }))
                }
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
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

          // Dentro de config.fields.map:
          if (field.type === "institutionSelect") {
            return (
              <FormControl key={field.name}>
                {" "}
                <InputLabel>{field.label}</InputLabel>{" "}
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
                  {" "}
                  {institutions.data.map((inst: Institution) => (
                    <MenuItem key={inst.id} value={String(inst.id)}>
                      {" "}
                      {inst.name}{" "}
                    </MenuItem>
                  ))}{" "}
                </Select>{" "}
              </FormControl>
            );
          }

          if (field.type === "actionSelect") {
            return (
              <FormControl key={field.name}>
                {" "}
                <InputLabel>{field.label}</InputLabel>{" "}
                <Select
                  label={field.label}
                  value={formData.action ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      action: String(e.target.value),
                    }))
                  }
                >
                  {" "}
                  {actions.data?.map((inst: Action) => (
                    <MenuItem key={inst.id} value={String(inst.id)}>
                      {" "}
                      {labelMap[inst.name.toLowerCase()]}{" "}
                    </MenuItem>
                  ))}{" "}
                </Select>{" "}
              </FormControl>
            );
          }

          if (field.type === "resourceSelect") {
            return (
              <FormControl key={field.name}>
                {" "}
                <InputLabel>{field.label}</InputLabel>{" "}
                <Select
                  label={field.label}
                  value={formData.resource ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      resource: String(e.target.value),
                    }))
                  }
                >
                  {" "}
                  {resources.data?.map((inst: Action) => (
                    <MenuItem key={inst.id} value={String(inst.id)}>
                      {" "}
                      {labelMap[inst.name.toLowerCase()]}{" "}
                    </MenuItem>
                  ))}{" "}
                </Select>{" "}
              </FormControl>
            );
          }

          if (field.type === "permissionSelect") {
            return (
              <FormControl key={field.name}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  multiple
                  label={field.label}
                  value={formData.permissionId ?? []} // ahora es un array
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      permissionId: e.target.value, // MUI devuelve array
                    }))
                  }
                  renderValue={(selected: any) =>
                    permissions.data
                      .filter((perm: Permission) =>
                        (selected as string[]).includes(String(perm.id))
                      )
                      .map((perm: Permission) => (
                        <TagSettingTable
                          key={perm.id}
                          value={perm.description}
                        />
                      ))
                  }
                  MenuProps={MENU_PROPS}
                >
                  {permissions.data.map((perm: Permission) => (
                    <MenuItem key={perm.id} value={String(perm.id)}>
                      <Checkbox
                        checked={(formData.permissionId ?? []).includes(
                          String(perm.id)
                        )}
                      />
                      <ListItemText primary={perm.description} />
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
                      roleId: [String(e.target.value)],
                    }))
                  }
                >
                  {roles.data.map((role: Rol) => (
                    <MenuItem key={role.id} value={String(role.id)}>
                      {toCapitalCase(role.name)}
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
          startIcon={
            type === "update" ? <SaveAsOutlinedIcon /> : <SaveOutlinedIcon />
          }
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
