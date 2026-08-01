import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";

import { getAllProducts } from "@/services/productService";

function ProductGrid() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getAllProducts();

        setProducts(data);

      } catch (error) {

        console.error("Failed to fetch products:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading products...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          id={product.id}
          image={`https://picsum.photos/300/300?random=${product.id}`}
          title={product.name}
          price={product.price}
          rating={4.5}
        />

      ))}

    </div>
  );
}

export default ProductGrid;