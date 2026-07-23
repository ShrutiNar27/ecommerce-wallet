import CategoryCard from "../category/CategoryCard";
import SectionHeading from "../common/SectionHeading";

const categories = [
  {
    id: 1,
    title: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  },
  {
    id: 2,
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
  },
  {
    id: 3,
    title: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
  {
    id: 4,
    title: "Books",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
  },
];

function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      <SectionHeading
        title="Shop by Category"
        subtitle="Discover products across our most popular categories."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            image={category.image}
          />
        ))}

      </div>

    </section>
  );
}

export default CategoriesSection;