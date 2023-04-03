import "./App.css";
import Formc from "./components/Form";
import { useState } from "react";
import Item from "./components/Item";

function App() {
  const [todo, setTodo] = useState([]);

  const removeHandler = (ind) => {
    let list = [...todo];
    list.splice(ind, 1);
    setTodo(list);
  };

  console.log(todo);

  const addTodo = (text) => {
    setTodo([...todo, text]);
  };
  console.log(todo);

  return (
    <div className="App">
      <Formc addHandler={addTodo}></Formc>
      {todo.length > 0 && <Item props={todo} removehandler={removeHandler} />}
    </div>
  );
}

export default App;
