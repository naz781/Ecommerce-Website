import React, { useState } from "react";
import { supabase } from "../pages/SupabaseClient";

export default function QuestionModal({ productId, onClose, onAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("product_questions")
      .insert([{ product_id: productId, ...form }])
      .select()
      .single();
    if (!error) {
      onAdded(data);
      onClose();
    }
  };

  return (
    <div style={modalOverlay}>
      <div style={modalContent}>
        <h2>Ask a Question</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="question"
            placeholder="Your question"
            value={form.question}
            onChange={handleChange}
            required
            style={{ ...inputStyle, height: "100px" }}
          />
          <div style={{ marginTop: "16px" }}>
            <button type="submit" style={buttonStyle}>Submit</button>
            <button type="button" onClick={onClose} style={buttonCancelStyle}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Styles (same as ReviewModal)
const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalContent = {
  background: "white",
  padding: "24px",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "blue",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginRight: "8px",
};

const buttonCancelStyle = {
  padding: "10px 20px",
  background: "gray",
  color: "white",
  border: "none",
  borderRadius: "6px",
};
