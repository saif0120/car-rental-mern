import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import Header from "./Header";
import Footer from "./Footer";

const PostTestimonial = () => {
  const [testimonial, setTestimonial] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3200/api/testimonials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ testimonial }),
    });


    

    const data = await response.json();
    if (data.success) {
      alert("Testimonial posted successfully!");
      setTestimonial("");
    } else {
      alert("Error posting testimonial");
    }
  };

  return (
    <>
      <Header />

      <div style={styles.banner}>
        <h1>Post a Testimonial</h1>
      </div>

      <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
        <div style={styles.sidebar}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={styles.sidebarItem}><Link to="/my-bookings" style={styles.sidebarLink}>My Bookings</Link></li>
            <li style={styles.sidebarItem}><Link to="/profile-update" style={styles.sidebarLink}>Profile Update</Link></li>
            <li style={styles.sidebarItem}><Link to="/update-password" style={styles.sidebarLink}>Update Password</Link></li>
            <li style={styles.sidebarItem}><Link to="/post-testimonial" style={styles.sidebarLink}>Post a Testimonial</Link></li>
            <li style={styles.sidebarItem}><Link to="/my-testimonials" style={styles.sidebarLink}>My Testimonials</Link></li>
          </ul>
        </div>

        <div style={styles.formContainer}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>POST A TESTIMONIAL</h2>
          <form onSubmit={handleSubmit}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Your Testimonial
            </label>
            <textarea
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              required
              style={styles.textarea}
            />
            <button type="submit" style={styles.submitButton}>Save</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

const styles = {
  banner: {
    width: "100%",
    textAlign: "center",
    padding: "50px 20px",
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
    backgroundImage: "url('https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  sidebar: {
    width: "25%",
    background: "#f4f4f4",
    padding: "20px",
    borderRadius: "8px",
  },
  sidebarItem: {
    padding: "12px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  sidebarLink: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
  formContainer: {
    width: "50%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    background: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#d9534f",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default PostTestimonial;
