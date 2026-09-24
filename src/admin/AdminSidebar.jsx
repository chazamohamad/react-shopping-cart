import { NavLink } from "react-router";

function AdminSidebar() {
  return (
    <aside
      className="
        w-64
       bg-primary
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
          end
          className={({ isActive }) =>
            isActive
              ? "block bg-[#E8DCC4] text-primary rounded-lg px-4 py-2 font-bold"
              : "block text-[#E8DCC4] hover:text-white px-4 py-2"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            isActive
              ? "block bg-secondary text-primary rounded-lg px-4 py-2 font-bold"
              : "block text-secondary hover:text-white px-4 py-2"
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            isActive
              ? "block bg-secondary text-primary rounded-lg px-4 py-2 font-bold"
              : "block text-secondary hover:text-white px-4 py-2"
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            isActive
              ? "block bg-secondary text-primary rounded-lg px-4 py-2 font-bold"
              : "block text-secondary hover:text-white px-4 py-2"
          }
        >
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            isActive
              ? "block bg-secondary text-primary rounded-lg px-4 py-2 font-bold"
              : "block text-secondary hover:text-white px-4 py-2"
          }
        >
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
