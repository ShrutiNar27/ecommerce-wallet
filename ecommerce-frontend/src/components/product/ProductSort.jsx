function ProductSort() {
  return (
    <select className="border rounded-xl px-4 py-3 outline-none">
      <option>Sort By</option>
      <option>Newest</option>
      <option>Price: Low to High</option>
      <option>Price: High to Low</option>
      <option>Highest Rated</option>
    </select>
  );
}

export default ProductSort;