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
        px-6
        py-10
      "
    >
      <div
        className="
          grid
          md:grid-cols-2
          gap-10
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
              h-[450px]
              object-cover
              rounded-2xl
              shadow-lg
            "
          />
        </div>

        {/* PRODUCT DETAILS */}

        <div>
          <h1
            className="
              text-4xl
              font-bold
              mb-5
              text-primary
            "
          >
            {product.title}
          </h1>

          <p
            className="
              text-gray-600
              text-lg
              mb-6
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

            <span className="text-gray-600">({product.review})</span>
          </div>

          <h2
            className="
              text-3xl
              font-bold
              text-primary
              mb-8
            "
          >
            ${product.price}
          </h2>

          {/* BUTTONS */}

          <div
            className="
              flex
              gap-4
            "
          >
            {/* ADD TO CART */}

            <button
              className="
                bg-primary
                text-secondary
                px-6
                py-3
                rounded-lg
                hover:bg-secondary
                hover:text-primary
                transition
              "
              onClick={() =>
                addToCart({
                  id: product._id,

                  title: product.title,

                  price: product.price,

                  image: product.image,
                })
              }
            >
              Add to Cart
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
