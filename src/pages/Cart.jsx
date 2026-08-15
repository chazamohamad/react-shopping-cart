import { Link } from "react-router";
import { useCart } from "./CartContext";

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, totalPrice } = useCart();

  return (
    <main className="container py-5">
      <h1 className="text-center mb-5">My Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <h4>Your cart is empty</h4>

          <Link to="/home" className="btn btn-primary mt-3">
            Go to Products
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="row g-0 align-items-center">
                {/* IMAGE */}
                <div className="col-md-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid p-3"
                    style={{
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="col-md-10">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>

                    <p className="card-text">Price: ${item.price}</p>

                    {/* QUANTITY */}
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn btn-danger"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        -
                      </button>

                      <strong>{item.quantity}</strong>

                      <button
                        className="btn btn-success"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    {/* PRODUCT TOTAL */}
                    <p className="mt-3 mb-0">
                      <strong>
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* TOTAL PRICE */}
          <div className="text-end mt-4">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
          </div>
        </>
      )}
    </main>
  );
}

export default Cart;
