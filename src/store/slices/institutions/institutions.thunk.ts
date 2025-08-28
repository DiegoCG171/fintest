import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllInstitutions } from "../../../services/catalogs/institutions.service"

export const getAllInstitutionsThunk = createAsyncThunk('institutions/getAll', async (_, {rejectWithValue}) => {
    try {
       return await getAllInstitutions()
    } catch (error) {
        return rejectWithValue(error)
    }
})