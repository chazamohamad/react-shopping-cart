import { Link, useNavigate } from "react-router";

import { useAuth } from "../pages/AuthContext";

import { useState, useRef, useEffect } from "react";

import { FaUserCircle, FaBars, FaChevronDown } from "react-icons/fa";

function AdminHeader({ setOpenSidebar }) {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Only logout user
    // Cart stays in database

    logout();

    navigate("/login");
  };

  return (
    <header
      className="
h-20
bg-white
border-b
border-accent
shadow-sm
px-4
md:px-6
flex
items-center
justify-between
"
    >
      {/* LEFT */}

      <div
        className="
flex
items-center
gap-4
"
      >
        <button
          onClick={() => setOpenSidebar(true)}
          className="
md:hidden
text-primary
text-xl
"
        >
          <FaBars />
        </button>

        <div>
          <h2
            className="
text-xl
md:text-2xl
font-bold
text-primary
"
          >
            Dashboard
          </h2>
        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
flex
items-center
gap-3
"
      >
        <div
          className="
hidden
sm:block
text-right
"
        >
          <p
            className="
font-bold
text-primary
"
          >
            {user?.FullName}
          </p>

          <p
            className="
text-xs
text-gray-500
"
          >
            {user?.Role}
          </p>
        </div>

        <div
          ref={profileRef}
          className="
relative
"
        >
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="
flex
items-center
gap-2
text-primary
"
          >
            <FaUserCircle
              className="
text-4xl
"
            />

            <FaChevronDown
              className="
hidden
sm:block
text-sm
"
            />
          </button>

          {openProfile && (
            <div
              className="
absolute
right-0
top-12
w-52
bg-white
rounded-xl
shadow-xl
border
border-secondary
overflow-hidden
z-50
"
            >
              <div
                className="
px-4
py-3
border-b
border-secondary
"
              >
                <p
                  className="
font-bold
text-primary
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
                  {user?.Email}
                </p>
              </div>

              <Link
                to="/admin/profile"
                onClick={() => setOpenProfile(false)}
                className="
block
px-4
py-3
text-primary
hover:bg-secondary
"
              >
                Profile
              </Link>

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
