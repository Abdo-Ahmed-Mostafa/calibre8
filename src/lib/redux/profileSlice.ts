import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";

export const showProrfileuser = createAsyncThunk(
  "showProrfileuser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const profileSlice = createSlice({
  name: "profileSlice/show",
  reducers: {},
  initialState: {
    profile: null,
  },
  extraReducers: (builder) => {
    builder.addCase(showProrfileuser.fulfilled, (state, action) => {
      state.profile = action.payload?.data;
    });
  },
});

export const profileReducer = profileSlice.reducer;
