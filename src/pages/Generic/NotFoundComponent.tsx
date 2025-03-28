import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      sx={{ bgcolor: "#f5f5f5", px: 2 }}
    >
      <Typography variant="h1" color="primary" fontWeight={800}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFoundComponent;
