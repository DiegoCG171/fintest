import {
  Box,
  Button,
  Drawer,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ScheduleIcon from "@mui/icons-material/Schedule";
import HistoryIcon from "@mui/icons-material/History";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopIcon from "@mui/icons-material/Stop";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ReactNode, useEffect, useState } from "react";
import { startServerThunk, stopServerThunk, useAppDispatch, useAppSelector } from "../../../store";
import {
  closeSession,
  toggleRunningSession,
  toggleSessionDetails,
} from "../../../store/slices/sessions/sessionSlice";
import { FieldError, TableRowData } from "../../../config/interfaces";
import { setActiveMessage } from "../../../store/slices/messages/messages.slice";

const blinkAnimation = {
  animation: "blink 2.5s infinite",
  "@keyframes blink": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.5 },
    "100%": { opacity: 1 },
  },
};

const detailPanelStyles = (visible: boolean) => ({
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

const getStepIcon = (description: string) => {
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
};

const getStepColor = (description: string): string => {
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
};

interface TestCaseDetails {
  status: string;
  name: string;
  message: TableRowData | FieldError | ReactNode;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTableRowDataWithFields(
  obj: unknown
): obj is { ID: number | string; fields: TableRowData[] } {
  if (!isObject(obj)) {
    return false;
  }

  if (!("ID" in obj)) {
    return false;
  }

  if (!("fields" in obj)) {
    return false;
  }

  const fields = (obj as { fields: unknown }).fields;

  if (!Array.isArray(fields)) {
    return false;
  }

  for (const [, item] of fields.entries()) {
    if (!isObject(item)) {
      return false;
    }
  }

  return true;
}

function getFieldValue(
  message: TestCaseDetails["message"],
  key: string
): ReactNode | undefined {
  if (typeof message === "object" && message !== null && key in message) {
    return message[key as keyof typeof message];
  }
  return undefined;
}

export const RunnerSideBar = () => {
  const dispatch = useAppDispatch();
  const {
    isActive,
    activeSession,
    isOpenDetails,
    completedCount,
    loading,
  } = useAppSelector((state) => state.session);
  const { server } = useAppSelector((state) => state.server);

  const [testCaseDetails, setTestCaseDetails] = useState<TestCaseDetails>({
    name: "",
    message: null,
    status: "terminado",
  });

  const handleToggleSessionDetails = (isOpen: boolean) => {
    dispatch(toggleSessionDetails(isOpen));
  };

  const handleSetTestCaseDetails = (testCase: TestCaseDetails) => {
    dispatch(toggleSessionDetails(testCase.status === "Terminado"));
    setTestCaseDetails(testCase);
  };

  const handleViewMessage = (testCase: TestCaseDetails) => {
    if (isTableRowDataWithFields(testCase.message)) {
      dispatch(
        setActiveMessage({
          id: testCase.message.ID,
          data: testCase.message.fields,
        })
      );
      dispatch(toggleSessionDetails(false));
    }
  };

  useEffect(() => {
    if (completedCount === activeSession.length) {
      dispatch(toggleRunningSession(false));
    }
  }, [dispatch, completedCount, activeSession]);

  return (
    <Box>
      <Drawer
        variant={isOpenDetails ? "temporary" : "persistent"}
        open={isActive}
        anchor="left"
        slotProps={{
          paper: {
            sx: {
              transition: "none !important",
              transform: "none !important",
            },
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box sx={{ flex: 1, overflow: "hidden" }}>
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
                  sx={{
                    opacity: 0.5,
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                  onClick={() => handleToggleSessionDetails(false)}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", height: "100%" }}>
              <Box
                px={2}
                sx={{
                  minWidth: "15rem",
                  borderRight: isOpenDetails
                    ? "solid 1px #D9D9D9"
                    : "solid 1px transparent",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "calc(100% - 4rem)",
                  alignItems: "start",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Stepper
                    activeStep={4}
                    sx={{ paddingBlock: 2, width: "100%" }}
                    orientation="vertical"
                  >
                    {activeSession.map((session) => (
                      <Step key={session.runnableId}>
                        <StepLabel
                          icon={getStepIcon(session.status)}
                          onClick={() =>
                            handleSetTestCaseDetails({
                              name: session.name,
                              status: session.status,
                              message: session.message,
                            })
                          }
                          sx={{ cursor: "pointer" }}
                          optional={
                            session.status === "En progreso..." ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
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
                              </Box>
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
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => dispatch(closeSession())}
                      startIcon={
                        completedCount === activeSession.length ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      sx={{
                        paddingInline: 2
                      }}
                    >
                      {completedCount === activeSession.length
                        ? "Finalizar ejecución"
                        : "Cancelar ejecución"}
                    </Button>
                  </Box>
                </Box>
                <Typography
                  sx={{ fontSize: 12, color: "#9e9e9e", alignSelf: "end" }}
                >
                  {completedCount} de {activeSession.length} Completados
                </Typography>
              </Box>
              <Box px={4} sx={detailPanelStyles(isOpenDetails)}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h3>{testCaseDetails?.name}</h3>
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Id:{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      {getFieldValue(testCaseDetails.message, "ID")}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Tipo de mensaje:{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      {getFieldValue(
                        testCaseDetails.message,
                        "Tipo de Mensaje"
                      )}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Tipo de transacción:{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      {getFieldValue(
                        testCaseDetails.message,
                        "Tipo de Transacción"
                      )}
                    </span>
                  </Typography>
                  <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                    Estado:{" "}
                    <span
                      style={{
                        color: getStepColor(testCaseDetails.status),
                        fontStyle: "italic",
                      }}
                    >
                      {testCaseDetails?.status}
                    </span>
                  </Typography>
                  <Button
                    sx={{ marginTop: 4, fontSize: "12px", alignSelf: "end" }}
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleViewMessage(testCaseDetails)}
                    loading={loading}
                  >
                    Ver detalle
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
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
              <StopIcon
                sx={{
                  opacity: 0.5,
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onClick={() => dispatch(stopServerThunk(server.id))}
              />
            ) : (
              <PlayCircleOutlineIcon
                sx={{
                  opacity: 0.5,
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
                onClick={() => dispatch(startServerThunk())}
              />
            )}
            <Typography sx={{ fontSize: "12px", marginLeft: 2 }}>
              {server
                ? `Escuchando ${server?.ip}:${server?.portNumber}`
                : "Detenido..."}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
