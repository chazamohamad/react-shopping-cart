import { NavLink, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

import { FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

import { useAuth } from "../pages/AuthContext";
import { useCart } from "../pages/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const userMenuRef = useRef();

  const { user, logout } = useAuth();

  const { totalItems } = useCart();

  const [openUserMenu, setOpenUserMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setOpenUserMenu(false);

    logout();

    navigate("/login");
  };

  return (
    <nav
      className="
        bg-primary
        shadow-lg
      "
    >
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
        {/* LOGO */}

        <NavLink
          to="/shop"
          className="
            text-secondary
            font-bold
            text-2xl
          "
        >
          Fake Store
        </NavLink>

        <ul
          className="
            flex
            gap-6
            ml-auto
            items-center
          "
        >
          {/* SHOP */}

          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary font-bold"
                  : "text-white hover:text-secondary"
              }
            >
              Shop
            </NavLink>
          </li>

          {/* ABOUT */}

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary font-bold"
                  : "text-white hover:text-secondary"
              }
            >
              About
            </NavLink>
          </li>

          {/* CONTACT */}

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-secondary font-bold"
                  : "text-white hover:text-secondary"
              }
            >
              Contact
            </NavLink>
          </li>

          {user ? (
            <>
              {/* CART */}

              <li>
                <NavLink
                  to="/cart"
                  className="
                      relative
                      text-secondary
                      hover:text-hover
                      transition
                    "
                >
                  <FaShoppingCart
                    className="
                        text-2xl
                      
                      "
                  />

                  {totalItems > 0 && (
                    <span
                      className="
                            absolute
                            -top-3
                            -right-3
                            bg-danger
                            text-white
                            text-xs
                            w-5
                            h-5
                            rounded-full
                            flex
                            items-center
                            justify-center
                            font-bold
                          "
                    >
                      {totalItems}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* USER DROPDOWN */}

              <li
                ref={userMenuRef}
                className="
                    relative
                  
                  "
              >
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="
                      flex
                      items-center
                      gap-2
                      text-secondary
                      hover:text-hover
                      transition
                    "
                >
                  <FaUserCircle
                    className="
                        text-2xl
                      "
                  />

                  <span
                    className="
                        text-xs
                        max-w-20
                        truncate
                      "
                  >
                    {user.FullName}
                  </span>
                </button>

                {openUserMenu && (
                  <div
                    className="
                          absolute
                          right-0
                          mt-3
                          w-40
                          bg-white
                          rounded-xl
                          shadow-lg
                          border
                          border-secondary
                          overflow-hidden
                          z-50
                        "
                  >
                    {/* LOGOUT */}

                    <button
                      onClick={handleLogout}
                      className="
                            w-full
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            text-danger
                            hover:bg-red-50
                            transition
                          "
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              {/* LOGIN */}

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary font-bold"
                      : "text-white hover:text-secondary"
                  }
                >
                  Login
                </NavLink>
              </li>

              {/* SIGN UP */}

              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary font-bold"
                      : "text-white hover:text-secondary"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
