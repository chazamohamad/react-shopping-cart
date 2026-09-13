import { useState } from "react";

import API from "../services/api";

function EditCategory({ category, closeModal, refreshCategories }) {
  const [formData, setFormData] = useState({
    name: category.name,

    desc: category.desc,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(
      `/api/categories/${category._id}`,

      formData,
    );

    await refreshCategories();

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-5">Edit Category</h2>

      <input
        name="name"
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
        Update
      </button>
    </form>
  );
}

export default EditCategory;
