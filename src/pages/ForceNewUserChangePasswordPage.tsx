import { Box, Button, Container, Stack, Typography } from "@mui/material";
import backgroundImage from "../assets/bg-fintest.svg";
import logo from "../assets/logo.svg";
import SplashComponent from "../components/UI/SplashComponent";
import { useAppDispatch, useAppSelector } from "../store";
import { activeChangePassword } from "../store/slices/auth/auth.slice";
import { ChangePasswordForm } from "./Auth/change-password/ChangePasswordForm";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const ForceNewUserChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user?.names);
  const status = useAppSelector((state) => state.auth.user?.status);
  const changePasswordActive = useAppSelector(
    (state) => state.auth.changePasswordActive
  );
  const title = `${user}, te damos la bienvenida a`;
  const subtitle =
    "Para continuar, es necesario que cambies tu contraseña y asegures tu cuenta.";

  const handleNavigate = () => {
    dispatch(activeChangePassword());
  };

  const firstCard = () => (
    <Stack spacing={8}>
      <Stack spacing={4} alignItems="center">
        <Typography align="center" variant="h6" color="common.white">
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
          {subtitle}
        </Typography>
      </Stack>
      <Stack
        spacing={8}
        direction="row"
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Button
          variant="contained"
            startIcon={<LockOutlinedIcon />}
          onClick={handleNavigate}
        >
          Cambiar contraseña
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
      <Box
        sx={{
          position: "relative",
          width: 560,
          minHeight: 400,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
          }}
        >
          {changePasswordActive && (
            <Container
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 560,
                  maxHeight: "90vh",
                  minHeight: 400,
                  p: 8,
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  overflow: "auto",
                }}
              >
                <ChangePasswordForm
                  title="Cambiar Contraseña"
                  description="Por seguridad, debes ingresar tu contraseña actual y definir una nueva."
                />
              </Box>
            </Container>
          )}
          {!changePasswordActive && status === "new" && (
            <SplashComponent>{firstCard()}</SplashComponent>
          )}
        </Box>
      </Box>
    </Box>
  );
};
