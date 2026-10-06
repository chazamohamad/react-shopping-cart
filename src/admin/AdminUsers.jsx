import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";
import LoadingButton from "../components/LoadingButton";

import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import TableSkeleton from "../components/TableSkeleton";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // MODALS
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  // GET USERS
  const getUsers = async () => {
    try {
      const response = await API.get("/api/users");

      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setSelectedUserId(user._id);
    setShowDeleteModal(true);
  };

  // CLOSE DELETE MODAL
  const closeDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedUserId(null);
    setSelectedUser(null);
  };

  // DELETE USER
  const deleteUser = async () => {
    if (!selectedUserId || deleting) return;

    try {
      setDeleting(true);

      await API.delete(`/api/users/${selectedUserId}`);

      await getUsers();

      setShowDeleteModal(false);
      setSelectedUserId(null);
      setSelectedUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <TableSkeleton rows={5} columns={4} />;
  }

  return (
    <div>
      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-center
          gap-5
          mb-8
        "
      >
        <div>
          <p
            className="
              text-accent
              text-xs
              uppercase
              tracking-widest
              font-bold
            "
          >
            USER MANAGEMENT
          </p>

          <h1
            className="
              text-3xl
              font-bold
              text-primary
            "
          >
            Users Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customers and admin accounts
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
            bg-primary
            text-white
            px-6
            py-3
            rounded-xl
            font-bold
            shadow-sm
            hover:bg-hover
            transition
          "
        >
          + Add User
        </button>
      </div>

      {/* DESKTOP TABLE */}

      <div
        className="
          hidden
          md:block
          bg-white
          border
          border-secondary
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-center">Role</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="
                    text-center
                    py-12
                    text-gray-500
                    font-bold
                  "
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="
                    border-b
                    border-secondary
                    hover:bg-background
                    transition
                  "
                >
                  <td
                    className="
                      p-4
                      font-semibold
                      text-primary
                    "
                  >
                    {user.FullName}
                  </td>

                  <td className="p-4 text-gray-600">{user.Email}</td>

                  <td className="p-4 text-center">
                    <span
                      className="
                        border
                        border-secondary
                        px-4
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                        text-primary
                      "
                    >
                      {user.Role}
                    </span>
                  </td>

                  {/* ACTIONS */}

                  <td className="p-4">
                    <div
                      className="
                        flex
                        justify-center
                        gap-2
                      "
                    >
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="
                          bg-primary
                          text-white
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                          hover:bg-hover
                          transition
                        "
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openDeleteModal(user)}
                        className="
                          border
                          border-danger
                          text-danger
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                          hover:bg-danger
                          hover:text-white
                          transition
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE USER CARDS */}

      <div
        className="
          md:hidden
          space-y-5
        "
      >
        {users.length === 0 ? (
          <div
            className="
              bg-white
              border
              border-secondary
              rounded-2xl
              p-8
              text-center
              text-gray-500
              font-bold
            "
          >
            No users found
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="
                bg-white
                border
                border-secondary
                rounded-2xl
                shadow-sm
                p-5
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-5
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-secondary
                    flex
                    items-center
                    justify-center
                    text-primary
                    text-xl
                    font-bold
                  "
                >
                  {user.FullName?.charAt(0)}
                </div>

                <div>
                  <h2
                    className="
                      font-bold
                      text-primary
                      text-lg
                    "
                  >
                    {user.FullName}
                  </h2>

                  <span className="text-sm text-gray-500">{user.Role}</span>
                </div>
              </div>

              <div
                className="
                  space-y-3
                  text-sm
                "
              >
                <p>
                  <span className="font-bold text-primary">Email:</span>{" "}
                  {user.Email}
                </p>

                <p>
                  <span className="font-bold text-primary">Role:</span>{" "}
                  {user.Role}
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-6
                "
              >
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowEditModal(true);
                  }}
                  className="
                    bg-primary
                    text-white
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() => openDeleteModal(user)}
                  className="
                    border
                    border-danger
                    text-danger
                    py-3
                    rounded-xl
                    font-bold
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE USER MODAL */}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <CreateUser
          closeModal={() => setShowCreateModal(false)}
          refreshUsers={getUsers}
        />
      </Modal>

      {/* EDIT USER MODAL */}

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        {selectedUser && (
          <EditUser
            user={selectedUser}
            closeModal={() => {
              setShowEditModal(false);
              setSelectedUser(null);
            }}
            refreshUsers={getUsers}
          />
        )}
      </Modal>

      {/* DELETE USER MODAL */}

      <Modal isOpen={showDeleteModal} onClose={closeDeleteModal}>
        <div>
          <p
            className="
              text-accent
              text-xs
              uppercase
              tracking-widest
              font-bold
              mb-2
            "
          >
            CONFIRM ACTION
          </p>

          <h2
            className="
              text-2xl
              font-bold
              text-primary
              mb-4
            "
          >
            Delete User?
          </h2>

          <p
            className="
              text-gray-500
              mb-2
            "
          >
            Are you sure you want to delete this user?
          </p>

          {selectedUser && (
            <p
              className="
                font-bold
                text-primary
                mb-6
              "
            >
              {selectedUser.FullName}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeDeleteModal}
              disabled={deleting}
              className="
                bg-secondary
                text-primary
                px-5
                py-3
                rounded-xl
                font-bold
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            <LoadingButton
              type="button"
              onClick={deleteUser}
              loading={deleting}
              loadingText="Deleting..."
              className="
                bg-danger
                text-white
                px-5
                py-3
                rounded-xl
                font-bold
                hover:opacity-90
              "
            >
              Delete
            </LoadingButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminUsers;
