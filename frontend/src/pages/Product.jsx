import { Link } from "react-router";
import { useCart } from "./CartContext";

function Product({ id, title, description, price, image }) {
  const { addToCart } = useCart();

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-3">
      <div
        className="
          bg-white
          rounded-xl
          shadow-md
          overflow-hidden
          h-full
          flex
          flex-col
        "
      >
        {/* IMAGE */}

        <img
          src={image}
          alt={title}
          className="
            w-full
            h-56
            object-contain
            p-5
          "
        />

        {/* CONTENT */}

        <div
          className="
            p-5
            flex
            flex-col
            flex-1
          "
        >
          <h5
            className="
              text-xl
              font-bold
              mb-3
              text-gray-900
            "
          >
            {title}
          </h5>

          <p
            className="
              text-gray-500
              mb-4
              line-clamp-3
            "
          >
            {description}
          </p>

          <h5
            className="
              text-green-600
              font-bold
              text-xl
              mt-auto
            "
          >
            ${price}
          </h5>

          {/* ADD CART BUTTON */}

          <button
            className="
              bg-green-600
              text-white
              py-2
              px-4
              rounded-lg
              mt-4
              hover:bg-green-700
              transition
            "
            onClick={() =>
              addToCart({
                id,
                title,
                price,
                image,
              })
            }
          >
            Add to Cart
          </button>

          {/* DETAILS BUTTON */}

          <Link
            to={`/product-details/${id}`}
            className="
              bg-blue-600
              text-white
              text-center
              py-2
              px-4
              rounded-lg
              mt-3
              hover:bg-blue-700
              transition
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
