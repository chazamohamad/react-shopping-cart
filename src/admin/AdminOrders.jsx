import { useEffect, useState, useRef } from "react";
import { FaFilter } from "react-icons/fa";

import API from "../services/api";
import Modal from "../components/Modal";

import TableSkeleton from "../components/TableSkeleton";
import OrderDetailsModal from "./OrderDetailsModal";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [openFilter, setOpenFilter] = useState(false);

  const filterRef = useRef(null);

  // selected order for modal
  const [selectedOrder, setSelectedOrder] = useState(null);

  const ordersPerPage = 5;

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

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get(
        `/api/orders?page=${currentPage}&limit=${ordersPerPage}&search=${searchQuery}&status=${statusFilter}`,
      );

      setOrders(response.data.orders);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const response = await API.get(`/api/orders/${orderId}`);

      setSelectedOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearFilters = () => {
    setStatusFilter("");

    setCurrentPage(1);

    setOpenFilter(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    getOrders();
  }, [currentPage, searchQuery, statusFilter]);

  const updateStatus = async (orderId, status) => {
    try {
      await API.put(
        `/api/orders/${orderId}`,

        {
          status,
        },
      );

      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await API.delete(`/api/orders/${orderId}`);

      // refresh current page after delete

      getOrders();

      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <TableSkeleton rows={6} columns={6} />;
  }

  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          text-primary
          mb-6
        "
      >
        Orders Management
      </h1>

      {/* SEARCH */}

      <div
        className="
flex
items-center
gap-4
mb-6
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
border
border-secondary
rounded-xl
px-4
py-3
focus:ring-2
focus:ring-primary
"
        />

        <div
          ref={filterRef}
          className="
relative
"
        >
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="
flex
items-center
gap-2
bg-primary
text-secondary
px-5
py-3
rounded-xl
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
mt-3
w-52
bg-white
border
border-secondary
rounded-xl
shadow-xl
p-3
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
hover:bg-yellow-100
"
              >
                🟡 Pending
              </button>

              <button
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
hover:bg-blue-100
"
              >
                🚚 On Delivery
              </button>

              <button
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
hover:bg-green-100
"
              >
                ✅ Completed
              </button>
              <button
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
hover:bg-red-50
transition
"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className="
          bg-white
          rounded-xl
          shadow
          border
          border-secondary
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead
            className="
              bg-primary
              text-secondary
            "
          >
            <tr>
              <th className="p-4">Order Number</th>

              <th className="p-4">Customer</th>

              <th className="p-4">Total</th>

              <th className="p-4">Date</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="
text-center
py-10
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
                  text-center
                "
                >
                  <td className="p-4">{order.orderNumber}</td>

                  <td className="p-4">{order.userId?.FullName}</td>

                  <td className="p-4 font-bold">${order.totalPrice}</td>

                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* UPDATE STATUS */}
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="
                        border
                        border-secondary
                        rounded-lg
                        p-2
                        text-primary
                      "
                    >
                      <option value="pending">Pending</option>

                      <option value="ondelivery">On Delivery</option>

                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div
                      className="
flex
gap-2
justify-center
"
                    >
                      {/* VIEW DETAILS */}

                      <button
                        onClick={() => getOrderDetails(order._id)}
                        className="
bg-secondary
text-primary
px-3
py-2
rounded-lg
hover:bg-hover
transition
"
                      >
                        View Details
                      </button>

                      {/* DELETE ORDER */}

                      <button
                        onClick={() => {
                          setSelectedOrderId(order._id);

                          setShowDeleteModal(true);
                        }}
                        className="
bg-danger
text-white
px-3
py-2
rounded-lg
hover:opacity-80
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

        {/* PAGINATION */}
        {totalPages > 1 && orders.length > 0 && (
          <div
            className="
flex
justify-center
items-center
gap-3
mt-6
"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="
px-4
py-2
border
border-secondary
rounded-lg
disabled:opacity-50
"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`

px-4
py-2
rounded-lg

${
  currentPage === index + 1
    ? "bg-primary text-white"
    : "bg-secondary text-primary"
}

`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="
px-4
py-2
border
border-secondary
rounded-lg
disabled:opacity-50
"
            >
              Next
            </button>
          </div>
        )}

        {/* ORDER DETAILS MODAL */}

        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <h2
            className="
text-xl
font-bold
text-primary
mb-4
"
          >
            Delete Order?
          </h2>

          <p className="mb-6">Are you sure you want to delete this order?</p>

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
rounded-lg
"
            >
              Cancel
            </button>

            <button
              onClick={() => deleteOrder(selectedOrderId)}
              className="
bg-danger
text-white
px-4
py-2
rounded-lg
"
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default AdminOrders;
