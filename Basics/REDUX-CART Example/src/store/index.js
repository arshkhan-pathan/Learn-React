// :D  REDuX ToolKit
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, cart: cartSlice.reducer },
}); //in configure store we can pass multiple reduces or multiple state sliuces

export const cartActions = uiSlice.actions;
export default store;
