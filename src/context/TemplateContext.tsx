import { createContext } from "react";
import { TemplateContextState } from "./TemplateProvider";

export const TemplateContext = createContext<TemplateContextState | null>(null);