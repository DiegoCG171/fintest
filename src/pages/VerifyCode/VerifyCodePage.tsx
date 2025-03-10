
import { Container, Box, Avatar, Typography } from "@mui/material";
import BackToLoginLink from "../../components/BackToLoginLink";
import PasswordIcon from "@mui/icons-material/Password";
import {
  containerStyle,
  avatarStyle,
} from "../ForgotPasswordPage/ForgotPasswordStyle";
import { VerifyCodeForm } from "../../components";

const VerifyCodePage = () => {
  return (
    <Container component="main" maxWidth="sm">
      <Box sx={containerStyle}>
        <Avatar sx={avatarStyle}>
          <PasswordIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresa el código de confirmación
        </Typography>
        <Typography
          style={{ marginTop: 8, fontSize: 12 }}
          sx={{ color: "primary.dark", textAlign: "center" }}
          component="p"
          variant="subtitle2"
        >
          ¡Listo! ✉️ hemos enviado el código a <b>diego.ceron@riuki.com</b>
        </Typography>
        <VerifyCodeForm />
        <BackToLoginLink />
      </Box>
    </Container>
  );
};

export default VerifyCodePage;
