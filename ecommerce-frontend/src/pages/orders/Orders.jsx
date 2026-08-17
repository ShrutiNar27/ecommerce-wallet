import { useEffect, useState } from "react";

import { getOrders } from "@/services/orderService";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const data = await getOrders();

      setOrders(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          My Orders
        </h1>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow">
          Loading...
        </div>

      </div>

    );

  }

  if (orders.length === 0) {

    return (

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
          My Orders
        </h1>

        <div className="bg-white p-8 sm:p-10 rounded-xl shadow text-center">

          <h2 className="text-xl sm:text-2xl font-semibold">
            No Orders Yet 📦
          </h2>

          <p className="text-gray-500 mt-3">
            Start shopping to place your first order.
          </p>

        </div>

      </div>

    );

  }

  return (

    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-10">

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">
        My Orders
      </h1>

      <div className="space-y-5 sm:space-y-6">

        {orders.map((order) => (

          <div
            key={order.orderId}
            className="bg-white rounded-xl shadow p-5 sm:p-6"
          >

            {/* Order Header */}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

              <div>

                <h2 className="text-lg sm:text-xl font-bold">
                  Order #{order.orderId}
                </h2>

                <p className="text-gray-500 mt-1 text-sm sm:text-base">
                  {new Date(order.orderDate).toLocaleString()}
                </p>

              </div>

              <div className="sm:text-right">

                <span className="inline-block px-3 sm:px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                  {order.status}
                </span>

                <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{order.totalAmount}
                </h3>

              </div>

            </div>

            <hr className="my-4 sm:my-5" />

            {/* Order Items */}

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.productId}
                  className="flex justify-between items-start gap-4"
                >

                  <div className="min-w-0">

                    <h3 className="font-semibold text-sm sm:text-base break-words">
                      {item.productName}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <div className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    ₹{item.subtotal}
                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Orders;