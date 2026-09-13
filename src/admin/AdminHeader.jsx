import { Link, useNavigate } from "react-router";

import { useAuth } from "../pages/AuthContext";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

function AdminHeader() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  const handleLogout = () => {
    // Only logout user
    // Cart stays in database

    logout();

    navigate("/login");
  };

  return (
    <header
      className="
      bg-secondary
        shadow
        px-6
        py-4
        flex
        justify-between
        items-center
      "
    >
      <h2
        className="
          text-xl
          font-bold
        "
      >
        Dashboard
      </h2>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        {/* USER INFO */}

        <div
          className="
            text-right
          "
        >
          <p
            className="
              font-bold
            "
          >
            {user?.FullName}
          </p>

          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {user?.Role}
          </p>
        </div>

        {/* PROFILE */}

        <div
          className="
    relative
  "
        >
          {/* PROFILE ICON */}

          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="
      text-primary
      hover:text-hover
      transition
    "
          >
            <FaUserCircle
              className="
        text-4xl
      "
            />
          </button>

          {/* DROPDOWN */}

          {openProfile && (
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
              {/* PROFILE */}

              <Link
                to="/admin/profile"
                onClick={() => setOpenProfile(false)}
                className="
            block
            px-4
            py-3
            text-primary
            hover:bg-secondary
            transition
          "
              >
                Profile
              </Link>

              {/* LOGOUT */}

              <button
                onClick={() => {
                  logout();

                  navigate("/login");
                }}
                className="
            w-full
            text-left
            px-4
            py-3
            text-danger
            hover:bg-red-50
            transition
          "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
