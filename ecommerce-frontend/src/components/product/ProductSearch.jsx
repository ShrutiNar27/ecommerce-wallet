import { Search } from "lucide-react";

function ProductSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full border rounded-xl py-3 pl-11 pr-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default ProductSearch;