import { useNavigate } from "react-router";
import { useAuth } from "../pages/AuthContext";
function AdminProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/login");

    return null;
  }

  return (
    <div
      className="
      min-h-full
      bg-background
      p-8
    "
    >
      <h1
        className="
        text-3xl
        font-bold
        mb-6
        text-primary
      "
      >
        My Profile
      </h1>

      <div
        className="
        bg-white
        rounded-2xl
        shadow-lg
        border
        border-secondary
        p-8
        max-w-xl
      "
      >
        {/* Avatar */}

        <div
          className="
          w-24
          h-24
          bg-primary
          rounded-full
          flex
          items-center
          justify-center
          text-secondary
          text-3xl
          font-bold
          mb-6
        "
        >
          {user.FullName?.charAt(0)}
        </div>

        {/* Information */}

        <div
          className="
          space-y-5
        "
        >
          <div>
            <p
              className="
              text-gray-500
              text-sm
            "
            >
              Full Name
            </p>

            <p
              className="
              text-xl
              font-bold
              text-primary
            "
            >
              {user.FullName}
            </p>
          </div>

          <div>
            <p
              className="
              text-gray-500
              text-sm
            "
            >
              Email
            </p>

            <p
              className="
              text-xl
              font-bold
              text-primary
            "
            >
              {user.Email}
            </p>
          </div>

          <div>
            <p
              className="
              text-gray-500
              text-sm
              mb-2
            "
            >
              Role
            </p>

            <span
              className="
              inline-flex
              items-center
              bg-secondary
              text-primary
              px-4
              py-2
              rounded-full
              font-bold
            "
            >
              {user.Role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
