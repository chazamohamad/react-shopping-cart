import { useState } from "react";
import { useNavigate } from "react-router";

import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

import API from "../services/api";

function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    PhoneNumber: "",

    Country: "",

    City: "",

    Area: "",

    Address: "",

    Notes: "",

    PaymentMethod: "cash_on_delivery",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const orderData = {
        userId: user.id,

        products: cart.map((item) => ({
          productId: item.productId._id,

          quantity: item.quantity,

          price: item.productId.price,
        })),

        totalPrice,

        deliveryInfo: {
          phoneNumber: formData.PhoneNumber,

          country: formData.Country,

          city: formData.City,

          area: formData.Area,

          address: formData.Address,

          notes: formData.Notes,
        },

        paymentMethod: formData.PaymentMethod,
      };

      const response = await API.post(
        "/api/orders",

        orderData,
      );

      console.log(response.data);

      await clearCart();

      navigate("/order-success", {
        state: {
          order: response.data,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-background
        py-10
        px-6
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
        "
      >
        {/* CHECKOUT FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-secondary
            p-8
          "
        >
          <h1
            className="
              text-3xl
              font-bold
              text-primary
              mb-8
            "
          >
            Checkout
          </h1>

          <h2
            className="
              text-xl
              font-bold
              text-primary
              mb-5
            "
          >
            Delivery Information
          </h2>

          {/* PHONE */}

          <input
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="
              w-full
              border
              border-secondary
              p-3
              rounded-lg
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />

          {/* COUNTRY */}

          <input
            name="Country"
            value={formData.Country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="
              w-full
              border
              border-secondary
              p-3
              rounded-lg
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />

          {/* CITY + AREA */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            <input
              name="City"
              value={formData.City}
              onChange={handleChange}
              placeholder="City"
              required
              className="
                border
                border-secondary
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />

            <input
              name="Area"
              value={formData.Area}
              onChange={handleChange}
              placeholder="Area"
              required
              className="
                border
                border-secondary
                p-3
                rounded-lg
                focus:outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          {/* ADDRESS */}

          <textarea
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Full Address"
            required
            rows="3"
            className="
              w-full
              border
              border-secondary
              p-3
              rounded-lg
              mt-4
              mb-4
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />

          {/* NOTES */}

          <textarea
            name="Notes"
            value={formData.Notes}
            onChange={handleChange}
            placeholder="Delivery Notes (optional)"
            rows="3"
            className="
              w-full
              border
              border-secondary
              p-3
              rounded-lg
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          />

          {/* PAYMENT */}

          <h2
            className="
              text-xl
              font-bold
              text-primary
              mb-4
            "
          >
            Payment Method
          </h2>

          <label
            className="
              flex
              items-center
              gap-3
              border
              border-secondary
              rounded-lg
              p-4
              cursor-pointer
              hover:bg-secondary
              transition
              mb-6
            "
          >
            <input
              type="radio"
              name="PaymentMethod"
              value="cash_on_delivery"
              checked={formData.PaymentMethod === "cash_on_delivery"}
              onChange={handleChange}
            />

            <span
              className="
                text-primary
                font-bold
              "
            >
              Cash on Delivery
            </span>
          </label>

          <button
            disabled={loading}
            className="
              w-full
              bg-primary
              text-secondary
              py-3
              rounded-lg
              font-bold
              hover:bg-hover
              transition
            "
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </form>

        {/* ORDER SUMMARY */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-secondary
            p-8
            h-fit
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-primary
              mb-6
            "
          >
            Order Summary
          </h2>

          <div
            className="
              space-y-5
            "
          >
            {cart.map((item) => (
              <div
                key={item.productId._id}
                className="
                    flex
                    gap-4
                    items-center
                    border-b
                    border-secondary
                    pb-4
                  "
              >
                <img
                  src={item.productId.image}
                  className="
                      w-20
                      h-20
                      rounded-lg
                      object-cover
                    "
                />

                <div>
                  <h3
                    className="
                        font-bold
                        text-primary
                      "
                  >
                    {item.productId.title}
                  </h3>

                  <p className="text-gray-500">
                    Qty:
                    {item.quantity}
                  </p>

                  <p
                    className="
                        font-bold
                        text-primary
                      "
                  >
                    ${item.productId.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className="
              mt-8
              border-t
              border-secondary
              pt-5
            "
          >
            <div
              className="
                flex
                justify-between
                text-xl
                font-bold
                text-primary
              "
            >
              <span>Total</span>

              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
