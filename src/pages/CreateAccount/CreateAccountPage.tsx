import { Container, Box, Avatar, Typography, Grid} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { containerStyle, avatarStyle } from "./CreateAccountStyles";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { NavLink } from "react-router-dom";

const CreateAccountPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={containerStyle}>
        <Avatar sx={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regístrate
        </Typography>
        <Typography
          style={{ marginTop: 8, fontSize: 12 }}
          sx={{ color: "primary.dark", textAlign: "center" }}
          component="p"
          variant="subtitle2"
        >
          ¡Bienvenido! 👋 Completa los siguientes campos para crear tu cuenta.
        </Typography>
        <SignUpForm />
        <Grid container justifyContent="center">
          <Grid item>
              <NavLink style={{textDecoration: 'none', color: '#1565c0'}} to="/auth/login">
                ¿Ya tienes una cuenta? Inicia sesión
              </NavLink>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CreateAccountPage;
