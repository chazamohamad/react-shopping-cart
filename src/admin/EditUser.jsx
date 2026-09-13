import { useState } from "react";

import API from "../services/api";

function EditUser({ user, closeModal, refreshUsers }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    FullName: user.FullName,

    Email: user.Email,

    Role: user.Role,
  });

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // UPDATE USER

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await API.put(
        `/api/users/${user._id}`,

        formData,
      );

      await refreshUsers();

      closeModal();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update user");
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
        Edit User
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
          value={formData.FullName}
          onChange={handleChange}
          placeholder="Full Name"
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
          value={formData.Email}
          onChange={handleChange}
          placeholder="Email"
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

export default EditUser;
