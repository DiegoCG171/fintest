import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { GetFilters, RootRules } from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";
import { RuleState } from "../../store/slices/extractionsRules/extractionRulesSlice";

export const getRules = async (
    params?: Record<string, string | number | boolean>
): Promise<RootRules> => {
    try {
        const response = await api.get<RootRules>(ENDPOINTS.getRules, { params });
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const getAllRules = async (filters?: GetFilters) => {
  try {
    const response = await api.get(`${ENDPOINTS.getRules}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getRuleById = async (
    uuid: string
): Promise<RuleState> => {
    try {
        const response = await api.get<RuleState>(`${ENDPOINTS.getRules}/${uuid}`);
        return response.data;
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        throw errorMessage;
    }
};

export const deleteRule = async (id: string) => {
  try {
    const response = await api.delete(`${ENDPOINTS.getRules}/${id}`);
    return response;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
