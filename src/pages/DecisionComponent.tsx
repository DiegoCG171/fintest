import { Box, Button, Stack, Typography } from "@mui/material";
import backgroundImage from "../assets/bg-fintest.svg";
import logo from "../assets/logo.svg";
import SplashComponent from "../components/UI/SplashComponent";
import { useState } from "react";
import PersonAltOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import {
  getCategoriesByMethodThunk,
  useAppDispatch,
  useAppSelector,
} from "../store";
import { Link } from "react-router-dom";
import { getCollectionsThunk } from "../store/slices/collections/collections.thunk";
import { SettingsButton } from "../components/UI/Settings/SettingsButton";

function DecisionComponent() {
  const [flipped, setFlipped] = useState(false);
  const user = useAppSelector((state) => state.auth.user?.names);
  const title = `${user}, te damos la bienvenida a`;
  const dispatch = useAppDispatch();
  const firstCard = () => (
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
          {title}
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
          endIcon={<PersonAltOutlineOutlinedIcon />}
          onClick={() => setFlipped(true)}
        >
          Soy adquirente
        </Button>
        <Button
          variant="contained"
          disabled={true}
          endIcon={<PeopleAltOutlinedIcon />}
        >
          Soy emisor
        </Button>
      </Stack>
    </Stack>
  );

  const secondCard = () => (
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
          {title}
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
          Selecciona el entorno en el que deseas trabajar
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
          to="/pos/acquirer/detalles"
          sx={{ minWidth: 160 }}
          onClick={() => {
            dispatch(getCategoriesByMethodThunk("pos/acquirer"))
              .unwrap()
              .catch((err) => console.error("Error cargando categorías:", err));
            dispatch(getCollectionsThunk("pos/acquirer"))
              .unwrap()
              .catch((err) => console.error("Error cargando categorías:", err));
          }}
        >
          POS
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/atm/acquirer/detalles"
          sx={{ minWidth: 160 }}
          onClick={() => {
            dispatch(getCategoriesByMethodThunk("atm/acquirer"))
              .unwrap()
              .catch((err) => console.error("Error cargando categorías:", err));
            dispatch(getCollectionsThunk("atm/acquirer"))
              .unwrap()
              .catch((err) => console.error("Error cargando categorías:", err));
          }}
        >
          ATM
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "calc(100vh - 50px)",
        backgroundColor: "common.white",
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center center",
        perspective: 1000,
      }}
    >
      <SettingsButton />
      <Box
        sx={{
          position: "relative",
          width: 560,
          minHeight: 400,
          transformStyle: "preserve-3d",
          transition: "transform 0.8s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Cara frontal */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          <SplashComponent>{firstCard()}</SplashComponent>
        </Box>

        {/* Cara trasera */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <SplashComponent>{secondCard()}</SplashComponent>
        </Box>
      </Box>
    </Box>
  );
}

export default DecisionComponent;
