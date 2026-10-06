import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton";
import API from "../services/api";

import Modal from "../components/Modal";

import CreateCategory from "./CreateCategory";

import EditCategory from "./EditCategory";

import TableSkeleton from "../components/TableSkeleton";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deleting, setDeleting] = useState(false);

  // MODALS

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

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

  const deleteCategory = async () => {
    if (!selectedCategory || deleting) return;

    try {
      setDeleting(true);

      await API.delete(`/api/categories/${selectedCategory._id}`);

      await getCategories();

      setShowDeleteModal(false);
      setSelectedCategory(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <TableSkeleton rows={3} columns={3} />;
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
            CATEGORY MANAGEMENT
          </p>

          <h1
            className="
text-3xl
font-bold
text-primary
"
          >
            Categories Management
          </h1>

          <p
            className="
text-gray-500
mt-2
"
          >
            Manage your product categories
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
          + Add Category
        </button>
      </div>

      {/* DESKTOP TABLE */}

      <div
        className="
hidden
md:block
bg-white
border
border-secondary
rounded-2xl
shadow-sm
overflow-hidden
"
      >
        <table
          className="
w-full
"
        >
          <thead
            className="
bg-primary
text-white
"
          >
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="
text-center
py-12
text-gray-500
font-bold
"
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="
border-b
border-secondary
hover:bg-background
transition
"
                >
                  <td
                    className="
p-4
font-semibold
text-primary
"
                  >
                    {category.name}
                  </td>

                  <td
                    className="
p-4
text-gray-600
"
                  >
                    {category.desc || "-"}
                  </td>

                  <td className="p-4">
                    <div
                      className="
flex
justify-center
gap-3
"
                    >
                      <button
                        onClick={() => {
                          setSelectedCategory(category);

                          setShowEditModal(true);
                        }}
                        className="
bg-primary
text-white
px-4
py-2
rounded-xl
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
                          setSelectedCategory(category);

                          setShowDeleteModal(true);
                        }}
                        className="
border
border-danger
text-danger
px-4
py-2
rounded-xl
text-sm
font-semibold
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

      {/* MOBILE CARDS */}

      <div
        className="
md:hidden
space-y-5
"
      >
        {categories.map((category) => (
          <div
            key={category._id}
            className="
bg-white
border
border-secondary
rounded-2xl
shadow-sm
p-5
"
          >
            <div
              className="
w-14
h-14
rounded-full
bg-secondary
flex
items-center
justify-center
text-primary
font-bold
text-xl
mb-4
"
            >
              {category.name.charAt(0)}
            </div>

            <h2
              className="
text-xl
font-bold
text-primary
mb-2
"
            >
              {category.name}
            </h2>

            <p
              className="
text-gray-600
text-sm
"
            >
              {category.desc || "No description"}
            </p>

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
                  setSelectedCategory(category);

                  setShowEditModal(true);
                }}
                className="
bg-primary
text-white
py-3
rounded-xl
font-semibold
"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setSelectedCategory(category);

                  setShowDeleteModal(true);
                }}
                className="
border
border-danger
text-danger
py-3
rounded-xl
font-bold
"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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

      {/* DELETE MODAL */}

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
            Delete Category?
          </h2>

          <p
            className="
text-gray-500
mb-6
"
          >
            This will delete the category and related products.
          </p>

          <div className="flex gap-3">
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
              onClick={deleteCategory}
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
    </div>
  );
}

export default AdminCategories;
