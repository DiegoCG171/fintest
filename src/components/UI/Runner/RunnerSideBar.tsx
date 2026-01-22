import { Box, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  closeSession,
  toggleRunningSession,
  toggleSessionDetails,
} from "../../../store/slices/sessions/sessionSlice";
import { setActiveMessage } from "../../../store/slices/messages/messages.slice";
import {
  startServerThunk,
  stopServerThunk,
  useAppDispatch,
  useAppSelector,
} from "../../../store";
import { TestCaseDetails } from "../../../config/interfaces";
import { isTableRowDataWithFields } from "../../../config/utils/typeCheckers";
import { RunnerHeader } from "./RunnerHeader";
import { RunnerDetailsPanel } from "./RunnerDetailsPanel";
import { RunnerFooter } from "./RunnerFooter";
import RunnerStepList from "./RunnerStepList";
import { removeSessionThunk } from "../../../store/slices/sessions/session.thunk";
import { useParams } from "react-router-dom";
import { resolveTargetFromRoute } from "../../../config/utils/resolveTargetFromRoute";

export const RunnerSideBar = () => {
  const dispatch = useAppDispatch();
  const { type } = useParams();
  const {
    isActive,
    activeSession,
    isOpenDetails,
    completedCount,
    loading,
    id,
  } = useAppSelector((state) => state.session);
  const { server, configHost, configPort } = useAppSelector(
    (state) => state.server
  );
  const serverId = useAppSelector((state) => state.server.server?.id);

  const [testCaseDetails, setTestCaseDetails] = useState<TestCaseDetails>({
    name: "",
    message: null,
    status: "terminado",
  });

  const handleToggleSessionDetails = (open: boolean) => {
    dispatch(toggleSessionDetails(open));
  };

  const handleSetTestCaseDetails = (test: TestCaseDetails) => {
    dispatch(toggleSessionDetails(test.status));
    setTestCaseDetails(test);
  };

  const handleViewMessage = (test: TestCaseDetails) => {
    if (isTableRowDataWithFields(test.message)) {
      dispatch(
        setActiveMessage({
          id: test.message.ID,
          data: test.message.fields,
        })
      );
      dispatch(toggleSessionDetails(false));
    }
  };

  const handleCloseSession = () => {
    localStorage.removeItem(`session-results-${resolveTargetFromRoute()}`);
    if (activeSession.length === completedCount) {
      dispatch(closeSession());
      return;
    }

    dispatch(removeSessionThunk(id));
    if (server) dispatch(stopServerThunk(server.id));

  };

  const handleStartServer = () => {
    dispatch(
      startServerThunk({
        processingMethod: type,
        ip: configHost,
        portNumber: configPort,
      })
    ).unwrap();
  };

  const handleStopServer = () => {
    if (!serverId) return;
    if (server) dispatch(stopServerThunk(serverId));
  };

  useEffect(() => {
    if (completedCount === activeSession.length) {
      dispatch(toggleRunningSession(false));
    }
  }, [completedCount, activeSession, dispatch]);

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
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <RunnerHeader
            isOpenDetails={isOpenDetails}
            onCloseDetails={() => handleToggleSessionDetails(false)}
          />

          <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
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
                height: "calc(100%)",
                alignItems: "start",
              }}
            >
              <RunnerStepList
                isActive={isActive}
                activeSession={activeSession}
                completedCount={completedCount}
                onTestCaseSelect={handleSetTestCaseDetails}
                onCloseSession={handleCloseSession}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  color: "#9e9e9e",
                  alignSelf: "end",
                  marginBottom: 1,
                }}
              >
                {completedCount} de {activeSession.length} Completados
              </Typography>
            </Box>

            <RunnerDetailsPanel
              visible={isOpenDetails}
              testCaseDetails={testCaseDetails}
              onViewDetails={() => handleViewMessage(testCaseDetails)}
              loading={loading}
            />
          </Box>
          <RunnerFooter
            server={server}
            onStart={handleStartServer}
            onStop={handleStopServer}
          />
        </Box>
      </Drawer>
    </Box>
  );
};
