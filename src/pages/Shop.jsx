import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import axios from "axios";
import API from "../services/api.js";

import Product from "./Product.jsx";

function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  // GET PRODUCTS FROM BACKEND

  useEffect(() => {
    async function getProducts() {
      try {
        // const response = await axios.get(
        //   `${import.meta.env.VITE_API_URL}/api/products`,
        // );

        const response = await API.get("/api/products");

        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // SEARCH FILTER

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // PAGINATION

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      "
    >
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
          mb-10
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
        <p
          className="
            text-center
            text-gray-500
          "
        >
          Loading products...
        </p>
      )}

      {/* ERROR */}

      {error && (
        <p
          className="
            text-center
            text-red-600
          "
        >
          {error}
        </p>
      )}

      {/* PRODUCTS */}

      {!loading && !error && (
        <>
          {currentProducts.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-3
                gap-10
              "
            >
              {currentProducts.map((product) => (
                <Product
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  desc={product.desc}
                  price={product.price}
                  image={product.image}
                  review={product.review}
                />
              ))}
            </div>
          ) : (
            <p
              className="
                text-center
              "
            >
              No products found.
            </p>
          )}

          {/* PAGINATION */}

          {totalPages > 1 && (
            <div
              className="
                flex
                justify-center
                gap-3
                mt-12
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
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                        px-4
                        py-2
                        border
                        rounded-lg

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
