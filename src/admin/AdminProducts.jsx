import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await API.get("/api/products");

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/api/products/${id}`);

      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
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
          Products Management
        </h1>

        <Link
          to="/admin/products/create"
          className="
    bg-green-600
    text-white
    px-5
    py-2
    rounded-lg
  "
        >
          + Create Product
        </Link>
      </div>

      <div
        className="
        bg-white
        rounded-xl
        shadow
        overflow-x-auto
      "
      >
        <table
          className="
          w-full
          text-left
        "
        >
          <thead
            className="
              bg-gray-900
              text-white
            "
          >
            <tr>
              <th className="p-4">Image</th>

              <th className="p-4">Title</th>

              <th className="p-4">Price</th>

              <th className="p-4">Category</th>

              <th className="p-4">Review</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-4">
                  <img
                    src={product.image}
                    className="
                      w-16
                      h-16
                      object-cover
                      rounded
                    "
                  />
                </td>

                <td className="p-4">{product.title}</td>

                <td className="p-4">${product.price}</td>

                <td className="p-4">
                  {product.category?.name || "No Category"}
                </td>

                <td className="p-4">⭐ {product.review}</td>

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
                    onClick={() => deleteProduct(product._id)}
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

export default AdminProducts;
