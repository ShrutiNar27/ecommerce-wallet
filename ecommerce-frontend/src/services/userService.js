import api from "./api";

export const getCurrentUser = async () => {

  const response = await api.get("/users/me");

  return response.data;

};

export const updateCurrentUser = async (userData) => {

  const response = await api.put("/users/me", userData);

  return response.data;

};