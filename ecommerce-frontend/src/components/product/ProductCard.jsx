import { Heart, ShoppingCart, Star } from "lucide-react";

function ProductCard({ image, title, price, rating }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          <Heart size={18} />
        </button>

      </div>

      <div className="p-5">

        <h3 className="text-lg font-semibold line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-1 mt-2 text-yellow-500">
          <Star size={16} fill="currentColor" />
          <span className="text-gray-700">{rating}</span>
        </div>

        <div className="flex justify-between items-center mt-5">

          <span className="text-2xl font-bold text-blue-600">
            ₹{price}
          </span>

          <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            <ShoppingCart size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;