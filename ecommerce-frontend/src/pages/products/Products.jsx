import Pagination from "@/components/product/Pagination";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import ProductSearch from "@/components/product/ProductSearch";
import ProductSort from "@/components/product/ProductSort";

function Products() {
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

            <ProductSearch />

            <ProductSort />

          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <ProductGrid />
          </div>

          <Pagination />

        </section>

      </div>

    </div>
  );
}

export default Products;