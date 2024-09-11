import { FlatList, Text } from "react-native";
import ExpensesItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={(itemData) => {
        return <ExpensesItem
            description={itemData.item.description}
            amount={itemData.item.amount}
            date={itemData.item.date}
            id={itemData.item.id}
            />;
      }}
      keyExtractor={(item, index) => item.id.toString()}
    />
  );
}

export default ExpensesList;
