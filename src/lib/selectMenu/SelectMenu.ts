import axiosInstance from "@/lib/axios/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategory = createAsyncThunk(
  "getAllcategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        "/select_menu/parent-categories"
      );

      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const getAllBrands = createAsyncThunk<any>(
  "getAllBrands/getBrands",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/select_menu/brands`);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const selectMenuSlice = createSlice({
  name: "selectMenu",
  initialState: {
    category: [],
    brand: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.category = action.payload.data;
    });
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.brand = action.payload.data;
    });
  },
});

export default selectMenuSlice.reducer;
