import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userList: [],
};

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/user/get-all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch users." }
      );
    }
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id) => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/admin/user/get-user-by-id/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/user/update-user/${id}`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/user/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete user." }
      );
    }
  }
);

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
