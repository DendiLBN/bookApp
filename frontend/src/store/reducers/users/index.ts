import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUserState = {
  _id: string;
  email: string;
};

const initialState: TUserState = {
  _id: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserState>) => {
      state._id = action.payload._id;
      state.email = action.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
