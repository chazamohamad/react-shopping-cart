import { Navigate } from "react-router";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

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
