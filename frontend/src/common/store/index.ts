import { configureStore } from "@reduxjs/toolkit";
import { apiMiddlewares, apiReducers } from "./api";

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
