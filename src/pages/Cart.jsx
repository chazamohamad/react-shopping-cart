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
items-center
justify-between
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
rounded
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

                    <p>${item.productId.price}</p>
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
rounded
"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.productId._id)}
                    className="
bg-background
px-3
py-1
rounded
"
                  >
                    +
                  </button>
                </div>

                {/* DELETE */}

                <button
                  onClick={() => removeFromCart(item.productId._id)}
                  className="
bg-danger
text-white
px-4
py-2
rounded
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
text-white
p-6
rounded-xl
"
          >
            <h2
              className="
text-2xl
font-bold
text-primary
"
            >
              Total: ${totalPrice}
            </h2>

            <button
              onClick={clearCart}
              className="
    bg-danger
    text-white
    px-5
    py-3
    rounded-lg
    hover:bg-hover
    transition
    font-bold
  "
            >
              Clear Cart
            </button>

            <Link
              to="/shop"
              className="
inline-block
mt-5
bg-primary
text-white
hover:bg-secondary
hover:text-primary
px-5
py-2
rounded
"
            >
              Continue Shopping
            </Link>
          </div>
          {cart.length > 0 && (
            <Link
              to="/checkout"
              className="
        inline-block
        mt-5
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
              Checkout Order
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

export default Cart;
