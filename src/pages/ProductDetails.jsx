import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useCart } from "./CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function getProductDetails() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProductDetails();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Loading product details...
      </p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <div
        className="
          grid
          md:grid-cols-2
          gap-10
          items-center
        "
      >
        {/* IMAGE */}

        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="
              w-full
              h-[450px]
              object-contain
            "
          />
        </div>

        {/* DETAILS */}

        <div>
          <h1
            className="
              text-4xl
              font-bold
              mb-5
              text-gray-900
            "
          >
            {product.title}
          </h1>

          <p
            className="
              text-gray-600
              mb-5
            "
          >
            {product.description}
          </p>

          <h3
            className="
              text-3xl
              font-bold
              text-green-600
              mb-6
            "
          >
            ${product.price}
          </h3>

          <div className="space-y-3 mb-6">
            <p>
              <strong>Rating:</strong> {product.rating}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Stock:</strong> {product.stock}
            </p>

            {product.brand && (
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            )}
          </div>

          <button
            className="
              bg-green-600
              text-white
              px-6
              py-3
              rounded-lg
              hover:bg-green-700
              transition
              mr-3
            "
            onClick={() =>
              addToCart({
                id: product.id,

                title: product.title,

                price: product.price,

                image: product.thumbnail,
              })
            }
          >
            Add to Cart
          </button>

          <Link
            to="/shop"
            className="
              inline-block
              border
              border-blue-600
              text-blue-600
              px-6
              py-3
              rounded-lg
              hover:bg-blue-600
              hover:text-white
              transition
            "
          >
            Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
