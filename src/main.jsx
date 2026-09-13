import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";

import App from "./App.jsx";
import { CartProvider } from "./pages/CartContext.jsx";
import { AuthProvider } from "./pages/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Global Cart State */}
          <App />
        </CartProvider>
        {/* فكل Components الموجودة داخل App بتقدر تستعمل الـ Cart. */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
); //الـ BrowserRouter يعرف شو الـ URL الحالي，
//  وبيوفّر هالمعلومة لباقي React Router components.
