import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RecoveryTokenResponse } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const recoveryToken = async (email: string) => {
  try {
    const {data} = await api.post<RecoveryTokenResponse>(ENDPOINTS.recoveryPssw, { email });
    return data.message
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
