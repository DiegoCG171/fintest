import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { TestCaseDetails } from "../../../config/interfaces";
import {
  blinkAnimation,
  getStepColor,
  getStepIcon,
} from "../../../config/utils/iconRunner";
import { SessionItem } from "../../../store/slices/sessions/sessionSlice";

interface RunnerStepListProps {
  isActive: boolean;
  activeSession: SessionItem[];
  completedCount: number;
  onTestCaseSelect: (test: TestCaseDetails) => void;
  onCloseSession: () => void;
}

const RunnerStepList = ({
  isActive,
  activeSession,
  completedCount,
  onTestCaseSelect,
  onCloseSession,
}: RunnerStepListProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={4} orientation="vertical" sx={{ py: 2 }}>
        {activeSession.map((session) => (
          <Step key={session.runnableId}>
            <StepLabel
              icon={getStepIcon(session.status)}
              onClick={() =>
                onTestCaseSelect({
                  name: session.name,
                  status: session.status,
                  message: session.message,
                })
              }
              sx={{ cursor: "pointer" }}
              optional={
                session.status === "En progreso..." ? (
                  <Typography
                    variant="caption"
                    sx={{
                      color: getStepColor(session.status),
                      fontWeight: 500,
                      ...blinkAnimation,
                    }}
                  >
                    Pendiente...
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    sx={{
                      color: getStepColor(session.status),
                      fontWeight: 500,
                    }}
                  >
                    {session.status}
                  </Typography>
                )
              }
            >
              {session.name}
            </StepLabel>
            <StepContent>
              <Typography>{session.status}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {isActive && (
          <Button
            onClick={onCloseSession}
            startIcon={
              completedCount === activeSession.length ? (
                <CheckCircle />
              ) : (
                <Cancel />
              )
            }
            sx={{ width: "100%" }}
          >
            {completedCount === activeSession.length ? "Finalizar" : "Cancelar"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default RunnerStepList;
