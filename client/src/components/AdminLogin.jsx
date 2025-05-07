import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
      localStorage.setItem("admin", JSON.stringify(response.data));
      navigate("/admindashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Admin login failed");
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage:
        "linear-gradient(to right, #1f1c2c, #928dab)", // Professional gradient
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "fadeIn 1s ease-in",
    },
    formWrapper: {
      background: "rgba(255, 255, 255, 0.12)",
      padding: "40px",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      maxWidth: "400px",
      width: "90%",
      color: "#fff",
      animation: "slideIn 1s ease-out",
    },
    title: {
      fontSize: "28px",
      marginBottom: "20px",
      fontWeight: "bold",
      color: "#ffffff",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "10px",
      border: "none",
      fontSize: "16px",
      // background: "rgba(255,255,255,0.15)",
      color: "#fff",
      outline: "none",
    },
    passwordWrapper: {
      position: "relative",
    },
    eyeIcon: {
      position: "absolute",
      top: "50%",
      right: "15px",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#ccc",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      background: "linear-gradient(90deg, #00c6ff, #0072ff)",
      color: "white",
      border: "none",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    errorMessage: {
      color: "red",
      marginTop: "10px",
      fontSize: "14px",
    },
    linkText: {
      marginTop: "15px",
      fontSize: "14px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <form style={styles.formWrapper} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Admin Portal</h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div style={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            style={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>

        {message && <p style={styles.errorMessage}>{message}</p>}

        <p style={styles.linkText}>
          <a href="/" style={{ color: "#eee", textDecoration: "underline" }}>
            ← Back to Home
          </a>
        </p>
      </form>

      <style>{`
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        @keyframes slideIn {
          from {transform: translateY(-20px); opacity: 0;}
          to {transform: translateY(0); opacity: 1;}
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
