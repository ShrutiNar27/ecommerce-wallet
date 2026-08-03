import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { getCart } from "@/services/cartService";
import { checkout } from "@/services/orderService";

function Checkout() {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const data = await getCart();

        setCart(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchCart();

  }, []);

  const handleCheckout = async () => {

    try {

      await checkout();

      toast.success("Order placed successfully!");

      navigate("/orders");

    } catch (error) {

      console.error(error);

      toast.error("Checkout failed");

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

      </div>

    );

  }

  return (

    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">

        Checkout

      </h1>

      <div className="bg-white rounded-xl shadow-md p-8">

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

        <div className="flex justify-between mt-8 text-2xl font-bold">

          <span>Total</span>

          <span>₹{cart.totalAmount}</span>

        </div>

        <button
          onClick={handleCheckout}
          className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg"
        >

          Place Order

        </button>

      </div>

    </div>

  );

}

export default Checkout;