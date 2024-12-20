import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
  isLoadingAuth: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      // Capture error message from backend or default message
      const message = error.response?.data?.message || "";
      return rejectWithValue({ success: false, message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData,
        { withCredentials: true } // Allows cookies to be sent for session management
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      return rejectWithValue({ success: false, message });
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    null,
    { withCredentials: true }
  );
  return response.data;
});

// have subdomain
// export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
//   const response = await axios.get(
//     `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//     {
//       withCredentials: true,
//       headers: {
//         "Cache-Control":
//           "no-store, no-cache, must-revalidate, proxy-revalidate",
//         Expires: "0",
//       },
//     }
//   );
//   return response.data;
// });

// if i don't have any subdomain
export const checkAuth = createAsyncThunk("/auth/checkauth", async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/auth/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete the user."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetTokenAndCredentials: (state) => {
      // no subdomain
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      sessionStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = !action.payload?.success ? null : action.payload?.user;
        state.isAuthenticated = action.payload?.success;
        state.token = action.payload?.token; // no subdomain
        sessionStorage.setItem("token", JSON.stringify(action.payload?.token));
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoadingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoadingAuth = false;
        state.user = !action.payload?.success ? null : action.payload?.user;
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoadingAuth = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { resetTokenAndCredentials } = authSlice.actions;

export default authSlice.reducer;
