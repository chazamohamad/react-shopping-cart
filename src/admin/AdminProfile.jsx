import { useNavigate } from "react-router";

function AdminProfile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");

    return null;
  }

  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        My Profile
      </h1>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          p-8
          max-w-xl
        "
      >
        {/* Avatar */}

        <div
          className="
            w-24
            h-24
            bg-gray-900
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-3xl
            font-bold
            mb-6
          "
        >
          {user.FullName?.charAt(0)}
        </div>

        {/* Information */}

        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Full Name</p>

            <p className="text-xl font-bold">{user.FullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>

            <p className="text-xl font-bold">{user.Email}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>

            <span
              className="
                inline-block
                bg-green-100
                text-green-700
                px-4
                py-1
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
