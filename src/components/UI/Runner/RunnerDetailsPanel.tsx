import { Box, Button, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TestCaseDetails } from "../../../config/interfaces";
import { getFieldValue } from "../../../config/utils/fieldRunner";
import { getStepColor } from "../../../config/utils/iconRunner";

const panelStyles = (visible: boolean) => ({
  px: visible ? 4 : 0,
  display: "flex",
  flexDirection: "column",
  height: "calc(100% - 4rem)",
  justifyContent: "space-between",
  width: visible ? "20rem" : 0,
  maxWidth: visible ? "20rem" : 0,
  opacity: visible ? 1 : 0,
  overflow: "hidden",
  transition: "max-width 0.5s ease, opacity 0.4s ease",
  pointerEvents: visible ? "auto" : "none",
});

interface Props {
  visible: boolean;
  testCaseDetails: TestCaseDetails;
  onViewDetails: () => void;
  loading: boolean;
}

export const RunnerDetailsPanel = ({
  visible,
  testCaseDetails,
  onViewDetails,
  loading,
}: Props) => (
  <Box sx={panelStyles(visible)}>
    <Box display="flex" flexDirection="column">
      <h3>{testCaseDetails.name}</h3>
      {["ID", "Tipo de Mensaje", "Tipo de Transacción"].map((key) => (
        <Typography key={key} sx={{ fontSize: 12, fontWeight: 600 }}>
          {key}:{" "}
          <span style={{ fontStyle: "italic" }}>
            {getFieldValue(testCaseDetails.message, key)}
          </span>
        </Typography>
      ))}
      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
        Estado:{" "}
        <span
          style={{
            color: getStepColor(testCaseDetails.status),
            fontStyle: "italic",
          }}
        >
          {testCaseDetails.status}
        </span>
      </Typography>
      <Button
        sx={{ mt: 4, fontSize: "12px", alignSelf: "end" }}
        variant="outlined"
        startIcon={<VisibilityIcon />}
        onClick={onViewDetails}
        disabled={loading}
      >
        Ver detalle
      </Button>
    </Box>
  </Box>
);

