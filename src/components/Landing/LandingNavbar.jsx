import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/Logos/logo2.png";
import AuthModal from "../AuthModal";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthClose = (loggedIn = false) => {
    setShowAuthModal(false);
    if (loggedIn === true) {
      navigate("/Home");
    }
  };

  return (
    <div>
      {/* Top white navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 25px",
          background: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", cursor: "pointer" }}
          onClick={() => navigate("/Home")}
        />

        <div
          style={{ cursor: "pointer", fontWeight: 500, color: "#333" }}
          onClick={handleLoginClick}
        >
          Login / Sign Up
        </div>

        {showAuthModal && <AuthModal onClose={handleAuthClose} />}
      </div>

      {/* Black navigation strip */}
      <div
        style={{
          backgroundColor: "#111",
          padding: "12px 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            color: "white",
            justifyContent: "center",
          }}
        >
          <Link to="/Home" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
            Shop
          </Link>
          <Link
            to="/about-us"
            style={{ color: "white", textDecoration: "none" }}
          >
            About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
