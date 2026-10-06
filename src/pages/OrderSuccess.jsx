import { Link, useLocation } from "react-router";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  const getStatusText = (status) => {
    if (status === "pending") return "Pending";
    if (status === "ondelivery") return "On Delivery";
    if (status === "completed") return "Completed";

    return status;
  };

  const getStatusStyle = (status) => {
    if (status === "pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "ondelivery") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    return "bg-secondary text-primary";
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
        <div
          className="
            bg-white
            border
            border-border
            rounded-2xl
            shadow-sm
            p-5
            sm:p-8
          "
        >
          {/* SUCCESS ICON */}

          <div
            className="
              w-16
              h-16
              sm:w-20
              sm:h-20
              bg-primary/10
              text-primary
              rounded-full
              flex
              items-center
              justify-center
              mx-auto
              mb-5
              sm:mb-6
              text-3xl
              sm:text-4xl
              font-bold
            "
          >
            ✓
          </div>

          {/* HEADER */}

          <div className="text-center">
            <h1
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-primary
                mb-3
              "
            >
              Order Confirmed!
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
              Thank you for your order. Your order has been received and is
              being processed.
            </p>
          </div>

          {/* ORDER INFORMATION */}

          {order && (
            <div
              className="
                mt-7
                bg-background
                border
                border-border
                rounded-xl
                p-4
                sm:p-5
              "
            >
              <h2
                className="
                  text-lg
                  font-bold
                  text-text
                  mb-5
                "
              >
                Order Details
              </h2>

              {/* ORDER NUMBER */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  gap-1
                  sm:gap-4
                  pb-4
                  border-b
                  border-border
                "
              >
                <span
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Order Number
                </span>

                <span
                  className="
                    font-semibold
                    text-text
                    break-all
                    sm:text-right
                  "
                >
                  {order.orderNumber}
                </span>
              </div>

              {/* TOTAL */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-4
                  border-b
                  border-border
                "
              >
                <span
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Total
                </span>

                <span
                  className="
                    text-lg
                    font-bold
                    text-primary
                  "
                >
                  ${Number(order.totalPrice).toFixed(2)}
                </span>
              </div>

              {/* STATUS */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  pt-4
                "
              >
                <span
                  className="
                    text-sm
                    text-muted
                  "
                >
                  Status
                </span>

                <span
                  className={`
                    inline-flex
                    items-center
                    px-3
                    py-1.5
                    rounded-full
                    text-xs
                    sm:text-sm
                    font-semibold
                    capitalize

                    ${getStatusStyle(order.status)}
                  `}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>
          )}

          {/* INFORMATION */}

          <div
            className="
              mt-5
              border
              border-border
              rounded-xl
              p-4
            "
          >
            <p
              className="
                text-sm
                text-muted
                text-center
                leading-6
              "
            >
              Keep your order number to track the status of your order.
            </p>
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              gap-3
              mt-6
            "
          >
            {order && (
              <Link
                to="/track-order"
                className="
                  w-full
                  text-center
                  bg-primary
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-hover
                  transition
                "
              >
                Track Order
              </Link>
            )}

            <Link
              to="/shop"
              className="
                w-full
                text-center
                border
                border-primary
                text-primary
                px-5
                py-3
                rounded-xl
                font-semibold
                hover:bg-secondary
                transition
              "
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;
