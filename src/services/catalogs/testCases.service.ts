import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";


export const createCollection = async (body: {id_template: string, id_collection_created: string}) => {
    try {
        const {data} = await api.post(ENDPOINTS.collections, body);
        return data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
}