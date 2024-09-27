import { configureStore } from "@reduxjs/toolkit";

import { bookApi } from "./api/books";
import { authApi } from "./api/auth";
import { userApi } from "./api/users";

import { authReducer } from "./reducers/auth";
import { userSlice } from "./reducers/users";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authReducer.name]: authReducer.reducer,
  [userSlice.name]: userSlice.reducer,
};

// TODO: ReducerPath (RTK Query) for API requests
// TODO: Name (key in Redux) for custom slice, which holds user information
// TODO: Remember push path to apiMiddlewares

export const apiMiddlewares = [
  authApi.middleware,
  bookApi.middleware,
  userApi.middleware,
];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
