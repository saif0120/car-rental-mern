import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope } from "react-icons/fa";
import Header from "./Header"; // Importing Header component
import Footer from "./Footer";


const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url('/car orange.webp')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#fff",
      paddingTop: "80px", // Added padding to avoid overlap with the header
    },
    formWrapper: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      color: "#333",
    },
    heading: {
      fontSize: "24px",
      marginBottom: "15px",
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
      transition: "0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    successMessage: {
      color: "green",
      marginTop: "10px",
      fontSize: "16px",
    },
    contactInfo: {
      textAlign: "center",
      marginTop: "20px",
    },
    contactItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      fontSize: "16px",
      margin: "5px 0",
    },
    socialIcons: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      fontSize: "24px",
      marginTop: "10px",
    },
    icon: {
      color: "#007bff",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <>
      <Header /> {/* Adding Header Component */}

      
      <div style={styles.container}>
        <div style={styles.formWrapper}>
          <h2 style={styles.heading}>Contact Us</h2>
          {submitted && <p style={styles.successMessage}>Message sent successfully!</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              style={{ ...styles.input, height: "100px" }}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" style={styles.button}>Send Message</button>
          </form>

          <div style={styles.contactInfo}>
            <h3>Get in Touch</h3>
            <p style={styles.contactItem}>
              <FaPhone /> +1 234 567 890
            </p>
            <p style={styles.contactItem}>
              <FaEnvelope /> contact@carrental.com
            </p>
            <div style={styles.socialIcons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook style={styles.icon} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram style={styles.icon} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter style={styles.icon} />
              </a>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
      <Footer /> {/* Adding Header Component */}

    </>
  );
};

export default Contact;

