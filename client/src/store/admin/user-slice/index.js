import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userList: [],
};

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/user/get-all-users`
    );
    return response.data;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/user/get-user-by-id/${id}`
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, role }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/admin/user/update-user/${id}`,
      { role },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/admin/user/delete-user/${id}`
  );
  return response.data;
});

export const userHandleSlice = createSlice({
  name: "userHandle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action?.payload?.data;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userHandleSlice.reducer;