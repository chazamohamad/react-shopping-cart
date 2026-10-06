import { useState } from "react";
import API from "../services/api";
import LoadingButton from "../components/LoadingButton";

function EditCategory({ category, closeModal, refreshCategories }) {
  const [formData, setFormData] = useState({
    name: category.name,
    desc: category.desc,
  });

  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updating) return;

    setError("");

    try {
      setUpdating(true);

      await API.put(`/api/categories/${category._id}`, formData);

      await refreshCategories();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update category");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-5">Edit Category</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={updating}
        className="
          w-full
          border
          p-3
          rounded
          mb-3
          disabled:opacity-60
        "
      />

      <textarea
        name="desc"
        value={formData.desc}
        onChange={handleChange}
        disabled={updating}
        className="
          w-full
          border
          p-3
          rounded
          mb-4
          disabled:opacity-60
        "
      />

      <div className="flex gap-3">
        <LoadingButton
          type="submit"
          loading={updating}
          loadingText="Updating..."
          className="
            flex-1
            bg-primary
            text-white
            px-5
            py-3
            rounded-xl
            font-bold
            hover:bg-hover
          "
        >
          Update Category
        </LoadingButton>

        <button
          type="button"
          onClick={closeModal}
          disabled={updating}
          className="
            bg-danger
            text-white
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
      </div>
    </form>
  );
}

export default EditCategory;
