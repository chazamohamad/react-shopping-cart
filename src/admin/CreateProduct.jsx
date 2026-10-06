import { useEffect, useState } from "react";

import LoadingButton from "../components/LoadingButton";

import API from "../services/api";

function CreateProduct({ closeModal, refreshProducts }) {
  const [categories, setCategories] = useState([]);

  const [submitting, setSubmitting] = useState(false);

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

    if (submitting) return;

    setError("");

    if (!formData.title || !formData.price || !formData.categoryId) {
      setError("Title, price and category are required");

      return;
    }

    try {
      setSubmitting(true);

      await API.post("/api/products", formData);

      await refreshProducts();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2
        className="
          text-2xl
          font-bold
          text-primary
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
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-3
            outline-none
            focus:ring-2
            focus:ring-accent/30
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
            border-secondary
            p-3
            rounded-lg
            mb-3
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
          "
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-3
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
          "
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-3
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
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
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-3
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
          "
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-5
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
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
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            mb-3
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
          "
        />

        <input
          type="number"
          name="salePercentage"
          placeholder="Sale Percentage %"
          value={formData.salePercentage}
          onChange={handleChange}
          disabled={submitting}
          className="
            w-full
            border
            border-secondary
            p-3
            mb-5
            rounded-lg
            outline-none
            focus:ring-2
            focus:ring-accent/30
            disabled:opacity-60
          "
        />

        <div
          className="
            flex
            gap-3
          "
        >
          <LoadingButton
            type="submit"
            loading={submitting}
            loadingText="Creating..."
            className="
              flex-1
              bg-primary
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
              hover:bg-hover
            "
          >
            Create Product
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

export default CreateProduct;
