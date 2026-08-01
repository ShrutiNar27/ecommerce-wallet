import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
  getProductsByPrice,
  getFilteredProducts,
  getSortedProducts,
} from "./productService";

export const fetchProducts = async ({
  searchTerm,
  selectedCategory,
  maxPrice,
  sortField,
}) => {

  if (sortField !== "") {

    const [field, direction] = sortField.split("-");

    return await getSortedProducts(field, direction);

  }

  if (
    selectedCategory !== null &&
    maxPrice < 100000
  ) {

    return await getFilteredProducts(
      selectedCategory,
      0,
      maxPrice
    );

  }

  if (selectedCategory !== null) {

    return await getProductsByCategory(
      selectedCategory
    );

  }

  if (maxPrice < 100000) {

    return await getProductsByPrice(
      0,
      maxPrice
    );

  }

  if (searchTerm.trim() !== "") {

    return await searchProducts(searchTerm);

  }

  return await getAllProducts();
};