import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { ChevronRight, Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

import { getProductById } from "@/services/productService";
import { addToCart } from "@/services/cartService";
import { addToWishlist } from "@/services/wishlistService";

import DeliveryInfo from "@/components/product/DeliveryInfo";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductReviews from "@/components/product/ProductReviews";
import ProductSpecifications from "@/components/product/ProductSpecifications";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import QuantitySelector from "@/components/product/QuantitySelector";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const data = await getProductById(id);

        setProduct(data);

      } catch (error) {

        console.error("Failed to fetch product:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id]);

  const handleAddToCart = async () => {

    try {

      await addToCart(product.id);

      toast.success("Product added to cart");

    } catch (error) {

      console.error(error);

      toast.error("Failed to add product to cart");

    }

  };

  const handleWishlist = async () => {

    try {

      await addToWishlist(product.id);

      toast.success("Product added to wishlist");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add to wishlist"
      );

    }

  };

  if (loading) {

    return (
      <div className="text-center py-20 text-xl">
        Loading Product...
      </div>
    );

  }

  if (!product) {

    return (
      <div className="text-center py-20 text-xl text-red-500">
        Product Not Found
      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">

        <Link to="/">Home</Link>

        <ChevronRight size={16} />

        <Link to="/products">Products</Link>

        <ChevronRight size={16} />

        <span className="text-black font-medium">
          {product.name}
        </span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <ProductImageGallery
            image={`https://picsum.photos/600/600?random=${product.id}`}
          />

        </div>

        {/* Product Information */}

        <div className="bg-white rounded-xl shadow-md p-8">

          <h1 className="text-3xl font-bold">
            {product.name}
          </h1>

          <p className="text-yellow-500 mt-2">
            ⭐⭐⭐⭐☆ (245 Reviews)
          </p>

          <p className="text-3xl font-bold text-blue-600 mt-5">
            ₹{product.price}
          </p>

          <div className="mt-4">

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              In Stock
            </span>

          </div>

          <p className="mt-6 text-gray-600 leading-7">
            Category : {product.categoryName}
          </p>

          <QuantitySelector />

          <div className="flex gap-4 mt-8">

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >

              <ShoppingCart size={18} />

              Add to Cart

            </button>

            <button
              onClick={handleWishlist}
              className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-gray-100"
            >

              <Heart size={18} />

              Wishlist

            </button>

            <button
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600"
            >

              Buy Now

            </button>

          </div>

        </div>

      </div>

      <ProductSpecifications />

      <ProductReviews />

      <DeliveryInfo />

      <RelatedProducts
        currentProductId={product.id}
      />

    </div>

  );

}

export default ProductDetails;