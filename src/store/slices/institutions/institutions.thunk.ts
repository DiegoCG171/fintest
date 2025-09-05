import { createAsyncThunk } from "@reduxjs/toolkit"
import { createInstitution, deleteInstitution, getAllInstitutions, updateInstitution } from "../../../services/catalogs/institutions.service"
import { GetFilters, Institution } from "../../../config/interfaces"
import { CreateInstitution } from "../../../config/interfaces/institutions.interface"

export const getAllInstitutionsThunk = createAsyncThunk('institutions/getAll', async (filters: GetFilters | undefined, {rejectWithValue}) => {
    try {
        const stored = localStorage.getItem("institutionFilters");
      const appliedFilters: GetFilters =
        filters ?? (stored ? JSON.parse(stored) : { page: 1, limit: 10 });

      localStorage.setItem("institutionFilters", JSON.stringify(appliedFilters));
       return await getAllInstitutions(appliedFilters)
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const createInstitutionThunk = createAsyncThunk<
    Institution,
    CreateInstitution,
    { rejectValue: string }
>(
    'institutions/create',
    async (user: CreateInstitution, { rejectWithValue }) => {
        try {
          return await createInstitution(user)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

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
    const institution = await updateInstitution(id, payload);
    return institution;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});