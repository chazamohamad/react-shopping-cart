import { useEffect, useState } from "react";

import API from "../services/api";

import Modal from "../components/Modal";

import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import TableSkeleton from "../components/TableSkeleton";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

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

  // DELETE USER

  const deleteUser = async () => {
    try {
      await API.delete(`/api/users/${selectedUserId}`);

      await getUsers();

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
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
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Users Management
        </h1>

        <button
          onClick={() => setShowCreateModal(true)}
          className="
            bg-primary
            text-white
            px-5
            py-2
            rounded-lg
            hover:bg-secondary
          "
        >
          + Create User
        </button>
      </div>

      {/* TABLE */}

      <div
        className="
          bg-white
          border
          border-secondary
          shadow
          rounded-xl
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
            text-left
          "
        >
          <thead
            className="
              bg-primary
              text-white
            "
          >
            <tr>
              <th className="p-4">Name</th>

              <th className="p-4">Email</th>

              <th className="p-4">Role</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">{user.FullName}</td>

                <td className="p-4">{user.Email}</td>

                <td className="p-4">{user.Role}</td>

                <td className="p-4 space-x-2">
                  {/* EDIT */}

                  <button
                    onClick={() => {
                      setSelectedUser(user);

                      setShowEditModal(true);
                    }}
                    className="
                      bg-primary
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Edit
                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() => {
                      setSelectedUserId(user._id);

                      setShowDeleteModal(true);
                    }}
                    className="
                      bg-danger
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            closeModal={() => setShowEditModal(false)}
            refreshUsers={getUsers}
          />
        )}
      </Modal>

      {/* DELETE USER MODAL */}

      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <h2
            className="
              text-xl
              font-bold
              mb-4
            "
          >
            Delete User?
          </h2>

          <p
            className="
              mb-6
              text-gray-600
            "
          >
            Are you sure you want to delete this user?
          </p>

          <div
            className="
              flex
              gap-3
            "
          >
            <button
              onClick={() => setShowDeleteModal(false)}
              className="
                bg-secondary
                text-primary
                px-4
                py-2
                rounded
              "
            >
              Cancel
            </button>

            <button
              onClick={deleteUser}
              className="
                bg-danger
                text-white
                px-4
                py-2
                rounded
              "
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AdminUsers;
