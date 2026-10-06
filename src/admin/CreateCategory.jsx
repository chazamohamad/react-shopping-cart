import { useState } from "react";
import API from "../services/api";
import LoadingButton from "../components/LoadingButton";

function CreateCategory({ closeModal, refreshCategories }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setError("");

    try {
      setSubmitting(true);

      await API.post("/api/categories", formData);

      await refreshCategories();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Create Category</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Category name"
          value={formData.name}
          onChange={handleChange}
          disabled={submitting}
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
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          disabled={submitting}
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
            loading={submitting}
            loadingText="Creating..."
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
            Create Category
          </LoadingButton>

          <button
            type="button"
            onClick={closeModal}
            disabled={submitting}
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
    </div>
  );
}

export default CreateCategory;
