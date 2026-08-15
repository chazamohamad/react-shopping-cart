import { Link } from "react-router";
import { useCart } from "./CartContext";

function Product({ id, title, description, price, image }) {
  const { addToCart } = useCart();

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <img
          src={image}
          className="card-img-top p-3"
          alt={title}
          style={{
            height: "220px",
            objectFit: "contain",
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>

          <p className="card-text text-secondary">{description}</p>

          <h5 className="text-success mt-auto">${price}</h5>

          <button
            className="btn btn-success mt-3"
            onClick={() =>
              addToCart({
                id: id,
                title: title,
                price: price,
                image: image,
              })
            }
          >
            Add to Cart
          </button>

          <Link to={`/product-details/${id}`} className="btn btn-primary mt-2">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
