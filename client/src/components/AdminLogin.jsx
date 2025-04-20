import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3200/admin",
        formData,
        { withCredentials: true }
      );
      console.log("Login Response:", response.data);
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admindashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Admin login failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url('https://www.insidehook.com/wp-content/uploads/2024/08/lamborghini-revuelto-insidehook.jpg?fit=1200%2C800')", // Background image
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    formWrapper: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      marginBottom: "15px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      borderRadius: "5px",
      border: "1px solid #ddd",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      background: "#007bff",
      color: "white",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
      borderRadius: "5px",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
      fontSize: "14px",
    },
    linkText: {
      marginTop: "10px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.formWrapper} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Admin Login</h2>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
        {message && <p style={styles.errorMessage}>{message}</p>}

        <p style={styles.linkText}>
          <a href="/">Back to Home</a>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
