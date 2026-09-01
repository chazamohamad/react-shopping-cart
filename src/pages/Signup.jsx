import { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FullName: "",
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setSuccess("");

    // Validation

    if (!formData.FullName || !formData.Email || !formData.Password) {
      setError("All fields are required");

      return;
    }

    if (formData.Password.length < 6) {
      setError("Password must be at least 6 characters");

      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/users/signup", formData);

      setSuccess(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-gray-100
        "
    >
      <form
        onSubmit={handleSubmit}
        className="
                    bg-white
                    p-8
                    rounded-xl
                    shadow-lg
                    w-96
                "
      >
        <h1
          className="
                    text-3xl
                    font-bold
                    mb-6
                    text-center
                "
        >
          Sign Up
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {success && <p className="text-green-600 mb-4">{success}</p>}

        <input
          name="FullName"
          placeholder="Full Name"
          value={formData.FullName}
          onChange={handleChange}
          className="
                        w-full
                        border
                        p-3
                        rounded
                        mb-4
                    "
        />

        <input
          name="Email"
          type="email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="
                        w-full
                        border
                        p-3
                        rounded
                        mb-4
                    "
        />

        <input
          name="Password"
          type="password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          className="
                        w-full
                        border
                        p-3
                        rounded
                        mb-5
                    "
        />

        <button
          disabled={loading}
          className="
                        w-full
                        bg-green-600
                        text-white
                        py-3
                        rounded
                    "
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p className="mt-5 text-center">
          Already have account?
          <Link to="/login" className="text-blue-600 ml-2">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
