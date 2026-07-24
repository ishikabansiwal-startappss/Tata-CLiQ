import axios from "axios";

const API_URL = "http://localhost:5000/api/payment";

export const createOrder = async (amount) => {
  const response = await axios.post(`${API_URL}/create-order`, {
    amount,
  });

  return response.data;
};