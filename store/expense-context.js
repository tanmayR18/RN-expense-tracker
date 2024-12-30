import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [...state, { ...action.payload, id: id }];
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
  }

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
