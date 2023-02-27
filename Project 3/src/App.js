import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [UserList, setUserList] = useState([]);

  const onSaveData = (uName, age) => {
    setUserList((prevData) => {
      return [...prevData, { id: Math.random(), name: uName, age: age }];
    });
  };

  return (
    <div>
      <AddUser onSave={onSaveData} />
      <UsersList userList={UserList} />
      {console.log(UserList)}
    </div>
  );
}

export default App;
