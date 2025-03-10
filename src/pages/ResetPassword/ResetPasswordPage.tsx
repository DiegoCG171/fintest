import { Avatar, Box, Container, Typography } from "@mui/material"
import BackToLoginLink from "../../components/BackToLoginLink"
import PasswordIcon from '@mui/icons-material/Password';
import {avatarStyle,containerStyle} from './ResetPasswordStyle'
import { ResetPasswordForm } from '../../components'

const ResetPasswordPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={containerStyle}>
        <Avatar sx={avatarStyle}>
          <PasswordIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Crea una nueva contraseña
        </Typography>
        <Typography
          style={{ marginTop: 8, fontSize: 12 }}
          sx={{ color: "primary.dark", textAlign: "center" }}
          component="p"
          variant="subtitle2"
        >
          La nueva contraseña 🔐 debe de incluir al menos una mayúscula, un número y un carácter especial. 
        </Typography>
        <ResetPasswordForm />
        <BackToLoginLink />
      </Box>
    </Container>
  )
}

export default ResetPasswordPage