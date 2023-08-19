import React, { useState } from "react";
// import NewExpense from "./NewExpense";
import "./ExpenseForm.css";
const ExpenseForm = (props) => {
  // making the object of use state instead using three useStates😜
  //   const [userInput, setUserInput] = useState({
  //     enteredTitle: "",
  //     enteredAmount: "",
  //     enteredDate: "",
  //   });

  //making useState individually
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const titleChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput, //resets the object to previous state
    //   enteredTitle: event.target.value, //rewrites the title value
    // });

    setEnteredTitle(event.target.value);
    // console.log(event.target.value);
  };
  const amountChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput, //resets the object to previous state
    //   enteredAmount: event.target.value, //rewrites the Amount value
    // });
    // console.log(event.target.value);
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event) => {
    // setUserInput({
    //   ...userInput, //resets the object to previous state
    //   enteredDate: event.target.value, //rewrites the date value
    // });
    // console.log(event.target.value);
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };

    // calling parent prop function to send data
    props.onSaveExpenseData(expenseData);
    // RESETS THE FORM DATA
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredTitle("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
