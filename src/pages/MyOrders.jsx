import { useEffect, useState } from "react";

import API from "../services/api";

import { useAuth } from "./AuthContext";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await API.get(`/api/orders/user/${user.id}`);

        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      getOrders();
    }
  }, [user]);

  if (loading) {
    return (
      <div
        className="
        max-w-5xl
        mx-auto
        p-6
      "
      >
        {/* TITLE SKELETON */}
        <div
          className="
          h-9
          w-48
          bg-gray-200
          rounded-lg
          mb-6
          animate-pulse
        "
        />

        {/* ORDER SKELETONS */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
              bg-white
              border
              border-secondary
              rounded-xl
              p-5
              shadow
              animate-pulse
            "
            >
              <div
                className="
                h-4
                w-2/3
                bg-gray-200
                rounded
                mb-4
              "
              />

              <div
                className="
                h-4
                w-1/3
                bg-gray-200
                rounded
                mb-4
              "
              />

              <div
                className="
                h-4
                w-1/4
                bg-gray-200
                rounded
              "
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="
max-w-5xl
mx-auto
p-6
"
    >
      <h1
        className="
text-3xl
font-bold
text-primary
mb-6
"
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div
          className="
space-y-4
"
        >
          {orders.map((order) => (
            <div
              key={order._id}
              className="
bg-white
border
border-secondary
rounded-xl
p-5
shadow
"
            >
              <p>
                <b>Order Number:</b>

                {order.orderNumber}
              </p>

              <p>
                <b>Total:</b>${order.totalPrice}
              </p>

              <p>
                <b>Status:</b>

                {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
