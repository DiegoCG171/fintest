import { Box, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
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

export const RunnerSideBar = () => {
  const dispatch = useAppDispatch();

  const {
    isActive,
    activeSession,
    isOpenDetails,
    completedCount,
    loading,
    id
  } = useAppSelector((state) => state.session);
  const { server } = useAppSelector((state) => state.server);

  const [testCaseDetails, setTestCaseDetails] = useState<TestCaseDetails>({
    name: "",
    message: null,
    status: "terminado",
  });

  const handleToggleSessionDetails = (open: boolean) => {
    dispatch(toggleSessionDetails(open));
  };

  const handleSetTestCaseDetails = (test: TestCaseDetails) => {
    dispatch(toggleSessionDetails(test.status === "Terminado"));
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
    dispatch(removeSessionThunk(id));
  };

  const handleStartServer = () => {
    dispatch(startServerThunk());
  };

  const handleStopServer = () => {
    if (server) dispatch(stopServerThunk(server.id));
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
          {/* Header */}
          <RunnerHeader
            isOpenDetails={isOpenDetails}
            onCloseDetails={() => handleToggleSessionDetails(false)}
          />

          {/* Content */}
          <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
            {/* Step list */}
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
                sx={{ fontSize: 12, color: "#9e9e9e", alignSelf: "end", marginBottom: 1 }}
              >
                {completedCount} de {activeSession.length} Completados
              </Typography>
            </Box>

            {/* Details panel */}
            <RunnerDetailsPanel
              visible={isOpenDetails}
              testCaseDetails={testCaseDetails}
              onViewDetails={() => handleViewMessage(testCaseDetails)}
              loading={loading}
            />
          </Box>

          {/* Footer */}
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

