import { createContext } from "react";
import { TemplateContextState } from "../interfaces";

export const TemplateContext = createContext<TemplateContextState | null>(null);