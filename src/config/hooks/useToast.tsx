import { useCallback, useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import { ToastType } from "../interfaces";

export const useToast = () => {
  const context = useContext(ToastContext);
  const showToast = useCallback((message: string, type: ToastType) => {
    if(!context) return;
    context.initToast(message, type);
  }, [context]);

  return { showToast };
};

