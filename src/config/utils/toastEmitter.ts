type ToastType = "success" | "error" | "warning" | "info";

type ToastListener = (message: string, type: ToastType) => void;

const listeners: ToastListener[] = [];

export const subscribeToast = (listener: ToastListener) => {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index >= 0) listeners.splice(index, 1);
  };
};

export const emitToast = (message: string, type: ToastType = "success") => {
  listeners.forEach((listener) => listener(message, type));
};
