import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { PatchGenerationTemplate, TemplateRoot } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getTemplate = async (): Promise<TemplateRoot> => {
    try {
        const response = await api.get(ENDPOINTS.template);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}
export const updateTemplate = async (id: string, payload: PatchGenerationTemplate ): Promise<unknown> => {
    try{
        const response = await api.patch(`${ENDPOINTS.template}/${id}`, payload);
        return response.data
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
} 