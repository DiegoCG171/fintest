import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export const blinkAnimation = {
  animation: "blink 2.5s infinite",
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
};

export function getStepIcon(description: string) {
  switch (description.toLowerCase()) {
    case "terminado":
      return <CheckCircleIcon color="success" />;
    case "en progreso...":
      return <ScheduleIcon style={{ ...blinkAnimation }} color="info" />;
    case "pendiente...":
      return <HistoryIcon color="disabled" />;
    default:
      return <HelpOutlineIcon color="error" />;
  }
}

export function getStepColor(description: string): string {
  switch (description.toLowerCase()) {
    case "terminado":
      return "#2e7d32";
    case "en progreso...":
      return "#0288d1";
    case "pendiente...":
      return "#9e9e9e";
    default:
      return "#d32f2f";
  }
}
