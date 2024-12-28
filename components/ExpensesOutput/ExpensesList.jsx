import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ExpensesItem from "./ExpensesItem";

const renderItem = (itemData) => {
  return <ExpensesItem {...itemData.item} />;
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
