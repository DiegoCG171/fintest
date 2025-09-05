import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { GetFilters } from "../../config/interfaces";
import {
  CreateSecurityPermission,
  CreateSecurityRol,
  Permission,
  Rol,
} from "../../config/interfaces/security.interface";
import { handleAxiosError } from "../../config/utils/axiosErrorHandler";

export const getAllSecurityRoles = async (filters?: GetFilters) => {
  try {
    const response = await api.get(`${ENDPOINTS.securityRol}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getAllSecurityPermissions = async (filters?: GetFilters) => {
  try {
    const response = await api.get(`${ENDPOINTS.securityPermissions}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getAllSecurityAction = async (filters?: GetFilters) => {
  try {
    const response = await api.get(`${ENDPOINTS.securityAction}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const getAllSecurityResource = async (filters?: GetFilters) => {
  try {
    const response = await api.get(`${ENDPOINTS.securityResource}`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const createSecurityRol = async (body: CreateSecurityRol) => {
  try {
    const response = await api.post(ENDPOINTS.securityRol, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const createSecurityPermission = async (
  body: CreateSecurityPermission
) => {
  try {
    const response = await api.post(ENDPOINTS.securityPermissions, body);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const updateSecurityRoles = async (id: string, body: Partial<Rol>) => {
  try {
    const response = await api.patch(`${ENDPOINTS.securityRol}/${id}`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const updateSecurityPermission = async (
  id: string,
  body: Partial<Permission>
) => {
  try {
    const response = await api.patch(
      `${ENDPOINTS.securityPermissions}/${id}`,
      body
    );
    return response;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const deleteSecurityRoles = async (id: string) => {
  try {
    const response = await api.delete(`${ENDPOINTS.securityRol}/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};

export const deleteSecurityPermissions = async (id: string) => {
  try {
    const response = await api.delete(`${ENDPOINTS.securityPermissions}/${id}`);
    return response;
  } catch (error) {
    const errorMessage = handleAxiosError(error);
    throw errorMessage;
  }
};
