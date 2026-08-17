import SectionHeading from "../common/SectionHeading";
import ProductCard from "../product/ProductCard";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    image: "https://picsum.photos/400/400?random=1",
    price: 2999,
    rating: 4.7,
  },
  {
    id: 2,
    title: "Smart Watch",
    image: "https://picsum.photos/400/400?random=2",
    price: 4999,
    rating: 4.8,
  },
  {
    id: 3,
    title: "Gaming Mouse",
    image: "https://picsum.photos/400/400?random=3",
    price: 1499,
    rating: 4.5,
  },
  {
    id: 4,
    title: "Bluetooth Speaker",
    image: "https://picsum.photos/400/400?random=4",
    price: 2499,
    rating: 4.6,
  },
];

function FeaturedProductsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">

      <SectionHeading
        title="Featured Products"
        subtitle="Explore our most popular products."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

    </section>
  );
}

export default FeaturedProductsSection;