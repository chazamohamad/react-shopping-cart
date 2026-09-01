import { useNavigate } from "react-router";
import { Link } from "react-router";

function AdminHeader() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <header
      className="
        bg-white
        shadow
        px-6
        py-4
        flex
        justify-between
        items-center
      "
    >
      {/* TITLE */}

      <h2
        className="
          text-xl
          font-bold
        "
      >
        Dashboard
      </h2>

      {/* PROFILE AREA */}

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

        {/* PROFILE BUTTON */}

        <Link
          to="/admin/profile"
          className="
 bg-gray-200
 px-4
 py-2
 rounded-lg
"
        >
          Profile
        </Link>

        {/* LOGOUT BUTTON */}

        <button
          onClick={logout}
          className="
            bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
