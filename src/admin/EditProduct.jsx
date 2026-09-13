import { useEffect, useState } from "react";

import API from "../services/api";

function EditProduct({ product, closeModal, refreshProducts }) {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: product.title,

    desc: product.desc,

    price: product.price,

    image: product.image,

    review: product.review,

    categoryId: product.category?._id || "",
  });

  // GET CATEGORIES

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await API.get("/api/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await API.put(
        `/api/products/${product._id}`,

        formData,
      );

      await refreshProducts();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2
        className="
          text-2xl
          font-bold
          mb-5
        "
      >
        Edit Product
      </h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
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
            rounded-lg
            mb-3
          "
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        <input
          type="number"
          step="0.1"
          name="review"
          value={formData.review}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-5
          "
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex gap-3">
          <button
            disabled={loading}
            className="
              bg-primary
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            {loading ? "Updating..." : "Update"}
          </button>

          <button
            type="button"
            onClick={closeModal}
            className="
              bg-danger
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
