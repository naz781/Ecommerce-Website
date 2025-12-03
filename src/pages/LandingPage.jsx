import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/CartContext";
import ProductCard from "../components/ProductCard";
import { supabase } from "../pages/SupabaseClient";
import FeaturedCarousel from "../components/FeaturedCarousel";
import hero from "../assets/banners/hero3.jpeg";
import promo1 from "../assets/banners/promo1.jpeg";
import promo2 from "../assets/banners/promo2.jpeg";

export default function LandingPage() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([fetchCategories(), fetchProducts()]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*");
    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }
    setCategories(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false }); // Optional: order by date
    
    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setFeaturedProducts([]);
      return;
    }

    const extendedProducts = (data || []).map((product) => ({
      ...product,
      staticImages: [`/assets/products/${product.product_id}/main.jpeg`],
    }));

    setProducts(extendedProducts);
    // SET ALL PRODUCTS AS FEATURED, NOT JUST FIRST 6
    setFeaturedProducts(extendedProducts);
  };

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "#666"
      }}>
        Loading products...
      </div>
    );
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
{/* HERO SECTION */}
<section
  style={{
    position: "relative",
    width: "100%",
    height: isMobile ? 250 : 300, // hero height
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // align image to top
    overflow: "hidden",
  }}
>
  <img
    src={hero}
    alt="Hero Banner"
    style={{
      width: "100%",
      height: "100%", // fill the container height
      objectFit: "contain",
      objectPosition: "top", // push image to the top
      display: "block",
    }}
  />

  {/* Shop Now button slightly right of center */}
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "55%", // slightly right of center
      transform: "translate(-50%, -50%)",
    }}
  >
    <button
      style={{
        background: "black",
        padding: "12px 24px",
        borderRadius: 8,
        fontWeight: "600",
        color: "white",
        cursor: "pointer",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.background = "#333")}
      onMouseLeave={(e) => (e.target.style.background = "black")}
    >
      Shop Now
    </button>
  </div>
