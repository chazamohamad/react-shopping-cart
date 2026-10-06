import { useState } from "react";
import LoadingButton from "../components/LoadingButton";
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
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
            Update User
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

export default EditUser;
