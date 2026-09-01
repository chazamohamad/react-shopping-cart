import { NavLink } from "react-router";
import { useCart } from "../pages/CartContext.jsx";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-gray-900 shadow">
      <div
        className="
        max-w-7xl 
        mx-auto 
        px-4 
        py-4 
        flex 
        items-center
      "
      >
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

          <li>
            <NavLink to="/login" className="text-gray-300 hover:text-white">
              Login
            </NavLink>
          </li>

          <li>
            <NavLink to="/signup" className="text-gray-300 hover:text-white">
              Sign Up
            </NavLink>
          </li>

          <li>
            <NavLink
              className="
                bg-blue-600
                text-white
                px-5
                py-2
                rounded-lg
                hover:bg-blue-700
              "
              to="/cart"
            >
              🛒 Cart ({totalItems})
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
