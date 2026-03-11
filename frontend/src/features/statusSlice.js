import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    error: null,
    success: null,
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const { setError, setSuccess, clearMessages, setLoading } = statusSlice.actions;

export default statusSlice.reducer;
