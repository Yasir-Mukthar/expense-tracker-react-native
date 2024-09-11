import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
  expenses: [],
  setExpenses:()=>{},
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        action.payload
        , ...state];
    case "UPDATE":
      const expenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[expenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    
    case "SET":
      const inverted = action.payload.reverse()
      return inverted

    default:
      return state;
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    console.log(expenseData);
    
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function setExpenses(expenses){
    dispatch({type:"SET", payload:expenses})
  }



  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  const value ={
    expenses: expensesState,
    setExpenses,
    addExpense,
    updateExpense,
    deleteExpense
  }

  return (
    <ExpensesContext.Provider
      value={value}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
