import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/slices/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
