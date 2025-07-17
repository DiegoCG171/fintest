import { useParams } from "react-router-dom";

export function useCreateCollections() {
    const { method, type } = useParams();
    const format = (value: string | undefined) => {
        if (!value) return undefined;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    };

    const origin = format(method);
    const processingMethod = format(type); 

    return {
        origin: origin?.toUpperCase(), 
        processingMethod,
    };
}
