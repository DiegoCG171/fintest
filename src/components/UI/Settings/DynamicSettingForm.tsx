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
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { UserDB } from "../../../config/interfaces";
import { closeModalSettings } from "../../../store/slices/admin/admin.slice";

const modalStyle = {
  p: 3,
  width: "100%",
  mt: 4
};

export const DynamicSettingForm = () => {
  const dispatch = useAppDispatch();
  const { updateUser } = useAppSelector((state) => state.admin);
  const [titleText] = useState("Editar usuario");
  const [user, setUser] = useState<Partial<UserDB>>({
    names: "",
    surnames: "",
    username: "",
    email: "",
    roles: [],
  });

  useEffect(() => {
    if (updateUser) {
      setUser(updateUser);
    }
  }, [updateUser]);

  const handleConfirm = async () => {};
  const handleCancel = () => {
    dispatch(closeModalSettings());
  };

  return (
    <Box sx={modalStyle}>
      <Typography variant="h6">{titleText}</Typography>
      <Typography sx={{ mt: 2 }}>
        Completa los campos para actualizar la información del usuario en el
        sistema. Podrás modificar sus roles, institución y estado de la cuenta
        según corresponda.
      </Typography>
      <Box
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
        <TextField
          label="Nombre"
          value={user.names}
          onChange={(e) => setUser({ ...user, names: e.target.value })}
        />
        <TextField
          label="Apellidos"
          value={user.surnames}
          onChange={(e) => setUser({ ...user, surnames: e.target.value })}
        />
        <TextField
          label="Nombre de usuario"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <TextField
          label="Correo electrónico"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          label="Institución"
          value={user.institution?.name}
          onChange={(e) =>
            setUser({
              ...user,
              institution: { ...user.institution!, name: e.target.value },
            })
          }
        />
        <FormControl>
          <InputLabel>Roles</InputLabel>
          <Select
            value={user.roles![0]?.name}
            onChange={(e) =>
              setUser({
                ...user,
                roles: [
                  { ...user.roles![0], name: e.target.value },
                  ...user.roles!,
                ],
              })
            }
            label="Roles"
          >
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="tester">Tester</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Estado</InputLabel>
          <Select
            value={user.status}
            onChange={(e) => setUser({ ...user, status: e.target.value })}
            label="Estado"
          >
            <MenuItem value="active">Activo</MenuItem>
            <MenuItem value="inactive">Inactivo</MenuItem>
            <MenuItem value="new">Nuevo</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Botones */}
      <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
        <Button
          startIcon={<CheckCircleIcon />}
          onClick={handleConfirm}
          variant="contained"
          color="error"
        >
          Actualizar
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
