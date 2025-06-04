import { createContext } from "react";
import { PopMenuContextProps } from "../interfaces";

export const PopMenuContext = createContext<PopMenuContextProps | undefined>(undefined);