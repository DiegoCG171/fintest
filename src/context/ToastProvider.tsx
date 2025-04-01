import { useState } from "react";
import { DefaultConfigProps } from "../config/interfaces/type.interface";
import { Alert, Snackbar } from "@mui/material";
import { ToastContext } from "./ToastContext";

export interface ToastState {
  open: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export interface ToastContextType {
    showToast: (message: string, type?: "success" | "error" | "warning" | "info") => void;
  }
  

export const ToastProvider = ({ children }: DefaultConfigProps) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
  });

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
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={toast.type}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
