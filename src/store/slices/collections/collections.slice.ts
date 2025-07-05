import { createSlice } from "@reduxjs/toolkit";
import { collectionsInitialState } from "./collections.state";

export const collectionSlice = createSlice({
  name: "collections",
  initialState: collectionsInitialState,
  reducers: {},
});
