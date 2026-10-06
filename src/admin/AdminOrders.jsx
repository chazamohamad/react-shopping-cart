import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";

import LoadingButton from "../components/LoadingButton";
import API from "../services/api";
import Modal from "../components/Modal";
import TableSkeleton from "../components/TableSkeleton";
import OrderDetailsModal from "./OrderDetailsModal";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // PAGE LOADING
  const [loading, setLoading] = useState(true);

  // ACTION LOADERS
  const [deleting, setDeleting] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ordersPerPage = 5;

  // SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // FILTER
  const [statusFilter, setStatusFilter] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const filterRef = useRef(null);

  // STATUS DROPDOWN
  const [openStatus, setOpenStatus] = useState(null);

  // MODALS
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // DETAILS
  const [selectedOrder, setSelectedOrder] = useState(null);

  // CLOSE STATUS DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-status-dropdown]")) {
        setOpenStatus(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // CLOSE FILTER ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // GET ORDERS
  const getOrders = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const response = await API.get(
        `/api/orders?page=${currentPage}&limit=${ordersPerPage}&search=${searchQuery}&status=${statusFilter}`,
      );

      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  };

  // GET ORDER DETAILS
  const getOrderDetails = async (orderId) => {
    try {
      const response = await API.get(`/api/orders/${orderId}`);

      setSelectedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    if (updatingStatusId === orderId) return;

    try {
      setUpdatingStatusId(orderId);

      // Close dropdown immediately
      setOpenStatus(null);

      await API.put(`/api/orders/${orderId}`, {
        status,
      });

      // Refresh without showing whole table skeleton
      await getOrders(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDeleteModal(true);
  };

  // CLOSE DELETE MODAL
  const closeDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedOrderId(null);
  };

  // DELETE ORDER
  const deleteOrder = async () => {
    if (!selectedOrderId || deleting) return;

    try {
      setDeleting(true);

      await API.delete(`/api/orders/${selectedOrderId}`);

      // Refresh without whole-page skeleton
      await getOrders(false);

      setShowDeleteModal(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  // CLEAR FILTER
  const clearFilters = () => {
    setStatusFilter("");
    setCurrentPage(1);
    setOpenFilter(false);
  };

  // SEARCH DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // FETCH ORDERS WHEN PAGE / SEARCH / FILTER CHANGES
  useEffect(() => {
    getOrders();
  }, [currentPage, searchQuery, statusFilter]);

  if (loading) {
    return <TableSkeleton rows={6} columns={6} />;
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
            ORDER MANAGEMENT
          </p>

          <h1
            className="
              text-3xl
              font-bold
              text-primary
            "
          >
            Orders Management
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Manage customer orders and delivery status
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}

      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-4
          mb-8
        "
      >
        <input
          type="search"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="
            flex-1
            bg-white
            border
            border-secondary
            rounded-2xl
            px-5
            py-4
            outline-none
            shadow-sm
            focus:ring-2
            focus:ring-accent/30
            focus:border-accent
          "
        />

        {/* FILTER */}

        <div ref={filterRef} className="relative">
          <button
            type="button"
            onClick={() => setOpenFilter(!openFilter)}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-primary
              text-white
              px-5
              py-4
              rounded-2xl
              font-bold
              hover:bg-hover
              transition
            "
          >
            <FaFilter />
            Filter
          </button>

          {openFilter && (
            <div
              className="
                absolute
                right-0
                top-full
                mt-3
                w-56
                bg-white
                border
                border-secondary
                rounded-2xl
                shadow-xl
                p-4
                z-50
              "
            >
              <h3
                className="
                  font-bold
                  text-primary
                  mb-3
                "
              >
                Status
              </h3>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("");
                  setCurrentPage(1);
                  setOpenFilter(false);
                }}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-secondary
                "
              >
                All Orders
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("pending");
                  setCurrentPage(1);
                  setOpenFilter(false);
                }}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-secondary
                "
              >
                Pending
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("ondelivery");
                  setCurrentPage(1);
                  setOpenFilter(false);
                }}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-secondary
                "
              >
                On Delivery
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("completed");
                  setCurrentPage(1);
                  setOpenFilter(false);
                }}
                className="
                  w-full
                  text-left
                  px-3
                  py-2
                  rounded-lg
                  hover:bg-secondary
                "
              >
                Completed
              </button>

              <button
                type="button"
                onClick={clearFilters}
                className="
                  w-full
                  mt-3
                  border
                  border-danger
                  text-danger
                  px-3
                  py-2
                  rounded-lg
                  font-bold
                "
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
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
          overflow-x-auto
        "
      >
        <table
          className="
            w-full
            min-w-[900px]
          "
        >
          <thead
            className="
              bg-primary
              text-white
            "
          >
            <tr>
              <th className="p-4">Order Number</th>

              <th className="p-4">Customer</th>

              <th className="p-4">Total</th>

              <th className="p-4">Date</th>

              <th className="p-4">Status</th>

              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="
                    text-center
                    py-12
                    text-gray-500
                    font-bold
                  "
                >
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="
                    border-b
                    border-secondary
                    hover:bg-background
                    transition
                    text-center
                  "
                >
                  {/* ORDER NUMBER */}

                  <td
                    className="
                      p-4
                      font-semibold
                      text-primary
                    "
                  >
                    {order.orderNumber}
                  </td>

                  {/* CUSTOMER */}

                  <td className="p-4">{order.userId?.FullName || "Guest"}</td>

                  {/* TOTAL */}

                  <td
                    className="
                      p-4
                      font-bold
                      text-primary
                    "
                  >
                    ${order.totalPrice}
                  </td>

                  {/* DATE */}

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* STATUS */}

                  <td className="p-4">
                    <div
                      data-status-dropdown
                      className="
                        relative
                        inline-block
                      "
                    >
                      <button
                        type="button"
                        disabled={updatingStatusId === order._id}
                        onClick={() => {
                          if (updatingStatusId === order._id) {
                            return;
                          }

                          setOpenStatus(
                            openStatus === order._id ? null : order._id,
                          );
                        }}
                        className="
                          bg-white
                          border
                          border-secondary
                          rounded-xl
                          px-4
                          py-2
                          min-w-[150px]
                          flex
                          justify-between
                          items-center
                          font-semibold
                          text-primary
                          hover:border-accent
                          transition
                          disabled:opacity-60
                          disabled:cursor-not-allowed
                        "
                      >
                        {updatingStatusId === order._id ? (
                          <div
                            className="
                              flex
                              items-center
                              justify-center
                              gap-2
                              w-full
                            "
                          >
                            <span
                              className="
                                w-4
                                h-4
                                border-2
                                border-current
                                border-t-transparent
                                rounded-full
                                animate-spin
                              "
                            />

                            <span>Updating...</span>
                          </div>
                        ) : (
                          <>
                            <span>
                              {order.status === "pending"
                                ? "Pending"
                                : order.status === "ondelivery"
                                  ? "On Delivery"
                                  : "Completed"}
                            </span>

                            <span
                              className={`
                                text-accent
                                transition-transform
                                duration-200

                                ${
                                  openStatus === order._id
                                    ? "rotate-180"
                                    : "rotate-0"
                                }
                              `}
                            >
                              ⌄
                            </span>
                          </>
                        )}
                      </button>

                      {/* STATUS OPTIONS */}

                      {openStatus === order._id &&
                        updatingStatusId !== order._id && (
                          <div
                            className="
                              absolute
                              top-full
                              mt-2
                              left-0
                              w-full
                              bg-white
                              border
                              border-secondary
                              rounded-xl
                              shadow-xl
                              z-50
                              overflow-hidden
                            "
                          >
                            <button
                              type="button"
                              onClick={() => updateStatus(order._id, "pending")}
                              className="
                                w-full
                                text-left
                                px-4
                                py-3
                                hover:bg-secondary
                                transition
                              "
                            >
                              Pending
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(order._id, "ondelivery")
                              }
                              className="
                                w-full
                                text-left
                                px-4
                                py-3
                                hover:bg-secondary
                                transition
                              "
                            >
                              On Delivery
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateStatus(order._id, "completed")
                              }
                              className="
                                w-full
                                text-left
                                px-4
                                py-3
                                hover:bg-secondary
                                transition
                              "
                            >
                              Completed
                            </button>
                          </div>
                        )}
                    </div>
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
                        type="button"
                        onClick={() => getOrderDetails(order._id)}
                        className="
                          border
                          border-primary
                          text-primary
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-semibold
                          hover:bg-secondary
                          transition
                        "
                      >
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => openDeleteModal(order._id)}
                        className="
                          border
                          border-danger
                          text-danger
                          px-4
                          py-2
                          rounded-xl
                          text-sm
                          font-bold
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

      {/* MOBILE ORDER CARDS */}

      <div
        className="
          md:hidden
          space-y-5
        "
      >
        {orders.length === 0 ? (
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
            No orders found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="
                bg-white
                border
                border-secondary
                rounded-2xl
                shadow-sm
                p-5
              "
            >
              {/* MOBILE HEADER */}

              <div
                className="
                  flex
                  justify-between
                  items-start
                  mb-5
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      text-gray-500
                    "
                  >
                    ORDER NUMBER
                  </p>

                  <h2
                    className="
                      font-bold
                      text-primary
                    "
                  >
                    {order.orderNumber}
                  </h2>
                </div>

                <div>
                  <p
                    className="
                      font-bold
                      text-primary
                    "
                  >
                    ${order.totalPrice}
                  </p>
                </div>
              </div>

              {/* MOBILE DETAILS */}

              <div
                className="
                  space-y-3
                  text-sm
                "
              >
                <p>
                  <span className="font-bold text-primary">Customer:</span>{" "}
                  {order.userId?.FullName || "Guest"}
                </p>

                <p>
                  <span className="font-bold text-primary">Date:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {/* MOBILE STATUS */}

                <div>
                  <p className="font-bold text-primary mb-2">Status:</p>

                  {updatingStatusId === order._id ? (
                    <div
                      className="
                        w-full
                        bg-white
                        border
                        border-secondary
                        rounded-xl
                        px-3
                        py-3
                        font-semibold
                        text-primary
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <span
                        className="
                          w-4
                          h-4
                          border-2
                          border-current
                          border-t-transparent
                          rounded-full
                          animate-spin
                        "
                      />
                      Updating...
                    </div>
                  ) : (
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="
                        w-full
                        bg-white
                        border
                        border-secondary
                        rounded-xl
                        px-3
                        py-3
                        font-semibold
                        text-primary
                      "
                    >
                      <option value="pending">Pending</option>

                      <option value="ondelivery">On Delivery</option>

                      <option value="completed">Completed</option>
                    </select>
                  )}
                </div>
              </div>

              {/* MOBILE ACTIONS */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-6
                "
              >
                <button
                  type="button"
                  onClick={() => getOrderDetails(order._id)}
                  className="
                    border
                    border-secondary
                    text-primary
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  View Details
                </button>

                <button
                  type="button"
                  onClick={() => openDeleteModal(order._id)}
                  className="
                    border
                    border-danger
                    text-danger
                    py-3
                    rounded-xl
                    font-semibold
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && orders.length > 0 && (
        <div
          className="
            flex
            flex-wrap
            justify-center
            items-center
            gap-2
            mt-8
          "
        >
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="
              px-4
              py-2
              bg-white
              border
              border-secondary
              rounded-xl
              text-primary
              font-semibold
              hover:border-accent
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            Previous
          </button>

          {Array.from({
            length: totalPages,
          }).map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`
                w-10
                h-10
                rounded-xl
                font-bold
                transition

                ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-secondary text-primary hover:bg-accent/20"
                }
              `}
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="
              px-4
              py-2
              bg-white
              border
              border-secondary
              rounded-xl
              text-primary
              font-semibold
              hover:border-accent
              disabled:opacity-40
              disabled:cursor-not-allowed
              transition
            "
          >
            Next
          </button>
        </div>
      )}

      {/* ORDER DETAILS */}

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      {/* DELETE MODAL */}

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
            Delete Order?
          </h2>

          <p
            className="
              text-gray-500
              mb-6
            "
          >
            Are you sure you want to delete this order?
          </p>

          <div
            className="
              flex
              gap-3
            "
          >
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
              onClick={deleteOrder}
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

export default AdminOrders;
