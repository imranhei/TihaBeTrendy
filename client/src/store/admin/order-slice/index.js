import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderList: [],
};

export const fetchAllOrders = createAsyncThunk(
  "order/fetchAllOrders",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/order/get-all-orders`
    );
    return response.data;
  }
);

export const addOrder = createAsyncThunk("order/addOrder", async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/admin/order/add-order`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/order/update-order/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/admin/order/delete-order/${id}`
    );
    return response.data;
  }
);

export const AdminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload?.data;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminOrderSlice.reducer;