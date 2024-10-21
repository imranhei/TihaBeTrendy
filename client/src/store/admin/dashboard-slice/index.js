import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  dashboardData: {},
};

export const getBusinessSummary = createAsyncThunk(
  "admin/getBusinessSummary",
  async (token) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/business-summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBusinessSummary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBusinessSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action?.payload?.data;
      })
      .addCase(getBusinessSummary.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default dashboardSlice.reducer;
