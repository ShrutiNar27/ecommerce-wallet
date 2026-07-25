function ProductFilters() {
  return (
    <div className="space-y-8">

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Category</h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Electronics
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Fashion
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Home
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Books
          </label>
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Price
        </h3>

        <input
          type="range"
          min="0"
          max="100000"
          className="w-full"
        />

        <p className="text-sm text-gray-500 mt-2">
          ₹0 - ₹1,00,000
        </p>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Rating
        </h3>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="rating" />
            4★ & above
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="rating" />
            3★ & above
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="rating" />
            2★ & above
          </label>
        </div>
      </div>

    </div>
  );
}

export default ProductFilters;