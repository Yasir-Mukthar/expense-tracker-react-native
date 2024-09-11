import { View, Text } from "react-native";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses() {
  const expenseCtx =useContext(ExpensesContext)

  return (
   <ExpensesOutput 
   expenses={expenseCtx.expenses}
expensesPeriod="Total"
fallbackText="No expenses found. Start adding some!"
    />
  );
}

export default AllExpenses;
