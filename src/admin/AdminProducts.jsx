import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";

import CreateProduct from "./CreateProduct";

import EditProduct from "./EditProduct";

import TableSkeleton from "../components/TableSkeleton";

import LoadingButton from "../components/LoadingButton";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deleting, setDeleting] = useState(false);

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

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // SEARCH DEBOUNCE

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // GET PRODUCTS

  useEffect(() => {
    getProducts();
  }, [currentPage, searchQuery]);

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

  const deleteProduct = async (id) => {
    if (deleting) return;

    try {
      setDeleting(true);

      await API.delete(`/api/products/${id}`);

      await getProducts();

      setShowDeleteModal(false);

      setSelectedProductId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
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
flex-col
md:flex-row
md:justify-between
md:items-center
gap-5
mb-8
"
      >
        <div>
          <p
            className="
text-accent
text-xs
uppercase
tracking-widest
font-bold
"
          >
            PRODUCT INVENTORY
          </p>

          <h1
            className="
text-3xl
font-bold
text-primary
"
          >
            Products Management
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Manage products, stock and pricing
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
bg-primary
text-white
px-6
py-3
rounded-xl
font-bold
shadow-sm
hover:bg-hover
transition
"
        >
          + Add Product
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
bg-white
border
border-secondary
rounded-2xl
px-5
py-4
outline-none
shadow-sm
focus:ring-2
focus:ring-accent/30
focus:border-accent
"
        />
      </div>

      {/* TABLE */}
      <div
        className="
hidden
md:block
w-full
bg-white
border
border-secondary
rounded-2xl
shadow-sm
overflow-x-auto
"
      >
        <table
          className="
w-full
min-w-[850px]
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

              <th className="p-4">Product</th>

              <th className="p-4 text-center">Price</th>

              <th className="p-4 text-center">Stock</th>

              <th
                className="
p-4
text-center
hidden
sm:table-cell
"
              >
                Sale
              </th>

              <th
                className="
p-4
text-center
hidden
lg:table-cell
"
              >
                Category
              </th>

              <th
                className="
p-4
text-center
hidden
md:table-cell
"
              >
                Review
              </th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="
text-center
py-12
text-gray-500
font-bold
"
                >
                  No products found
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="
border-b
border-secondary
hover:bg-background
transition
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
rounded-xl
border
border-secondary
"
                    />
                  </td>

                  <td className="p-4">
                    <p
                      className="
font-semibold
text-primary
"
                    >
                      {product.title}
                    </p>
                  </td>

                  <td
                    className="
p-4
text-center
font-semibold
text-primary
"
                  >
                    ${product.price}
                  </td>

                  <td
                    className="
p-4
text-center
text-primary
"
                  >
                    {product.quantityInStock}
                  </td>

                  <td
                    className="
p-4
text-center
text-accent
font-bold
hidden
sm:table-cell
"
                  >
                    {product.salePercentage > 0
                      ? `${product.salePercentage}%`
                      : "-"}
                  </td>

                  <td
                    className="
p-4
text-center
text-gray-600
hidden
lg:table-cell
"
                  >
                    {product.category?.name || "No Category"}
                  </td>

                  <td
                    className="
p-4
text-center
text-gray-600
hidden
md:table-cell
"
                  >
                    ⭐ {product.review}
                  </td>

                  <td className="p-4">
                    <div
                      className="
flex
justify-center
gap-2
"
                    >
                      <button
                        onClick={() => {
                          setSelectedProduct(product);

                          setShowDetailsModal(true);
                        }}
                        className="
border
border-primary
text-primary
px-3
py-2
rounded-lg
text-sm
font-semibold
hover:bg-secondary
transition
"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setSelectedProduct(product);

                          setShowEditModal(true);
                        }}
                        className="
bg-primary
text-white
px-3
py-2
rounded-lg
text-sm
font-semibold
hover:bg-hover
transition
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
border
border-danger
text-danger
px-3
py-2
rounded-lg
text-sm
font-bold
hover:bg-danger
hover:text-white
transition
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

      {/* MOBILE PRODUCT CARDS */}

      <div
        className="
