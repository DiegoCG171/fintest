import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { ChangePasswordCredentials, LoginResponse } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { getEncrypted } from "../../config/utils/passwordEncrypt";


export const changePasswordService = async (body: ChangePasswordCredentials): Promise<LoginResponse> => {
    body.oldPassword = getEncrypted(body.oldPassword);
    body.newPassword = getEncrypted(body.newPassword);
    try {
        const response = await api.post<LoginResponse>(ENDPOINTS.changePassword, body);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

