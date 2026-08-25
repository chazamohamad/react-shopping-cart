import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
        <NavLink className="text-white font-bold text-2xl" to="/home">
          Fake Store
        </NavLink>

        <ul className="flex gap-6 ml-auto">
          <li>
            <NavLink
              className="text-gray-300 hover:text-white transition"
              to="/shop"
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              className="text-gray-300 hover:text-white transition"
              to="/about"
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              className="text-gray-300 hover:text-white transition"
              to="/contact"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
