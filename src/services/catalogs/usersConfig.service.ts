import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { UserConfigPayload } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";



export const createUserConfig = async (body: {
  portNumber: number;
  targetHost: string;
  targetPort: number;
}) => {
  try {
    const response = await api.post(ENDPOINTS.userConfig, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getUserConfig = async (userId: string) => {
  try {
    const response = await api.get(`${ENDPOINTS.userConfig}/${userId}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const updateUserConfig = async (body: UserConfigPayload) => {
  try {
    const response = await api.put(`${ENDPOINTS.userConfig}/${body.userId}`, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
}

