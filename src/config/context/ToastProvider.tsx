import { useState } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { ToastContext } from "./ToastContext";
import { WithChildrenProps, ToastState } from "../interfaces";

export const ToastProvider = ( { children }: WithChildrenProps ) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
  });

  const title = {
    'success': 'Éxito',
    'error': 'Error',
    'warning': 'Advertencia',
    'info': 'Info'
  }

  const showToast = (message: string, type: "success" | "error" | "warning" | "info" = "success") => {
    setToast({ open: true, message, type });
  };

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          <AlertTitle>{title[toast.type]}</AlertTitle>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
