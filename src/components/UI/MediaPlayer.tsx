import { Box, Stack, Typography } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

function MediaPlayer() {
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
        Escuchando 127.0.0.1:3001
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
        />
        <StopIcon sx={{cursor: "pointer"}} />
      </Stack>
    </Box>
  );
}
export default MediaPlayer;
