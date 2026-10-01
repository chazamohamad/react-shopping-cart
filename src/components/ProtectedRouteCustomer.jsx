import { Navigate, useNavigate } from "react-router";

import { jwtDecode } from "jwt-decode";

import { useEffect } from "react";

function ProtectedRouteCustomer({ children }) {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (decoded.role !== "customer") {
        navigate(-1);
      }
    } catch (error) {
      localStorage.removeItem("token");

      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");

      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRouteCustomer;
