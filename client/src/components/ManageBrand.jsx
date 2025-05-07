import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f4f6f9",
    fontFamily: "Segoe UI, sans-serif",
  },
  mainContent: {
    flex: 1,
    padding: "30px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
  },
  addButton: {
    background: "#007bff",
    color: "#fff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  addButtonHover: {
    background: "#0056b3",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
  },
  th: {
    background: "#343a40",
    color: "#fff",
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "16px",
  },
  td: {
    padding: "12px 16px",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "15px",
    color: "#333",
  },
  trHover: {
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
  },
  deleteButton: {
    background: "#dc3545",
    color: "white",
    padding: "8px 14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

const ManageBrands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [hoverRow, setHoverRow] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:3200/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await axios.delete(`http://localhost:3200/api/brands/${id}`);
        setBrands(brands.filter((brand) => brand._id !== id));
      } catch (error) {
        console.error("Error deleting brand:", error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Manage Brands</h1>
          <button
            style={styles.addButton}
            onClick={() => navigate("/add-brand")}
            onMouseOver={(e) => (e.target.style.background = "#0056b3")}
            onMouseOut={(e) => (e.target.style.background = "#007bff")}
          >
            ➕ Add Brand
          </button>
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Brand Name</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr
                key={brand._id}
                style={hoverRow === index ? styles.trHover : {}}
                onMouseEnter={() => setHoverRow(index)}
                onMouseLeave={() => setHoverRow(null)}
              >
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{brand.name}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(brand._id)}
                    onMouseOver={(e) => (e.target.style.background = "#c82333")}
                    onMouseOut={(e) => (e.target.style.background = "#dc3545")}
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ManageBrands;
