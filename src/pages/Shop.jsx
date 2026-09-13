import { useEffect, useState } from "react";
// import { Link } from "react-router";
// import axios from "axios";
import API from "../services/api.js";

import Product from "./Product.jsx";
import ProductSkeleton from "../components/ProductSkeleton";

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
        py-6
        
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
          text-primary
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
  border-secondary
  rounded-lg
  px-4
  py-3
  mb-10
  bg-white
  focus:outline-none
  focus:ring-2
  focus:ring-primary
        "
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);

          setCurrentPage(1);
        }}
      />

      {/* LOADING */}

      {loading && (
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
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )}

      {/* ERROR */}

      {error && (
        <p
          className="
            text-center
            text-danger
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
                mt-6
              "
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="
                 px-4
py-2
border
border-secondary
font-bold
rounded-lg
text-primary
hover:bg-secondary
transition
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
                            ? "bg-primary text-white"
                            : "bg-secondary"
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
border-secondary
font-bold
rounded-lg
text-primary
hover:bg-secondary
transition
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
