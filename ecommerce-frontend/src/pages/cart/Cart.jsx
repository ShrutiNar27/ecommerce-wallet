import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
} from "@/services/cartService";

import CartItem from "@/components/cart/CartItem";

function Cart() {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchCart = async () => {

    try {

      const data = await getCart();

      setCart(data);

    } catch (error) {

      console.error("Failed to fetch cart:", error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCart();

  }, []);

  const handleIncrease = async (item) => {

    try {

      await updateCart(
        item.productId,
        item.quantity + 1
      );

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  const handleDecrease = async (item) => {

    if (item.quantity === 1) return;

    try {

      await updateCart(
        item.productId,
        item.quantity - 1
      );

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  const handleRemove = async (productId) => {

    try {

      await removeFromCart(productId);

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  const handleClearCart = async () => {

    try {

      await clearCart();

      fetchCart();

    } catch (error) {

      console.error(error);

    }

  };

  if (loading) {

    return (

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          Loading Cart...
        </div>

      </div>

    );

  }

  if (!cart || cart.items.length === 0) {

    return (

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="bg-white rounded-xl shadow-md p-10 text-center">

          <h2 className="text-2xl font-semibold">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-3">
            Add some products to continue shopping.
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-3 gap-8">

        {/* Cart Items */}

        <div className="col-span-2">

          {cart.items.map((item) => (

            <CartItem
              key={item.productId}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />

          ))}

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">

          <h2 className="text-2xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">

            <span>Total Items</span>

            <span>{cart.items.length}</span>

          </div>

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>₹{cart.totalAmount}</span>

          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>

          <button
            onClick={handleClearCart}
            className="w-full mt-3 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50"
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>

  );

}

export default Cart;