import { NavLink, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../pages/AuthContext";
import { useCart } from "../pages/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  const mobileUserMenuRef = useRef(null);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openMobileUserMenu, setOpenMobileUserMenu] = useState(false);

  // CLOSE DESKTOP USER MENU WHEN CLICKING OUTSIDE
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

  // CLOSE MOBILE USER MENU WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutsideMobileUser = (event) => {
      if (
        mobileUserMenuRef.current &&
        !mobileUserMenuRef.current.contains(event.target)
      ) {
        setOpenMobileUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMobileUser);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobileUser);
    };
  }, []);

  // LOGOUT
  const handleLogout = () => {
    setOpenUserMenu(false);
    setOpenMobileMenu(false);
    setOpenMobileUserMenu(false);

    logout();

    navigate("/login");
  };

  // CLOSE MOBILE MENU
  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
    setOpenMobileUserMenu(false);
  };

  // NAV LINK STYLE
  const navLinkClass = ({ isActive }) => `
    px-3
    py-2
    rounded-lg
    text-md
    font-medium
    transition
    duration-200
    ${
      isActive
        ? "bg-secondary text-primary font-bold"
        : "text-white/90 hover:text-secondary hover:bg-white/10"
    }
  `;

  return (
    <nav
      className="
        bg-primary
        text-white
        border-b
        border-white/10
        shadow-sm
        sticky
        top-0
        z-40
      "
    >
      <div
        className="
          mx-6
          px-2
          sm:px-4
          lg:px-6
          h-20
          flex
          items-center
          justify-between
        "
      >
        {/* LOGO */}
        <div>
          <NavLink
            to="/shop"
            onClick={closeMobileMenu}
            className="
              flex
              items-center
              gap-2
              shrink-0
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-secondary
              "
            />

            <span
              className="
                text-secondary
                text-xl
                sm:text-2xl
                font-bold
                tracking-tight
              "
            >
              TOP HOME
            </span>
          </NavLink>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          "
        >
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <NavLink to="/track-order" className={navLinkClass}>
            Track Order
          </NavLink>

          {user && user.role != "admin" && (
            <NavLink to="/my-orders" className={navLinkClass}>
              My Orders
            </NavLink>
          )}
        </div>

        {/* DESKTOP ACTIONS */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          "
        >
          {/* CART */}
          {user && user.role != "admin" && (
            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              className="
                relative
                ml-2
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-secondary
                hover:bg-white/10
                hover:text-white
                transition
                duration-200
              "
            >
              <FaShoppingCart className="text-xl" />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-5
                    h-5
                    px-1
                    bg-danger
                    text-white
                    text-[10px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                    border-2
                    border-secondary
                  "
                >
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          {/* DESKTOP USER MENU */}
          {user ? (
            <div
              ref={userMenuRef}
              className="
                relative
                ml-2
              "
            >
              <button
                type="button"
                onClick={() => setOpenUserMenu((prev) => !prev)}
                aria-expanded={openUserMenu}
                className="
                  flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-lg
                  bg-white/10
                  hover:bg-white/15
                  transition
                  duration-200
                "
              >
                <FaUserCircle
                  className="
                    text-xl
                    text-secondary
                  "
                />

                <div
                  className="
                    hidden
                    xl:block
                    text-left
                    max-w-28
                  "
                >
                  <p
                    className="
                      text-sm
                      font-semibold
                      text-white
                      truncate
                    "
                  >
                    {user.FullName}
                  </p>

                  <p
                    className="
                      text-[11px]
                      text-white/60
                      capitalize
                    "
                  >
                    {user.role}
                  </p>
                </div>
              </button>

              {/* DESKTOP USER DROPDOWN */}
              {openUserMenu && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-52
                    bg-white
                    border
                    border-border
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                    z-50
                  "
                >
                  <div
                    className="
                      px-4
                      py-4
                      border-b
                      border-border
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-bold
                        text-text
                        truncate
                      "
                    >
                      {user.FullName}
                    </p>

                    <p
                      className="
                        text-xs
                        text-muted
                        mt-1
                        truncate
                      "
                    >
                      {user.email || user.Email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-danger
                      text-sm
                      font-medium
                      hover:bg-red-50
                      transition
                    "
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="
                px-3
                py-2
                rounded-lg
                text-md
                font-medium
                transition
                duration-200
                bg-secondary
                text-accent
                font-bold
                hover:bg-accent
                hover:text-secondary
              "
            >
              Login
            </NavLink>
          )}
        </div>

        {/* MOBILE ACTIONS */}
        <div
          className="
            lg:hidden
            flex
            items-center
            gap-2
          "
        >
          {/* MOBILE CART */}
          {user && user.role != "admin" && (
            <NavLink
              to="/cart"
              aria-label="Shopping Cart"
              onClick={() => {
                setOpenMobileMenu(false);
                setOpenMobileUserMenu(false);
              }}
              className="
                relative
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-lg
                text-secondary
                hover:bg-white/10
                hover:text-white
                transition
                duration-200
              "
            >
              <FaShoppingCart className="text-xl" />

              {totalItems > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    min-w-5
                    h-5
                    px-1
                    flex
                    items-center
                    justify-center
                    bg-danger
                    text-white
                    text-[10px]
                    leading-none
                    rounded-full
                    font-bold
                    border-2
                    border-secondary
                  "
                >
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          {/* MOBILE PROFILE */}
          {user && (
            <div ref={mobileUserMenuRef} className="relative">
              <button
                type="button"
                aria-label="User Profile"
                aria-expanded={openMobileUserMenu}
                onClick={() => {
                  setOpenMobileUserMenu((prev) => !prev);
                  setOpenMobileMenu(false);
                }}
                className="
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  text-secondary
                  hover:bg-white/10
                  hover:text-white
                  transition
                  duration-200
                "
              >
                <FaUserCircle className="text-2xl" />
              </button>

              {/* MOBILE PROFILE DROPDOWN */}
              {openMobileUserMenu && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-56
                    bg-white
                    border
                    border-border
                    rounded-xl
                    shadow-xl
                    overflow-hidden
                    z-50
                  "
                >
                  <div
                    className="
                      px-4
                      py-4
                      border-b
                      border-border
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-bold
                        text-text
                        truncate
                      "
                    >
                      {user.FullName}
                    </p>

                    <p
                      className="
                        text-xs
                        text-muted
                        mt-1
                        truncate
                      "
                    >
                      {user.email || user.Email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      text-danger
                      text-sm
                      font-medium
                      hover:bg-red-50
                      transition
                    "
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={openMobileMenu}
            onClick={() => {
              setOpenMobileMenu((prev) => !prev);
              setOpenMobileUserMenu(false);
            }}
            className="
              w-10
              h-10
              flex
              items-center
              justify-center
              rounded-lg
              text-secondary
              hover:bg-white/10
              hover:text-white
              transition
              duration-200
            "
          >
            {openMobileMenu ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMobileMenu && (
        <div
          className="
            lg:hidden
            border-t
            border-white/10
            bg-primary
          "
        >
          <div
            className="
              max-w-7xl
              mx-auto
              px-4
              py-4
              space-y-2
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <NavLink
              to="/shop"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              Contact
            </NavLink>

            <NavLink
              to="/track-order"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              Track Order
            </NavLink>

            {user && user.role != "admin" ? (
              <>
                <NavLink
                  to="/my-orders"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  My Orders
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-danger
                    font-medium
                    hover:bg-white/10
                    transition
                  "
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
