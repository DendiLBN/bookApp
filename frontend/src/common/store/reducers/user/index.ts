import { RootState } from "@/common/hooks/redux-toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) =>
  state.userReducer.isLoggedIn;

export const { setIsLoggedIn } = userReducer.actions;
