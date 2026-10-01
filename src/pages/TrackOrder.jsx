import { useState } from "react";

import API from "../services/api";

function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState("");

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const searchOrder = async () => {
    if (!orderNumber) return;

    try {
      setLoading(true);

      setError("");

      const response = await API.get(`/api/orders/status/${orderNumber}`);

      setOrder(response.data);
    } catch (error) {
      setOrder(null);

      setError("Order not found");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = () => {
    if (!order) return "";

    if (order.status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (order.status === "ondelivery") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-green-100 text-green-700";
  };

  const getStatusText = () => {
    if (order.status === "pending") {
      return "🟡 Pending";
    }

    if (order.status === "ondelivery") {
      return "🚚 On Delivery";
    }

    return "✅ Completed";
  };

  return (
    <div
      className="
        min-h-screen
        bg-background
        flex
        justify-center
        items-center
        p-6
      "
    >
      <div
        className="
          bg-white
          border
          border-secondary
          rounded-2xl
          shadow-xl
          p-8
          w-full
          max-w-lg
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-primary
            text-center
            mb-6
          "
        >
          Track Your Order
        </h1>

        <div
          className="
            flex
            gap-3
          "
        >
          <input
            type="text"
            placeholder="Enter order number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="
              flex-1
              border
              border-secondary
              rounded-lg
              px-4
              py-3
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />

          <button
            onClick={searchOrder}
            className="
              bg-primary
              text-secondary
              px-5
              rounded-lg
              font-bold
            "
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center mt-6">Searching...</p>}

        {error && (
          <p
            className="
                text-danger
                text-center
                mt-6
              "
          >
            {error}
          </p>
        )}

        {order && (
          <div
            className="
                mt-8
                border
                border-secondary
                rounded-xl
                p-5
              "
          >
            <p>
              <b>Order Number:</b> {order.orderNumber}
            </p>

            <div
              className={`
                  mt-5
                  inline-block
                  px-4
                  py-2
                  rounded-full
                  font-bold

                  ${getStatusStyle()}

                `}
            >
              {getStatusText()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackOrder;
