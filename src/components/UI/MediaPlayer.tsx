import { Box, Stack, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import {
  clearServer,
  clearServerError,
  clearStopServerError,
  startServerThunk,
  stopServerThunk,
  useAppDispatch,
  useAppSelector,
} from "../../store";
import { useEffect, useState } from "react";

function MediaPlayer() {
  const dispatch = useAppDispatch();

  const playStatus = useAppSelector((state) => state.server.status);
  const stopStatus = useAppSelector((state) => state.server.stopServerStatus);
  const serverId = useAppSelector((state) => state.server.server?.id);
  const serverIP = useAppSelector((state) => state.server.server?.ip);
  const playError = useAppSelector((state) => state.server.error);
  const stopError = useAppSelector((state) => state.server.stopServererror);

  const [playerMessage, setPlayerMessage] = useState("");

  const clearErrors = () => {
    dispatch(clearServerError());
    dispatch(clearStopServerError());
  };

  const startServer = async () => {
    clearErrors();
    try {
      await dispatch(startServerThunk()).unwrap();
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
    }
  };

  const stopServer = () => {
    clearErrors();
    if(serverId) {
      try {
        dispatch(stopServerThunk(serverId))
          .unwrap()
      } catch (error) {
        console.error("Error al detener el servidor:", error);
      } finally {
        dispatch(clearServer())
      }
    }
  };

  useEffect(() => {
    if (playStatus === "loading") {
      setPlayerMessage("Conectando...");
    }
    if (playStatus === "success" && serverIP) {
      setPlayerMessage(`Escuchando ${serverIP}`);
    }
    if (playStatus === "error") {
      setPlayerMessage(playError ?? "Ocurrió un error");
    }
    if (stopStatus === "loading") {
      setPlayerMessage("Desconectando...");
    }
    if (stopStatus === "success") {
      setPlayerMessage("");
    }
    if (stopStatus === "error") {
      setPlayerMessage(stopError ?? "Ocurrió un error");
    }
  }, [playStatus, serverIP, playError, stopStatus, stopError]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        border: 2,
        padding: 2,
        borderColor: (theme) => theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          sx={{
            display: "inline-block",
            color: (theme) => theme.palette.text.disabled,
            fontSize: 12,
            animation: "slideLoop 10s linear infinite",
            "@keyframes slideLoop": {
              "0%": {
                transform: "translateX(100%)",
              },
              "100%": {
                transform: "translateX(-100%)",
              },
            },
          }}
        >
          {playerMessage}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: 1,
        }}
      >
        <PauseIcon sx={{ cursor: "pointer" }} />
        <PlayCircleFilledWhiteIcon
          sx={{
            fontSize: 36,
            cursor: "pointer",
          }}
          onClick={startServer}
        />
        <StopIcon
          sx={{ cursor: "pointer" }}
          onClick={stopServer}
        />
      </Stack>
    </Box>
  );
}
export default MediaPlayer;
