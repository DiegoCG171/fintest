import { useContext } from "react";
import { PopMenuContext } from "../context/PopMenuContext";

export const usePopMenu = () => {
    const context = useContext(PopMenuContext);
    if (!context)
        throw new Error("PopMenuContext must be used within a provider");
    return context;
};
