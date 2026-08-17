function ProductSort({
  sortField,
  setSortField,
}) {
  return (
    <select
      value={sortField}
      onChange={(e) => setSortField(e.target.value)}
      className="w-full sm:w-auto border rounded-xl px-4 py-3 outline-none text-sm sm:text-base"
    >
      <option value="">Sort By</option>

      <option value="price-asc">
        Price: Low to High
      </option>

      <option value="price-desc">
        Price: High to Low
      </option>

      <option value="name-asc">
        Name: A-Z
      </option>

      <option value="name-desc">
        Name: Z-A
      </option>
    </select>
  );
}

export default ProductSort;