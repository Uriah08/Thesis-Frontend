// store/globalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hasShownSplash: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setHasShownSplash(state, action) {
      state.hasShownSplash = action.payload;
    },
  },
});

export const { setHasShownSplash } = globalSlice.actions;
export default globalSlice.reducer;
