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

  const { user, logout } = useAuth();

  const { totalItems } = useCart();

  const [openUserMenu, setOpenUserMenu] = useState(false);

  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // CLOSE USER MENU WHEN CLICKING OUTSIDE

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

  // LOGOUT

  const handleLogout = () => {
    setOpenUserMenu(false);

    setOpenMobileMenu(false);

    logout();

    navigate("/login");
  };

  // CLOSE MOBILE MENU

  const closeMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  // NAV LINK STYLE

  const navLinkClass = ({ isActive }) =>
    `
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
        mx-10
          px-4
          sm:px-6
          lg:px-8
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

          {user && (
            <NavLink to="/my-orders" className={navLinkClass}>
              My Orders
            </NavLink>
          )}
        </div>
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
          "
        >
          {/* CART */}

          {user && (
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
                    border-primary
                  "
                >
                  {totalItems}
                </span>
              )}
            </NavLink>
          )}

          {/* USER MENU */}

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
                onClick={() => setOpenUserMenu(!openUserMenu)}
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

              {/* USER DROPDOWN */}

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
                  {/* USER INFO */}

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
                      {user.email}
                    </p>
                  </div>

                  {/* LOGOUT */}

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

        {/* MOBILE BUTTON */}

        <button
          type="button"
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
          aria-label="Toggle navigation menu"
          aria-expanded={openMobileMenu}
          className="
            lg:hidden
            w-10
            h-10
            flex
            items-center
            justify-center
            rounded-lg
            text-secondary
            hover:bg-white/10
            transition
          "
        >
          {openMobileMenu ? (
            <FaTimes className="text-xl" />
          ) : (
            <FaBars className="text-xl" />
          )}
        </button>
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

            {user && (
              <>
                <NavLink
                  to="/my-orders"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  My Orders
                </NavLink>

                <NavLink
                  to="/cart"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  <span className="flex items-center gap-2">
                    <FaShoppingCart />

                    <span>Cart</span>

                    {totalItems > 0 && (
                      <span
                        className="
                          bg-danger
                          text-white
                          text-[10px]
                          px-2
                          py-0.5
                          rounded-full
                          font-bold
                        "
                      >
                        {totalItems}
                      </span>
                    )}
                  </span>
                </NavLink>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-2
                    px-3
                    py-2
                    rounded-lg
                    text-danger
                    font-medium
                    hover:bg-white/10
                    transition
                    text-left
                  "
                >
                  <FaSignOutAlt />

                  <span>Logout</span>
                </button>
              </>
            )}

            {!user && (
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
