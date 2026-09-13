import { useState } from "react";

import API from "../services/api";

function CreateCategory({ closeModal, refreshCategories }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/categories", formData);

      await refreshCategories();

      closeModal();
    } catch (error) {
      setError("Failed to create category");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Create Category</h2>

      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Category name"
          value={formData.name}
          onChange={handleChange}
          className="
w-full
border
p-3
rounded
mb-3
"
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          className="
w-full
border
p-3
rounded
mb-4
"
        />

        <button
          className="
bg-primary
text-white
px-5
py-2
rounded
"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateCategory;
