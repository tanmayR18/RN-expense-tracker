import axios from 'axios'

const base_url = 'https://rn-expense-tracker-18-default-rtdb.firebaseio.com'


export const createExpense = async() => {
   try{
    console.log('createExpense called');
    const response = await axios.post(`${base_url}/expense.json`,{amount: 6000, date: new Date('2024-12-29'), description: 'Tapa tap'})
    return response.data.name;
   } catch(error)  {
    console.log(error)
    return false;
   }
}

export const getExpense = async() => {
    try{
     const response = await axios.get(`${base_url}/expense.json`)
     return response.data;
    } catch(error)  {
     console.log(error)
     return false;
    }
 }


export const updateExpense = async(id) => {
    try{
     const response = await axios.put(`${base_url}/expense/-OFMIClW7Tfn98bPlyZO.json`, {amount: 12000, date: new Date('2024-12-31'), description: 'Tapa tap!!!'})
     return response.data;
    } catch(error)  {
     console.log(error)
     return false;
    }
 }

export const deleteExpense = async(id) => {
    try{
     const response = await axios.delete(`${base_url}/expense/-OFMIClW7Tfn98bPlyZO.json`)
     return response.data;
    } catch(error)  {
     console.log(error)
     return 'Unable to delete'
    }
 }