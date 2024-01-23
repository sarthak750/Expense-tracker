import ExpenseForm from "../ExpenseForm.js";
import ExpenseSummary from "../ExpenseSummary.js";
import ExpensesList from "../ExpenseList.js";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("userid");

  const addExpense = async (expense) => {
    try {
      const data = await axios.post(
        "http://localhost:8200/api/v1/expenses",
        expense
      );
      const Data = await axios.get("http://localhost:8200/api/v1/expenses");
      setExpenses(Data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = async (id) => {
    await axios.delete(`http://localhost:8200/api/v1/expenses/${id}`);
    const data = await axios.get("http://localhost:8200/api/v1/expenses");
    setExpenses(data.data.data);
  };

  const getExpense = async () => {
    try {
      const data = await axios.get("http://localhost:8200/api/v1/expenses");
      setLoading(false);
      setExpenses(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getExpense();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }

  return (
    <div>
      <ExpenseForm onAddExpense={addExpense} />
      <ExpensesList expenses={expenses} onDeleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
    </div>
  );
}

export default Home;