</section>



      {/* CATEGORY SCROLL */}
      <section style={{ marginTop: 32, padding: "0 16px" }}>
        <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
          Shop by Category
        </h2>

        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            padding: "8px 0",
            scrollbarWidth: "thin",
            scrollbarColor: "#888 transparent",
          }}
        >
          {categories.map((category) => (
            <a
              key={category.category_id}
              href={`#category-${category.category_id}`}
              style={{
                flexShrink: 0,
                padding: "12px 24px",
                borderRadius: 50,
                background: "#f5f5f5",
                fontWeight: 500,
                cursor: "pointer",
                transition: "0.2s",
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#e5e5e5")}
              onMouseLeave={(e) => (e.target.style.background = "#f5f5f5")}
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS — ALL PRODUCTS CAROUSEL */}
      <section style={{ marginTop: 48, padding: "0 16px" }}>
        <h2 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 600, marginBottom: 24 }}>
          Featured Products
        </h2>

        {featuredProducts.length > 0 ? (
          <FeaturedCarousel 
            products={featuredProducts} 
            addToCart={addToCart} 
          />
        ) : (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "#f9f9f9",
            borderRadius: "8px",
            color: "#666"
          }}>
            No products available at the moment.
          </div>
        )}
      </section>



      {/* CATEGORY SECTIONS */}
      {categories.map((category) => {
        const categoryProducts = products.filter(
          (product) => product.category_id === category.category_id
        );

        if (categoryProducts.length === 0) return null;

        return (
          <section
            id={`category-${category.category_id}`}
            key={category.category_id}
            style={{ padding: "48px 16px" }}
          >
            <h2
              style={{
                fontSize: isMobile ? 24 : 32,
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              {category.name}
            </h2>

            <div
              style={{
                display: "grid",
                gap: 24,
                gridTemplateColumns: isMobile
                  ? "repeat(2, 1fr)"
                  : "repeat(6, 1fr)",
              }}
            >
              {categoryProducts
                .slice(0, 6)
                .map((product) => (
                  <ProductCard
                    key={product.product_id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
            </div>
          </section>
        );
      })}

      {/* FOOTER NOTE */}
      <div style={{
        marginTop: 48,
        padding: "20px 16px",
        textAlign: "center",
        background: "#f5f5f5",
        color: "#666",
        fontSize: "14px"
      }}>
        Showing all {products.length} products
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useContext } from "react";
// import { CartContext } from "../components/CartContext";
// import ProductCard from "../components/ProductCard";
// import { supabase } from "../pages/SupabaseClient";

// import heroMobile from "../assets/banners/hero1.jpeg";
// import pic1 from "../assets/banners/pic1.jpeg";
// import pic2 from "../assets/banners/pic2.jpeg";
// import promoMobile1 from "../assets/banners/promo1.jpeg";
// import promoMobile2 from "../assets/banners/hero2.jpeg";

// export default function LandingPage() {
//   const { addToCart } = useContext(CartContext);
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   const fetchCategories = async () => {
//     const { data, error } = await supabase.from("categories").select("*");
//     if (!error) setCategories(data);
//   };

//   const fetchProducts = async () => {
//     const { data } = await supabase.from("products").select("*");
//     const extended = (data || []).map((p) => ({
//       ...p,
//       staticImages: [`/assets/products/${p.product_id}/main.jpeg`],
//     }));
//     setProducts(extended);
//   };

//   return (
//     <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      
//       {/* CATEGORY SCROLL BAR */}
//       <div
//         style={{
//           position: "sticky",
//           top: 0,
//           zIndex: 30,
//           background: "#fff",
//           boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
//           display: "flex",
//           overflowX: "auto",
//           padding: "12px 16px",
//           gap: "12px",
//         }}
//       >
//         {categories.map((c) => (
//           <a
//             key={c.category_id}
//             href={`#category-${c.category_id}`}
//             style={{
//               padding: "8px 16px",
//               background: "#f3f4f6",
//               borderRadius: "50px",
//               whiteSpace: "nowrap",
//               textDecoration: "none",
//               color: "#000",
//               fontWeight: 500,
//               transition: "0.2s",
//             }}
//           >
//             {c.name.toUpperCase()}
//           </a>
//         ))}
//       </div>

//       {/* HERO SECTION */}
//       <section
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "500px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <img
//           src={heroMobile}
//           alt="Hero Banner"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             filter: "brightness(75%)",
//           }}
//         />

//         <div
//           style={{
//             position: "absolute",
//             textAlign: "center",
//             maxWidth: "400px",
//             color: "white",
//             padding: "0 16px",
//           }}
//         >
//           <h1 style={{ fontSize: "40px", fontWeight: "bold", marginBottom: "12px" }}>
//             Latest Mobile Phones & Electronics
//           </h1>

//           <p style={{ fontSize: "18px", marginBottom: "20px" }}>
//             Explore top smartphones, gadgets, and accessories at unbeatable prices.
//           </p>

//           <button
//             style={{
//               background: "black",
//               color: "white",
//               padding: "12px 24px",
//               borderRadius: "8px",
//               cursor: "pointer",
//               fontWeight: 600,
//               transition: "0.2s",
//             }}
//           >
//             Shop Now
//           </button>
//         </div>
//       </section>

//       {/* PROMOTIONAL CARDS */}
//       <section
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr",
//           gap: "16px",
//           padding: "24px",
//         }}
//       >
//         {[pic1, pic2].map((img, idx) => (
//           <div
//             key={idx}
//             style={{
//               position: "relative",
//               width: "100%",
//               aspectRatio: "1 / 1",
//               borderRadius: "12px",
//               overflow: "hidden",
//             }}
//           >
//             <img
//               src={img}
//               alt={`Promo ${idx + 1}`}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 transition: "0.3s",
//               }}
//             />

//             <button
//               style={{
//                 position: "absolute",
//                 bottom: "16px",
//                 left: "50%",
//                 transform: "translateX(-50%)",
//                 background: "black",
//                 color: "white",
//                 padding: "12px 24px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}
//             >
//               Shop Now →
//             </button>
//           </div>
//         ))}
//       </section>

//       {/* LARGE PROMO BANNERS */}
//       {[promoMobile1, promoMobile2].map((img, idx) => (
//         <section key={idx} style={{ position: "relative", width: "100%", height: "300px", margin: "32px 0" }}>
//           <img
//             src={img}
//             alt={`Promo Banner ${idx + 1}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               filter: "brightness(75%)",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               inset: 0,
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "center",
//               alignItems: "center",
//               color: "white",
//               textAlign: "center",
//               padding: "0 16px",
//             }}
//           >
//             <h2 style={{ fontSize: "32px", fontWeight: 700 }}>
//               {idx === 0 ? "Hot Deals on Kitchen stuff" : "Latest Gadgets & Accessories"}
//             </h2>

//             <p style={{ fontSize: "18px", marginTop: "8px" }}>
//               {idx === 0
//                 ? "Grab the latest items at amazing prices"
//                 : "Everything you need for your devices"}
//             </p>

//             <button
//               style={{
//                 marginTop: "16px",
//                 background: "black",
//                 color: "white",
//                 padding: "10px 20px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontWeight: 600,
//               }}
//             >
//               Shop Now →
//             </button>
//           </div>
//         </section>
//       ))}

//       {/* PRODUCT SECTIONS */}
//       {categories.map((c) => (
//         <section key={c.category_id} id={`category-${c.category_id}`} style={{ padding: "32px 16px" }}>
//           <h2 style={{ fontSize: "28px", fontWeight: 600, marginBottom: "20px" }}>
//             {c.name}
//           </h2>

//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(6, 1fr)",
//               gap: "16px",
//             }}
//           >
//             {products
//               .filter((p) => p.category_id === c.category_id)
//               .slice(0, 6)
//               .map((p) => (
//                 <ProductCard key={p.product_id} product={p} addToCart={addToCart} />
//               ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }


// // import React, { useState, useEffect, useContext } from "react";
// // import { CartContext } from "../components/CartContext";
// // import ProductCard from "../components/ProductCard";
// // import { supabase } from "../pages/SupabaseClient";

// // import heroMobile from "../assets/banners/hero1.jpeg";
// // import pic1 from "../assets/banners/pic1.jpeg";
// // import pic2 from "../assets/banners/pic2.jpeg";
// // import promoMobile1 from "../assets/banners/promo1.jpeg";
// // import promoMobile2 from "../assets/banners/hero2.jpeg";

// // export default function LandingPage() {
// //   const { addToCart } = useContext(CartContext);
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);

// //   useEffect(() => {
// //     fetchCategories();
// //     fetchProducts();
// //   }, []);

// //   const fetchCategories = async () => {
// //     const { data, error } = await supabase.from("categories").select("*");
// //     if (!error) setCategories(data);
// //   };

// //   const fetchProducts = async () => {
// //     const { data } = await supabase.from("products").select("*");
// //     const extended = (data || []).map((p) => ({
// //       ...p,
// //       staticImages: [`/assets/products/${p.product_id}/main.jpeg`],
// //     }));
// //     setProducts(extended);
// //   };

// //   return (
// //     <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
// //       {/* Dynamic Navbar */}
// //       <div
// //         style={{
// //           position: "sticky",
// //           top: 0,
// //           zIndex: 30,
// //           width: "100%",
// //           background: "white",
// //           boxShadow: "0 1px 6px rgba(0,0,0,0.1)",
// //           display: "flex",
// //           justifyContent: "center",
// //           gap: "24px",
// //           padding: "16px 0",
// //           fontSize: "14px",
// //           fontWeight: 500,
// //           overflowX: "auto",
// //         }}
// //       >
// //         {categories.map((c) => (
// //           <a
// //             key={c.category_id}
// //             href={`#category-${c.category_id}`}
// //             style={{
// //               textDecoration: "none",
// //               cursor: "pointer",
// //               color: "#000",
// //               whiteSpace: "nowrap",
// //             }}
// //           >
// //             {c.name.toUpperCase()}
// //           </a>
// //         ))}
// //       </div>

// //       {/* HERO SECTION: Large Left Image, Text Right */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "1fr 1fr",
// //           minHeight: "500px", // increased height to reduce stretching
// //         }}
// //       >
// //         {/* Left: Banner Image */}
// //         <div
// //           style={{
// //             backgroundImage: `url(${heroMobile})`,
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             width: "100%",
// //             height: "100%",
// //           }}
// //         ></div>

// //         {/* Right: Caption */}
// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             justifyContent: "center",
// //             padding: "48px",
// //             background: "white",
// //           }}
// //         >
// //           <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px" }}>
// //             Latest Mobile Phones & Electronics
// //           </h2>
// //           <p style={{ color: "#4b5563", marginBottom: "24px", fontSize: "18px" }}>
// //             Explore top smartphones, gadgets, and accessories at unbeatable prices.
// //           </p>
// //           <button
// //             style={{
// //               background: "black",
// //               color: "white",
// //               padding: "12px 24px",
// //               borderRadius: "8px",
// //               cursor: "pointer",
// //               fontWeight: 600,
// //               fontSize: "16px",
// //               width: "fit-content",
// //             }}
// //           >
// //             Shop Now
// //           </button>
// //         </div>
// //       </div>

// //       {/* Two-Square Mobile Promotions */}
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "1fr 1fr",
// //           gap: "16px",
// //           padding: "32px 24px",
// //         }}
// //       >
// //         {/* Left Square */}
// //         <div
// //           style={{
// //             backgroundImage: `url(${pic1})`,
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             width: "100%",
// //             aspectRatio: "1 / 1",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             color: "white",
// //           }}
// //         >
// //           <button
// //             style={{
// //               background: "black",
// //               color: "white",
// //               padding: "12px 24px",
// //               borderRadius: "6px",
// //               cursor: "pointer",
// //               fontWeight: 600,
// //             }}
// //           >
// //             Shop Now →
// //           </button>
// //         </div>

// //         {/* Right Square */}
// //         <div
// //           style={{
// //             backgroundImage: `url(${pic2})`,
// //             backgroundSize: "cover",
// //             backgroundPosition: "center",
// //             width: "100%",
// //             aspectRatio: "1 / 1",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "center",
// //             color: "white",
// //           }}
// //         >
// //           <button
// //             style={{
// //               background: "black",
// //               color: "white",
// //               padding: "12px 24px",
// //               borderRadius: "6px",
// //               cursor: "pointer",
// //               fontWeight: 600,
// //             }}
// //           >
// //             Shop Now →
// //           </button>
// //         </div>
// //       </div>

// //       {/* Promotional Banner 1 */}
// //       <div
// //         style={{
// //           width: "100%",
// //           height: "300px",
// //           backgroundImage: `url(${promoMobile1})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           textAlign: "center",
// //           color: "white",
// //           marginTop: "32px",
// //         }}
// //       >
// //         <div>
// //           <h2 style={{ fontSize: "32px", fontWeight: 700 }}>Hot Deals on Kitchen stuff</h2>
// //           <p style={{ fontSize: "18px", marginTop: "8px" }}>Grab the latest items at amazing prices</p>
// //           <button
// //             style={{
// //               marginTop: "16px",
// //               background: "black",
// //               color: "white",
// //               padding: "8px 16px",
// //               borderRadius: "6px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Shop Now →
// //           </button>
// //         </div>
// //       </div>

// //       {/* Promotional Banner 2 */}
// //       <div
// //         style={{
// //           width: "100%",
// //           height: "300px",
// //           backgroundImage: `url(${promoMobile2})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           textAlign: "center",
// //           color: "white",
// //           marginTop: "32px",
// //         }}
// //       >
// //         <div>
// //           <h2 style={{ fontSize: "32px", fontWeight: 700 }}>Latest Gadgets & Accessories</h2>
// //           <p style={{ fontSize: "18px", marginTop: "8px" }}>Everything you need for your devices</p>
// //           <button
// //             style={{
// //               marginTop: "16px",
// //               background: "black",
// //               color: "white",
// //               padding: "8px 16px",
// //               borderRadius: "6px",
// //               cursor: "pointer",
// //             }}
// //           >
// //             Shop Now →
// //           </button>
// //         </div>
// //       </div>

// //       {/* Featured Categories Sections */}
// //       {categories.map((c) => (
// //         <div key={c.category_id} id={`category-${c.category_id}`} style={{ padding: "56px 24px" }}>
// //           <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "32px" }}>{c.name}</h2>
// //           <div style={{ display: "flex", overflowX: "auto", gap: "24px", paddingBottom: "16px" }}>
// //             {products
// //               .filter((p) => p.category_id === c.category_id)
// //               .slice(0, 6)
// //               .map((p) => (
// //                 <ProductCard key={p.product_id} product={p} addToCart={addToCart} />
// //               ))}
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }
