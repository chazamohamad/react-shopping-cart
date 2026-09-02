import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";

import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  // GET ALL CATEGORIES

  const getCategories = async () => {
    try {
      const response = await API.get("/api/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE CATEGORY

  const deleteCategory = async () => {
    try {
      await API.delete(`/api/categories/${selectedCategory._id}`);

      await getCategories();

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
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
          Categories Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
            bg-green-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          + Create Category
        </button>
      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          shadow
          rounded-xl
          overflow-x-auto
        "
      >
        <table className="w-full">
          <thead
            className="
              bg-gray-900
              text-white
            "
          >
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="p-4">{category.name}</td>

                <td className="p-4">{category.desc}</td>

                <td className="p-4 space-x-2">
                  {/* EDIT */}

                  <button
                    onClick={() => {
                      setSelectedCategory(category);

                      setShowEditModal(true);
                    }}
                    className="
                      bg-blue-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Edit
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() => {
                      setSelectedCategory(category);

                      setShowDeleteModal(true);
                    }}
                    className="
                      bg-red-600
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

      {/* CREATE MODAL */}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateCategory
          closeModal={() => setShowCreateModal(false)}
          refreshCategories={getCategories}
        />
      </Modal>

      {/* EDIT MODAL */}

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedCategory && (
          <EditCategory
            category={selectedCategory}
            closeModal={() => setShowEditModal(false)}
            refreshCategories={getCategories}
          />
        )}
      </Modal>

      {/* DELETE CONFIRM MODAL */}

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <h2
            className="
              text-2xl
              font-bold
              mb-4
            "
          >
            Delete Category?
          </h2>

          <p
            className="
              mb-6
              text-gray-600
            "
          >
            This will delete the category and all related products.
          </p>

          <div
            className="
              flex
              gap-3
            "
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              className="
                bg-gray-300
                px-5
                py-2
                rounded-lg
              "
            >
              Cancel
            </button>

            <button
              onClick={deleteCategory}
              className="
                bg-red-600
                text-white
                px-5
                py-2
                rounded-lg
              "
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminCategories;
