import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo.svg";

function TextBox() {
    return (
        <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', alignItems:'' }}>
        <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 50, mb: 4, alignSelf:'flex-start' }}
        />
        <Typography
            gutterBottom
            variant="h5"
        >
            <strong>Registro</strong>
        </Typography>
        <Typography variant="body1">
            <strong>¡Bienvenido! 👋</strong>
        </Typography>
        <Typography variant="body2">
            Ingresa tus datos para poder crear tu cuenta en{" "}
            <strong>fintest.</strong>
        </Typography>
        </Box>
    );
}
export default TextBox;
