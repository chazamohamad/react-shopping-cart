import { Outlet } from "react-router";

import Navbar from "./Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <div
      className="
        min-h-screen
        flex
        flex-col
      "
    >
      <Navbar />

      <main
        className="
          flex-1
          bg-background
        "
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;
