import { useEffect, useState } from "react";

import ProductGrid from "./ProductGrid";

import { getAllProducts } from "@/services/productService";

function RelatedProducts({ currentProductId }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const data = await getAllProducts();

        const filtered = data
          .filter(product => product.id !== currentProductId)
          .slice(0, 4);

        setProducts(filtered);

      } catch (error) {

        console.error(error);

      }

    };

    fetchProducts();

  }, [currentProductId]);

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold mb-8">
        Related Products
      </h2>

      <ProductGrid products={products} />

    </div>
  );
}

export default RelatedProducts;