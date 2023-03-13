// :D  REDuX
import { createStore } from "redux";

// reducer Function will be a pure function
const initialState = { counter: 0, isShown: true };
const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: action.amount
        ? state.counter + action.amount
        : state.counter + 1,
      isShown: state.isShown,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      isShown: state.isShown,
    };
  }

  if (action.type === "toggle") {
    return {
      counter: state.counter,
      isShown: !state.isShown,
    };
  }

  return state; //default returning state
};

const store = createStore(counterReducer); //passing reducer function to counter

export default store;

// //subsciption function triggers whenever state changes
// const counterSubscriber = () => {
//   const latestState = store.getState(); // get state gives latest snap
//   console.log(latestState);
// };

// // making redux aware of sub funtion whenever state changeS
// store.subscribe(counterSubscriber);
// store.dispatch({ type: "INCREMENT" }); //WILL PRINT 1
// store.dispatch({ type: "DECREMENT" }); // WILL PRINT 0
