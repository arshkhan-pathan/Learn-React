import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../store";

const Counter = () => {
  //useSelector will return our data from store, by using use selector redux will auto set the subscribe
  // ie changes to redux store will make this component re-render making it availabel latest values from store
  // also on unMount it will auto clear the subscription
  const counter = useSelector((state) => state.counter.counter); //when using multiple slices use identefier "state.identifier.method"
  //handling multiple states    fow multiple var/states use multiple selectors
  const shown = useSelector((state) => state.counter.isShown);

  // with the help of useDispatch we can pass on action as objects against out store😀
  //here as below dispatch will act as function
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(actions.increment());
  };

  const incrementHandler5 = () => {
    dispatch(actions.increment(5));
  };

  const decrementHandler = () => {
    dispatch(actions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(actions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {shown && <div className={classes.value}>{counter}</div>}
      <button onClick={incrementHandler}> INCREMENT</button>
      <button onClick={incrementHandler5}> INCREMENT by 5 </button>
      <button onClick={decrementHandler}>DECREMENT</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
