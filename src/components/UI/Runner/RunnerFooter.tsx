import { Box, Typography } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { StartServerSuccessResponse } from "../../../config/interfaces";

interface RunnerFooterProps {
  server: StartServerSuccessResponse | null;
  onStart: () => void;
  onStop: () => void;
}

export const RunnerFooter = ({ server, onStart, onStop }: RunnerFooterProps) => (
  <Box
    py={1}
    px={1}
    sx={{
      borderTop: "solid 1px #D9D9D9",
      alignItems: "center",
      display: "flex",
    }}
  >
    {server ? (
      <StopIcon sx={{ opacity: 0.5, cursor: "pointer" }} onClick={onStop} />
    ) : (
      <PlayCircleOutlineIcon
        sx={{ opacity: 0.5, cursor: "pointer" }}
        onClick={onStart}
      />
    )}
    <Typography sx={{ fontSize: "12px", marginLeft: 2 }}>
      {server
        ? `Escuchando ${server.ip}:${server.portNumber}`
        : "Detenido..."}
    </Typography>
  </Box>
);

