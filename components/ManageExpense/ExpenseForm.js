import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel,defaultValues }) {
  const [inputValue, setInputValue] = useState({
    amount:defaultValues ? defaultValues.amount.toString() : "",
    date:defaultValues ? defaultValues.date.toISOString().slice(0, 10): "",
    description: defaultValues ? defaultValues.description :"",
  });

  function inputChangeHandler(inputIdentifier, enteerdValue) {
    setInputValue((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: enteerdValue,
      };
    });
  }

  function submitHandler() {
    const amount = parseFloat(inputValue.amount);
    const date = new Date(inputValue.date);
    const description = inputValue.description;

    if (isNaN(amount) || amount <= 0 || date.toString() === "Invalid Date") {
      return;
    }


    onSubmit({
      amount,
      date,
      description,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),

            value: inputValue.amount,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            onChangeText: inputChangeHandler.bind(this, "date"),
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputValue.date,
          }}
          style={styles.rowInput}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputValue.description,
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
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
});

export default ExpenseForm;
