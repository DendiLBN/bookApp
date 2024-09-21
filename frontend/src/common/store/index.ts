import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/user";
import { userReducer } from "./reducers/user";

const apiReducers = {
  [userApi.reducerPath]: userApi.reducer,
  [userReducer.name]: userReducer.reducer,
};

export const apiMiddlewares = [userApi.middleware];

export const store = configureStore({
  reducer: apiReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddlewares),
});
