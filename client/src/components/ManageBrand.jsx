import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";


const styles = {
  container: {
    display: "flex",
    height: "100vh",
    
  },
  sidebar: {
    width: "250px",
    background: "#333",
    color: "white",
    padding: "20px",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    background: "#444",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
  },
  deleteButton: {
    background: "red",
    color: "white",
  },
  addButton: {
    background: "green",
    color: "white",
    padding: "10px",
    marginTop: "10px",
    display: "inline-block",
    cursor: "pointer",
  },
};

const ManageBrands = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

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
      <Sidebar/>
      {/* <aside style={styles.sidebar}> */}
        {/* <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/admindashboard")}>Dashboard</li>
            <li onClick={() => navigate("/postvehicle")}>Post New Vehicle</li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main style={styles.mainContent}>
        <h1>Manage Brands</h1>

        {/* Add Brand Button
        <button style={{ ...styles.button, ...styles.addButton }} onClick={() => navigate("/add-brand")}>
          ➕ Add New Brand
        </button> */}

        {/* Brands Table */}
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
              <tr key={brand._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{brand.name}</td>
                <td style={styles.td}>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(brand._id)}
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
