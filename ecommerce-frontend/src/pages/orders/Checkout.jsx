import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { getCart } from "@/services/cartService";
import { checkout } from "@/services/orderService";

function Checkout() {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const data = await getCart();

        setCart(data);

      } catch (error) {

        console.error(error);

        toast.error("Failed to load checkout");

      } finally {

        setLoading(false);

      }

    };

    fetchCart();

  }, []);

  const handleWalletPayment = async () => {

    try {

      setProcessing(true);

      // Backend handles:
      // 1. Create order
      // 2. Check wallet balance
      // 3. Deduct wallet amount
      // 4. Create wallet transaction
      // 5. Mark order as PAID
      // 6. Clear cart

      await checkout();

      toast.success("Payment successful! Order placed.");

      navigate("/orders");

    } catch (error) {

      console.error("Wallet payment failed:", error);

      toast.error(
        error.response?.data?.message ||
        "Wallet payment failed"
      );

    } finally {

      setProcessing(false);

    }

  };

  if (loading) {

    return (
      <div className="text-center py-20 text-xl">
        Loading Checkout...
      </div>
    );

  }

  if (!cart || cart.items.length === 0) {

    return (
      <div className="text-center py-20">

        <h1 className="text-3xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-2">
          Add some products to continue shopping.
        </p>

      </div>
    );

  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Page Title */}

      <h1 className="text-4xl font-bold mb-8">
        Checkout
      </h1>

      {/* Checkout Card */}

      <div className="bg-white rounded-xl shadow-md p-8">

        {/* Order Summary */}

        <h2 className="text-2xl font-semibold mb-6">
          Order Summary
        </h2>

        {cart.items.map((item) => (

          <div
            key={item.productId}
            className="flex justify-between border-b py-4"
          >

            <div>

              <h3 className="font-semibold">
                {item.productName}
              </h3>

              <p className="text-gray-500">
                Quantity : {item.quantity}
              </p>

            </div>

            <p className="font-bold">
              ₹{item.subtotal}
            </p>

          </div>

        ))}

        {/* Total */}

        <div className="flex justify-between mt-8 text-2xl font-bold">

          <span>
            Total
          </span>

          <span>
            ₹{cart.totalAmount}
          </span>

        </div>

        {/* Payment Method */}

        <div className="mt-8">

          <h2 className="text-xl font-semibold mb-4">
            Payment Method
          </h2>

          <div className="border-2 border-blue-600 bg-blue-50 rounded-xl p-5">

            <div className="flex justify-between items-center">

              <div>

                <h3 className="font-bold text-lg">
                  💳 ShopEase Wallet
                </h3>

                <p className="text-gray-600 text-sm mt-1">
                  Pay securely using your wallet balance
                </p>

              </div>

              <span className="text-blue-600 font-semibold">
                Wallet
              </span>

            </div>

          </div>

        </div>

        {/* Pay Button */}

        <button
          onClick={handleWalletPayment}
          disabled={processing}
          className={`w-full mt-8 text-white py-4 rounded-xl text-lg font-semibold ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >

          {processing
            ? "Processing Payment..."
            : `Pay ₹${cart.totalAmount} with Wallet`
          }

        </button>

      </div>

    </div>

  );

}

export default Checkout;