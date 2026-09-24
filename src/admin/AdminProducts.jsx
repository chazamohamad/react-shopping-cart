import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import TableSkeleton from "../components/TableSkeleton";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  // GET PRODUCTS

  const getProducts = async () => {
    try {
      const response = await API.get("/api/products");

      setProducts(response.data);
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

      setProducts(products.filter((product) => product._id !== id));

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <TableSkeleton rows={5} columns={6} />;
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
            py-2
            rounded-lg
            hover:bg-secondary
          "
        >
          + Create Product
        </button>
      </div>

      {/* PRODUCTS TABLE */}

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

              <th className="p-4">Category</th>

              <th className="p-4">Review</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
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

                <td className="p-4">
                  {product.category?.name || "No Category"}
                </td>

                <td className="p-4">⭐ {product.review}</td>

                <td className="p-4 space-x-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CREATE PRODUCT MODAL */}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateProduct
          closeModal={() => setShowCreateModal(false)}
          refreshProducts={getProducts}
        />
      </Modal>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <h2
            className="
text-xl
font-bold
mb-4
"
          >
            Delete Product?
          </h2>

          <p className="mb-6">Are you sure you want to delete this product?</p>

          <div className="flex gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="
bg-secondary
text-primary
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
        </div>
      </Modal>
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
