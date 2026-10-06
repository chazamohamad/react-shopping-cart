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
      return "⛟ On Delivery";
    }

    return "✅ Completed";
  };

  return (
    <main
      className="
      min-h-[calc(100vh-80px)]
      bg-background
      px-4
      sm:px-6
      py-10
      sm:py-14
      lg:py-20
    "
    >
      <div
        className="
        w-full
        max-w-xl
        mx-auto
      "
      >
        {/* HEADER */}

        <div className="text-center mb-8">
          <h1
            className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            text-primary
            mb-3
          "
          >
            Track Your Order
          </h1>

          <p
            className="
            text-sm
            sm:text-base
            text-muted
            max-w-md
            mx-auto
          "
          >
            Enter your order number below to check the current status of your
            order.
          </p>
        </div>

        {/* SEARCH CARD */}

        <div
          className="
          bg-white
          border
          border-border
          rounded-2xl
          shadow-md
          p-5
          sm:p-7
        "
        >
          <label
            htmlFor="orderNumber"
            className="
            block
            text-sm
            font-semibold
            text-label
            mb-2
          "
          >
            Order Number
          </label>

          <div
            className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
          >
            <input
              id="orderNumber"
              type="text"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchOrder();
                }
              }}
              className="
              w-full
              min-w-0
              border
              border-border
              rounded-xl
              px-4
              py-3
              bg-white
              text-text
              placeholder:text-muted
              outline-none
              transition
              focus:border-primary
              focus:ring-2
              focus:ring-primary/20
            "
            />

            <button
              type="button"
              onClick={searchOrder}
              disabled={loading || !orderNumber.trim()}
              className="
              w-full
              sm:w-auto
              sm:min-w-28
              bg-primary
              text-white
              px-6
              py-3
              rounded-xl
              font-semibold
              transition
              hover:bg-hover
              disabled:opacity-50
              disabled:cursor-not-allowed
              cursor-pointer
            "
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* ERROR */}

          {error && (
            <div
              className="
              mt-5
              bg-danger/10
              border
              border-danger/20
              text-danger
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-center
            "
            >
              {error}
            </div>
          )}

          {/* ORDER RESULT */}

          {order && (
            <div
              className="
              mt-6
              pt-6
              border-t
              border-border
            "
            >
              <p
                className="
                text-xs
                sm:text-sm
                font-semibold
                uppercase
                tracking-wide
                text-muted
                mb-2
              "
              >
                Order Number
              </p>

              <p
                className="
                text-lg
                sm:text-xl
                font-bold
                text-text
                break-all
              "
              >
                {order.orderNumber}
              </p>

              <div className="mt-5">
                <p
                  className="
                  text-xs
                  sm:text-sm
                  font-semibold
                  uppercase
                  tracking-wide
                  text-muted
                  mb-2
                "
                >
                  Current Status
                </p>

                <span
                  className={`
                  inline-flex
                  items-center
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  font-semibold
                  ${getStatusStyle()}
                `}
                >
                  {getStatusText()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default TrackOrder;
