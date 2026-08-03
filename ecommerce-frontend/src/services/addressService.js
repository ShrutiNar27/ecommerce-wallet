import api from "@/services/api";

export const getAllAddresses = async () => {

  const response = await api.get("/addresses");

  return response.data;
};

export const getAddressById = async (id) => {

  const response = await api.get(`/addresses/${id}`);

  return response.data;
};

export const addAddress = async (address) => {

  const response = await api.post("/addresses", address);

  return response.data;
};

export const updateAddress = async (id, address) => {

  const response = await api.put(`/addresses/${id}`, address);

  return response.data;
};

export const deleteAddress = async (id) => {

  const response = await api.delete(`/addresses/${id}`);

  return response.data;
};

export const setDefaultAddress = async (id) => {

  const response = await api.patch(`/addresses/default/${id}`);

  return response.data;
};