import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from 'react-router-dom';
import Grid from "@mui/material/Grid2";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import CustomInputComponent from "../../components/forms/CustomInputComponent";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import * as Yup from "yup";
import TextBox from "../../components/UI/TextBox";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Formato de email inválido")
        .required("El email es requerido"),
    name: Yup.string().required("El nombre es requerido"),
    user: Yup.string().required("El usuario es requerido"),
    password: Yup.string().required("La contraseña es requerida"),
    retryPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
        .required("Repetir la contraseña es requerido"),
});

function RegisterComponent() {
    return (
        <Box sx={{ width: "100%" }}>
        <TextBox
            title={"Registro"}
            welcomeText={"¡Bienvenido! 👋"}
            description={
            <>
                Ingresa tus datos para poder crear tu cuenta en{" "}
                <strong>fintest.</strong>
            </>
            }
        ></TextBox>
        <Box sx={{ flexGrow: 1, my: 4 }}>
            <Formik
            initialValues={{
                name: "",
                email: "",
                user: "",
                password: "",
                retryPassword: "",
                accepted: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
            }}
            >
            {({ errors, touched, getFieldProps }) => (
                <Form>
                <Grid
                    container
                    spacing={{ xs: 2 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                    <CustomInputComponent
                        endIcon={<CheckCircleOutlineOutlinedIcon />}
                        label="Email"
                        id="email"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        required
                    />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                    <CustomInputComponent
                        label="Nombre"
                        id="name"
                        {...getFieldProps("name")}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                    />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                    <CustomInputComponent
                        label="Usuario"
                        id="user"
                        {...getFieldProps("user")}
                        error={Boolean(touched.user && errors.user)}
                        helperText={touched.user && errors.user}
                    />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                    <CustomInputComponent
                        label="Contraseña"
                        id="password"
                        endIcon={<VisibilityOffOutlinedIcon />}
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    </Grid>

                    <Grid size={{ xs: 2, sm: 4, md: 6 }}>
                    <CustomInputComponent
                        label="Repetir Contraseña"
                        id="retryPassword"
                        endIcon={<VisibilityOffOutlinedIcon />}
                        {...getFieldProps("retryPassword")}
                        error={Boolean(
                        touched.retryPassword && errors.retryPassword
                        )}
                        helperText={touched.retryPassword && errors.retryPassword}
                    />
                    </Grid>
                    <Stack
                    direction="row"
                    spacing={1}
                    sx={{ ml: -1, display: "flex", alignItems: "center" }}
                    >
                    <FormControlLabel
                        value="accepted"
                        control={<Checkbox />}
                        label="Aceptar"
                        labelPlacement="end"
                        sx={{ mb: 1, fontSize: 14, fontWeight: "bold" }}
                    />
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                        console.info("I'm a button.");
                        }}
                    >
                        Términos y condiciones
                    </Link>
                    </Stack>
                    <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    >
                    Iniciar sesión
                    </Button>
                    <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                    >
                    <Typography>¿Ya tienes cuenta?</Typography>
                    <Link
                        variant="body2"
                        component={RouterLink}
                            to="/login"
                    >
                        Ingresa aquí
                    </Link>
                    </Stack>
                </Grid>
                </Form>
            )}
            </Formik>
        </Box>
        </Box>
    );
}

export default RegisterComponent;
