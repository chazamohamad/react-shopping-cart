import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import TableSkeleton from "../components/TableSkeleton";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // PAGINATION

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const productsPerPage = 5;

  // SEARCH

  const [searchTerm, setSearchTerm] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  // MODALS

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // DEBOUNCE SEARCH

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // GET PRODUCTS WHEN PAGE OR SEARCH CHANGES

  useEffect(() => {
    getProducts();
  }, [currentPage, searchQuery]);

  // GET PRODUCTS

  const getProducts = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/api/products?page=${currentPage}&limit=${productsPerPage}&search=${searchQuery}`,
      );

      setProducts(response.data.products);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE PRODUCT

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/api/products/${id}`);

      getProducts();

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <TableSkeleton rows={5} columns={8} />;
  }

  return (
    <div>
      {/* HEADER */}

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-primary
          "
        >
          Products Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
            bg-primary
            text-white
            px-5
            py-3
            rounded-lg
            hover:bg-secondary
            transition
          "
        >
          + Create Product
        </button>
      </div>

      {/* SEARCH */}

      <div
        className="
          mb-8
        "
      >
        <input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);

            setCurrentPage(1);
          }}
          className="
            w-full
            border
            border-secondary
            rounded-xl
            px-5
            py-4
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        />
      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          border
          border-secondary
          rounded-xl
          shadow
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
            text-left
          "
        >
          <thead
            className="
              bg-primary
              text-white
            "
          >
            <tr>
              <th className="p-4">Image</th>

              <th className="p-4">Title</th>

              <th className="p-4">Price</th>

              <th className="p-4">Stock</th>

              <th className="p-4">Sale</th>

              <th className="p-4">Category</th>

              <th className="p-4">Review</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <p
                className="
text-center
text-gray-500
py-10
font-bold
"
              >
                No data found
              </p>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="
                  border-b
                  border-secondary
                "
                >
                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="
                      w-16
                      h-16
                      object-cover
                      rounded
                    "
                    />
                  </td>

                  <td className="p-4">{product.title}</td>

                  <td className="p-4">${product.price}</td>

                  <td className="p-4">{product.quantityInStock}</td>

                  <td className="p-4">
                    {product.salePercentage > 0
                      ? `${product.salePercentage}%`
                      : "-"}
                  </td>

                  <td className="p-4">
                    {product.category?.name || "No Category"}
                  </td>

                  <td className="p-4">⭐ {product.review}</td>

                  <td className="p-4">
                    <div
                      className="
                      flex
                      gap-2
                    "
                    >
                      <button
                        onClick={() => {
                          setSelectedProduct(product);

                          setShowEditModal(true);
                        }}
                        className="
                        bg-primary
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProductId(product._id);

                          setShowDeleteModal(true);
                        }}
                        className="
                        bg-danger
                        text-white
                        px-3
                        py-1
                        rounded
                      "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && products.length > 0 && (
        <div
          className="
          flex
          justify-center
          items-center
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
            rounded-lg
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
            rounded-lg
            disabled:opacity-50
          "
          >
            Next
          </button>
        </div>
      )}

      {/* CREATE MODAL */}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateProduct
          closeModal={() => setShowCreateModal(false)}
          refreshProducts={getProducts}
        />
      </Modal>

      {/* DELETE MODAL */}

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2 className="text-xl font-bold mb-4">Delete Product?</h2>

        <p className="mb-6">Are you sure you want to delete this product?</p>

        <div className="flex gap-3">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="
              bg-secondary
              px-4
              py-2
              rounded
            "
          >
            Cancel
          </button>

          <button
            onClick={() => deleteProduct(selectedProductId)}
            className="
              bg-danger
              text-white
              px-4
              py-2
              rounded
            "
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* EDIT MODAL */}

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedProduct && (
          <EditProduct
            product={selectedProduct}
            closeModal={() => setShowEditModal(false)}
            refreshProducts={getProducts}
          />
        )}
      </Modal>
    </div>
  );
}

export default AdminProducts;
