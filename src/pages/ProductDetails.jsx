import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { CartContext } from "../components/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("product_id", id)
      .single();
    setProduct(data);
    loadProductImages(id);
  };

  const createImageUrl = (filename) => {
    try {
      return new URL(`/src/assets/products/${filename}`, import.meta.url).href;
    } catch {
      return null;
    }
  };

  const loadProductImages = (productId) => {
    const images = [];
    const possibleFiles = [
      `${productId}.jpeg`,
      `${productId}.jpg`,
      `${productId}.png`,
    ];

    for (let i = 1; i <= 10; i++) {
      ["-", "_"].forEach((sep) => {
        ["jpeg", "jpg", "png"].forEach((ext) => {
          possibleFiles.push(`${productId}${sep}${i}.${ext}`);
        });
      });
    }

    possibleFiles.forEach((file) => {
      const url = createImageUrl(file);
      if (url) images.push(url);
    });

    const uniqueImages = [...new Set(images)];
    setProductImages(uniqueImages.length ? uniqueImages : ["https://via.placeholder.com/600x600"]);
  };

  if (!product) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: "1300px", margin: "auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap", // Wrap on smaller screens
        }}
      >
        {/* LEFT SIDE — IMAGES */}
        <div style={{ display: "flex", gap: "20px", flex: "1 1 300px", minWidth: "280px" }}>
          {/* Thumbnails */}
          {productImages.length > 1 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "80px",
                flexShrink: 0,
              }}
            >
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "10px",
                    border: selectedImageIndex === index ? "2px solid #000" : "1px solid #e5e7eb",
                    objectFit: "cover",
                    cursor: "pointer",
                    opacity: selectedImageIndex === index ? 1 : 0.8,
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              ))}
            </div>
          )}

          {/* Main image */}
          <div style={{ flex: "1 1 auto" }}>
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: "480px",
                height: "auto",
                borderRadius: "14px",
                objectFit: "contain",
                background: "#f3f4f6",
                padding: "20px",
                border: "1px solid #e5e7eb",
              }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x600")}
            />

            {/* Image navigation */}
            {productImages.length > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
                <button
                  onClick={() =>
                    setSelectedImageIndex(
                      selectedImageIndex === 0 ? productImages.length - 1 : selectedImageIndex - 1
                    )
                  }
                  style={{
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ◀
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
                  {productImages.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: selectedImageIndex === index ? "black" : "#ccc",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={() =>
                    setSelectedImageIndex(
                      selectedImageIndex === productImages.length - 1 ? 0 : selectedImageIndex + 1
                    )
                  }
                  style={{
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ▶
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — PRODUCT INFO */}
        <div style={{ flex: "1 1 300px", minWidth: "280px" }}>
          {product.discount && (
            <span
              style={{
                background: "#dc2626",
                color: "white",
                padding: "4px 10px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
              }}
            >
              -{product.discount}%
            </span>
          )}

          <h1 style={{ marginTop: "10px", fontSize: "26px", fontWeight: 700 }}>
            {product.name}
          </h1>

          <div style={{ margin: "15px 0", fontSize: "22px" }}>
            {product.discount ? (
              <>
                <span style={{ fontWeight: 700, color: "#16a34a", marginRight: "10px" }}>
                  ${(product.price - (product.price * product.discount) / 100).toFixed(2)}
                </span>
                <span style={{ textDecoration: "line-through", color: "#6b7280" }}>
                  ${product.price}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 700 }}>${product.price}</span>
            )}
          </div>

          <p style={{ color: "#4b5563", marginBottom: "20px" }}>
            ⭐ {product.avg_rating || "0.0"} (0 reviews)
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
            <button
              onClick={() => addToCart(product)}
              style={{
                background: "black",
                color: "white",
                padding: "12px 30px",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ADD TO CART
            </button>

            <button
              style={{
                background: "#f3f4f6",
                padding: "12px 30px",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              BUY NOW
            </button>
          </div>

          <p style={{ marginTop: "25px", color: "#374151" }}>{product.description}</p>
          <p style={{ marginTop: "30px", color: "#6b7280" }}>
            📦 Estimated Delivery: <b>01 – 08 Dec, 2025</b>
          </p>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{ width: "60px" }} />
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.png" alt="Mastercard" style={{ width: "60px" }} />
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/PayPal.svg" alt="PayPal" style={{ width: "60px" }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
