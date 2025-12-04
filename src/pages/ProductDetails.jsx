import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "./SupabaseClient";
import { CartContext } from "../components/CartContext";
import ReviewModal from "../components/ReviewModal";
import QuestionModal from "../components/QuestionModal";

// MUI
import {
  Box,
  Button,
  Tabs,
  Tab,
  Typography,
  Paper,
  Rating,
  Stack,
  IconButton,
} from "@mui/material";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchQuestions();
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

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false });
    setReviews(data || []);
  };

  const fetchQuestions = async () => {
    const { data } = await supabase
      .from("product_questions")
      .select("*")
      .eq("product_id", id)
      .order("created_at", { ascending: false });
    setQuestions(data || []);
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
    const possibleFiles = [`${productId}.jpeg`, `${productId}.jpg`, `${productId}.png`];

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

  if (!product)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  const modernButtonStyles = {
    borderRadius: "50px",
    textTransform: "none",
    fontWeight: 700,
    height: "52px",
  };

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", p: 3 }}>
      {/* TOP SECTION */}
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {/* LEFT IMAGE SECTION */}
        <Box sx={{ display: "flex", gap: 2, flex: "1 1 300px", minWidth: 280 }}>
          {productImages.length > 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: 80 }}>
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={"view " + index}
                  onClick={() => setSelectedImageIndex(index)}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    border:
                      selectedImageIndex === index
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                    cursor: "pointer",
                    objectFit: "cover",
                  }}
                  onError={(e) => (e.target.style.display = "none")}
                />
              ))}
            </Box>
          )}

          {/* MAIN IMAGE */}
          <Paper sx={{ p: 2, borderRadius: 3, flexGrow: 1 }}>
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              style={{
                width: "100%",
                maxWidth: 500,
                borderRadius: 14,
                background: "#f5f5f5",
              }}
              onError={(e) => (e.target.src = "https://via.placeholder.com/600x600")}
            />
          </Paper>
        </Box>

        {/* RIGHT PRODUCT INFO */}
        <Box sx={{ flex: "1 1 300px", minWidth: 280 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
            ${product.price}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <Rating value={product.avg_rating || 0} precision={0.5} readOnly />
            <Typography>({reviews.length} reviews)</Typography>
          </Stack>

          {/* QUANTITY + ADD TO CART BUTTONS */}
          <Box sx={{ mb: 3 }}>
            {/* <Typography fontWeight={600} sx={{ mb: 1 }}>Quantity</Typography> */}
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Quantity Buttons */}
              {/* <Stack
                direction="row"
                alignItems="center"
                sx={{
                  background: "#f3f3f3",
                  borderRadius: "50px",
                  height: 52,
                  px: 2,
                  gap: 1,
                }}
              > */}
                {/* <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>–</IconButton>
                <Typography fontWeight={600}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>+</IconButton> */}
              {/* </Stack> */}

              {/* Add to Cart */}
              <Button
                fullWidth
                variant="contained"
                onClick={() => addToCart({ ...product, quantity })}
                sx={{
                  ...modernButtonStyles,
                  background: "#f1f1f1",
                  color: "black",
                  boxShadow: "none",
                }}
              >
                ADD TO CART
              </Button>
            </Stack>

            {/* BUY NOW BUTTON */}
            <Button
              fullWidth
              variant="contained"
              sx={{
                ...modernButtonStyles,
                mt: 2,
                background: "black",
                color: "white",
                ":hover": { background: "#333" },
              }}
            >
              BUY NOW
            </Button>
          </Box>
        </Box>
      </Box>

      {/* TABS SECTION */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tabIndex}
          onChange={(e, idx) => setTabIndex(idx)}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
        >
          <Tab label="Description" />
          <Tab label="Reviews" />
          <Tab label="Questions" />
        </Tabs>

        {/* DESCRIPTION */}
        {tabIndex === 0 && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography fontSize={18} lineHeight={1.8}>
              {product.description}
            </Typography>
          </Paper>
        )}

        {/* REVIEWS */}
        {tabIndex === 1 && (
          <Box>
            <Button
              variant="contained"
              sx={{
                mb: 3,
                background: "black",
                color: "white",
                borderRadius: "50px",
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
              }}
              onClick={() => setShowReviewModal(true)}
            >
              Write a Review
            </Button>

            {reviews.length === 0 && <Typography>No reviews yet.</Typography>}

            <Stack spacing={2}>
              {reviews.map((r) => (
                <Paper key={r.review_id} sx={{ p: 3, borderRadius: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography fontWeight={700}>{r.title}</Typography>
                    <Rating value={r.rating} readOnly />
                  </Stack>
                  <Typography sx={{ mt: 1 }}>{r.review}</Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    {r.name} – {new Date(r.created_at).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}

        {/* QUESTIONS */}
        {tabIndex === 2 && (
          <Box>
            <Button
              variant="contained"
              sx={{
                mb: 3,
                background: "#f1f1f1",
                color: "black",
                borderRadius: "50px",
                px: 4,
                py: 1.4,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: "none",
              }}
              onClick={() => setShowQuestionModal(true)}
            >
              Ask a Question
            </Button>

            {questions.length === 0 && <Typography>No questions yet.</Typography>}

            <Stack spacing={2}>
              {questions.map((q) => (
                <Paper key={q.question_id} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography fontWeight={700}>{q.name} asks:</Typography>
                  <Typography sx={{ mt: 1 }}>{q.question}</Typography>
                  <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                    {new Date(q.created_at).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* MODALS */}
      {showReviewModal && (
        <ReviewModal
          productId={id}
          onClose={() => setShowReviewModal(false)}
          onAdded={(newReview) => setReviews([newReview, ...reviews])}
        />
      )}

      {showQuestionModal && (
        <QuestionModal
          productId={id}
          onClose={() => setShowQuestionModal(false)}
          onAdded={(newQ) => setQuestions([newQ, ...questions])}
        />
      )}
    </Box>
  );
}

export default ProductDetails;
