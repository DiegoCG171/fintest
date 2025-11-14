import { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { closeModal, useAppDispatch } from "../../../store";
import { useToast } from "../../../config/hooks/useToast";
import { logoutThunk } from "../../../store/slices/auth/login.thunk";

export function SessionWarning() {
  const dispatch = useAppDispatch();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const { showToast } = useToast();

  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!timerActive || hasInteracted) return;

    if (secondsLeft <= 0) {
      setHasInteracted(true);
      dispatch(logoutThunk());
      showToast("La sesión se ha cerrado", "warning");
      return;
    }

    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, timerActive, hasInteracted, dispatch, showToast]);

  function handleLogout() {
    if (hasInteracted) return;
    setHasInteracted(true);
    setTimerActive(false);
    dispatch(logoutThunk());
    showToast("La sesión se ha cerrado", "warning");
  }

  function handleContinue(): void {
    setTimerActive(false);
    dispatch(closeModal());
    showToast("Tu sesión continuará activa", "success");
  }

  return (
    <Box>
      <Typography
        variant="h6"
        mb={2}
      >
        ¿Quieres continuar con tu sesión?
      </Typography>

      <Typography mb={2}>
        Has estado inactivo por más de 5 minutos.
        <br />
        Esta sesión se cerrará automáticamente en{" "}
        <strong>{secondsLeft} segundos</strong> si no respondes.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 3, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Cerrar sesión
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
        >
          Continuar
        </Button>
      </Stack>
    </Box>
  );
}
