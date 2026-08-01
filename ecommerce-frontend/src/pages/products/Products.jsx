import { useEffect, useState } from "react";

import Pagination from "@/components/product/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSearch from "@/components/product/ProductSearch";
import ProductSort from "@/components/product/ProductSort";

import {
  getAllProducts,
  searchProducts,
} from "@/services/productService";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        setLoading(true);

        let data;

        if (searchTerm.trim() === "") {

          data = await getAllProducts();

        } else {

          data = await searchProducts(searchTerm);

        }

        setProducts(data);

      } catch (error) {

        console.error("Failed to fetch products:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, [searchTerm]);

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

          <ProductFilters />

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
              <div className="text-center text-gray-500 py-10">
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