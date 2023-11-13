import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    console.log(user);
  }
);

export const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
