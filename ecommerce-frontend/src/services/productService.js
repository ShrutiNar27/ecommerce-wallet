import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const searchProducts = async (keyword) => {
  const response = await api.get("/products/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get("/products/filter/category", {
    params: {
      categoryId,
    },
  });

  return response.data;
};

export const getProductsByPrice = async (minPrice, maxPrice) => {
  const response = await api.get("/products/filter/price", {
    params: {
      minPrice,
      maxPrice,
    },
  });

  return response.data;
};

export const getFilteredProducts = async (
  categoryId,
  minPrice,
  maxPrice
) => {
  const response = await api.get("/products/filter", {
    params: {
      categoryId,
      minPrice,
      maxPrice,
    },
  });

  return response.data;
};

export const getSortedProducts = async (field, direction) => {
  const response = await api.get("/products/sort", {
    params: {
      field,
      direction,
    },
  });

  return response.data;
};

export const getProductsPage = async (
  page,
  size,
  field,
  direction
) => {
  const response = await api.get("/products/page", {
    params: {
      page,
      size,
      field,
      direction,
    },
  });

  return response.data;
};