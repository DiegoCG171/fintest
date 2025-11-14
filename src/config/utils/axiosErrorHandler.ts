import { AxiosError } from "axios";

export function handleAxiosError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Error en el servicio:", error.response.data.message);
      return error.response.data.message;
    } else {
      console.error("Error en el servicio:", error.message);
      return error.message;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Error desconocido al intentar realizar la operación.";
  }
}
