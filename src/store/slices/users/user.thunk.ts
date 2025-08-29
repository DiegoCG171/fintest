import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserInterface } from "../../../config/interfaces";
import { createUser, deleteUser, getAllUsers, updateUser } from "../../../services";

export const createUserThunk = createAsyncThunk<
    void,
    createUserInterface,
    { rejectValue: string }
>(
    'users/create',
    async (user: createUserInterface, { rejectWithValue }) => {
        try {
            await createUser(user)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

export const getAllUsersThunk = createAsyncThunk('users/getAll', async (_, {rejectWithValue}) => {
    try {
       return await getAllUsers()
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const deleteUserThunk = createAsyncThunk('users/remove', async (id: string, {rejectWithValue}) => {
    try {
       await deleteUser(id)
       return id;
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const updateUserThunk = createAsyncThunk("user/update", async ({ id, payload }: {id: string, payload: createUserInterface}, { rejectWithValue }) => {
  try {
    const user = await updateUser(id, payload);
    return user;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});