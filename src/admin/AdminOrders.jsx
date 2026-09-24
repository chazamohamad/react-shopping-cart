import { useEffect, useState } from "react";

import API from "../services/api";

import TableSkeleton from "../components/TableSkeleton";
import OrderDetailsModal from "./OrderDetailsModal";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // selected order for modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const response = await API.get("/api/orders");

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const response = await API.get(`/api/orders/${orderId}`);

      setSelectedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(
        `/api/orders/${orderId}`,

        {
          status,
        },
      );

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <TableSkeleton rows={6} columns={6} />;
  }

  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          text-primary
          mb-6
        "
      >
        Orders Management
      </h1>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          border
          border-secondary
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead
            className="
              bg-primary
              text-secondary
            "
          >
            <tr>
              <th className="p-4">Order Number</th>

              <th className="p-4">Customer</th>

              <th className="p-4">Total</th>

              <th className="p-4">Date</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="
                  border-b
                  border-secondary
                  text-center
                "
              >
                <td className="p-4">{order.orderNumber}</td>

                <td className="p-4">{order.userId?.FullName}</td>

                <td className="p-4 font-bold">${order.totalPrice}</td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* UPDATE STATUS */}
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="
                        border
                        border-secondary
                        rounded-lg
                        p-2
                        text-primary
                      "
                  >
                    <option value="pending">Pending</option>

                    <option value="ondelivery">On Delivery</option>

                    <option value="completed">Completed</option>
                  </select>
                </td>

                <td className="p-4">
                  <div
                    className="
                      flex
                      gap-2
                      justify-center
                    "
                  >
                    {/* VIEW DETAILS */}

                    <button
                      onClick={() => getOrderDetails(order._id)}
                      className="
                        bg-secondary
                        text-primary
                        px-3
                        py-2
                        rounded-lg
                        hover:bg-hover
                        transition
                      "
                    >
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ORDER DETAILS MODAL */}

        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      </div>
    </div>
  );
}

export default AdminOrders;
