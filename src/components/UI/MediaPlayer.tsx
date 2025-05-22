import { Box, Stack, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";
import { clearServerError, clearStopServerError, startServerThunk, stopServerThunk, useAppDispatch, useAppSelector } from "../../store";

function MediaPlayer() {

const dispatch = useAppDispatch();

const playStatus = useAppSelector((state) => state.server.status);
const stopStatus = useAppSelector((state) => state.server.stopServerStatus);
const serverId = useAppSelector((state)=> state.server.server?.id)

const clearErrors = () => {
  dispatch(clearServerError());
  dispatch(clearStopServerError())
}

const startServer = () => {
  if (playStatus === 'loading' || playStatus === 'success') return;
  console.log('Start server')
  clearErrors()
  dispatch(startServerThunk())
    .unwrap()
    .then(() => {

    })
    .catch(error => {
      console.error("Error al iniciar el servidor:", error);
    })
}

const stopServer = () => {
  console.log('Stop server')
  clearErrors();
  if(serverId) {
    dispatch(stopServerThunk(serverId))
      .unwrap()
      .then(() => {
  
      })
      .catch(error => {
        console.error("Error al detener el servidor:", error);
      })
  } else {
    console.error('No existe un servidor activo')
  }
}

const playerMessage = (() => {
  if (playStatus === 'loading') return 'Iniciando servidor...';
  if (stopStatus === 'loading') return 'Deteniendo servidor...';
  if (stopStatus === 'success') return `Deteniendo servidor ${serverId}`;
  if (playStatus === 'error' || stopStatus === 'error') return 'Ocurrió un error';
  if (playStatus === 'success') return `Escuchando ${serverId}`;
  return 'Detenido';
})();

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
      <Typography
        sx={{ 
            color: (theme) => theme.palette.text.disabled, fontSize: 13,
        }}
      >
        {playerMessage}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          mt: 1
        }}
      >
        <PauseIcon 
          sx={{cursor: "pointer"}}
        />
        <PlayCircleFilledWhiteIcon 
        sx={{ 
            fontSize: 36,
            cursor: "pointer",
        }}
        onClick={startServer}
        />
        <StopIcon sx={{cursor: "pointer"}} onClick={stopServer} />
      </Stack>
    </Box>
  );
}
export default MediaPlayer;
