import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCollection,
  deleteCollection,
  getCollections,
  updateCollection,
} from "../../../services/catalogs/collections.service";
import { CreateCollection } from "../../../config/interfaces/collections.interface";
import {
  CreateTestCase,
  createTestCase,
  deleteTestCase
} from "../../../services/catalogs/testCases.service";
import { PatchGenerationTemplate, testCaseInterface } from "../../../config/interfaces";

export const getCollectionsThunk = createAsyncThunk(
  "collections/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const collections = await getCollections();
      return collections;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const createCollectionThunk = createAsyncThunk(
  "collections/create",
  async (collections: CreateCollection, { rejectWithValue }) => {
    try {
      const response = await createCollection(collections);
      return response;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const updateCollectionThunk = createAsyncThunk<
  testCaseInterface,
  { id: string; payload: PatchGenerationTemplate },
  { rejectValue: string }
>("collection/update", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const testCase = await updateCollection(id, payload);
    return testCase;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const deleteTestCaseThunk = createAsyncThunk(
  "collections/delete/testCase",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTestCase(id);
      return id;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const createTestCaseThunk = createAsyncThunk(
  "collections/create/testCase",
  async (
    { id_collection, id_template }: CreateTestCase,
    { rejectWithValue }
  ) => {
    try {
      const testCase = await createTestCase({ id_collection, id_template });
      return {
        id: testCase.uuid,
        name: testCase.name,
        collectionId: id_collection,
        testCase
      };
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const deleteCollectionThunk = createAsyncThunk(
  "collections/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteCollection(id);
      return id;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
