import { useState } from "react";
import LoadingButton from "../components/LoadingButton";
import API from "../services/api";

function CreateUser({ closeModal, refreshUsers }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    FullName: "",

    Email: "",

    Password: "",

    Role: "customer",
  });

  // HANDLE INPUTS

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // CREATE USER

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.FullName || !formData.Email || !formData.Password) {
      setError("Name, email and password are required");

      return;
    }

    try {
      setLoading(true);

      await API.post("/api/users", formData);

      await refreshUsers();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create user");
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
        Create User
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
        {/* FULL NAME */}

        <input
          type="text"
          name="FullName"
          disabled={loading}
          placeholder="Full Name"
          value={formData.FullName}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        {/* EMAIL */}

        <input
          type="email"
          name="Email"
          disabled={loading}
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="Password"
          disabled={loading}
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-3
          "
        />

        {/* ROLE */}

        <select
          name="Role"
          value={formData.Role}
          disabled={loading}
          onChange={handleChange}
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-5
          "
        >
          <option value="customer">Customer</option>

          <option value="admin">Admin</option>
        </select>

        <div
          className="
            flex
            gap-3
          "
        >
          <div className="flex gap-3">
            <LoadingButton
              type="submit"
              loading={loading}
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
              Create User
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
        </div>
      </form>
    </div>
  );
}

export default CreateUser;
