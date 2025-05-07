import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const ContactUs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <Header />
      <div style={darkMode ? styles.darkContainer : styles.container}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <h1 style={styles.heading}>Contact Us</h1>
          <button
            onClick={toggleDarkMode}
            style={{
              ...styles.toggleBtn,
              background: darkMode ? "#ffcc00" : "#007bff",
              color: darkMode ? "#222" : "#fff",
            }}
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Contact Content */}
        <div style={styles.content}>
          <h2 style={styles.subHeading}>Get in Touch</h2>
          <p style={styles.description}>
            Have questions? We’d love to hear from you!
          </p>

          {/* Contact Details */}
          <div style={darkMode ? styles.darkContactInfo : styles.contactInfo}>
            <p>📍 <strong>Address:</strong> 123 Main Street, New York, USA</p>
            <p>📧 <strong>Email:</strong> <a href="mailto:saifali0atif@gmail.com" style={styles.link}>saifali0atif@gmail.com</a></p>
            <p>📞 <strong>Phone:</strong> <a href="tel:+9355653309" style={styles.link}>+9355653309</a></p>
          </div>

          {/* Social Links */}
          <h2 style={styles.subHeading}>Follow Us</h2>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>📘 Facebook</a>
            <a href="#" style={styles.socialLink}>📸 Instagram</a>
            <a href="#" style={styles.socialLink}>🟢 WhatsApp</a>
          </div>

          {/* Contact Form */}
          <h2 style={styles.subHeading}>Send a Message</h2>
          <form style={darkMode ? styles.darkForm : styles.form}>
            <input type="text" placeholder="Your Name" style={styles.input} required />
            <input type="email" placeholder="Your Email" style={styles.input} required />
            <textarea placeholder="Your Message" style={styles.textarea} required></textarea>
            <button type="submit" style={styles.submitBtn}>Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

/* Styles */
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9f9f9",
    color: "#333",
    minHeight: "100vh",
    transition: "background 0.3s ease",
  },
  darkContainer: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#121212",
    color: "#fff",
    minHeight: "100vh",
    transition: "background 0.3s ease",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "800px",
    margin: "auto",
    paddingBottom: "20px",
    borderBottom: "2px solid #007bff",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: 0,
  },
  toggleBtn: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "0.3s ease",
  },
  content: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
    paddingTop: "20px",
  },
  subHeading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "10px",
    borderBottom: "2px solid #007bff",
    display: "inline-block",
    paddingBottom: "5px",
  },
  description: {
    fontSize: "1.1rem",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  contactInfo: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "30px",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  darkContactInfo: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "30px",
    backgroundColor: "#333",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  },
  socialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },
  socialLink: {
    textDecoration: "none",
    color: "#fff",
    backgroundColor: "#007bff",
    padding: "10px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  darkForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#222",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "border 0.3s ease",
  },
  textarea: {
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    height: "120px",
    transition: "border 0.3s ease",
  },
  submitBtn: {
    padding: "12px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
};

export default ContactUs;
