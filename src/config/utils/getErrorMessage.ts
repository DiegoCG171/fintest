export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === "string") {
        return error;
    }
    if (typeof error === "object" && error !== null && "message" in error) {
        return String((error as Record<string, unknown>).message);
    }
    return "Ocurrió un error inesperado";
};