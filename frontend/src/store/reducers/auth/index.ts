import { RootState } from "@/common/hooks/redux-toolkit";
import { removeTokens } from "@/common/utils/removeTokens";
import { TUser } from "@/types/api/auth-user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthReducerState = {
  isLoggedIn: boolean;
  user: TUser | null;
};

const initialState: TAuthReducerState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setIsLoggedIn(
      state,
      action: PayloadAction<{ isLoggedIn: boolean; user: TUser | null }>
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },

    logOutUser(state) {
      removeTokens();
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const selectIsLoggedIn = (state: RootState) =>
  state.authReducer.isLoggedIn;

export const selectUser = (state: RootState) => state.authReducer.user;

export const { setIsLoggedIn, logOutUser } = authReducer.actions;
