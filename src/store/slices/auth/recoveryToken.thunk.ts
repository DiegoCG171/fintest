import { createAsyncThunk } from "@reduxjs/toolkit";
import {recoveryToken as recoveryTokenService} from '../../../services/auth/recoveryToken.service'

export const recoveryTokenThunk = createAsyncThunk("auth/recoveryToken", async (email: string, {rejectWithValue}) => {
    try {
        const message = await recoveryTokenService(email);
        return message
    } catch (error) {
        return rejectWithValue(error)
    }
})