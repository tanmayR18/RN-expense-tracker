import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { getExpense } from "../util/http";

const RecentExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);

  const recentExpenses = ExpenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  console.log('recentExpenses', recentExpenses)  

  async function getData() {
    const response = await getExpense();
    console.log('Getting this from get',response)
    ExpenseCtx.setExpenses(response);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
      fallback={"No expenses for the last 7 days :)"}
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
