import { createSlice} from '@reduxjs/toolkit';

// Define la interfaz de tu estado


const initialState = {
  roles: []
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
  },
});

export default securitySlice.reducer;