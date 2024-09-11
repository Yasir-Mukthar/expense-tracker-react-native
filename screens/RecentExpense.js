import { View, Text } from "react-native";
import ExpensesOutput from "../components/Expenses Output/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses } from "../util/http";
import Loading from "../components/UI/Loading";

function RecentExpenses() {
  const expenseCtx = useContext(ExpensesContext);
 const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getExpenses() {
      setLoading(true)
      const expenses = await fetchExpenses();
      setLoading(false)
      expenseCtx.setExpenses(expenses);
    }
    getExpenses();
  }, []);

  if(loading){
    return <Loading />
  }

  const recentExpenses = expenseCtx.expenses?.filter((expenses) => {
    const expenseDate = new Date(expenses.date);
    const currentDate = new Date();
    const daysDifference = Math.ceil(
      (currentDate - expenseDate) / (1000 * 60 * 60 * 24)
    );
    return daysDifference <= 7;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      fallbackText="
    No recent expenses found. Start adding some!
    "
      expensesPeriod="Last 7 Days"
    />
  );
}

export default RecentExpenses;
