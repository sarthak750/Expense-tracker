import React, { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm.js";
import ExpenseSummary from "./ExpenseSummary.js";
import ExpensesList from "./ExpenseList.js";
import axios from "axios";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
  };

  useEffect(() => {
    //axios call
    axios
      .get("http://localhost:8200")
      .then((res) => {
        console.log("response", res.data.message);
        if (res.data.message == "success") {
          //success
        } else {
          // error no data
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="App">
      <h1></h1>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpensesList expenses={expenses} onDeleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
    </div>
  );
}

export default App;
