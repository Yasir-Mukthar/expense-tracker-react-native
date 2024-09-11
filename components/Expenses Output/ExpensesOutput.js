import { View ,StyleSheet,Text} from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";



function ExpensesOutput({ expenses, expensesPeriod ,fallbackText}) {

  let content = <Text style={styles.intoText}>
    {fallbackText}
  </Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.constainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}



const styles = StyleSheet.create({
  constainer:{
    padding:24,
    backgroundColor:GlobalStyles.colors.primary700,
    flex:1
  },
  intoText:{
    color:"white", 
    fontSize:16, 
    textAlign:"center",
    marginTop:40
  }
})

export default ExpensesOutput;
