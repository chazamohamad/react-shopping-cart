import { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../services/api";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

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

    if (!formData.Email || !formData.Password) {
      setError("Email and password are required");

      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/api/users/login", formData);

      if (response.data.success) {
        const user = response.data.user;

        login(user);

        if (user.Role === "admin") {
          navigate("/admin");
        } else {
          navigate("/shop");
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
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
          Login
        </h1>

        {error && (
          <p
            className="
                bg-red-100
                text-danger
                p-3
                rounded-lg
                mb-6
                text-sm
              "
          >
            {error}
          </p>
        )}

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
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-primary
           
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
            border-secondary
            p-3
            rounded-lg
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-primary
           
          "
        />

        <button
          disabled={loading}
          className="
            w-full
            bg-primary
            text-secondary
            py-3
            rounded-lg
            font-bold
            hover:bg-secondary
          hover:text-primary
            transition
            duration-300
          "
        >
          {loading ? "Logging..." : "Login"}
        </button>

        <p
          className="
            mt-6
            text-center
            text-gray-500
          "
        >
          Don't have account?
          <Link
            to="/signup"
            className="
              text-primary
              hover:text-hover
              font-bold
              ml-2
            "
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
