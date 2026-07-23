function CategoryCard({ title, image }) {
  return (
    <div className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2">

      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
      />

      <div className="p-5 text-center">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <button className="mt-4 text-blue-600 font-medium hover:underline">
          Explore →
        </button>

      </div>

    </div>
  );
}

export default CategoryCard;