import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TBookBodyReducerState = {
  page: number;
  perPage: number;
};

const initialState: TBookBodyReducerState = {
  page: 1,
  perPage: 100,
};

const bookBodySlice = createSlice({
  name: "bookBody",
  initialState,
  reducers: {
    setBookPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setBookPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
  },
});
export const { setBookPage, setBookPerPage } = bookBodySlice.actions;
