import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { toggleConfirmSessionModal } from "../../../store/slices/UI/confirmSession/modalCoinfirmSession.slice";
import { openSession } from "../../../store/slices/sessions/sessionSlice";
import {
  createSessionThunk,
  removeSessionThunk,
} from "../../../store/slices/sessions/session.thunk";

export const ModalConfirmSession = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modalConfirmSession);
  const { id, prevConfigCreateSession } = useAppSelector(
    (state) => state.session
  );

  const handleConfirm = () => {
    dispatch(toggleConfirmSessionModal(false));
    dispatch(openSession());
  };

  const handleCancel = () => {
    dispatch(removeSessionThunk(id))
      .unwrap()
      .then(() => {
        dispatch(createSessionThunk(prevConfigCreateSession));
      })
      .catch((error) => {
        console.error("Error al eliminar sesión:", error);
      });
  };

  return (
    <Portal>
      <Modal open={isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            outline: "none",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sesión pendiente detectada
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Se ha detectado una sesión de ejecución de casos de prueba que no
            fue finalizada.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ¿Deseas continuar desde donde la dejaste o crear una nueva sesión?
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleConfirm}
              variant="contained"
            >
              Continuar
            </Button>
            <Button
              startIcon={<AddCircleIcon />}
              onClick={handleCancel}
              variant="contained"
            >
              Nueva
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Portal>
  );
};
