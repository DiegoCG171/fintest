import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { PatchGenerationTemplate } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
 
export interface CreateTestCase {
  id_template: string;
  id_collection: string;
}

export interface UpdateTestCase {
    name: string;
}

export const createTestCase = async (body: CreateTestCase) => {
  try {
    const { data } = await api.post(ENDPOINTS.testCases, body);
    return data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const updateTestCase = async (id: string, body: PatchGenerationTemplate) => {
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

export const getTestCases = async () => {
    try {
        const response = await api.get(`${ENDPOINTS.testCases}`);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};