import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { onToggleModalConfig } from "../../store/ui/uiSlice";
import { Box, Modal } from "@mui/material";
import JsonEditor from "./JsonEditor";
// import { JsonEditor } from 'json-edit-react'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const ModalMessage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalConfig } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(onToggleModalConfig(false));
  };

  return (
    <Modal
      open={modalConfig?.isOpen || false}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style,  height: '80vh', overflowY: 'auto', p: 1, borderRadius: '8px'}}>
      <JsonEditor />
      </Box>
    </Modal>
  );
};
