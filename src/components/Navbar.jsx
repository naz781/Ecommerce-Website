import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaStar,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHome,
  FaStore,
  FaTimes,
} from "react-icons/fa";
import logo from "../assets/Logos/logo2.png"
function Navbar() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", fontFamily: "Arial, sans-serif" }}>
      {/* Desktop Navbar */}
      {!isMobile && (
        <>
          {/* Top Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 20px",
              backgroundColor: "white",
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            }}
          >
            {/* <div
              style={{ fontSize: "28px", fontWeight: "bold", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              3sproshop
            </div> */}
            <img src={logo} alt="Logo" style={{ height: "50px" ,p:0}} />


            <div style={{ flex: 1, margin: "0 10%" }}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Search products..."
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 15px",
                    borderRadius: "30px",
                    border: "1px solid #ccc",
                  }}
                />
                <FaSearch
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", fontSize: "22px" }}>
              <FaUser style={{ cursor: "pointer" }} title="Account" />
              <FaStar style={{ cursor: "pointer" }} title="Wishlist" />
              <Link to="/cart">
                <FaShoppingCart style={{ cursor: "pointer" }} title="Cart" />
              </Link>
            </div>
          </div>

          {/* Bottom Navbar Strip */}
          <div style={{ backgroundColor: "#111", padding: "12px 20px" }}>
            <div
              style={{
                display: "flex",
                gap: "40px",
                color: "white",
                justifyContent: "center",
              }}
            >
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                Home
              </Link>
              <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
                Shop
              </Link>
              <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
                All Accessories
              </Link>
              <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
                About Us
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Mobile Top Bar */}
      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "white",
            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1001,
          }}
        >
          <FaBars
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => setSidebarOpen(true)}
          />
          {/* <div style={{ fontSize: "20px", fontWeight: "bold" }}>MyLogo</div> */}
          <img src={logo} alt="Logo" style={{ height: "30px" ,}} />
          <FaSearch
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={() => navigate("/search")} // Will navigate to search page
          />
        </div>
      )}

      {/* Mobile Sidebar Drawer */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "70%",
            background: "#fff",
            zIndex: 1002,
            padding: "20px",
            boxShadow: "2px 0 8px rgba(0,0,0,0.2)",
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {/* Cross Icon on top-right */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FaTimes
              style={{ fontSize: "24px", cursor: "pointer" }}
              onClick={() => setSidebarOpen(false)}
            />
          </div>

          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "18px",
              marginTop: "20px",
            }}
          >
            <Link
              to="/"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Shop
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              Wishlist
            </Link>
            <Link
              to="/about"
              onClick={() => setSidebarOpen(false)}
              style={{ textDecoration: "none", color: "#111" }}
            >
              About Us
            </Link>
          </nav>
        </div>
      )}

      {/* Bottom Navbar for Mobile */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px 0",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <FaHome size={22} />
            <span style={{ fontSize: "12px" }}>Home</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/shop")}
          >
            <FaStore size={22} />
            <span style={{ fontSize: "12px" }}>Shop</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart size={22} />
            <span style={{ fontSize: "12px" }}>Cart</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => navigate("/wishlist")}
          >
            <FaStar size={22} />
            <span style={{ fontSize: "12px" }}>Wishlist</span>
          </div>
        </div>
      )}

      {/* Spacer for Mobile */}
      {isMobile && <div style={{ height: "56px" }}></div>}
    </div>
  );
}

export default Navbar;
