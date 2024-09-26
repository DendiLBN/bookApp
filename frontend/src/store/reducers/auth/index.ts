import { RootState } from "@/common/hooks/redux-toolkit";
import { removeTokens } from "@/common/utils/removeTokens";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthReducerState = {
  isLoggedIn: boolean;
};

const initialState: TAuthReducerState = {
  isLoggedIn: false,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    logOutUser(state) {
      removeTokens();
      state.isLoggedIn = false;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;

export const { setIsLoggedIn, logOutUser } = authReducer.actions;
