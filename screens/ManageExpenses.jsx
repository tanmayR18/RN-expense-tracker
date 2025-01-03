import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { GlobalStyles } from "../constant/style";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { ExpenseContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  createExpense,
  deleteExpense,
  getExpense,
  updateExpense,
} from "../util/http";

const ManageExpenses = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  console.log("editedExpenseId", editedExpenseId);
  const ExpenseCtx = useContext(ExpenseContext);
  const isEditing = !!editedExpenseId;
  const expense = ExpenseCtx.expenses.filter(
    (item) => item.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteHandler() {
    console.log("delete id", editedExpenseId);
    const nullValue = await deleteExpense(editedExpenseId);
    if (nullValue === null) {
      ExpenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    }
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    if (isEditing) {
      console.log("here", editedExpenseId, expenseData);
      await updateExpense(editedExpenseId, expenseData);
      ExpenseCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      const id = await createExpense(expenseData);
      console.log({ id: id, ...expenseData })
      ExpenseCtx.addExpense({ ...expenseData,id: id });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        defaultValue={expense[0]}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        label={isEditing ? "Update" : "Add"}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            size={32}
            color={GlobalStyles.colors.error500}
            icon={"trash"}
            onpress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
