import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { onToggleModalUpdate } from "../../store/ui/uiSlice";
import { Box, Modal } from "@mui/material";
import { JsonEditorUpdate } from "./JsonEditorUpdate";

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


export const ModalUpdateTemplate = () => {

  const dispatch: AppDispatch = useDispatch();
  const { modalUpdateTemplate } = useSelector((state: RootState) => state.ui);

  const handleClose = () => {
    dispatch(onToggleModalUpdate(false));
  };

  return (
    <Modal
      open={modalUpdateTemplate?.isOpen || false}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style,  height: '80vh', overflowY: 'auto', p: 1, borderRadius: '8px'}}>
        <JsonEditorUpdate />
      </Box>
    </Modal>
  )
}
