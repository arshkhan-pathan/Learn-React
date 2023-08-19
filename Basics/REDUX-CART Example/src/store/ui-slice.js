import { createSlice } from "@reduxjs/toolkit";

//
const uiSlice = createSlice({
  name: "ui",
  initialState: { isVisible: false },
  reducers: {
    toggle(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export default uiSlice;
export const uiActions = uiSlice.actions;
