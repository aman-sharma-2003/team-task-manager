import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/axios.js";
import { setError, setSuccess, setLoading } from "./statusSlice.js";

export const getLabels = createAsyncThunk(
  "label/getLabels",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.get("/labels");
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to get Labels";
      return rejectWithValue(message);
    }
  }
);

export const createLabel = createAsyncThunk(
  "label/createLabel",
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post("/label", data);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to create Label";
      return rejectWithValue(message);
    }
  }
);

export const updateLabel = createAsyncThunk(
  "label/updateLabel",
  async ({ label, id }, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.put("/label", { label, id });
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to update Label";
      return rejectWithValue(message);
    }
  }
);

export const deleteLabel = createAsyncThunk(
  "label/deleteLabel",
  async ({id}, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.delete(`/label/${id}`);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to delete Label";
      return rejectWithValue(message);
    }
  }
);

const labelSlice = createSlice({
  name: "label",
  initialState: {
    labels: [],
    showInput: false,
    isEditLabel: null,
  },
  reducers: {
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    setShowInput: (state, action) => {
      state.showInput = action.payload;
    },
    setIsEditLabel: (state, action) => {
      state.isEditLabel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLabels.fulfilled, (state, action) => {
      state.labels = action.payload.data;
    });
    builder.addCase(createLabel.fulfilled, (state, action) => {
      state.labels.push(action.payload.data);
      state.showInput = false;
    });
    builder.addCase(updateLabel.fulfilled, (state, action) => {
      const updatedLabel = action.payload.data;
      state.labels = state.labels.map((label) =>
        label._id === updatedLabel._id ? updatedLabel : label
      );
      state.showInput = false;
      state.isEditLabel = null;
    });
    builder.addCase(deleteLabel.fulfilled, (state, action) => {
      const deletedLabel = action.payload.data;
      state.labels = state.labels.filter(
        (label) => label._id !== deletedLabel._id
      );
    });
  },
});

export const { setLabels, setShowInput, setIsEditLabel } = labelSlice.actions;

export default labelSlice.reducer;
