import { Routes, Route } from "react-router";

import PublicLayout from "./components/PublicLayout";

import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminCategories from "./admin/AdminCategories";
import AdminProfile from "./admin/AdminProfile";
import AdminRoute from "./admin/AdminRoute";
import AdminUsers from "./admin/AdminUsers";
import AdminOrders from "./admin/AdminOrders";

function App() {
  return (
    <Routes>
      {/* PUBLIC WEBSITE */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Shop />} />

        <Route path="/shop" element={<Shop />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route path="users" element={<AdminUsers />} />

        <Route path="products" element={<AdminProducts />} />

        <Route path="categories" element={<AdminCategories />} />

        <Route path="orders" element={<AdminOrders />} />

        <Route path="profile" element={<AdminProfile />} />
      </Route>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
    </Routes>
  );
}

export default App;
