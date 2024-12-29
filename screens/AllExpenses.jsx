import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";

const AllExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={ExpenseCtx.expenses}
      expensesPeriod={"Total"}
      fallback={"No expenses registered found !!"}
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
