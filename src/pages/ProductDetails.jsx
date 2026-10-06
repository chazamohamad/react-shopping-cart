import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import axios from "axios";

import { useCart } from "./CartContext.jsx";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getProductDetails() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        );

        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    }

    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <p
        className="
        text-center
        mt-10
        text-gray-500
      "
      >
        Loading product details...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="
        text-center
        mt-10
        text-red-600
      "
      >
        {error}
      </p>
    );
  }

  const finalPrice =
    product.salePercentage > 0
      ? product.price - (product.price * product.salePercentage) / 100
      : product.price;

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const percentage = Math.min(Math.max(rating - (i - 1), 0), 1) * 100;

      stars.push(
        <span
          key={i}
          className="text-2xl"
          style={{
            background: `linear-gradient(
            90deg,
            #facc15 ${percentage}%,
            #d1d5db ${percentage}%
          )`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ★
        </span>,
      );
    }

    return stars;
  };

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
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          md:gap-10
          lg:gap-14
          items-center
        "
      >
        {/* PRODUCT IMAGE */}

        <div>
          <img
            src={product.image}
            alt={product.title}
            className="
  w-full
  h-72
  sm:h-96
  md:h-[450px]
  object-cover
  rounded-xl
  sm:rounded-2xl
  shadow-lg
"
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div>
          <h1
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-bold
              mb-4
              sm:mb-5
              text-primary
            "
          >
            {product.title}
          </h1>

          <p
            className="
              text-muted
              text-base
              sm:text-lg
              md:text-xl
              mb-5
              sm:mb-6
            "
          >
            {product.desc}
          </p>

          <div
            className="
    flex
    items-center
    gap-2
    mb-5
  "
          >
            <div className="text-2xl">{renderStars(product.review)}</div>

            <span className="text-muted">({product.review})</span>
          </div>

          <div className="mb-8">
            {product.salePercentage > 0 ? (
              <div>
                <h2
                  className="
          text-2xl
          sm:text-3xl
          font-bold
          text-primary
        "
                >
                  ${finalPrice}
                </h2>

                <div
                  className="
          flex
          items-center
          gap-3
          mt-2
        "
                >
                  <span
                    className="
            text-muted
            line-through
            text-lg
          "
                  >
                    ${product.price}
                  </span>

                  <span
                    className="
            bg-accent
            text-white
            px-3
            py-1
            rounded-full
            text-sm
            font-bold
          "
                  >
                    {product.salePercentage}% OFF
                  </span>
                </div>
              </div>
            ) : (
              <h2
                className="
        text-3xl
        font-bold
        text-primary
      "
              >
                ${product.price}
              </h2>
            )}
          </div>

          <div className="mb-6">
            {product.quantityInStock > 0 ? (
              <p
                className="
text-accent
font-bold
"
              >
                ✓ In Stock ({product.quantityInStock} available)
              </p>
            ) : (
              <p
                className="
text-red-600
font-bold
"
              >
                ✕ Out of Stock
              </p>
            )}
          </div>

          {/* BUTTONS */}

          <div
            className="
              flex
              gap-4
            "
          >
            {/* ADD TO CART */}

            <button
              disabled={product.quantityInStock === 0}
              className="
    bg-primary
    text-secondary
    px-6
    py-3
    rounded-lg
    hover:bg-secondary
    cursor-pointer
    hover:text-primary
    transition
    disabled:bg-gray-400
    disabled:cursor-not-allowed
  "
              onClick={() =>
                addToCart({
                  id: product._id,

                  title: product.title,

                  price: finalPrice,

                  image: product.image,

                  salePercentage: product.salePercentage,

                  quantityInStock: product.quantityInStock,
                })
              }
            >
              {product.quantityInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* BACK TO SHOP */}

            <Link
              to="/shop"
              className="
                border
                border-primary
                text-primary
                px-6
                py-3
                rounded-lg
                hover:bg-secondary
                hover:text-primary
                transition
              "
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
