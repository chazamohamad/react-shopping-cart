import { Link } from "react-router";

import { useCart } from "./CartContext";

function Cart() {
  const {
    cart,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    totalPrice,

    loading,

    clearCart,
  } = useCart();

  const getFinalPrice = (product) => {
    if (product.salePercentage > 0) {
      return product.price - (product.price * product.salePercentage) / 100;
    }

    return product.price;
  };

  if (loading) {
    return <p className="text-center mt-10">Loading cart...</p>;
  }

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        py-10
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          mb-8
          text-primary
        "
      >
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div>
          <p className="text-gray-500 mb-5">Your cart is empty</p>

          <Link
            to="/shop"
            className="
                bg-primary
                text-white
                px-5
                py-2
                rounded-lg
              "
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div
            className="
              space-y-5
            "
          >
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="
                  bg-white
                  shadow
                  rounded-xl
                  p-5
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  md:justify-between
                  gap-5
                "
              >
                {/* PRODUCT INFO */}

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="
                      w-24
                      h-24
                      object-cover
                      rounded-lg
                    "
                  />

                  <div>
                    <h2
                      className="
                        font-bold
                        text-xl
                      "
                    >
                      {item.productId.title}
                    </h2>

                    {/* PRICE */}

                    {item.productId.salePercentage > 0 ? (
                      <div>
                        <p
                          className="
                              font-bold
                              text-primary
                              text-lg
                            "
                        >
                          ${getFinalPrice(item.productId)}
                        </p>

                        <div
                          className="
                              flex
                              items-center
                              gap-3
                            "
                        >
                          <p
                            className="
                                text-gray-400
                                line-through
                                text-sm
                              "
                          >
                            ${item.productId.price}
                          </p>

                          <span
                            className="
                                bg-danger
                                text-white
                                px-2
                                py-1
                                rounded-full
                                text-xs
                                font-bold
                              "
                          >
                            {item.productId.salePercentage}% OFF
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="
                            font-bold
                            text-primary
                          "
                      >
                        ${item.productId.price}
                      </p>
                    )}

                    {/* STOCK */}

                    <p
                      className={`
                        text-sm
                        font-bold
                        mt-2

                        ${
                          item.productId.quantityInStock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }

                      `}
                    >
                      {item.productId.quantityInStock > 0
                        ? `In Stock (${item.productId.quantityInStock})`
                        : "Out of Stock"}
                    </p>
                  </div>
                </div>

                {/* QUANTITY */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <button
                    onClick={() => decreaseQuantity(item.productId._id)}
                    className="
                      bg-background
                      px-3
                      py-1
                      rounded-lg
                      font-bold
                    "
                  >
                    -
                  </button>

                  <span
                    className="
                      font-bold
                    "
                  >
                    {item.quantity}
                  </span>

                  <button
                    disabled={item.quantity >= item.productId.quantityInStock}
                    onClick={() => increaseQuantity(item.productId._id)}
                    className="
                      bg-background
                      px-3
                      py-1
                      rounded-lg
                      font-bold
                      disabled:opacity-40
                      disabled:cursor-not-allowed
                    "
                  >
                    +
                  </button>
                </div>

                {/* ITEM TOTAL */}

                <div
                  className="
                    font-bold
                    text-primary
                    text-lg
                  "
                >
                  ${getFinalPrice(item.productId) * item.quantity}
                </div>

                {/* REMOVE */}

                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="
                    bg-danger
                    text-white
                    px-4
                    py-2
                    rounded-lg
                  "
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}

          <div
            className="
              mt-10
              border
              border-primary
              p-6
              rounded-xl
              bg-white
            "
          >
            <div
              className="
                flex
                justify-between
                items-center
                mb-5
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  text-primary
                "
              >
                Total:
              </h2>

              <h2
                className="
                  text-3xl
                  font-bold
                  text-primary
                "
              >
                ${totalPrice}
              </h2>
            </div>

            <div
              className="
                flex
                flex-wrap
                gap-4
              "
            >
              <button
                onClick={clearCart}
                className="
                  bg-danger
                  text-white
                  px-5
                  py-3
                  rounded-lg
                  font-bold
                "
              >
                Clear Cart
              </button>

              <Link
                to="/shop"
                className="
                  bg-secondary
                  text-primary
                  px-5
                  py-3
                  rounded-lg
                  font-bold
                "
              >
                Continue Shopping
              </Link>

              <Link
                to="/checkout"
                className="
                  bg-primary
                  text-secondary
                  px-6
                  py-3
                  rounded-lg
                  font-bold
                "
              >
                Checkout Order
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;
