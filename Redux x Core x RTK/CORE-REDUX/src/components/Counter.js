import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
  //useSelector will return our data from store, by using use selector redux will auto set the subscribe
  // ie changes to redux store will make this component re-render making it availabel latest values from store
  // also on unMount it will auto clear the subscription
  const counter = useSelector((state) => state.counter);
  //handling multiple states    fow multiple var/states use multiple selectors
  const shown = useSelector((state) => state.isShown);

  // with the help of useDispatch we can pass on action as objects against out store😀
  //here as below dispatch will act as function
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch({ type: "increment" });
  };
  const increment5Handler = () => {
    dispatch({ type: "increment", amount: 5 });
  };
  const decrementHandler = () => {
    dispatch({ type: "decrement" });
  };

  const toggleCounterHandler = () => {
    dispatch({ type: "toggle" });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {shown && <div className={classes.value}>{counter}</div>}
      <button onClick={incrementHandler}> INCREMENT</button>
      <button onClick={increment5Handler}> INCREMENT by 5</button>
      <button onClick={decrementHandler}>DECREMENT</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
