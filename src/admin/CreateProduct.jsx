import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import API from "../services/api";

function CreateProduct() {
  const navigate = useNavigate();

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
  });

  // GET ALL CATEGORIES

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

  // HANDLE INPUT CHANGE

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

      navigate("/admin/products");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Create Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          shadow-lg
          rounded-xl
          p-8
          max-w-2xl
        "
      >
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

        {/* TITLE */}

        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={formData.title}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        {/* DESCRIPTION */}

        <textarea
          name="desc"
          placeholder="Product description"
          value={formData.desc}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        {/* PRICE */}

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
            mb-4
          "
        />

        {/* IMAGE */}

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        {/* REVIEW */}

        <input
          type="number"
          name="review"
          step="0.1"
          min="0"
          max="5"
          placeholder="Review"
          value={formData.review}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        {/* CATEGORY */}

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-6
          "
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* BUTTON */}

        <button
          disabled={loading}
          className="
            bg-green-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-green-700
          "
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
