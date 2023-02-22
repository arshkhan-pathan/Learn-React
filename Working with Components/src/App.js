import ExpenseItem from "./components/ExpenseItem";

function App() {
  const expenses = [
    {
      id: "1a426a7f-eb5c-4e6b-b5f5-7a5a03686d6d",
      title: "Groceries",
      date: new Date(2023, 10, 9),
      amount: 56.42,
    },
    {
      id: "73f7e5a5-9698-46c4-88fc-f7a35223c74c",
      title: "Gas",
      date: new Date(2023, 10, 9),
      amount: 33.78,
    },
    {
      id: "9efb902a-88d6-46af-96c3-98fa7e2b1f0d",
      title: "Clothing",
      date: new Date(2023, 10, 9),
      amount: 124.99,
    },
    {
      id: "da0fb651-0f80-45d2-9d39-fa52c5d34d8a",
      title: "Dinner",
      date: new Date(2023, 10, 9),
      amount: 87.56,
    },
    {
      id: "6ca2f1d4-40b4-4c4f-8448-25dc22b2f3e3",
      title: "Movie Tickets",
      date: new Date(2023, 10, 9),
      amount: 21.5,
    },
  ];

  return (
    <div>
      <h2>Let's get started!</h2>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      ></ExpenseItem>
    </div>
  );
}

export default App;
