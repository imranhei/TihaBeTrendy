import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    
    try {
      const query = new URLSearchParams({
        category: filterParams.join(","),
        sortBy: sortParams,
      });
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/product/get-all-products?${query}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products." }
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/product/get-product-by-id/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch product details." }
      );
    }
  }
);

export const UserProductSlice = createSlice({
  name: "userProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default UserProductSlice.reducer;