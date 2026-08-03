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

      <div className="max-w-7xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        <div className="bg-white p-10 rounded-xl shadow">
          Loading...
        </div>

      </div>

    );

  }

  if (orders.length === 0) {

    return (

      <div className="max-w-7xl mx-auto py-10">

        <h1 className="text-4xl font-bold mb-8">
          My Orders
        </h1>

        <div className="bg-white p-10 rounded-xl shadow text-center">

          <h2 className="text-2xl font-semibold">
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

    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (

          <div
            key={order.orderId}
            className="bg-white rounded-xl shadow p-6"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Order #{order.orderId}
                </h2>

                <p className="text-gray-500 mt-1">
                  {new Date(order.orderDate).toLocaleString()}
                </p>

              </div>

              <div className="text-right">

                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">

                  {order.status}

                </span>

                <h3 className="mt-3 text-2xl font-bold text-blue-600">
                  ₹{order.totalAmount}
                </h3>

              </div>

            </div>

            <hr className="my-5" />

            <div className="space-y-4">

              {order.items.map((item) => (

                <div
                  key={item.productId}
                  className="flex justify-between"
                >

                  <div>

                    <h3 className="font-semibold">
                      {item.productName}
                    </h3>

                    <p className="text-gray-500">
                      Qty : {item.quantity}
                    </p>

                  </div>

                  <div className="font-semibold">
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