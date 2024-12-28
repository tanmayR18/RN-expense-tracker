import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constant/style";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 40.45,
        date: new Date('2024-12-23'),
    },
    {
        id: 'e2',
        description: 'Creed Aventus Perfume',
        amount: 50.99,
        date: new Date('2024-12-22'),
    },
    {
        id: 'e3',
        description: 'Black shirt',
        amount: 10.55,
        date: new Date('2024-12-18'),
    },
    {
        id: 'e4',
        description: 'Gens pant',
        amount: 12.05,
        date: new Date('2024-12-12'),
    },
    {
        id: 'e5',
        description: 'Watch',
        amount: 60.99,
        date: new Date('2024-12-19'),
    },
]

const ExpensesOutput = ({expenses, expensesPeriod}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
    }
});
