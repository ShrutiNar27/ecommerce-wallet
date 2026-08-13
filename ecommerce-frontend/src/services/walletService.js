import api from "@/services/api";

export const getWallet = async () => {

  const response = await api.get("/wallet");

  return response.data;
};

export const depositMoney = async (amount) => {

  const response = await api.post("/wallet/deposit", {
    amount,
  });

  return response.data;
};

export const withdrawMoney = async (amount) => {

  const response = await api.post("/wallet/withdraw", {
    amount,
  });

  return response.data;
};

export const getTransactions = async () => {

  const response = await api.get("/wallet/transactions");

  return response.data;
};

export const payWithWallet = async (orderId) => {

  const response = await api.post("/wallet/pay", {
    orderId,
  });

  return response.data;
};