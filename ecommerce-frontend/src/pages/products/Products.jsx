import { useEffect, useState } from "react";

import Pagination from "@/components/product/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSearch from "@/components/product/ProductSearch";
import ProductSort from "@/components/product/ProductSort";

import {
  getAllProducts,
  searchProducts,
  getProductsByCategory,
  getProductsByPrice,
  getFilteredProducts,
} from "@/services/productService";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        let data;

        if (
          selectedCategory !== null &&
          maxPrice < 100000
        ) {

          data = await getFilteredProducts(
            selectedCategory,
            0,
            maxPrice
          );

        } else if (selectedCategory !== null) {

          data = await getProductsByCategory(
            selectedCategory
          );

        } else if (maxPrice < 100000) {

          data = await getProductsByPrice(
            0,
            maxPrice
          );

        } else if (searchTerm.trim() !== "") {

          data = await searchProducts(
            searchTerm
          );

        } else {

          data = await getAllProducts();

        }

        setProducts(data);

      } catch (error) {

        console.error(
          "Failed to fetch products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, [searchTerm, selectedCategory, maxPrice]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        All Products
      </h1>

      <div className="grid grid-cols-12 gap-8">

        {/* Sidebar */}

        <aside className="col-span-3 bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Filters
          </h2>

          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />

        </aside>

        {/* Products */}

        <section className="col-span-9">

          <div className="flex justify-between items-center gap-6 mb-8">

            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <ProductSort />

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-10 text-gray-500">
                No products found.
              </div>
            )}

          </div>

          <Pagination />

        </section>

      </div>

    </div>
  );
}

export default Products;