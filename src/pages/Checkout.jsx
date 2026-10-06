import { useState } from "react";
import { useNavigate } from "react-router";

import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

import API from "../services/api";
import LoadingButton from "../components/LoadingButton";

function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();

  const { user } = useAuth();

  const getFinalPrice = (product) => {
    if (product.salePercentage > 0) {
      return product.price - (product.price * product.salePercentage) / 100;
    }

    return product.price;
  };

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

  // PLACE ORDER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double order
    if (loading) return;

    // Do not submit empty cart
    if (cart.length === 0) return;

    try {
      setLoading(true);

      const orderData = {
        userId: user.id,

        products: cart.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
          price: getFinalPrice(item.productId),
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

      const response = await API.post("/api/orders", orderData);

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
    <main
      className="
        min-h-screen
        bg-background
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-10
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* PAGE HEADER */}

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
            Checkout
          </h1>

          <p
            className="
              text-sm
              sm:text-base
              text-muted
              mt-2
            "
          >
            Complete your delivery information and review your order.
          </p>
        </div>

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_380px]
            xl:grid-cols-[1fr_420px]
            gap-6
            lg:gap-8
            items-start
          "
        >
          {/* ================================= */}
          {/* CHECKOUT FORM */}
          {/* ================================= */}

          <form
            onSubmit={handleSubmit}
            className="
              bg-white
              border
              border-border
              rounded-2xl
              shadow-sm
              p-5
              sm:p-7
              lg:p-8
            "
          >
            {/* DELIVERY INFORMATION */}

            <div className="mb-7">
              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-text
                "
              >
                Delivery Information
              </h2>

              <p
                className="
                  text-sm
                  text-muted
                  mt-1
                "
              >
                Enter the address where you would like to receive your order.
              </p>
            </div>

            {/* PHONE */}

            <div className="mb-5">
              <label
                htmlFor="PhoneNumber"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Phone Number
              </label>

              <input
                id="PhoneNumber"
                type="tel"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your phone number"
                required
                className="
                  w-full
                  border
                  border-border
                  bg-white
                  text-text
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  transition
                  placeholder:text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              />
            </div>

            {/* COUNTRY */}

            <div className="mb-5">
              <label
                htmlFor="Country"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Country
              </label>

              <input
                id="Country"
                name="Country"
                value={formData.Country}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter your country"
                required
                className="
                  w-full
                  border
                  border-border
                  bg-white
                  text-text
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  transition
                  placeholder:text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              />
            </div>

            {/* CITY + AREA */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-5
                mb-5
              "
            >
              {/* CITY */}

              <div>
                <label
                  htmlFor="City"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-label
                    mb-2
                  "
                >
                  City
                </label>

                <input
                  id="City"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter your city"
                  required
                  className="
                    w-full
                    border
                    border-border
                    bg-white
                    text-text
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    transition
                    placeholder:text-muted
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                />
              </div>

              {/* AREA */}

              <div>
                <label
                  htmlFor="Area"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-label
                    mb-2
                  "
                >
                  Area
                </label>

                <input
                  id="Area"
                  name="Area"
                  value={formData.Area}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Enter your area"
                  required
                  className="
                    w-full
                    border
                    border-border
                    bg-white
                    text-text
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    transition
                    placeholder:text-muted
                    focus:border-primary
                    focus:ring-2
                    focus:ring-primary/20
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                />
              </div>
            </div>

            {/* ADDRESS */}

            <div className="mb-5">
              <label
                htmlFor="Address"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Full Address
              </label>

              <textarea
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleChange}
                disabled={loading}
                placeholder="Street, building, floor..."
                required
                rows="3"
                className="
                  w-full
                  border
                  border-border
                  bg-white
                  text-text
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  resize-none
                  transition
                  placeholder:text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              />
            </div>

            {/* NOTES */}

            <div className="mb-8">
              <label
                htmlFor="Notes"
                className="
                  block
                  text-sm
                  font-semibold
                  text-label
                  mb-2
                "
              >
                Delivery Notes
                <span className="text-muted font-normal"> (optional)</span>
              </label>

              <textarea
                id="Notes"
                name="Notes"
                value={formData.Notes}
                onChange={handleChange}
                disabled={loading}
                placeholder="Add any special delivery instructions..."
                rows="3"
                className="
                  w-full
                  border
                  border-border
                  bg-white
                  text-text
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  resize-none
                  transition
                  placeholder:text-muted
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              />
            </div>

            {/* PAYMENT METHOD */}

            <div
              className="
                border-t
                border-border
                pt-7
              "
            >
              <h2
                className="
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-text
                  mb-2
                "
              >
                Payment Method
              </h2>

              <p
                className="
                  text-sm
                  text-muted
                  mb-5
                "
              >
                Choose how you would like to pay for your order.
              </p>

              <label
                className={`
                  flex
                  items-center
                  gap-4
                  border
                  rounded-xl
                  p-4
                  transition

                  ${
                    loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                  }

                  ${
                    formData.PaymentMethod === "cash_on_delivery"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-background"
                  }
                `}
              >
                <input
                  type="radio"
                  name="PaymentMethod"
                  value="cash_on_delivery"
                  checked={formData.PaymentMethod === "cash_on_delivery"}
                  onChange={handleChange}
                  disabled={loading}
                  className="
                    w-4
                    h-4
                    accent-primary
                  "
                />

                <div>
                  <p
                    className="
                      font-semibold
                      text-text
                    "
                  >
                    Cash on Delivery
                  </p>

                  <p
                    className="
                      text-sm
                      text-muted
                      mt-1
                    "
                  >
                    Pay when your order is delivered.
                  </p>
                </div>
              </label>
            </div>

            {/* MOBILE PLACE ORDER */}

            <LoadingButton
              type="submit"
              loading={loading}
              disabled={cart.length === 0}
              loadingText="Placing Order..."
              className="
                lg:hidden
                w-full
                bg-primary
                text-white
                py-3
                px-5
                rounded-xl
                font-semibold
                mt-7
                hover:bg-hover
              "
            >
              Place Order
            </LoadingButton>
          </form>

          {/* ================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================= */}

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
                sm:text-2xl
                font-bold
                text-text
                mb-5
              "
            >
              Order Summary
            </h2>

            {/* PRODUCTS */}

            <div
              className="
                space-y-4
                max-h-[420px]
                overflow-y-auto
                pr-1
              "
            >
              {cart.map((item) => {
                const finalPrice = getFinalPrice(item.productId);

                const itemTotal = finalPrice * item.quantity;

                return (
                  <div
                    key={item.productId._id}
                    className="
                      flex
                      gap-3
                      pb-4
                      border-b
                      border-border
                    "
                  >
                    {/* IMAGE */}

                    <div
                      className="
                        w-16
                        h-16
                        sm:w-20
                        sm:h-20
                        flex-shrink-0
                        rounded-xl
                        overflow-hidden
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

                    {/* INFO */}

                    <div
                      className="
                        flex-1
                        min-w-0
                      "
                    >
                      <h3
                        className="
                          font-semibold
                          text-text
                          text-sm
                          sm:text-base
                          line-clamp-2
                        "
                      >
                        {item.productId.title}
                      </h3>

                      <p
                        className="
                          text-sm
                          text-muted
                          mt-1
                        "
                      >
                        Qty: {item.quantity}
                      </p>

                      <p
                        className="
                          font-bold
                          text-primary
                          mt-1
                        "
                      >
                        ${itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOTALS */}

            <div className="pt-5">
              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-sm
                  text-muted
                  mb-4
                "
              >
                <span>Subtotal</span>

                <span
                  className="
                    text-text
                    font-semibold
                  "
                >
                  ${Number(totalPrice).toFixed(2)}
                </span>
              </div>

              <div
                className="
                  flex
                  justify-between
                  items-center
                  text-sm
                  text-muted
                  mb-5
                  gap-4
                "
              >
                <span>Payment</span>

                <span className="text-text text-right">Cash on Delivery</span>
              </div>

              <div
                className="
                  border-t
                  border-border
                  pt-5
                "
              >
                <div
                  className="
                    flex
                    justify-between
                    items-center
                    gap-4
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
                      text-xl
                      sm:text-2xl
                      font-bold
                      text-primary
                      break-all
                      text-right
                    "
                  >
                    ${Number(totalPrice).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* DESKTOP PLACE ORDER */}

            <LoadingButton
              type="button"
              onClick={handleSubmit}
              loading={loading}
              disabled={cart.length === 0}
              loadingText="Placing Order..."
              className="
                hidden
                lg:flex
                w-full
                bg-primary
                text-white
                py-3
                px-5
                rounded-xl
                font-semibold
                mt-6
                hover:bg-hover
              "
            >
              Place Order
            </LoadingButton>

            <p
              className="
                text-xs
                text-muted
                text-center
                mt-3
              "
            >
              Please review your information before placing your order.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
