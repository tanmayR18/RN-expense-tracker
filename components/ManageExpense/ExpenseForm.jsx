import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constant/style";
import { createExpense } from "../../util/http";

const ExpenseForm = ({ label, onCancel, onSubmit, defaultValue }) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : "",
      isValid: true,
    },
  });

  function inputHandler(identifier, value) {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [identifier]: { value, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
      description: inputValue.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Ivalid Input", "Please check your input valude");
      setInputValue((prevState) => {
        return {
          amount: { value: prevState.amount.value, isValid: amountIsValid },
          date: { value: prevState.date.value, isValid: dateIsValid },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid = !inputValue.amount.isValid || !inputValue.date.isValid || !inputValue.description.isValid

  return (
    <View>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.row}>
        <Input
          label={"Amount"}
          inValid={!inputValue.amount.isValid}
          containerStyle={{ flex: 1 }}
          textInputConfiguratin={{
            keyboardType: "decimal-pad",
            onChangeText: inputHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
        />
        <Input
          label={"Date"}
          inValid={!inputValue.date.isValid}
          containerStyle={{ flex: 1 }}
          textInputConfiguratin={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
        />
      </View>
      <Input
        label={"Description"}
        inValid={!inputValue.description.isValid}
        textInputConfiguratin={{
          multiline: true,
          onChangeText: inputHandler.bind(this, "description"),
          value: inputValue.description.value,
        }}
      />
      {
        formIsValid && <Text style={styles.error}>Invalid input value: check your entered value format</Text>
      }
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onpress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onpress={submitHandler}>
          {label}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginVertical: 24,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  error: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    marginVertical:8,
  }
});
