import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  getWishlist,
  removeFromWishlist,
} from "@/services/wishlistService";

import { addToCart } from "@/services/cartService";

function Wishlist() {

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {

    try {

      const data = await getWishlist();

      setWishlist(data);

    } catch (error) {

      console.error("Failed to fetch wishlist:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchWishlist();

  }, []);

  const handleRemove = async (productId) => {

    try {

      await removeFromWishlist(productId);

      fetchWishlist();

    } catch (error) {

      console.error(error);

      alert("Failed to remove product");

    }

  };

  const handleMoveToCart = async (productId) => {

    try {

      await addToCart(productId);

      await removeFromWishlist(productId);

      fetchWishlist();

      alert("Moved to Cart 🛒");

    } catch (error) {

      console.error(error);

      alert("Failed to move product");

    }

  };

  if (loading) {

    return (
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Wishlist
        </h1>

        <div className="bg-white rounded-xl shadow-md p-10 text-center">

          Loading Wishlist...

        </div>

      </div>
    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">

        My Wishlist

      </h1>

      {wishlist.items.length === 0 ? (

        <div className="bg-white rounded-xl shadow-md p-16 text-center">

          <h2 className="text-2xl font-semibold">

            Your Wishlist is Empty ❤️

          </h2>

          <p className="text-gray-500 mt-3">

            Browse products and add your favourite items.

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {wishlist.items.map((item) => (

            <div
              key={item.productId}
              className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
            >

              <div className="flex items-center gap-5">

                <img
                  src={`https://picsum.photos/120?random=${item.productId}`}
                  alt={item.productName}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>

                  <h2 className="text-xl font-semibold">

                    {item.productName}

                  </h2>

                  <p className="text-blue-600 text-lg font-bold mt-2">

                    ₹{item.price}

                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    handleMoveToCart(item.productId)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Move to Cart
                </button>

                <button
                  onClick={() =>
                    handleRemove(item.productId)
                  }
                  className="flex items-center gap-2 text-red-500 hover:text-red-700"
                >

                  <Trash2 size={18} />

                  Remove

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Wishlist;