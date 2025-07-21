import { useEffect, useState } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { ToastContext } from "./ToastContext";
import { WithChildrenProps, ToastState } from "../interfaces";
import { subscribeToast } from "../utils/toastEmitter";

export const ToastProvider = ({ children }: WithChildrenProps) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
  });

  const title = {
    success: "Éxito",
    error: "Error",
    warning: "Advertencia",
    info: "Info",
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success",
    duration = 5000
  ) => {
    setToast({ open: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, open: false })), duration);
  };

  useEffect(() => {
    const unsubscribe = subscribeToast((message, type) => {
      showToast(message, type);
    });
    return () => unsubscribe();
  }, []);

  const initToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "success"
  ) => {
    setToast({ open: true, message, type });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    closeToast();
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast, initToast }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
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
