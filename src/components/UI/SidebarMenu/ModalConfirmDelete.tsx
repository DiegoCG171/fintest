import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppDispatch, useAppSelector } from "../../../store";
import { closeConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import {
    deleteCollectionThunk,
  deleteTestCaseThunk,
  getCollectionsThunk,
} from "../../../store/slices/collections/collections.thunk";
import { useParams } from "react-router-dom";
import { useToast } from "../../../config/hooks/useToast";
import { useEffect, useState } from "react";

export const ModalConfirmDelete = () => {
  const { method, type } = useParams();
  const dispatch = useAppDispatch();
  const [titleText, setTitleText] = useState('¿Estás seguro de que deseas eliminar esto?');
  const { showToast } = useToast();
  const { isOpen, id, resource } = useAppSelector(
    (state) => state.confirmDeleteModal
  );

  const handleConfirm = async () => {
    if (resource === "testCase") {
      await dispatch(deleteTestCaseThunk(id));
      if (method && type) {
        await dispatch(getCollectionsThunk(`${method}/${type}`));
        dispatch(closeConfirmDeleteModal())
        showToast("Caso de uso eliminado correctamente", "error");
      }
    }

    if (resource === 'collection') {
         await dispatch(deleteCollectionThunk(id)).unwrap();
        if (method && type) {
          dispatch(getCollectionsThunk(`${method}/${type}`));
          dispatch(closeConfirmDeleteModal())
          showToast("Collección eliminada correctamente", "error");
        }
    }
  };

  const handleCancel = () => {
    dispatch(closeConfirmDeleteModal());
  };

  useEffect(() => {
    if (resource === 'collection') {
        setTitleText('¿Estás seguro de que deseas eliminar la colección?')
    }
    if (resource === 'testCase') {
        setTitleText('¿Estás seguro de que deseas eliminar el caso de uso?')
    }
  }, [resource]);

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
           {titleText}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Una vez eliminado, no podrás recuperar este contenido.
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleConfirm}
              variant="contained"
            >
              Eliminar
            </Button>
            <Button
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              variant="contained"
            >
              Canclear
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Portal>
  );
};

