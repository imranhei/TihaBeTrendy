import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async ({ filterParams = [], sortParams, searchParams }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));

    const query = new URLSearchParams();
    if (filterParams.length > 0)
      query.append("category", filterParams.join(","));
    if (sortParams) query.append("sortBy", sortParams);
    if (searchParams) query.append("search", searchParams);
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/product/get-all-products?${query.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/product/get-product-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/product/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: error?.response?.data || error.message };
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/admin/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return { success: false, message: error?.response?.data || error.message };
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/product/delete-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const AdminProductSlice = createSlice({
  name: "adminProduct",
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

export default AdminProductSlice.reducer;
