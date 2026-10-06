import { useEffect, useState } from "react";

import API from "../services/api.js";

import Product from "./Product.jsx";
import ProductSkeleton from "../components/ProductSkeleton";

function Shop() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // GET PRODUCTS FROM BACKEND WITH PAGINATION
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await API.get(
          `/api/products?page=${currentPage}&limit=${productsPerPage}&search=${searchQuery}`, //1,6,-
        );

        setProducts(response.data.products); //awal 6 products(0..5)

        setTotalPages(response.data.totalPages); //4 pages
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, [currentPage, searchQuery]);

  return (
    <main
      className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-6
        sm:py-8
      "
    >
      {/* TITLE */}

      <div
        className="
          mb-8
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
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
            gap-10
          "
        >
          {Array.from({
            length: 6,
          }).map((_, index) => (
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
          {products.length > 0 ? (
            <div
              className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-3
      gap-10
    "
            >
              {products.map((product) => (
                <Product
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  desc={product.desc}
                  price={product.price}
                  image={product.image}
                  review={product.review}
                  salePercentage={product.salePercentage}
                  quantityInStock={product.quantityInStock}
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
                gap-3
                mt-8
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
                  rounded-lg
                  font-bold
                  disabled:opacity-50
                "
              >
                Previous
              </button>

              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`

                      px-4
                      py-2
                      rounded-lg

                      ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-secondary text-primary"
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
                  rounded-lg
                  font-bold
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
