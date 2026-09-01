import { useState } from "react";
import { Link, useNavigate } from "react-router";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

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

        localStorage.setItem("user", JSON.stringify(user));

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
          Login
        </h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

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
                        bg-blue-600
                        text-white
                        py-3
                        rounded
                    "
        >
          {loading ? "Logging..." : "Login"}
        </button>

        <p className="mt-5 text-center">
          Don't have account?
          <Link to="/signup" className="text-blue-600 ml-2">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
