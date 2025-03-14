import { Box, Container, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import backgroundImage from "../assets/bg-fintest.png";
import backgroundIcon from "../assets/bg-fintest-icon.svg";
import mockupImage from "../assets/mockup-fintes.png";
import icon from "../assets/icon.svg";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 50px)",
      }}
    >
      {/* Panel Izquierdo */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          py: 16,
          px: 8,
          backgroundColor: "common.white",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          
          <Outlet />
        </Container>
      </Box>

      {/* Panel Derecho */}
      <Box
        sx={{
          width: "50%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Contenido en primer plano */}
        <Container
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={4} alignItems="center">
            <Box
              component="img"
              src={mockupImage}
              alt="Mockup de la aplicación"
              sx={{ maxWidth: 450, width: "100%" }}
            />
            <Typography align="center" variant="h6" color="common.white">
              <strong>Simula y gestiona</strong> transacciones bancarias con
              precisión en un <strong>entorno seguro y eficiente.</strong>
            </Typography>
            <Box
              component="img"
              src={icon}
              alt="Icono decorativo"
              sx={{
                filter: "brightness(0) invert(1)",
                height: 50,
              }}
            />
          </Stack>
        </Container>

        {/* Capas de fondo */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundSize: "auto 100%",
            filter: "grayscale(100%)",
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundIcon})`,
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            zIndex: 2,
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthLayout;
