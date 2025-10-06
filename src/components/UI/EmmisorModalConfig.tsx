import {
  Box,
  Button,
  Modal,
  Portal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../store";
import { useToast } from "../../config/hooks/useToast";
import { toggleEmmisorModalConfig } from "../../store/slices/UI/emmisorModalConfig/emmisorModalConfig.slice";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { setEmmisorConfiguration } from "../../store/slices/server/server.slice";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
};

const ipRegex =
  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;

const validationSchema = Yup.object({
  host: Yup.string()
    .required("El host es obligatorio")
    .matches(ipRegex, "Debe ser una dirección IP válida (ej: 192.168.0.1)"),
  port: Yup.number()
    .typeError("El puerto debe ser un número")
    .required("El puerto es obligatorio")
    .min(1, "Debe ser mayor que 0")
    .max(65535, "Debe ser menor o igual a 65535"),
});

export const EmmisorModalConfig = () => {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { isOpen } = useAppSelector((state) => state.emmisorModalConfig);
  const { configHost, configPort } = useAppSelector((state) => state.server);

  const handleCancel = () => {
    dispatch(toggleEmmisorModalConfig(false));
  };

  return (
    <Portal>
      <Modal open={isOpen}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Configurar Emisor</Typography>
          <Typography sx={{ mt: 1 }}>
            Ingresa el <b>host</b> y el <b>puerto</b> del emisor para continuar.
          </Typography>

          <Formik
            initialValues={{ host: configHost, port: configPort }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(
                setEmmisorConfiguration({
                  host: values.host,
                  port: values.port,
                })
              );
              showToast("Configuración guardada", "success");
              resetForm();
              dispatch(toggleEmmisorModalConfig(false));
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Stack direction="row" spacing={2} mt={3}>
                  <TextField
                    label="Host (IP)"
                    name="host"
                    fullWidth
                    placeholder="192.168.0.1"
                    value={values.host}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.host && Boolean(errors.host)}
                    helperText={touched.host && errors.host}
                  />
                  <TextField
                    label="Puerto"
                    name="port"
                    fullWidth
                    placeholder="8080"
                    value={values.port}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.port && Boolean(errors.port)}
                    helperText={touched.port && errors.port}
                  />
                </Stack>

                <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
                  <Button
                    startIcon={<CheckCircleIcon />}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Guardar
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    variant="contained"
                    color="inherit"
                  >
                    Cancelar
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Portal>
  );
};
