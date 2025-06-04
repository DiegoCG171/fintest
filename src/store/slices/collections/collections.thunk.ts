import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../UI/loader/loader.slice";
import { getCollections } from "../../../services/collections/collections.service";

export const getCollectionsThunk = createAsyncThunk(
  "collections/getAll",
  async (_, { dispatch, rejectWithValue}) => {
    try {
        dispatch(setLoading(true))
        const collections = await getCollections();
        return collections;
    } catch (error: unknown) {
        return rejectWithValue(error as string)
    } finally {
        dispatch(setLoading(false))
    }
  }
);
