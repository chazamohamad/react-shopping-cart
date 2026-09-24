import { Link, useLocation } from "react-router";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div
      className="
        min-h-screen
        bg-background
        flex
        items-center
        justify-center
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
          max-w-md
          text-center
        "
      >
        {/* ICON */}

        <div
          className="
            w-20
            h-20
            bg-secondary
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-6
            text-4xl
          "
        >
          ✓
        </div>

        <h1
          className="
            text-3xl
            font-bold
            text-primary
            mb-4
          "
        >
          Order Confirmed!
        </h1>

        <p
          className="
            text-gray-500
            mb-6
          "
        >
          Thank you for your order.
        </p>

        {order && (
          <div
            className="
                bg-background
                rounded-xl
                p-4
                mb-6
                text-left
              "
          >
            <p>Order Number:</p>

            <p
              className="
                  font-bold
                  text-primary
                "
            >
              {order.orderNumber}
            </p>

            <p className="mt-3">Total:</p>

            <p
              className="
                  font-bold
                  text-primary
                "
            >
              ${order.totalPrice}
            </p>

            <p className="mt-3">Status:</p>

            <span
              className="
                  inline-block
                  bg-secondary
                  text-primary
                  px-3
                  py-1
                  rounded-full
                  font-bold
                "
            >
              {order.status}
            </span>
          </div>
        )}

        <Link
          to="/shop"
          className="
            inline-block
            bg-primary
            text-secondary
            px-6
            py-3
            rounded-lg
            font-bold
            hover:bg-hover
            transition
          "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
