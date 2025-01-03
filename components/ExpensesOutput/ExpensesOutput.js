import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/style";
import { ExpenseContext } from "../../store/expense-context";

const ExpensesOutput = ({ expenses, expensesPeriod, fallback }) => {
    const Context = useContext(ExpenseContext)
  const content = <Text  style={styles.infoText}>{fallback}</Text>
  return (
    <View style={styles.container}>
      {expenses.length ? (
        <>
          <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
          <ExpensesList expenses={expenses} />
        </>
      ) : (
        content
      )}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