md:hidden
space-y-5
"
      >
        {products.length === 0 ? (
          <div
            className="
bg-white
border
border-secondary
rounded-2xl
p-8
text-center
text-gray-500
font-bold
"
          >
            No products found
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="
bg-white
border
border-secondary
rounded-2xl
shadow-sm
p-5
"
            >
              {/* IMAGE */}

              <img
                src={product.image}
                alt={product.title}
                className="
w-full
h-56
object-cover
rounded-xl
mb-5
"
              />

              {/* TITLE */}

              <h2
                className="
text-xl
font-bold
text-primary
mb-4
"
              >
                {product.title}
              </h2>

              <div
                className="
space-y-3
text-sm
"
              >
                <p>
                  <span className="font-bold text-primary">Price:</span> $
                  {product.price}
                </p>

                <p>
                  <span className="font-bold text-primary">Stock:</span>{" "}
                  {product.quantityInStock}
                </p>

                <p>
                  <span className="font-bold text-primary">Sale:</span>{" "}
                  {product.salePercentage > 0
                    ? `${product.salePercentage}%`
                    : "-"}
                </p>

                <p>
                  <span className="font-bold text-primary">Category:</span>{" "}
                  {product.category?.name || "No Category"}
                </p>

                <p>
                  <span className="font-bold text-primary">Review:</span> ⭐{" "}
                  {product.review}
                </p>
              </div>

              {/* ACTIONS */}

              <div
                className="
grid
grid-cols-2
gap-3
mt-6
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
py-2
rounded-lg
font-semibold
text-sm
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
border
border-danger
text-danger
py-2
rounded-lg
font-semibold
text-sm
"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && products.length > 0 && (
        <div
          className="
flex
flex-wrap
justify-center
items-center
gap-2
mt-8
"
        >
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="
px-4
py-2
bg-white
border
border-secondary
rounded-xl
text-primary
font-semibold
hover:border-accent
disabled:opacity-40
disabled:cursor-not-allowed
transition
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
w-10
h-10
rounded-xl
font-bold
transition

${
  currentPage === index + 1
    ? "bg-primary text-white"
    : "bg-secondary text-primary hover:bg-accent/20"
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
bg-white
border
border-secondary
rounded-xl
text-primary
font-semibold
hover:border-accent
disabled:opacity-40
disabled:cursor-not-allowed
transition
"
          >
            Next
          </button>
        </div>
      )}

      {/* CREATE PRODUCT MODAL */}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateProduct
          closeModal={() => setShowCreateModal(false)}
          refreshProducts={getProducts}
        />
      </Modal>

      {/* DELETE PRODUCT MODAL */}

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <p
            className="
text-accent
text-xs
uppercase
tracking-widest
font-bold
mb-2
"
          >
            CONFIRM ACTION
          </p>

          <h2
            className="
text-2xl
font-bold
text-primary
mb-4
"
          >
            Delete Product?
          </h2>

          <p
            className="
text-gray-500
mb-6
"
          >
            Are you sure you want to delete this product?
          </p>

          <div
            className="
flex
gap-3
"
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              disabled={deleting}
              className="
    bg-secondary
    text-primary
    px-5
    py-3
    rounded-xl
    font-bold
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
            >
              Cancel
            </button>

            <LoadingButton
              onClick={() => deleteProduct(selectedProductId)}
              loading={deleting}
              loadingText="Deleting..."
              className="
    bg-danger
    text-white
    px-5
    py-3
    rounded-xl
    font-bold
    hover:opacity-90
  "
            >
              Delete
            </LoadingButton>
          </div>
        </div>
      </Modal>

      {/* PRODUCT DETAILS MODAL */}

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
      >
        {selectedProduct && (
          <div>
            <p
              className="
text-accent
text-xs
uppercase
tracking-widest
font-bold
mb-2
"
            >
              PRODUCT DETAILS
            </p>

            <h2
              className="
text-2xl
font-bold
text-primary
mb-5
"
            >
              {selectedProduct.title}
            </h2>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="
w-full
h-60
object-cover
rounded-xl
mb-6
"
            />

            <div
              className="
space-y-3
text-gray-600
"
            >
              <p>
                <b className="text-primary">Price:</b> ${selectedProduct.price}
              </p>

              <p>
                <b className="text-primary">Stock:</b>{" "}
                {selectedProduct.quantityInStock}
              </p>

              <p>
                <b className="text-primary">Sale:</b>{" "}
                {selectedProduct.salePercentage}%
              </p>

              <p>
                <b className="text-primary">Category:</b>{" "}
                {selectedProduct.category?.name || "No Category"}
              </p>

              <p>
                <b className="text-primary">Review:</b> ⭐{" "}
                {selectedProduct.review}
              </p>

              <p>
                <b className="text-primary">Description:</b>{" "}
                {selectedProduct.desc || "No description"}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* EDIT PRODUCT MODAL */}

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
