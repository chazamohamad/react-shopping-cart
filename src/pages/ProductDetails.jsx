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
    return <p className="text-center mt-5">Loading product details...</p>;
  }

  if (error) {
    return <p className="text-center text-danger mt-5">{error}</p>;
  }

  return (
    <main className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-md-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="col-md-7">
          <h1 className="mb-3">{product.title}</h1>

          <p className="text-secondary">{product.description}</p>

          <h3 className="text-success mb-4">${product.price}</h3>

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

          <button
            className="btn btn-success me-2 mt-3"
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

          <Link to="/home" className="btn btn-outline-primary mt-3">
            Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
