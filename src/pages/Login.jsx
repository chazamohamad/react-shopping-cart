import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import LoadingButton from "../components/LoadingButton";
import API from "../services/api";
import { useAuth } from "./AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  if (user && user.role !== "admin") {
    return <Navigate to="/shop" />;
  }

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
        const token = response.data.token;

        login(token);

        const decodedUser = jwtDecode(token);

        if (decodedUser.role === "admin") {
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
    px-4
    sm:px-6
    py-8
  "
    >
      <form
        onSubmit={handleSubmit}
        className="
      bg-white
      w-full
      max-w-md
      p-5
      sm:p-8
      rounded-2xl
      shadow-xl
      border
      border-secondary
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
          disabled={loading}
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

        <div className="relative mb-4">
          <input
            name="Password"
            type={showPassword ? "text" : "password"}
            disabled={loading}
            placeholder="Password"
            value={formData.Password}
            onChange={handleChange}
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

        <LoadingButton
          type="submit"
          loading={loading}
          loadingText="Logging in..."
          className="
    w-full
    bg-primary
    text-white
    py-3
    sm:py-3.5
    rounded-xl
    font-bold
    text-sm
    sm:text-base
    hover:bg-hover
  "
        >
          Login
        </LoadingButton>

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
