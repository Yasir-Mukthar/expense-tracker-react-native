import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { useContext, useLayoutEffect, useState } from "react";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http.js";
import Loading from "../components/UI/Loading.js";

function ManageExpense({ route, navigation }) {
  const expenseId = route?.params?.expenseId;
  const isEditing = !!expenseId;
  const expenseCtx = useContext(ExpensesContext);
  const [loading, setLoading] = useState(false)

  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  const deleteExpenseHandler =async () => {
    setLoading(true)
    // delete expense
    expenseCtx.deleteExpense(expenseId);
    await deleteExpense(expenseId)
setLoading(false)
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  if(loading){
    return <Loading />
  }
  const confirmHandler = async (expenseData) => {
    // add or update expense

    setLoading(true)
    if (isEditing) {
      expenseCtx.updateExpense(expenseId, expenseData);
     await updateExpense(expenseId,expenseData)
    } else {
     const id = await storeExpense(expenseData);

      expenseCtx.addExpense({...expenseData, id:id});
    }
setLoading(false)

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update Expense" : "Add Expense"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={24}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

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

export default ManageExpense;
