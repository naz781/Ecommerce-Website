import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MobileSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const popularSearches = ["Headphone", "Mobile", "Glasses"];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        zIndex: 2000,
        padding: "16px",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      {/* Top Cross Button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            fontSize: "28px",
            cursor: "pointer",
            border: "none",
            background: "transparent",
            padding: "8px",
            lineHeight: 1,
          }}
          aria-label="Close Search"
        >
          ×
        </button>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          margin: "20px 0 15px 0",
          textAlign: "center",
        }}
      >
        SEARCH OUR STORE
      </h2>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "100%",
            padding: "12px 40px 12px 15px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Popular Searches */}
      <div>
        <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
          Popular Searches
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {popularSearches.map((item, index) => (
            <span
              key={index}
              onClick={() => alert(`You clicked ${item}`)}
              style={{
                textDecoration: "underline",
                color: "#111",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileSearch;
