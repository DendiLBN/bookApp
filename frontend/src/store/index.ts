import { configureStore } from "@reduxjs/toolkit";

import { bookApi } from "./api/books";
import { authApi } from "./api/auth";

import { authReducer } from "./reducers/auth";
import { userReducer } from "./reducers/users";

const apiReducers = {
  [authApi.reducerPath]: authApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authReducer.name]: authReducer.reducer,
  [userReducer.name]: userReducer.reducer,
};
// TODO REMINDER INFO
// TODO: ReducerPath (RTK Query) for API requests
// TODO: Name (key in Redux) for custom slice, which holds user information

export const apiMiddlewares = [authApi.middleware, bookApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
