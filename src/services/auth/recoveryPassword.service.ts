import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { RootRecoveryPssw } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const recoveryPssw = async (email: string): Promise<RootRecoveryPssw> => {
    try {
        const response = await api.post<RootRecoveryPssw>(ENDPOINTS.recoveryPssw, { email: email });
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};