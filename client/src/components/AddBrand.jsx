import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  formContainer: {
    background: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    background: "green",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

const AddBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setError("Brand name is required!");
      return;
    }

    try {
      await axios.post("http://localhost:3200/api/brands", { name: brandName });
      navigate("/brands"); // Redirect to Manage Brands Page
    } catch (error) {
      console.error("Error adding brand:", error);
      setError("Failed to add brand!");
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.mainContent}>
        <h1>Add New Brand</h1>
        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <label>Brand Name:</label>
            <input
              type="text"
              style={styles.input}
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
            />
            {error && <p style={styles.error}>{error}</p>}
            <button type="submit" style={styles.button}>
              ➕ Add Brand
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddBrand;
