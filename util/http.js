import axios from "axios";

export async function storeExpense(expenseData) {
  console.log(expenseData);

  const response = await axios.post(
      "https://react-native-app-decc5-default-rtdb.firebaseio.com/expenses.json",
      expenseData
    )

    const id = response.data.name
    return id
    
}

export async function fetchExpenses() {
 const response= await axios.get(
      "https://react-native-app-decc5-default-rtdb.firebaseio.com/expenses.json"
    )

    const expenses =[]
    console.log(response.data);
    
    for (const key in response.data){
        const expenseObj = {
            id:key, 
            amount: response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description
        }
        expenses.push(expenseObj)
    }
return expenses   
}


export function updateExpense(id,expenseData){
return  axios.put(
        `https://react-native-app-decc5-default-rtdb.firebaseio.com/expenses/${id}.json`,
        expenseData
    )

}

export function deleteExpense(id){
    return axios.delete(
        `https://react-native-app-decc5-default-rtdb.firebaseio.com/expenses/${id}.json`
    )

}
