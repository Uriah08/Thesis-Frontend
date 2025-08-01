// store/globalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalState = {
  hasShownSplash: boolean;
  scanTabPressed: boolean;
};

const initialState: GlobalState = {
  hasShownSplash: false,
  scanTabPressed: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setHasShownSplash(state, action: PayloadAction<boolean>) {
      state.hasShownSplash = action.payload;
    },
    setScanTabPressed(state, action: PayloadAction<boolean>) {
      state.scanTabPressed = action.payload;
    },
  },
});

export const {
  setHasShownSplash,
  setScanTabPressed,
} = globalSlice.actions;

export default globalSlice.reducer;
