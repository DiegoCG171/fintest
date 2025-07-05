import { Box, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface RunnerHeaderProps {
  isOpenDetails: boolean;
  onCloseDetails: () => void;
}


export const RunnerHeader = ({ isOpenDetails, onCloseDetails }: RunnerHeaderProps) => (
  <Box
    py={2}
    px={1}
    sx={{
      borderBottom: "solid 1px #D9D9D9",
      height: "3.6175rem",
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 500,
        borderLeft: "2px solid #222551",
        paddingLeft: "4px",
      }}
    >
      Ejecución de Casos de Prueba
    </Typography>
    {isOpenDetails && (
      <ChevronLeftIcon
        sx={{ opacity: 0.5, cursor: "pointer", pointerEvents: "auto" }}
        onClick={onCloseDetails}
      />
    )}
  </Box>
);