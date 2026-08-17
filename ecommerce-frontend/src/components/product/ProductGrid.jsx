import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">

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