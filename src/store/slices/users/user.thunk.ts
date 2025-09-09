import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserInterface, GetFilters, UserDB } from "../../../config/interfaces";
import { createUser, deleteUser, getAllUsers, updateUser } from "../../../services";

export const createUserThunk = createAsyncThunk<
    UserDB,
    createUserInterface,
    { rejectValue: string }
>(
    'users/create',
    async (user: createUserInterface, { rejectWithValue }) => {
        try {
          console.log(user)
          return await createUser(user)
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
)

export const getAllUsersThunk = createAsyncThunk(
  'users/getAll',
  async (filters: GetFilters | undefined, { rejectWithValue }) => {
    try {
      const stored = localStorage.getItem("userFilters");
      const appliedFilters: GetFilters =
        filters ??
        (stored ? JSON.parse(stored) : { page: 1, limit: 10 });

      localStorage.setItem("userFilters", JSON.stringify(appliedFilters));
      const usersDB = await getAllUsers(appliedFilters)
      return  { ...usersDB, searchTerm: appliedFilters.search };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



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