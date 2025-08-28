import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllSecurityPermissions, getAllSecurityRoles } from "../../../services/catalogs/security.service"

export const getAllSecurityRolesThunk = createAsyncThunk('security/getAllRoles', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityRoles()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const getAllSecurityPermissionsThunk = createAsyncThunk('security/getAllPermissions', async (_, {rejectWithValue}) => {
    try {
       return await getAllSecurityPermissions()
    } catch (error) {
        return rejectWithValue(error)
    }
})