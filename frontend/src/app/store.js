import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import statusReducer from "../features/statusSlice.js";
import boardReducer from "../features/boardSlice.js";
import labelReducer from "../features/labelSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    status: statusReducer,
    board: boardReducer,
    label: labelReducer,
  },
});
