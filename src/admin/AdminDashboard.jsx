function AdminDashboard() {
  return (
    <div>
      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Admin Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >
        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3 className="font-bold">Products</h3>

          <p>Manage products</p>
        </div>

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3 className="font-bold">Categories</h3>

          <p>Manage categories</p>
        </div>

        <div
          className="
            bg-white
            p-6
            rounded-xl
            shadow
          "
        >
          <h3 className="font-bold">Users</h3>

          <p>Manage users</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
