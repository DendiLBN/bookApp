import { configureStore } from "@reduxjs/toolkit";

import { bookApi } from "./api/books";
import { authApi } from "./api/auth";
import { authReducer } from "./reducers/auth";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authReducer.name]: authReducer.reducer,
};

export const apiMiddlewares = [authApi.middleware, bookApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
