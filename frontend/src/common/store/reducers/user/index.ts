import { RootState } from "@/common/hooks/redux-toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TUserReducerState = {
  isLoggedIn: boolean;
};

const initialState: TUserReducerState = {
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
