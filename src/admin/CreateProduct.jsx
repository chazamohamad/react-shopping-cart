import { useEffect, useState } from "react";

import API from "../services/api";

function CreateProduct({ closeModal, refreshProducts }) {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",

    desc: "",

    price: "",

    image: "",

    review: "",

    categoryId: "",

    quantityInStock: 0,

    salePercentage: 0,
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

  // HANDLE INPUTS

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE PRODUCT

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.title || !formData.price || !formData.categoryId) {
      setError("Title, price and category are required");

      return;
    }

    try {
      setLoading(true);

      await API.post("/api/products", formData);

      // refresh table data

      await refreshProducts();

      // close popup

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create product");
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
          mb-6
        "
      >
        Create Product
      </h2>

      {error && (
        <p
          className="
              text-red-600
              mb-4
            "
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Product title"
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
          placeholder="Description"
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
          placeholder="Price"
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
          placeholder="Image URL"
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
          min="0"
          max="5"
          name="review"
          placeholder="Review"
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

        <input
          type="number"
          name="quantityInStock"
          placeholder="Quantity In Stock"
          value={formData.quantityInStock}
          onChange={handleChange}
          className="
w-full
border
p-3
mb-3
rounded-lg
"
        />

        <input
          type="number"
          name="salePercentage"
          placeholder="Sale Percentage %"
          value={formData.salePercentage}
          onChange={handleChange}
          className="
w-full
border
p-3
mb-5
rounded-lg
"
        />

        <div
          className="
            flex
            gap-3
          "
        >
          <button
            type="submit"
            disabled={loading}
            className="
              bg-primary
              text-white
              px-5
              py-2
              rounded-lg
            "
          >
            {loading ? "Creating..." : "Create"}
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

export default CreateProduct;
