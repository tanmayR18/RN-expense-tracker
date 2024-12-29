import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 40.45,
    date: new Date("2024-12-23"),
  },
  {
    id: "e2",
    description: "Creed Aventus Perfume",
    amount: 50.99,
    date: new Date("2024-12-22"),
  },
  {
    id: "e3",
    description: "Black shirt",
    amount: 10.55,
    date: new Date("2024-12-18"),
  },
  {
    id: "e4",
    description: "Gens pant",
    amount: 12.05,
    date: new Date("2024-12-12"),
  },
  {
    id: "e5",
    description: "Watch",
    amount: 60.99,
    date: new Date("2024-12-19"),
  },
];

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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

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
