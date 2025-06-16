import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCollection, getCollections, updateCollection } from "../../../services/catalogs/collections.service";
import { CreateCollection } from "../../../config/interfaces/collections.interface";
import { deleteTestCase, getTestCaseById, UpdateTestCase, updateTestCase } from "../../../services/catalogs/testCases.service";

export const getCollectionsThunk = createAsyncThunk(
  "collections/getAll",
  async (_, {rejectWithValue}) => {
    try {
        const collections = await getCollections();
        return collections;
    } catch (error: unknown) {
        return rejectWithValue(error as string)
    }
  }
);

export const createCollectionThunk = createAsyncThunk(
    'collections/create',
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
    'collections/update',
    async ({ id, payload }: {id: string; payload: CreateCollection}, { rejectWithValue }) => {
        try {
            await updateCollection(id, payload);
            return;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const deleteTestCaseThunk = createAsyncThunk(
    'collections/delete/testCase',
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteTestCase(id);
            return id;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const updateTestCaseThunk = createAsyncThunk(
    'test-case/update',
    async ({ id, payload }: {id: string; payload: UpdateTestCase}, { rejectWithValue }) => {
        try {
            const testCase = await updateTestCase(id, payload);
            return testCase;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);

export const getTestCaseByIdThunk = createAsyncThunk(
    'test-case/getById',
    async (id: string, { rejectWithValue }) => {
        try {
            const testCase = await getTestCaseById(id);

            return testCase;
        } catch (error) {
            return rejectWithValue(error as string);
        }
    }
);
