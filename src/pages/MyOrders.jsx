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
    return <p>Loading...</p>;
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
