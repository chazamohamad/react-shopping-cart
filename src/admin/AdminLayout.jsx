import { useState } from "react";
import { Outlet } from "react-router";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div
      className="
        h-screen
        bg-background
        flex
        overflow-hidden
      "
    >
      {/* SIDEBAR */}
      <AdminSidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      {/* RIGHT SIDE */}
      <div
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
        "
      >
        <AdminHeader setOpenSidebar={setOpenSidebar} />

        <main
          className="
            flex-1
            overflow-y-auto
            p-4
            md:p-6
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
