import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

interface CreateCollection {
  id_template: string;
  id_collection_created: string;
}

export interface UpdateTestCase {
    name: string;
}

export const createCollection = async (body: CreateCollection) => {
  try {
    const { data } = await api.post(ENDPOINTS.collections, body);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const updateTestCase = async (id: string, body: UpdateTestCase) => {
  try {
    const { data } = await api.patch(`${ENDPOINTS.testCases}/${id}`, body);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const deleteTestCase = async (id: string) => {
  try {
    const { data } = await api.delete(`${ENDPOINTS.testCases}/${id}`);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getTestCaseById = async (id: string) => {
    try {
        const response = await api.get(`${ENDPOINTS.testCases}`, {
            params: { id }
        });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};