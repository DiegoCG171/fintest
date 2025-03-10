import {
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { HeaderBar } from "../../components/Home/HeaderBar";

const HeroSectionContainer = styled(Box)(() => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "100vh",
  color: "#fff",
  backgroundImage:
    "url(https://images.pexels.com/photos/20232209/pexels-photo-20232209/free-photo-of-escritorio-oficina-tecnologia-ordenador.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "0 32px",
}));

const Overlay = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)", // Oscurece la imagen de fondo para mejorar la legibilidad del texto
}));

const Content = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  height: "100%",
  color: "#fff",
  padding: theme.spacing(0, 2),
  margin: 0,
}));


const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <HeaderBar />
      <HeroSectionContainer>
        <Overlay />
        <Content maxWidth="md">
          <Typography variant="h3" gutterBottom>
            Bienvenido a FINTEST
          </Typography>
          <Typography variant="body1" sx={{
            fontSize: 20,
            fontWeight: 300,
            color: '#ffffffbb'
          }} paragraph>
            Simula y gestiona transacciones bancarias con precisión en un
            entorno seguro y eficiente.
          </Typography>
          <Box mt={4}>
            <Button onClick={() => navigate('/test')} variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Soy Adquiriente
            </Button>
            <Button onClick={() => navigate('/test')} variant="contained" color="primary">
              Soy Emisor
            </Button>
          </Box>
        </Content>
      </HeroSectionContainer>
    </div>
  );
};

export default HomePage;
