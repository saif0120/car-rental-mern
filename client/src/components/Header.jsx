import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaLinkedin,
  FaTwitter, FaGoogle, FaSearch, FaTimes, FaUserCircle, FaCaretDown
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "", email: "", mobile: "", password: "", confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3200/check-session", {
          method: "GET",
          credentials: "include", // ✅ Session send karega
        });
  
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsLoggedIn(false);
      }
    };
  
    checkSession();
  }, []);
    
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3200/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (response.ok) {
        localStorage.removeItem("user"); // ✅ Remove stored user
        setUser(null);
        setIsLoggedIn(false);
        navigate("/"); // ✅ Redirect home
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
    
      
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const toggleModalType = () => setModalType(modalType === "login" ? "signup" : "login");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match");
    }
  
    try {
      const response = await fetch("http://localhost:3200/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("User Registered Successfully!");
        closeModal();
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      alert("Error signing up");
    }
  };
    
  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3200/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Session authentication ke liye zaroori hai
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Handle invalid JSON
        throw new Error(errorData.error || "Invalid credentials");
      }
  
      const data = await response.json();
  
      if (!data || !data.user) {
        throw new Error("Invalid response from server");
      }
  
      setIsLoggedIn(true);
      setUser(data.user);
      closeModal();
      navigate("/");
  
    } catch (error) {
      console.error("❌ Error:", error.message);
      alert(error.message || "Error logging in");
    }
  };
    
    
  return (
    <header className="header-container">
      <div className="top-info-bar">
        <div className="info-left">
          <img src="logo.jpeg" alt="Car Rental Portal Logo" className="logo-image" />
          <span className="bold">Car Rental Portal</span>
        </div>

        <div className="info-middle">
          <FaEnvelope className="icon" /> <span className="bold">FOR SUPPORT:</span> info@gmail.com
        </div>
        <div className="info-middle">
          <FaPhone className="icon" /> <span className="bold">HELPLINE:</span> 8974561236
        </div>

        {/* Social Media Icons */}
        <div className="info-right social-icons">
          <FaFacebook className="social-icon" />
          <FaInstagram className="social-icon" />
          <FaLinkedin className="social-icon" />
          <FaTwitter className="social-icon" />
          <FaGoogle className="social-icon" />
        </div>

        {/* User Profile Dropdown */}
        <div className="info-right">
      </div>
  {isLoggedIn ? (
    <div style={{ position: "relative" }}>
      <div
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FaUserCircle />
        <span>{user?.name || "My Account"}</span>
        <FaCaretDown />
      </div>
      {showDropdown && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            color: "black",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            
          }}
        >
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
           <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/my-bookings" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>My Bookings</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/profile-update" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Profile Update</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/update-password" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Update Password</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/test" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Post a Testimonial</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/my-testimonials" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>My Testimonials</Link>
            </li>
        <li 
          onClick={handleLogout}
          style={{ padding: "8px 12px", cursor: "pointer", color: "red", fontWeight: "bold", transition: "background 0.3s" }}
        >
          Logout
        </li>
      </ul>
        </div>
      )}
    </div>
  ) : (
    <button
      style={{
        padding: "10px 15px",
        backgroundColor: "red",
        color: "black",
        border: "none",
        borderRadius: "5px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s ease",
        marginLeft: "10px", // Fixed syntax
            
      }}
      onClick={openModal}
    >
      Login / Signup
    </button>
  )}
</div>


      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/car">Car List</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button"><FaSearch /></button>
          </div>
        </ul>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className={`modal-content ${modalType === "signup" ? "signup" : ""}`}>
            <FaTimes className="close-icon" onClick={closeModal} />
            <h2>{modalType === "login" ? "Login" : "Signup"}</h2>
            <form onSubmit={modalType === "login" ? handleLogin : handleSignup}>
              {modalType === "signup" && (
                <>
                  <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
                  <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
                </>
              )}
              <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
              <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
              {modalType === "signup" && (
                <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
              )}
              <button type="submit" className="auth-submit">
                {modalType === "login" ? "Login" : "Signup"}
              </button>
              <p className="switch-auth">
                {modalType === "signup" ? "Already have an account? " : "Don't have an account? "}
                <span className="auth-link" onClick={toggleModalType}>
                  {modalType === "signup" ? "Login here" : "Sign up"}
                </span>
              </p>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
