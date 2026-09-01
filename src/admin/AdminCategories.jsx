import { useEffect, useState } from "react";
import API from "../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

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

  const deleteCategory = async (id) => {
    const confirmDelete = window.confirm("Delete category?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/categories/${id}`);

      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div>
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

      <div
        className="
        bg-white
        shadow
        rounded-xl
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
                  <button
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

                  <button
                    onClick={() => deleteCategory(category._id)}
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
    </div>
  );
}

export default AdminCategories;
