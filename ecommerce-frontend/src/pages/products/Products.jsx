import { useEffect, useState } from "react";

import Pagination from "@/components/product/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSearch from "@/components/product/ProductSearch";
import ProductSort from "@/components/product/ProductSort";

import { fetchProducts } from "@/services/productQueryService";
import { getProductsPage } from "@/services/productService";

function Products() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortField, setSortField] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        // Use pagination only when no filters/search/sort are active
        if (
          searchTerm === "" &&
          selectedCategory === null &&
          maxPrice === 100000 &&
          sortField === ""
        ) {

          const pageData = await getProductsPage({
            page: currentPage,
            size: 6,
            field: "name",
            direction: "asc",
          });

          setProducts(pageData.content);
          setTotalPages(pageData.totalPages);

        } else {

          const data = await fetchProducts({
            searchTerm,
            selectedCategory,
            maxPrice,
            sortField,
          });

          setProducts(data);
          setTotalPages(1);
          setCurrentPage(0);

        }

      } catch (error) {

        console.error("Failed to fetch products:", error);

      } finally {

        setLoading(false);

      }

    };

    loadProducts();

  }, [
    currentPage,
    searchTerm,
    selectedCategory,
    maxPrice,
    sortField,
  ]);

  if (loading) {

    return (
      <div className="text-center py-10 text-xl">
        Loading Products...
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
        All Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

        {/* Sidebar */}

        <aside className="md:col-span-3 bg-white rounded-xl shadow-md p-5 sm:p-6">

          <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
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

        <section className="md:col-span-9">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">

            <ProductSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            <ProductSort
              sortField={sortField}
              setSortField={setSortField}
            />

          </div>

          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">

            {products.length > 0 ? (

              <ProductGrid products={products} />

            ) : (

              <div className="text-center py-10 text-gray-500">
                No products found.
              </div>

            )}

          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />

        </section>

      </div>

    </div>

  );
}

export default Products;