import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/slices/rootSlice";

export const store = configureStore({
  reducer: {
    root: rootReducer,
  },
});
