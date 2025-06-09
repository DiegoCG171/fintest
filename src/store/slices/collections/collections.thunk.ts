import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCollection, getCollections, updateCollection } from "../../../services/catalogs/collections.service";
import { mapCollections } from "../../../config/utils/collections.utils";
import { CreateCollection } from "../../../config/interfaces/collections.interface";

export const getCollectionsThunk = createAsyncThunk(
  "collections/getAll",
  async (_, {rejectWithValue}) => {
    try {
        const collections = await getCollections();
        return mapCollections(collections);
    } catch (error: unknown) {
        return rejectWithValue(error as string)
    }
  }
);

export const createCollectionThunk = createAsyncThunk(
    'templates/create',
    async (collections: CreateCollection, { rejectWithValue }) => {
        try {
            const response = await createCollection(collections);
            return response;
        } catch (error) {
            return rejectWithValue(error as string)
        }
    }
);

export const updateCollectionThunk = createAsyncThunk(
    'templates/update',
    async ({ id, payload }: {id: string; payload: CreateCollection}, { rejectWithValue }) => {
        try {
            await updateCollection(id, payload);
            return;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);