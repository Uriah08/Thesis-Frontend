// store/globalSlice.ts
import { createSlice } from "@reduxjs/toolkit";

type GlobalState = {
  hasShownSplash: boolean;
  authToken: string | null;
  user: any | null;
};

const initialState: GlobalState = {
  hasShownSplash: false,
  authToken: null,
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setHasShownSplash(state, action) {
      state.hasShownSplash = action.payload;
    },
    setAuthToken(state, action) {
      state.authToken = action.payload;
    },
    setUser(state, action) {
      state.user = {
        ...(state.user || {}),
        ...action.payload,
      };
    },
    logout(state) {
      state.authToken = null;
      state.user = null;
    },
  },
});

export const {
  setHasShownSplash,
  setAuthToken,
  setUser,
  logout,
} = globalSlice.actions;

export default globalSlice.reducer;
