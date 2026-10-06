import { NavLink } from "react-router";

function AdminSidebar({ openSidebar, setOpenSidebar }) {
  return (
    <aside
      className={`
fixed
top-0
left-0
z-50

h-screen
w-64

bg-primary
text-white
p-5

transform
transition-transform
duration-300

md:static
md:translate-x-0

${openSidebar ? "translate-x-0" : "-translate-x-full"}
`}
    >
      <button
        onClick={() => setOpenSidebar(false)}
        className="
    md:hidden
    absolute
    top-5
    right-5
    text-secondary
    text-2xl
  "
      >
        ✕
      </button>

      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        Admin Panel
      </h1>

      <nav className="space-y-4 text-lg">
        <NavLink
          to="/admin"
          end
          onClick={() => setOpenSidebar(false)}
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
          onClick={() => setOpenSidebar(false)}
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
          onClick={() => setOpenSidebar(false)}
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
          onClick={() => setOpenSidebar(false)}
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
          onClick={() => setOpenSidebar(false)}
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
