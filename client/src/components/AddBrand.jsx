import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundImage: "url('https://images.unsplash.com/photo-1503736334956-4c8f8e92946d')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
    padding: "30px",
  },
  formContainer: {
    background: "rgba(255, 255, 255, 0.15)",
    border: "1px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "16px",
    padding: "30px",
    width: "400px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
    color: "#fff",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#ffffff",
    textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    background: "rgba(255,255,255,0.8)",
    outline: "none",
    color: "black",
  },
  button: {
    background: "#10b981",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    width: "100%",
    transition: "background 0.3s",
  },
  buttonHover: {
    background: "#059669",
  },
  error: {
    color: "#ff4d4f",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setError("Brand name is required!");
      return;
    }

    try {
      await axios.post("http://localhost:3200/api/brands", { name: brandName });
      navigate("/brands");
    } catch (error) {
      console.error("Error adding brand:", error);
      setError("Failed to add brand!");
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.mainContent}>
        <div style={styles.formContainer}>
          <h1 style={styles.heading}>Add New Brand</h1>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Brand Name</label>
            <input
              type="text"
              style={styles.input}
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Toyota, Ford"
            />
            {error && <p style={styles.error}>{error}</p>}
            <button
              type="submit"
              style={hover ? { ...styles.button, ...styles.buttonHover } : styles.button}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              ➕ Add Brand
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBrand;
