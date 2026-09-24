import Modal from "../components/Modal";

function OrderDetailsModal({ order, onClose }) {
  if (!order) return null;

  return (
    <Modal isOpen={!!order} onClose={onClose} size="xl">
      <div
        className="
          max-h-[80vh]
          overflow-y-auto
          pr-2
        "
      >
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
              text-primary
            "
          >
            Order Details
          </h1>

          <button
            onClick={onClose}
            className="
              text-xl
              text-gray-500
              hover:text-primary
            "
          >
            ✕
          </button>
        </div>

        {/* CUSTOMER */}

        <section className="mb-6">
          <h2
            className="
              text-xl
              font-bold
              text-primary
              mb-3
            "
          >
            Customer Information
          </h2>

          <div
            className="
              bg-white
              border
              border-secondary
              rounded-xl
              p-5
              space-y-3
            "
          >
            <p>
              <span className="font-bold">Name:</span> {order.userId?.FullName}
            </p>

            <p>
              <span className="font-bold">Email:</span> {order.userId?.Email}
            </p>
          </div>
        </section>

        {/* DELIVERY */}

        <section className="mb-6">
          <h2
            className="
              text-xl
              font-bold
              text-primary
              mb-3
            "
          >
            Delivery Information
          </h2>

          <div
            className="
              bg-white
              border
              border-secondary
              rounded-xl
              p-5
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            "
          >
            <p>
              <b>Phone:</b> {order.deliveryInfo?.phoneNumber}
            </p>

            <p>
              <b>Country:</b> {order.deliveryInfo?.country}
            </p>

            <p>
              <b>City:</b> {order.deliveryInfo?.city}
            </p>

            <p>
              <b>Area:</b> {order.deliveryInfo?.area}
            </p>

            <p className="md:col-span-2">
              <b>Address:</b> {order.deliveryInfo?.address}
            </p>

            <p className="md:col-span-2">
              <b>Notes:</b> {order.deliveryInfo?.notes || "No notes"}
            </p>
          </div>
        </section>

        {/* PRODUCTS */}

        <section>
          <h2
            className="
              text-xl
              font-bold
              text-primary
              mb-3
            "
          >
            Products
          </h2>

          <div className="space-y-4">
            {order.products.map((item) => (
              <div
                key={item._id}
                className="
                    bg-white
                    border
                    border-secondary
                    rounded-xl
                    p-4
                    flex
                    items-center
                    gap-5
                  "
              >
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="
                      w-24
                      h-24
                      rounded-xl
                      object-cover
                    "
                />

                <div className="flex-1">
                  <h3
                    className="
                        text-lg
                        font-bold
                        text-primary
                      "
                  >
                    {item.productId.title}
                  </h3>

                  <p>Quantity: {item.quantity}</p>

                  <p>Price: ${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER TOTAL */}

        <div
          className="
            mt-6
            pt-5
            border-t
            border-secondary
            flex
            justify-between
            items-center
          "
        >
          <div>
            <p className="text-gray-500">Total Price</p>

            <p
              className="
                text-3xl
                font-bold
                text-primary
              "
            >
              ${order.totalPrice}
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              bg-primary
              text-secondary
              px-8
              py-3
              rounded-lg
              font-bold
              hover:bg-hover
              transition
            "
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default OrderDetailsModal;
