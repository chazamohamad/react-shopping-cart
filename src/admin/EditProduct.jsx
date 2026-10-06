import { useEffect, useState } from "react";
import LoadingButton from "../components/LoadingButton";
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

    quantityInStock: product.quantityInStock || 0,
    salePercentage: product.salePercentage || 0,
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
mb-3
rounded-lg
"
        />

        <div className="flex gap-3">
          <LoadingButton
            type="submit"
            loading={loading}
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
            Update Product
          </LoadingButton>
          <button
            type="button"
            onClick={closeModal}
            disabled={loading}
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

export default EditProduct;
