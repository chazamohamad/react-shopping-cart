import { useEffect, useState } from "react";
import { Link } from "react-router";

import Product from "./Product.jsx";
import { useCart } from "./CartContext.jsx";

function Shop() {
  // PRODUCTS STATE
  const [products, setProducts] = useState([]);

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // ERROR STATE
  const [error, setError] = useState("");

  // SEARCH STATE
  const [searchTerm, setSearchTerm] = useState("");

  // CURRENT PAGE STATE
  const [currentPage, setCurrentPage] = useState(1);

  // GET TOTAL ITEMS FROM CART CONTEXT
  const { totalItems } = useCart();

  // NUMBER OF PRODUCTS IN EACH PAGE
  const productsPerPage = 6;

  // =========================
  // GET PRODUCTS FROM API
  // =========================
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

  // =========================
  // SEARCH
  // =========================
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // =========================
  // PAGINATION
  // =========================

  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <main className="container py-5">
      {/* TITLE + CART */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Our Products</h1>

        <Link to="/cart" className="btn btn-dark">
          🛒 Cart ({totalItems})
        </Link>
      </div>

      {/* SEARCH */}
      <form
        className="d-flex mb-5"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search by product title..."
          aria-label="Search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);

            // Return to first page when searching
            setCurrentPage(1);
          }}
        />

        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {/* LOADING */}
      {loading && <p className="text-center">Loading products...</p>}

      {/* ERROR */}
      {error && <p className="text-center text-danger">{error}</p>}

      {/* PRODUCTS */}
      {!loading && !error && (
        <>
          {filteredProducts.length > 0 ? (
            <div className="row g-4">
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
            <nav className="mt-5" aria-label="Products pagination">
              <ul className="pagination justify-content-center">
                {/* PREVIOUS */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {/* PAGE NUMBERS */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                {/* NEXT */}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </main>
  );
}

export default Shop;
