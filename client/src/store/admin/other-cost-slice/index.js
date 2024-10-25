import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  otherCostList: [],
};

export const fetchAllOtherCosts = createAsyncThunk(
  "otherCost/fetchAllOtherCosts",
  async () => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/other-cost/get-all-other-costs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const addOtherCost = createAsyncThunk(
  "otherCost/addOtherCost",
  async (formData) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/other-cost/add-other-cost`,
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

export const updateOtherCost = createAsyncThunk(
  "otherCost/updateOtherCost",
  async ({ id, formData }) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.put(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/other-cost/update-other-cost/${id}`,
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

export const deleteOtherCost = createAsyncThunk(
  "otherCost/deleteOtherCost",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.delete(
      `${
        import.meta.env.VITE_API_URL
      }/api/admin/other-cost/delete-other-cost/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const otherCostSlice = createSlice({
  name: "otherCost",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOtherCosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOtherCosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.otherCostList = action?.payload?.data;
      })
      .addCase(fetchAllOtherCosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default otherCostSlice.reducer;
