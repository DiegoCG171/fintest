import { apiBare } from "../../api/apiBare";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const renewToken = async (): Promise<{ token: string }> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token available for renewal");
  }

  try {
    const { data } = await apiBare.get<{ token: string }>(ENDPOINTS.renewToken, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
