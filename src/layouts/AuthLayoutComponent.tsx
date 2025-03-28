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
        height: { xs: "100%", sm: "100%", lg: "100vh" },
        overflow: "auto",
      }}
    >
      {/* Panel Izquierdo */}
      <Box
        sx={{
          width: { xs: "100%", sm: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          px: 8,
          overflow: "auto",
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
          display: { xs: "none", sm: "block" },
          width: { xs: "0%", sm: "50%" }, 
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
          <Stack
            spacing={{ xs: 2, xl: 4 }}
            alignItems="center"
          >
            <Box
              component="img"
              src={mockupImage}
              alt="Fintest Web"
              sx={{
                maxWidth: { xs: "100%", md: 450 },
                width: "100%",
                maxHeight: "50vh",
                height: "auto",
                objectFit: "contain",
              }}
            />

            <Typography
              align="center"
              variant="h6"
              color="common.white"
            >
              <strong>Simula y gestiona</strong> transacciones bancarias con
              precisión en un <strong>entorno seguro y eficiente.</strong>
            </Typography>
            <Box
              component="img"
              src={icon}
              alt="Fintest logo"
              sx={{
                filter: "brightness(0) invert(1)",
                maxHeight: 50,
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
