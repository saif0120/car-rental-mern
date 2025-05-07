import React, { useState, useEffect } from "react";
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope, FaPhone, FaFacebook, FaInstagram, FaLinkedin,
  FaTwitter, FaGoogle, FaSearch, FaTimes, FaUserCircle, FaCaretDown
} from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      {/* Top Bar (unchanged) */}
      <div className="top-info-bar">
        <div className="info-left">
          <span className="bold">Car Rental Portal</span>
        </div>
        <div className="info-middle">
          <FaEnvelope className="icon" /> <span className="bold">FOR SUPPORT:</span> saifali0atif@gmail.com
        </div>
        <div className="info-middle">
          <FaPhone className="icon" /> <span className="bold">HELPLINE:</span>9355653309
        </div>
        <div className="info-right social-icons">
  <a href="https://www.facebook.com/share/1AZFcfrE5e/" target="_blank" rel="noopener noreferrer">
    <FaFacebook className="social-icon" />
  </a>
  <a href="https://www.instagram.com/pixel_sa1f?igsh=MTI2am91NTF4ZjBzYw==" target="_blank" rel="noopener noreferrer">
    <FaInstagram className="social-icon" />
  </a>
  <a href="https://www.linkedin.com/in/saif-ali-7bb442239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
    <FaLinkedin className="social-icon" />
  </a>
  <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer">
    <FaTwitter className="social-icon" />
  </a>
  <a href="https://google.com" target="_blank" rel="noopener noreferrer">
    <FaGoogle className="social-icon" />
  </a>
</div>

      </div>
  
      {/* Navbar Section */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/car">Car List</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
  
        {/* Right Side: Search + Login/Profile */}
        <div className="nav-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for cars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button"><FaSearch /></button>
          </div>
  
          {isLoggedIn ? (
            <div style={{ position: "relative", marginLeft: "20px" }}>
              <div
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle />
                <span>{user?.name || "My Account"}</span>
                <FaCaretDown />
              </div>
  
              {showDropdown && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "10px",
                  background: "#ffffff",
                  color: "#333",
                  padding: "10px 0",
                  borderRadius: "12px",
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
                  minWidth: "230px",
                  zIndex: 1000,
                  transition: "all 0.3s ease-in-out",
                  opacity: "1",  // Added a smooth transition effect
                }}>
                  <ul style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    transition: "transform 0.2s ease-in-out",
                  }}>
                    {[{ path: "/my-bookings", label: "My Bookings" },
                      { path: "/profile-update", label: "Profile Update" },
                      { path: "/update-password", label: "Update Password" },
                      { path: "/test", label: "Post a Testimonial" },
                      { path: "/my-testimonials", label: "My Testimonials" },
                    ].map((item, index) => (
                      <li key={index}
                        style={{
                          padding: "12px 20px",
                          cursor: "pointer",
                          borderBottom: index !== 4 ? "1px solid #f0f0f0" : "none",
                          transition: "background-color 0.3s ease, padding-left 0.2s ease",
                          fontWeight: "500",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f5f5f5";
                          e.currentTarget.style.paddingLeft = "24px";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.paddingLeft = "20px";
                        }}
                      >
                        <Link to={item.path} style={{
                          textDecoration: "none",
                          color: "#333",
                          display: "block",
                          fontWeight: "500",
                          transition: "color 0.3s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#1f3c88"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#333"}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                    <li onClick={handleLogout}
                      style={{
                        padding: "12px 20px",
                        cursor: "pointer",
                        color: "red",
                        fontWeight: "600",
                        transition: "background-color 0.3s ease, padding-left 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffe5e5";
                        e.currentTarget.style.paddingLeft = "24px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.paddingLeft = "20px";
                      }}
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
                padding: "10px 20px",
                background: "linear-gradient(to right, #1f3c88, #00bcd4)",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                marginLeft: "20px"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";
              }}
              onClick={openModal}
            >
              Login / Signup
            </button>
          )}
        </div>
      </nav>
  
      {/* Modal */}
      {showModal && (
       <div className="modal-overlay">
       <div className={`modal-content ${modalType === "signup" ? "signup" : ""}`}>
         <FaTimes className="close-icon" onClick={closeModal} />
         <h2>{modalType === "login" ? "Welcome Back" : "Create Account"}</h2>
         <form onSubmit={modalType === "login" ? handleLogin : handleSignup}>
           {modalType === "signup" && (
             <>
               <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
               <input type="text" name="mobile" placeholder="Mobile Number" required onChange={handleChange} />
             </>
           )}
           <input type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
           
           <div className="password-field">
             <input
               type={showPassword ? "text" : "password"}
               name="password"
               placeholder="Password"
               required
               onChange={handleChange}
             />
             <span onClick={() => setShowPassword(!showPassword)}>
               {showPassword ? <FaEyeSlash /> : <FaEye />}
             </span>
           </div>
     
           {modalType === "signup" && (
             <div className="password-field">
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 name="confirmPassword"
                 placeholder="Confirm Password"
                 required
                 onChange={handleChange}
               />
               <span onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                 {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
               </span>
             </div>
           )}
     
           <button type="submit" className="auth-submit">
             {modalType === "login" ? "Login" : "Sign Up"}
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
