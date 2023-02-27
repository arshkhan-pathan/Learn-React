import React, { useState } from "react";
import ErrorModal from "./ErrorModal";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [IsValid, setIsValid] = useState();
  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setIsValid({ title: "Error", message: "All Feilds must be Entered" });

      return;
    }
    if (+enteredAge < 1) {
      setIsValid({ title: "Age-Error", message: "Age Must be positive" });

      return;
    }
    // console.log(typeof enteredUsername);
    let enteredUsername1 =
      enteredUsername[0].toUpperCase() + enteredUsername.slice(1);
    props.onSave(enteredUsername1, enteredAge);
    setEnteredUsername("");

    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const onConfirm = () => {
    setIsValid();
  };

  return (
    <div>
      {IsValid && (
        <ErrorModal
          title={IsValid.title}
          message={IsValid.message}
          onConfirm={onConfirm}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
