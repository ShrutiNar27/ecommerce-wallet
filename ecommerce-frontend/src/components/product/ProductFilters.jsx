import { useEffect, useState } from "react";

import { getAllCategories } from "@/services/categoryService";

function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    const fetchCategories = async () => {

      try {

        const data = await getAllCategories();

        setCategories(data);

      } catch (error) {

        console.error("Failed to fetch categories:", error);

      }

    };

    fetchCategories();

  }, []);

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Categories */}

      <div>

        <h3 className="text-base sm:text-lg font-semibold mb-3">
          Category
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">

            <input
              type="radio"
              checked={selectedCategory === null}
              onChange={() => setSelectedCategory(null)}
            />

            All Categories

          </label>

          {categories.map((category) => (

            <label
              key={category.id}
              className="flex items-center gap-2 text-sm sm:text-base cursor-pointer"
            >

              <input
                type="radio"
                checked={selectedCategory === category.id}
                onChange={() =>
                  setSelectedCategory(category.id)
                }
              />

              {category.name}

            </label>

          ))}

        </div>

      </div>

      {/* Price */}

      <div>

        <h3 className="text-base sm:text-lg font-semibold mb-3">
          Maximum Price
        </h3>

        <input
          type="range"
          min="0"
          max="100000"
          step="500"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="w-full cursor-pointer"
        />

        <p className="text-sm text-gray-500 mt-2">
          ₹0 - ₹{maxPrice.toLocaleString()}
        </p>

      </div>

      {/* Rating */}

      <div>

        <h3 className="text-base sm:text-lg font-semibold mb-3">
          Rating
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">

            <input
              type="radio"
              name="rating"
            />

            4★ & above

          </label>

          <label className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">

            <input
              type="radio"
              name="rating"
            />

            3★ & above

          </label>

          <label className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">

            <input
              type="radio"
              name="rating"
            />

            2★ & above

          </label>

        </div>

      </div>

    </div>
  );
}

export default ProductFilters;