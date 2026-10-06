import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

function ProtectedRouteCustomer({ children }) {
  const token = localStorage.getItem("token");

  // No token => user not logged in

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Token expired

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");

      return <Navigate to="/login" />;
    }

    // User is not customer

    if (decoded.role !== "customer") {
      return <Navigate to="/admin" />;
    }
  } catch (error) {
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  }

  // Token exists + valid + customer

  return children;
}

export default ProtectedRouteCustomer;
