import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  salesList: [],
};

export const fetchAllSales = createAsyncThunk(
  "sale/fetchAllSales",
  async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/sale/get-all-sales`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateSale = createAsyncThunk(
  "sale/updateSale",
  async ({ id, formData }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/sale/update-sale/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteSale = createAsyncThunk("sale/deleteSale", async (id) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/admin/sale/delete-sale/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

export const AdminSaleSlice = createSlice({
  name: "adminSales",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSales.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesList = action?.payload?.data;
      })
      .addCase(fetchAllSales.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminSaleSlice.reducer;
