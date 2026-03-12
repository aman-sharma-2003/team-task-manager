import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/axios.js";
import { setError, setSuccess, setLoading } from "./statusSlice.js";

export const doLoginSignup = createAsyncThunk(
  "auth/doLoginSignup",
  async ({ data, url }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post(url, data);
      dispatch(setSuccess(res?.data?.message));
      console.log({ res });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const res = await API.get("/me");
      console.log({ res });
      return res.data;
    } catch (err) {
      dispatch(setError("Authentication failed"));
      return rejectWithValue();
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post("/logout");
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Logout failed";
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post("/forgot-password", data);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to send reset link";
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, data }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post(`/reset-password/${token}`, data);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Password reset failed";
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null,
    authChecked: false,
  },

  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(doLoginSignup.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user;
        state.authChecked = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user;
        state.authChecked = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loggedInUser = null;
        state.authChecked = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedInUser = null;
        state.authChecked = true;
      })
      .addCase(checkAuth.pending, (state) => {
        state.authChecked = false;
      });
  },
});

export const { setLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
