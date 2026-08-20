import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/shop" element={<Shop />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
