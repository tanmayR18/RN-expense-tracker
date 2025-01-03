import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { getExpense } from "../util/http";
import { GlobalStyles } from "../constant/style";

const RecentExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);
  const [loading, setLoading] = useState(true);

  const recentExpenses = ExpenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  async function getData() {
    setLoading(true);
    const response = await getExpense();
    console.log("Getting this from get", response);
    ExpenseCtx.setExpenses(response);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={"#fff"} size={30} />
      </View>
    );
  }

    return (
      <ExpensesOutput
        expenses={recentExpenses}
        expensesPeriod={"Last 7 Days"}
        fallback={"No expenses for the last 7 days :)"}
      />
    );
};

export default RecentExpenses;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
