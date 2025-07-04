import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { getEncrypted } from "../../config/utils/passwordEncrypt";

export const resetPssw = async (newPassword: string, token: string): Promise<unknown> => {
    const encryptedPassword = getEncrypted(newPassword);
    try {
        const response = await api.post<unknown>(
            ENDPOINTS.resetPssw,
            { newPassword: encryptedPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw handleAxiosError(error);
    }
};
