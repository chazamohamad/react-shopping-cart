import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import { CartProvider } from "./pages/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        {/* Global Cart State */}
        <App />
      </CartProvider>
      {/* فكل Components الموجودة داخل App بتقدر تستعمل الـ Cart. */}
    </BrowserRouter>
  </StrictMode>,
); //الـ BrowserRouter يعرف شو الـ URL الحالي，
//  وبيوفّر هالمعلومة لباقي React Router components.
