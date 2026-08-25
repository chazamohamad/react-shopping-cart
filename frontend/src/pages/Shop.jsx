import { useEffect, useState } from "react";
import { Link } from "react-router";

import Product from "./Product.jsx";
import { useCart } from "./CartContext.jsx";

function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { totalItems } = useCart();

  const productsPerPage = 6;

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/products`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const selectedProducts = data.products.map((product) => ({
          id: product.id,

          title: product.title,

          description: product.description,

          price: product.price,

          image: product.thumbnail,
        }));

        setProducts(selectedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* TITLE + CART */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Our Products
        </h1>

        <Link
          to="/cart"
          className="
            bg-gray-900
            text-white
            px-4
            py-2
            rounded-lg
            hover:bg-gray-700
          "
        >
          🛒 Cart ({totalItems})
        </Link>
      </div>

      {/* SEARCH */}

      <input
        type="search"
        placeholder="Search by product title..."
        className="
          w-full
          border
          border-gray-300
          rounded-lg
          px-4
          py-3
          mb-8
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);

          setCurrentPage(1);
        }}
      />

      {/* LOADING */}

      {loading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}

      {/* ERROR */}

      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {filteredProducts.length > 0 ? (
            <div
              className="
                  flex
                  flex-wrap
                  -mx-3
                "
            >
              {currentProducts.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No products found.</p>
          )}

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
                  flex
                  justify-center
                  gap-2
                  mt-10
                "
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                  "
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                        px-4
                        py-2
                        rounded-lg
                        border
                        ${
                          currentPage === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                        }
                      `}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="
                    px-4
                    py-2
                    border
                    rounded-lg
                    disabled:opacity-50
                  "
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Shop;
