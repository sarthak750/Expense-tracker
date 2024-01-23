import React from "react";
import styles from "./css/ExpenseList.module.scss";

function ExpensesList({ expenses, onDeleteExpense }) {
  return (
    <div className={styles.mainContainer}>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.date} - ${expense.amount} - {expense.category}
            <button
              className={styles.btnRed}
              onClick={() => onDeleteExpense(expense._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesList;
