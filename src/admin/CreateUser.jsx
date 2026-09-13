import { useState } from "react";

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

export default CreateUser;
