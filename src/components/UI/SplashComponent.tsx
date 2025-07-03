import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PersonAltOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import logo from "../../assets/logo.svg";

function SplashComponent() {
  return (
    <Container
        sx={{
          width: 560,
          maxHeight: "90vh",
          minHeight: 400,
          backgroundColor: "primary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 2,
          overflow: "auto",
        }}
      >
        <Stack spacing={8}>
          <Stack
            spacing={4}
            alignItems="center"
          >
            <Typography
              align="center"
              variant="h6"
              color="common.white"
            >
              Bienvenido a
            </Typography>
            <Box
              component="img"
              src={logo}
              alt="Fintest logo"
              sx={{ filter: "brightness(0) invert(1)", height: 80 }}
            />
            <Typography
              align="center"
              variant="subtitle1"
              color="common.white"
              gutterBottom
            >
              <strong>Simula y gestiona</strong> transacciones bancarias con
              precisión en un <strong>entorno seguro y eficiente.</strong>
            </Typography>
          </Stack>
          <Stack
            spacing={8}
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Button
              variant="contained"
              component={Link}
              to="/main"
              endIcon={<PersonAltOutlineOutlinedIcon />}
            >
              Soy adquirente
            </Button>
            <Button
              variant="contained"
              disabled={true}
              component={Link}
              to="/register"
              endIcon={<PeopleAltOutlinedIcon />}
            >
              Soy emisor
            </Button>
          </Stack>
        </Stack>
      </Container>
  );
}

export default SplashComponent;
