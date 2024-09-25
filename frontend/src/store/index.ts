import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { userReducer } from "./reducers/user";
import { bookApi } from "./api/books";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [userReducer.name]: userReducer.reducer,
};

export const apiMiddlewares = [userApi.middleware, bookApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
