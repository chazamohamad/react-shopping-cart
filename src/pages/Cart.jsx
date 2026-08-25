import { Link } from "react-router";
import { useCart } from "./CartContext";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1
        className="
          text-4xl
          font-bold
          text-center
          mb-10
        "
      >
        My Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <h4 className="text-xl mb-5">Your cart is empty</h4>

          <Link
            to="/shop"
            className="
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-lg
              "
          >
            Go to Products
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              className="
                  bg-white
                  shadow-md
                  rounded-xl
                  p-5
                  mb-5
                "
            >
              <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-6
                  "
              >
                {/* IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="
                      w-40
                      h-40
                      object-contain
                    "
                />

                {/* INFO */}

                <div className="flex-1">
                  <h5
                    className="
                        text-xl
                        font-bold
                        mb-3
                      "
                  >
                    {item.title}
                  </h5>

                  <p className="mb-3">Price: ${item.price}</p>

                  <div
                    className="
                        flex
                        items-center
                        gap-4
                      "
                  >
                    <button
                      className="
                          bg-red-600
                          text-white
                          px-3
                          py-1
                          rounded
                        "
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>

                    <strong>{item.quantity}</strong>

                    <button
                      className="
                          bg-green-600
                          text-white
                          px-3
                          py-1
                          rounded
                        "
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <p className="mt-4 font-bold">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="text-right mt-8">
            <h2
              className="
                text-3xl
                font-bold
              "
            >
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
