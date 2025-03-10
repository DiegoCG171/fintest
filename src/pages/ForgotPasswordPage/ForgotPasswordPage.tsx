import { Avatar, Box, Container, Typography } from "@mui/material"
import { containerStyle, avatarStyle } from "./ForgotPasswordStyle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ForgotPassworForm } from "../../components";
import BackToLoginLink from "../../components/BackToLoginLink";

const ForgotPasswordPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={containerStyle}>
        <Avatar sx={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ¿Olvidaste tu contraseña?
        </Typography>
        <Typography
          style={{ marginTop: 8, fontSize: 12 }}
          sx={{ color: "primary.dark", textAlign: "center" }}
          component="p"
          variant="subtitle2"
        >
          ¡No te preocupes! 👍 Ingresa la dirección de correo electrónico vinculada a tu cuenta y enviaremos un correo de recuperación.
        </Typography>
        <ForgotPassworForm />
        <BackToLoginLink />
      </Box>
    </Container>
  )
}

export default ForgotPasswordPage;