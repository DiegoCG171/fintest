import { Box, IconButton, Stack, Typography } from "@mui/material";
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
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "../../config/hooks/useToast";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useParams } from "react-router-dom";
import { toggleEmmisorModalConfig } from "../../store/slices/UI/emmisorModalConfig/emmisorModalConfig.slice";

function MediaPlayer() {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const playStatus = useAppSelector((state) => state.server.status);
  const stopStatus = useAppSelector((state) => state.server.stopServerStatus);
  const serverId = useAppSelector((state) => state.server.server?.id);
  const serverIP = useAppSelector((state) => state.server.server?.ip);
  const serverPort = useAppSelector((state) => state.server.server?.portNumber);
  const playError = useAppSelector((state) => state.server.error);
  const stopError = useAppSelector((state) => state.server.stopServererror);
  const configHost = useAppSelector((state) => state.server.configHost);
  const configPort = useAppSelector((state) => state.server.configPort);
  const [canStop, setCanStop] = useState<boolean>(() => Boolean(serverIP));
  const showToastRef = useRef(showToast);
  const { type } = useParams();

  const isEmisorRoute = type === "emmisor";

  const canPlayWithoutPort = () => {
    if (!isEmisorRoute) {
      return true;
    }

    const valid = Boolean(configHost && configPort);
    return valid;
  };

  const [playerMessage, setPlayerMessage] = useState("Detenido...");
  const updateMessage = useCallback((msg: string) => {
    setPlayerMessage((prev) => {
      return prev !== msg ? msg : prev;
    });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch(clearServerError());
    dispatch(clearStopServerError());
  }, [dispatch]);

  const startServer = useCallback(async () => {
    clearErrors();
    try {
      await dispatch(startServerThunk()).unwrap();
      setCanStop(true);
    } catch (error) {
      console.error("Error al iniciar el servidor:", error);
      showToastRef.current("Hubo un error al levantar la sesión", "error");
    }
  }, [dispatch, clearErrors]);

  const stopServer = useCallback(async () => {
    clearErrors();
    if (!serverId) return;
    try {
      await dispatch(stopServerThunk(serverId)).unwrap();
      setCanStop(false);
    } catch (error) {
      console.error("Error al detener el servidor:", error);
      showToast(String(error), "error");
    } finally {
      dispatch(clearServer());
    }
  }, [dispatch, clearErrors, serverId, showToast]);

  useEffect(() => {
    if (playStatus === "loading") {
      updateMessage("Conectando...");
    }
    if (playStatus === "success" && serverIP) {
      updateMessage(`Escuchando ${serverIP}:${serverPort}`);
    }
    if (playStatus === "error") {
      updateMessage("Detenido...");
      showToastRef.current("Hubo un error al levantar la sesión", "error");
    }
    if (stopStatus === "loading") {
      updateMessage("Desconectando...");
    }
    if (stopStatus === "success") {
      updateMessage("Detenido...");
    }
    if (stopStatus === "error") {
      updateMessage("Detenido...");
    }
  }, [
    playStatus,
    serverIP,
    playError,
    stopStatus,
    stopError,
    serverPort,
    showToastRef,
    updateMessage,
  ]);

  useEffect(() => {
    setCanStop(Boolean(serverIP) && Boolean(serverId));
  }, [serverIP, serverId, playStatus]);

  const handleToggleEmmisorModalConfig = () => {
    dispatch(toggleEmmisorModalConfig(true));
  };

  return (
    <Box
      sx={{
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        border: 2,
        padding: 2,
        borderColor: (theme) => theme.palette.background.default,
      }}
    >
      {type === "emmisor" && (
        <IconButton
          sx={{
            position: "absolute",
            top: 4,
            right: 4,
          }}
          size="small"
          onClick={handleToggleEmmisorModalConfig}
        >
          <SettingsOutlinedIcon
            sx={{
              fontSize: 14,
              color: configHost && configPort ? "#30b94cff" : "#f04747ff",
            }}
          />
        </IconButton>
      )}
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
            fontWeight: 600,
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
        <PauseIcon
          sx={{
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <PlayCircleFilledWhiteIcon
          sx={{
            fontSize: 36,
            cursor:
              playStatus === "success" || !canPlayWithoutPort()
                ? "not-allowed"
                : "pointer",
            opacity:
              playStatus === "success" || !canPlayWithoutPort() ? 0.5 : 1,
            pointerEvents:
              playStatus === "success" || !canPlayWithoutPort()
                ? "none"
                : "auto",
            transition: "color 0.2s, transform 0.2s",
            "&:hover":
              playStatus === "success" || !canPlayWithoutPort()
                ? {}
                : {
                    transform: "scale(1.1)",
                  },
            "&:active":
              playStatus === "success" || !canPlayWithoutPort()
                ? {}
                : {
                    transform: "scale(0.95)",
                  },
          }}
          onClick={
            playStatus !== "success" || canPlayWithoutPort()
              ? startServer
              : undefined
          }
        />
        <StopIcon
          sx={{
            cursor:
              canStop && stopStatus !== "loading" ? "pointer" : "not-allowed",
            opacity: canStop && stopStatus !== "loading" ? 1 : 0.5,
            transition: "color 0.2s, transform 0.2s",
            "&:hover":
              canStop && stopStatus !== "loading"
                ? { transform: "scale(1.1)" }
                : {},
            "&:active":
              canStop && stopStatus !== "loading"
                ? { transform: "scale(0.95)" }
                : {},
          }}
          onClick={canStop && stopStatus !== "loading" ? stopServer : undefined}
        />
      </Stack>
    </Box>
  );
}
export default MediaPlayer;
