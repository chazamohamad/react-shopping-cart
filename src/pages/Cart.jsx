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
      sm:px-6
      lg:px-8
      py-6
      sm:py-10
    "
    >
      {/* HEADER */}

      <div className="mb-6 sm:mb-8">
        <h1
          className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          text-primary
        "
        >
          Shopping Cart
        </h1>

        {cart.length > 0 && (
          <p className="text-muted mt-2 text-sm sm:text-base">
            Review your items before checkout.
          </p>
        )}
      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (
        <div
          className="
          bg-white
          border
          border-border
          rounded-2xl
          p-8
          sm:p-12
          text-center
          max-w-xl
          mx-auto
          shadow-sm
        "
        >
          <div
            className="
            w-16
            h-16
            mx-auto
            mb-5
            rounded-full
            bg-secondary
            flex
            items-center
            justify-center
            text-2xl
          "
          >
            🛒
          </div>

          <h2
            className="
            text-xl
            sm:text-2xl
            font-bold
            text-text
            mb-2
          "
          >
            Your cart is empty
          </h2>

          <p className="text-muted mb-6 text-sm sm:text-base">
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/shop"
            className="
            inline-block
            bg-primary
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            hover:bg-hover
            transition
          "
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-[1fr_340px]
          xl:grid-cols-[1fr_380px]
          gap-6
          lg:gap-8
          items-start
        "
        >
          {/* ==================== */}
          {/* CART PRODUCTS */}
          {/* ==================== */}

          <div className="space-y-4">
            {cart.map((item) => {
              const finalPrice = getFinalPrice(item.productId);
              const itemTotal = finalPrice * item.quantity;

              return (
                <div
                  key={item.productId._id}
                  className="
                  bg-white
                  border
                  border-border
                  rounded-2xl
                  p-4
                  sm:p-5
                  shadow-sm
                  transition
                  hover:shadow-md
                "
                >
                  <div
                    className="
                    flex
                    flex-col
                    sm:flex-row
                    gap-4
                    sm:gap-5
                  "
                  >
                    {/* IMAGE */}

                    <div
                      className="
                      w-full
                      sm:w-32
                      md:w-36
                      h-48
                      sm:h-32
                      md:h-36
                      flex-shrink-0
                      overflow-hidden
                      rounded-xl
                      bg-secondary/20
                    "
                    >
                      <img
                        src={item.productId.image}
                        alt={item.productId.title}
                        className="
                        w-full
                        h-full
                        object-cover
                      "
                      />
                    </div>

                    {/* PRODUCT CONTENT */}

                    <div
                      className="
                      flex-1
                      min-w-0
                      flex
                      flex-col
                    "
                    >
                      <div
                        className="
                        flex
                        flex-col
                        md:flex-row
                        md:justify-between
                        gap-2
                      "
                      >
                        {/* NAME + PRICE */}

                        <div>
                          <h2
                            className="
                            text-lg
                            sm:text-xl
                            font-bold
                            text-text
                            mb-2
                          "
                          >
                            {item.productId.title}
                          </h2>

                          {/* SALE PRICE */}

                          {item.productId.salePercentage > 0 ? (
                            <div>
                              <div
                                className="
                                flex
                                items-center
                                flex-wrap
                                gap-2
                              "
                              >
                                <span
                                  className="
                                  text-lg
                                  font-bold
                                  text-primary
                                "
                                >
                                  ${finalPrice.toFixed(2)}
                                </span>

                                <span
                                  className="
                                  text-sm
                                  text-muted
                                  line-through
                                "
                                >
                                  ${item.productId.price.toFixed(2)}
                                </span>

                                <span
                                  className="
                                  bg-accent
                                  text-white
                                  px-2
                                  py-1
                                  rounded-md
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
                              text-lg
                              font-bold
                              text-primary
                            "
                            >
                              ${item.productId.price.toFixed(2)}
                            </p>
                          )}
                        </div>

                        {/* ITEM TOTAL DESKTOP */}

                        <div className="hidden md:block text-right">
                          <p className="text-xs text-muted mb-1">Item total</p>

                          <p
                            className="
                            text-lg
                            font-bold
                            text-primary
                          "
                          >
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* STOCK */}

                      <p
                        className={`
                        text-sm
                        font-medium
                        mt-3

                        ${
                          item.productId.quantityInStock > 0
                            ? "text-accent"
                            : "text-danger"
                        }
                      `}
                      >
                        {item.productId.quantityInStock > 0
                          ? `✓ In Stock (${item.productId.quantityInStock} available)`
                          : "✕ Out of Stock"}
                      </p>

                      {/* BOTTOM CONTROLS */}

                      <div
                        className="
                        mt-5
                        pt-4
                        border-t
                        border-border
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                      >
                        {/* QUANTITY */}

                        <div
                          className="
                          inline-flex
                          items-center
                          border
                          border-border
                          rounded-lg
                          overflow-hidden
                        "
                        >
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item.productId._id)}
                            className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            text-text
                            bg-background
                            hover:bg-secondary
                            transition
                            font-bold
                            cursor-pointer
                          "
                          >
                            −
                          </button>

                          <span
                            className="
                            w-10
                            text-center
                            text-sm
                            font-bold
                            text-text
                          "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={
                              item.quantity >= item.productId.quantityInStock
                            }
                            onClick={() => increaseQuantity(item.productId._id)}
                            className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            text-text
                            bg-background
                            hover:bg-secondary
                            transition
                            font-bold
                            cursor-pointer
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                          "
                          >
                            +
                          </button>
                        </div>

                        {/* MOBILE TOTAL */}

                        <div className="md:hidden text-right">
                          <p className="text-xs text-muted">Total</p>

                          <p
                            className="
                            font-bold
                            text-primary
                          "
                          >
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId._id)}
                          className="
                          text-danger
                          text-md
                          font-bold
                          hover:underline
                          cursor-pointer
                        "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CLEAR CART */}

            <button
              type="button"
              onClick={clearCart}
              className="
              text-danger
              text-lg
              font-bold
              hover:underline
              cursor-pointer
              mt-2
            "
            >
              Clear Cart
            </button>
          </div>

          {/* ==================== */}
          {/* ORDER SUMMARY */}
          {/* ==================== */}

          <aside
            className="
            bg-white
            border
            border-border
            rounded-2xl
            shadow-sm
            p-5
            sm:p-6
            lg:sticky
            lg:top-24
          "
          >
            <h2
              className="
              text-xl
              font-bold
              text-text
              mb-5
            "
            >
              Order Summary
            </h2>

            <div
              className="
              flex
              justify-between
              items-center
              text-muted
              mb-4
            "
            >
              <span>Subtotal</span>

              <span className="font-semibold text-text">
                ${Number(totalPrice).toFixed(2)}
              </span>
            </div>

            <div
              className="
              flex
              justify-between
              items-center
              text-muted
              mb-5
            "
            >
              <span>Delivery</span>

              <span className="text-sm">Calculated at checkout</span>
            </div>

            <div
              className="
              border-t
              border-border
              pt-5
              mb-6
            "
            >
              <div
                className="
                flex
                justify-between
                items-center
              "
              >
                <span
                  className="
                  text-lg
                  font-bold
                  text-text
                "
                >
                  Total
                </span>

                <span
                  className="
                  text-2xl
                  font-bold
                  text-primary
                "
                >
                  ${Number(totalPrice).toFixed(2)}
                </span>
              </div>
            </div>

            {/* CHECKOUT */}

            <Link
              to="/checkout"
              className="
              block
              w-full
              bg-primary
              text-white
              text-center
              py-3
              px-5
              rounded-xl
              font-semibold
              hover:bg-hover
              transition
              mb-3
            "
            >
              Proceed to Checkout
            </Link>

            {/* SHOP */}

            <Link
              to="/shop"
              className="
              block
              w-full
              border
              border-primary
              text-primary
              text-center
              py-3
              px-5
              rounded-xl
              font-semibold
              hover:bg-secondary
              transition
            "
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
