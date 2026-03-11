import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/axios.js";
import { setError, setSuccess, setLoading } from "./statusSlice.js";

export const getBoards = createAsyncThunk(
  "board/getBoards",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.get("/boards");
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);
export const createBoard = createAsyncThunk(
  "board/createBoard",
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.post("/boards", data);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to create board";
      return rejectWithValue(message);
    }
  }
);

export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.get(`/boards/${id}`);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to get board";
      return rejectWithValue(message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  "board/updateBoard",
  async ({id, data}, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.put(`/boards/${id}`,data);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to update board";
      return rejectWithValue(message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  "board/deleteBoard",
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const res = await API.delete(`/boards/${id}`);
      dispatch(setSuccess(res?.data?.message));
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Unable to delete board";
      return rejectWithValue(message);
    }
  }
);


const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
    board:{}
  },
  reducers: {
    setBoards: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    })
    builder.addCase(getBoard.fulfilled, (state, action) => {
      state.board = action.payload;
    })
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      state.board = action.payload;
    })
  },
});

export const { setBoards } = boardSlice.actions;

export default boardSlice.reducer;
