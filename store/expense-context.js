import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload }];
    case "SET":
        return action.payload
    case "UPDATE":
        const updateableExpenseIndex = state.findIndex( item => item.id === action.payload.id)
        const updateableExpense = state[updateableExpenseIndex]
        const updatedItem = {...updateableExpense, ...action.payload.data}
        const updatedExpenses = [...state];
        updatedExpenses[updateableExpenseIndex] = updatedItem;
        return updatedExpenses;
    case "DELETE":
        return state.filter( item => item.id !== action.payload)
    default:
      return state;
  }
}

export const ExpenseContextProvide = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenseData) {
    dispatch({type: "SET", payload: expenseData})
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
    setExpenses:setExpenses,
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
