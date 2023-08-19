// :D  REDuX ToolKit
import { configureStore, createSlice } from "@reduxjs/toolkit";

// reducer Function will be a pure function
const counterInitialState = { counter: 0, isShown: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: counterInitialState,
  reducers: {
    increment(state, action) {
      state.counter = action.payload
        ? state.counter + action.payload
        : state.counter + 1;
    },
    decrement(state) {
      state.counter--; // behind the scene it will overwrite the state obj
    },
    toggle(state) {
      state.isShown = !state.isShown;
    },
  },
});

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
}); //in configure store we can pass multiple reduces or multiple state sliuces

export const authActions = authSlice.actions;
export const actions = counterSlice.actions; //exporting so making it available to other states
export default store;
