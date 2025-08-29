import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteInstitution, getAllInstitutions, updateInstitution } from "../../../services/catalogs/institutions.service"
import { Institution } from "../../../config/interfaces"

export const getAllInstitutionsThunk = createAsyncThunk('institutions/getAll', async (_, {rejectWithValue}) => {
    try {
       return await getAllInstitutions()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteInstitutionsThunk = createAsyncThunk('institutions/remove', async (id: string, {rejectWithValue}) => {
    try {
        await deleteInstitution(id)
       return +id;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateInstitutionsThunk = createAsyncThunk("institutions/update", async ({ id, payload }: {id: string, payload: Partial<Institution>}, { rejectWithValue }) => {
  try {
    const user = await updateInstitution(id, payload);
    return user;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});