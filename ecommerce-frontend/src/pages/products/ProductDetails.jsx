import DeliveryInfo from "@/components/product/DeliveryInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import { ChevronRight } from "lucide-react";
import ProductReviews from "@/components/product/ProductReviews";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import QuantitySelector from "@/components/product/QuantitySelector";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Back Button */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/">Home</Link>
        <ChevronRight size={16} />
        <Link to="/products">Products</Link>
        <ChevronRight size={16} />
        <span className="text-black font-medium">
          Wireless Headphones
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <ProductImageGallery />
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-3xl font-bold">
            Wireless Headphones
          </h1>

          <p className="text-yellow-500 mt-2">
            ⭐⭐⭐⭐☆ (245 Reviews)
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-5">
            ₹2,499
          </p>

          <div className="mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            In Stock
            </span>
          </div>

          <p className="mt-6 text-gray-600 leading-7">
            Premium wireless headphones with active noise cancellation,
            deep bass, and up to 30 hours of battery life.
          </p>

          <QuantitySelector />

          <div className="flex gap-4 mt-8">

            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-gray-100">
              <Heart size={18} />
              Wishlist
            </button>

            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600">
              Buy Now
            </button>

          </div>

        </div>

      </div>

      <ProductSpecifications />

      <ProductReviews />

      <DeliveryInfo />

      <RelatedProducts />

    </div>
  );
}

export default ProductDetails;