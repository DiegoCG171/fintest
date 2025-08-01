import { Box, Button, Modal, Portal, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteCategorieThunk, getCategoriesByMethodThunk, useAppDispatch, useAppSelector } from "../../../store";
import { closeConfirmDeleteModal } from "../../../store/slices/UI/confirmDeleteModal/confirmDeleteModal.slice";
import {
  deleteCollectionThunk,
  deleteTestCaseThunk,
  getCollectionsThunk,
} from "../../../store/slices/collections/collections.thunk";
import { useParams } from "react-router-dom";
import { useToast } from "../../../config/hooks/useToast";
import { useEffect, useState } from "react";

const resourceActions = {
  testCase: {
    deleteThunk: deleteTestCaseThunk,
    toastMessage: "Caso de uso eliminado correctamente",
    title: "¿Estás seguro de que deseas eliminar el caso de uso?",
  },
  collection: {
    deleteThunk: deleteCollectionThunk,
    toastMessage: "Colección eliminada correctamente",
    title: "¿Estás seguro de que deseas eliminar la colección?",
  },
  category: {
    deleteThunk: deleteCategorieThunk,
    toastMessage: "Categoria eliminada correctamente",
    title: "¿Estás seguro de que deseas eliminar la categoría?",
  },
} as const;

type ResourceKey = keyof typeof resourceActions;

const isValidResource = (r: string): r is ResourceKey => {
  return r in resourceActions;
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  outline: "none",
};

export const ModalConfirmDelete = () => {
  const { method, type } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { isOpen, id, resource } = useAppSelector(
    (state) => state.confirmDeleteModal
  );
  const [titleText, setTitleText] = useState(
    "¿Estás seguro de que deseas eliminar esto?"
  );

  const handleConfirm = async () => {
    if (!isValidResource(resource)) return;

    const config = resourceActions[resource];
    await dispatch<unknown>(config.deleteThunk(id));
    if (method && type) {
      await dispatch(getCollectionsThunk(`${method}/${type}`));
      await dispatch(getCategoriesByMethodThunk(`${method}/${type}`))
    }
    dispatch(closeConfirmDeleteModal());
    showToast(config.toastMessage, "success");
  };

  const handleCancel = () => {
    dispatch(closeConfirmDeleteModal());
  };

  useEffect(() => {
    if (isValidResource(resource)) {
      setTitleText(resourceActions[resource].title);
    }
  }, [resource]);

  return (
    <Portal>
      <Modal open={isOpen}>
        <Box sx={modalStyle}>
          <Typography variant="h6">{titleText}</Typography>
          <Typography sx={{ mt: 2 }}>
            Una vez eliminado, no podrás recuperar este contenido.
          </Typography>
          <Stack spacing={2} direction="row" justifyContent="end" mt={4}>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleConfirm}
              variant="contained"
              color="error"
            >
              Eliminar
            </Button>
            <Button
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              variant="contained"
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Portal>
  );
};
