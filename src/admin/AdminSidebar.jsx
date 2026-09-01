import { NavLink } from "react-router";

function AdminSidebar() {
  return (
    <aside
      className="
        w-64
        bg-gray-900
        text-white
        min-h-screen
        p-5
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        Admin Panel
      </h1>

      <nav className="space-y-4">
        <NavLink
          to="/admin"
          className="
            block
            text-gray-300
            hover:text-white
          "
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className="
            block
            text-gray-300
            hover:text-white
          "
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className="
            block
            text-gray-300
            hover:text-white
          "
        >
          Categories
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
