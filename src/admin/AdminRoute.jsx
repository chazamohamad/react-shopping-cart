import { Navigate } from "react-router";
import { useAuth } from "../pages/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  // User not logged in

  if (!user) {
    return <Navigate to="/login" />;
  }

  // User is not admin

  if (user.Role !== "admin") {
    return <Navigate to="/shop" />;
  }

  // User is admin

  return children;
}

export default AdminRoute;
