import { useNavigate } from "react-router";

import { useAuth } from "../pages/AuthContext";

import { FaUser, FaEnvelope, FaShieldAlt } from "react-icons/fa";

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
p-4
md:p-8
"
    >
      {/* HEADER */}

      <div className="mb-8">
        <p
          className="
text-accent
text-xs
uppercase
tracking-widest
font-bold
"
        >
          ACCOUNT
        </p>

        <h1
          className="
text-3xl
md:text-4xl
font-bold
text-primary
"
        >
          My Profile
        </h1>

        <p
          className="
text-gray-500
mt-2
"
        >
          Manage your account information
        </p>
      </div>

      {/* PROFILE CARD */}

      <div
        className="
max-w-4xl
bg-white
border
border-secondary
rounded-3xl
shadow-sm
p-6
md:p-10
"
      >
        {/* TOP PROFILE */}

        <div
          className="
flex
flex-col
md:flex-row
items-center
md:items-start
gap-6
pb-8
border-b
border-secondary
"
        >
          <div
            className="
w-28
h-28
rounded-full
bg-primary
border-8
border-accent/20
flex
items-center
justify-center
text-secondary
text-4xl
font-bold
shadow-lg
"
          >
            {user.FullName?.charAt(0)}
          </div>

          <div
            className="
text-center
md:text-left
"
          >
            <h2
              className="
text-3xl
font-bold
text-primary
"
            >
              {user.FullName}
            </h2>

            <p
              className="
text-gray-500
mt-2
"
            >
              Administrator Account
            </p>

            <span
              className="
inline-block
mt-4
bg-secondary
text-primary
px-5
py-2
rounded-full
font-bold
text-sm
"
            >
              {user.role}
            </span>
          </div>
        </div>

        {/* INFORMATION */}

        <div
          className="
mt-8
"
        >
          <h3
            className="
text-xl
font-bold
text-primary
mb-6
"
          >
            Personal Information
          </h3>

          <div
            className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"
          >
            <div
              className="
bg-background
rounded-2xl
p-5
"
            >
              <div
                className="
flex
items-center
gap-3
mb-3
"
              >
                <FaUser
                  className="
text-accent
"
                />

                <p
                  className="
text-sm
text-gray-500
"
                >
                  Full Name
                </p>
              </div>

              <p
                className="
text-primary
font-bold
text-lg
"
              >
                {user.FullName}
              </p>
            </div>

            <div
              className="
bg-background
rounded-2xl
p-5
"
            >
              <div
                className="
flex
items-center
gap-3
mb-3
"
              >
                <FaEnvelope
                  className="
text-accent
"
                />

                <p
                  className="
text-sm
text-gray-500
"
                >
                  Email
                </p>
              </div>

              <p
                className="
text-primary
font-bold
text-lg
break-all
"
              >
                {user.email}
              </p>
            </div>

            <div
              className="
bg-background
rounded-2xl
p-5
md:col-span-2
"
            >
              <div
                className="
flex
items-center
gap-3
mb-3
"
              >
                <FaShieldAlt
                  className="
text-accent
"
                />

                <p
                  className="
text-sm
text-gray-500
"
                >
                  Account Role
                </p>
              </div>

              <p
                className="
text-primary
font-bold
text-lg
"
              >
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* STATUS */}

        <div
          className="
mt-8
bg-secondary/40
rounded-2xl
p-5
flex
items-center
gap-4
"
        >
          <div
            className="
w-3
h-3
rounded-full
bg-green-500
"
          ></div>

          <div>
            <p
              className="
font-bold
text-primary
"
            >
              Account Active
            </p>

            <p
              className="
text-sm
text-gray-500
"
            >
              Your administrator account is currently active
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
