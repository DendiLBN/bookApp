import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserReducer = {
  _id: string;
  email: string;
};

const initialState: TUserReducer = {
  _id: "",
  email: "",
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    refetchUser: (state, action: PayloadAction<TUserReducer>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state._id = "";
      state.email = "";
    },
  },
});

export const { refetchUser, clearUser } = userReducer.actions;
