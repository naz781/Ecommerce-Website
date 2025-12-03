import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import { CartProvider } from "./components/CartContext";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import FooterFeatures from "./components/FooterFeatures";
import MobileSearch from "./components/MobileSearch";
function App() {
  
  return (
    <CartProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<MobileSearch />} />
          
        </Routes>
              <FooterFeatures />
    <Footer />

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
