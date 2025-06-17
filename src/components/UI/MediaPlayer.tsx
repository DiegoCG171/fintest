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
import { useCallback, useEffect, useState } from "react";

function MediaPlayer() {
  const dispatch = useAppDispatch();

  const playStatus = useAppSelector((state) => state.server.status);
  const stopStatus = useAppSelector((state) => state.server.stopServerStatus);
  const serverId = useAppSelector((state) => state.server.server?.id);
  const serverIP = useAppSelector((state) => state.server.server?.ip);
  const serverPort = useAppSelector((state) => state.server.server?.portNumber);
  const playError = useAppSelector((state) => state.server.error);
  const stopError = useAppSelector((state) => state.server.stopServererror);

  const [playerMessage, setPlayerMessage] = useState("");

  const clearErrors = useCallback(() => {
    dispatch(clearServerError());
    dispatch(clearStopServerError());
  }, [dispatch]);

  const startServer = useCallback(async () => {
    clearErrors();
    try {
      await dispatch(startServerThunk()).unwrap();
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
    }
  }, [dispatch, clearErrors]);

  const stopServer = () => {
    clearErrors();
    if (serverId) {
      try {
        dispatch(stopServerThunk(serverId)).unwrap();
      } catch (error) {
        console.error("Error al detener el servidor:", error);
      } finally {
        dispatch(clearServer());
      }
    }
  };

  useEffect(() => {
    if (playStatus === "loading") {
      setPlayerMessage("Conectando...");
    }
    if (playStatus === "success" && serverIP) {
      setPlayerMessage(`Escuchando ${serverIP} \n Puerto ${serverPort}`);
    }
    if (playStatus === "error") {
      setPlayerMessage(playError ?? "Ocurrió un error");
    }
    if (stopStatus === "loading") {
      setPlayerMessage("Desconectando...");
    }
    if (stopStatus === "success") {
      setPlayerMessage("Detenido...");
    }
    if (stopStatus === "error") {
      setPlayerMessage(stopError ?? "Ocurrió un error");
    }
  }, [playStatus, serverIP, playError, stopStatus, stopError, serverPort]);

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
          overflow: "visible",
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        <Typography
          sx={{
            display: "inline-block",
            color: (theme) => theme.palette.text.disabled,
            fontSize: 12,
          }}
        >
          {playerMessage.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
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
        <PauseIcon
          sx={{
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <PlayCircleFilledWhiteIcon
          sx={{
            fontSize: 36,
            cursor: playStatus === "success" ? "not-allowed" : "pointer",
            opacity: playStatus === "success" ? 0.5 : 1,
            pointerEvents: playStatus === "success" ? "none" : "auto",
            transition: "color 0.2s, transform 0.2s",
            "&:hover":
              playStatus === "success"
                ? {}
                : {
                    transform: "scale(1.1)",
                  },
            "&:active":
              playStatus === "success"
                ? {}
                : {
                    transform: "scale(0.95)"
                  },
          }}
          onClick={playStatus !== "success" ? startServer : undefined}
        />
        <StopIcon
          sx={{
            cursor: stopStatus === "success" ? "not-allowed" : "pointer",
            opacity: stopStatus === "success" ? 0.5 : 1,
            transition: "color 0.2s, transform 0.2s",
            "&:hover":
              stopStatus === "success"
                ? {}
                : {
                    transform: "scale(1.1)",
                  },
            "&:active":
              stopStatus === "success"
                ? {}
                : {
                    transform: "scale(0.95)"
                  },
          }}
          onClick={stopServer}
        />
      </Stack>
    </Box>
  );
}
export default MediaPlayer;
