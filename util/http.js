import axios from "axios";

const base_url = "https://rn-expense-tracker-18-default-rtdb.firebaseio.com";

export const createExpense = async (data) => {
  try {
    console.log("createExpense called");
    const response = await axios.post(`${base_url}/expense.json`, data);
    console.log(response.data.name);
    return response.data.name;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getExpense = async () => {
  try {
    const response = await axios.get(`${base_url}/expense.json`);
    if(!response.data){
        return [];
    }
    const data = Object.entries(response.data).map(([id, value]) => {
        console.log({
            ...value,
        date: new Date(value.date.slice(0,10)),
        id: id,
        })
      return {
        ...value,
        date: new Date(value.date.slice(0,10)),
        id: id,
      };
    });
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateExpense = async (id, data) => {
  try {
    const response = await axios.put(
      `${base_url}/expense/${id}.json`,
      data
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteExpense = async (id) => {
  try {
    console.log("id", id);
    const response = await axios.delete(`${base_url}/expense/${id}.json`);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Unable to delete";
  }
};
