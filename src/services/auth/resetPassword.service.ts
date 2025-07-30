import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { ResetPassword } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { getEncrypted } from "../../config/utils/passwordEncrypt";

export const resetPassword = async (resetPasswordData: ResetPassword) => {
  const encryptedPassword = getEncrypted(resetPasswordData.newPassword);
  try {
    const { data } = await api.post(ENDPOINTS.resetPassword, { newPassword: encryptedPassword },
            {
                headers: {
                    Authorization: `Bearer ${resetPasswordData.token}`
                }
            });
    return data.message;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
