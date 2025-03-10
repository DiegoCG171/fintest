import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { containerStyle, avatarStyle } from "./LoginStyles";
import SignInForm from "../../components/SignInForm/SignInForm";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={containerStyle}>
        <Avatar sx={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Typography
          style={{ marginTop: 8, fontSize: 12 }}
          sx={{ color: "primary.dark", textAlign: "center" }}
          component="p"
          variant="subtitle2"
        >
          ¡Bienvenido! 👋 Ingresa tu correo y contraseña para iniciar sesión.
        </Typography>
        <SignInForm />
        <Grid container justifyContent={"center"}>
          <Grid item>
              <NavLink style={{textDecoration: 'none', color: '#1565c0'}} to="/auth/create-account">
                ¿No tienes una cuenta? Regístrate
              </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default LoginPage;
