import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { CreateSessionPayload } from "../../store/slices/sessions/session.thunk";
import axios from "axios";

export const createSession = async (body: CreateSessionPayload) => {
  try {
    const { data } = await api.post(ENDPOINTS.session, body);
    return {type: 'DEFAULT', data};
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return {type: 'SESSION_CONFLICT', data: error.response.data};
    }
    throw error;
  }
};

export const removeSession = async (id: string) => {
  try {
    const { data } = await api.delete(`${ENDPOINTS.session}/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return error.response.data;
    }

    throw error;
  }
};
