import React from "react";
import "./NewExpense.css";
import "./ExpenseForm";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  // making function to recieve data from child component
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = { ...enteredExpenseData, id: Math.random().toString() };

    props.onAddExpenseData(expenseData);
  };

  return (
    //passind function as prop so that it will collect data
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
};

export default NewExpense;
