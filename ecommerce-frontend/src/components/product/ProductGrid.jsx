import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    image: "https://picsum.photos/300/300?random=1",
    title: "Wireless Headphones",
    price: 2499,
    rating: 4.5,
  },
  {
    id: 2,
    image: "https://picsum.photos/300/300?random=2",
    title: "Smart Watch",
    price: 3999,
    rating: 4.2,
  },
  {
    id: 3,
    image: "https://picsum.photos/300/300?random=3",
    title: "Bluetooth Speaker",
    price: 1799,
    rating: 4.7,
  },
  {
    id: 4,
    image: "https://picsum.photos/300/300?random=4",
    title: "Laptop Backpack",
    price: 1299,
    rating: 4.4,
  },
  {
    id: 5,
    image: "https://picsum.photos/300/300?random=5",
    title: "Gaming Mouse",
    price: 999,
    rating: 4.6,
  },
  {
    id: 6,
    image: "https://picsum.photos/300/300?random=6",
    title: "Mechanical Keyboard",
    price: 3499,
    rating: 4.8,
  },
];

function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          title={product.title}
          price={product.price}
          rating={product.rating}
        />
      ))}
    </div>
  );
}

export default ProductGrid;