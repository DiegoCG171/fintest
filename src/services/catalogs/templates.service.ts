import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import {
  CreateTemplate,
  PatchGenerationTemplate,
  TemplateContextType,
} from "../../config/interfaces";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getTemplate = async (): Promise<TemplateContextType[]> => {
  try {
    const response = await api.get(ENDPOINTS.template);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
export const updateTemplate = async (
  id: string,
  payload: PatchGenerationTemplate
): Promise<TemplateContextType> => {
  try {
    const response = await api.patch(`${ENDPOINTS.template}/${id}`, payload);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const createTemplate = async (
  template: CreateTemplate
): Promise<TemplateContextType> => {
  try {
    const response = await api.post<TemplateContextType>(
      ENDPOINTS.template,
      template
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getTemplateById = async (
  id: string
): Promise<TemplateContextType> => {
  try {
    const response = await api.get(`${ENDPOINTS.template}/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getTemplatesBackup = async () => {
  try {
    const response = await api.get(`${ENDPOINTS.template}/backup`, {
      responseType: 'blob',
    });

    const blob = new Blob([response.data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Crear un <a> para forzar la descarga
    const link = document.createElement('a');
    link.href = url;
    link.download = 'templates-backup.json';
    document.body.appendChild(link);
    link.click();

    // Limpieza
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

