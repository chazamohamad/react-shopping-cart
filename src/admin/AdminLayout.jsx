import { Outlet } from "react-router";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div
      className="
      min-h-screen
      bg-gray-100
      flex
    "
    >
      {/* SIDEBAR */}

      <AdminSidebar />

      <div
        className="
        flex-1
        flex
        flex-col
      "
      >
        {/* HEADER */}

        <AdminHeader />

        {/* PAGE CONTENT */}

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
