import { Link } from "react-router";
import { useCart } from "./CartContext";

function Product({
  _id,
  title,
  desc,
  price,
  image,
  review,
  salePercentage,
  quantityInStock,
}) {
  const { addToCart } = useCart();
  const finalPrice =
    salePercentage > 0 ? price - (price * salePercentage) / 100 : price;

  return (
    <div className="w-full">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          overflow-hidden
          h-full
          flex
          flex-col
          border
          border-secondary
          hover:shadow-xl
          transition
          duration-300
        "
      >
        {/* IMAGE */}

        <div className="w-full h-52 sm:h-56 overflow-hidden bg-secondary/20">
          <img
            src={image}
            alt={title}
            className="
              w-full
              h-full
              object-cover
            "
          />
        </div>

        {/* CONTENT */}

        <div
          className="
            p-4
            sm:p-5
            flex
            flex-col
            flex-1
          "
        >
          {/* TITLE */}

          <h2
            className="
            text-lg
              sm:text-xl
              font-bold
              text-text
              mb-2
              line-clamp-2
            "
          >
            {title}
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              text-muted
              text-sm
              mb-3
              line-clamp-2
            "
          >
            {desc}
          </p>

          {/* REVIEW */}

          {/* <div
            className="
              flex
              items-center
              gap-2
              mb-3
            "
          >
            <span className="text-yellow-500">⭐</span>

            <span className="text-gray-700">{review}</span>
          </div> */}
          {/* <div
            className="
mb-4
"
          >
            {quantityInStock > 0 ? (
              <p
                className="
text-green-600
font-bold
text-sm
"
              >
                ✓ In Stock ({quantityInStock})
              </p>
            ) : (
              <p
                className="
text-red-600
font-bold
text-sm
"
              >
                ✕ Out of Stock
              </p>
            )}
          </div> */}

          {/* PRICE */}

          <div className="mb-5">
            {salePercentage > 0 ? (
              <>
                <h3
                  className="
            text-primary
            font-bold
            text-xl
          "
                >
                  ${finalPrice}
                </h3>

                <div
                  className="
            flex
            items-center
            gap-3
          "
                >
                  <span
                    className="
              line-through
              text-muted
            "
                  >
                    ${price}
                  </span>

                  <span
                    className="
              bg-accent
              text-white
              px-2
              py-1
              rounded-lg
              text-sm
              font-bold
            "
                  >
                    {salePercentage}% OFF
                  </span>
                </div>
              </>
            ) : (
              <h3
                className="
          text-primary
          font-bold
          text-2xl
        "
              >
                ${price}
              </h3>
            )}
          </div>

          {/* BUTTONS */}

          <div className="mt-auto flex flex-col gap-3">
            {/* ADD CART */}

            <button
              disabled={quantityInStock === 0}
              className={`
    ${
      quantityInStock === 0
        ? "bg-secondary text-accent cursor-not-allowed"
        : "bg-primary text-white cursor-pointer hover:bg-secondary hover:text-primary"
    }
    py-3
    rounded-xl
    font-semibold
    transition
  `}
              onClick={() =>
                addToCart({
                  id: _id,

                  title,

                  price: finalPrice,

                  image,

                  quantityInStock,

                  salePercentage,
                })
              }
            >
              {quantityInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* DETAILS */}

            <Link
              to={`/product-details/${_id}`}
              className="
                bg-primary
                text-white
                text-center
                py-3
                rounded-xl
                font-semibold
                hover:bg-secondary
                hover:text-primary
                transition
              "
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
