import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

interface AuthState {
  user: User;
}

interface User {
  id: string;
}

const initialState: AuthState = {
  user: {
    id: "",
  },
};

export const startLogin = createAsyncThunk('auth/login', async(loginData: {username: string}, { rejectWithValue, dispatch}) => {
  try {
      const {data} = await api.post('/auth/login', {
        username: loginData.username,
        password: ""
      });
      localStorage.setItem('token', data.token)
      dispatch(onLogin(data))
      return data;
  } catch (error) {
      console.error(error)
      return rejectWithValue(error)
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state, action) => {
      state.user.id = action.payload.id;
    },
    onLogout: (state) => {
      state.user.id = "";
    },
  },
});

export const { onLogin, onLogout } = authSlice.actions;
