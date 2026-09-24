import { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
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
        bg-background
        flex
        items-center
        justify-center
        p-6
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-xl
          border
          border-secondary
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
            text-primary
          "
        >
          Sign Up
        </h1>

        {error && (
          <p
            className="
                bg-red-100
                text-danger
                p-3
                rounded-lg
                mb-4
                text-sm
              "
          >
            {error}
          </p>
        )}

        {success && (
          <p
            className="
                bg-secondary
                text-primary
                p-3
                rounded-lg
                mb-4
                text-sm
              "
          >
            {success}
          </p>
        )}

        <input
          name="FullName"
          placeholder="Full Name"
          value={formData.FullName}
          onChange={handleChange}
          className="
            w-full
            border
            border-secondary
            p-3
            rounded-lg
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-primary
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
            border-secondary
            p-3
            rounded-lg
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-primary
          "
        />

        <div className="relative mb-4">
          <input
            name="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
            autoComplete="new-password"
            data-lpignore="true"
            className="
    w-full
    border
    border-secondary
    p-3
    rounded-lg
    pr-12
    focus:outline-none
    focus:ring-2
    focus:ring-primary
  "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-primary
    "
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          disabled={loading}
          className="
            w-full
            bg-primary
            text-secondary
            py-3
            rounded-lg
            font-bold
              cursor-pointer
            hover:bg-secondary
            hover:text-primary
            transition
            duration-300
          "
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <p
          className="
            mt-6
            text-center
            text-gray-500
          "
        >
          Already have account?
          <Link
            to="/login"
            className="
              text-primary
              hover:text-hover
              font-bold
              ml-2
            "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
