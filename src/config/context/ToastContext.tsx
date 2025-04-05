import { createContext } from "react";
import { ToastContextType } from "../interfaces";

export const ToastContext = createContext<ToastContextType | null>(null);
