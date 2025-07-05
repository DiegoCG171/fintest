import api from "../../api/api";
import { ENDPOINTS } from "../../config/constants/endpoints";
import { CreateSessionPayload } from "../../store/slices/sessions/session.thunk";
import axios from "axios";

export const createSession = async (body: CreateSessionPayload) => {
  try {
    const { data } = await api.post(ENDPOINTS.session, body);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return error.response.data;
    }

    throw error;
  }
};
