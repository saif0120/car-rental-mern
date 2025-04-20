import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("/my-bookings");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user-profile", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const errorData = await response.json();
          console.error("Session expired:", errorData.message);
          navigate("/login"); // ✅ Redirect user if session expired
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate("/userprofile"); // ✅ Redirect user on error
      }
    };
  
    fetchUserData();
  }, [navigate]);
    
  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
    navigate("/");
  };
  
  const handleSectionClick = (section) => {
    setActiveSection(section);
    navigate(section);
  };

  return (
    <>
      <Header /> {/* ✅ Header Added */}

      <div style={styles.container}>
        {/* User Dropdown */}
        <div className="user-profile">
          <div className="user-info" onClick={() => setShowDropdown(!showDropdown)}>
            <FaUserCircle className="user-icon" />
            <span className="username">{user?.name || "My Account"}</span>
            <FaCaretDown className="dropdown-icon" />
          </div>
          {showDropdown && (
            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
              <ul>
              <li onClick={() => navigate("/profile-update")}>Profile Update</li>

                <li onClick={() => navigate("/my-bookings")}>My Bookings</li>
                <li onClick={() => navigate("/userprofile")}>User Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>

        {/* Page Banner */}
        <div style={styles.banner}>
          <h2>My Booking</h2>
          <p>Home &gt; My Booking</p>
        </div>

        {/* Profile Section */}
        <div style={styles.profileContainer}>
          <div style={styles.sidebar}>
            <ul style={styles.sidebarUl}>
              <li
                style={activeSection === "/update-password" ? styles.sidebarLiHover : styles.sidebarLi}
                onClick={() => handleSectionClick("/update-password")}
              >
                Update Password
              </li>
              <li
                style={activeSection === "/my-bookings" ? styles.sidebarLiHover : styles.sidebarLi}
                onClick={() => handleSectionClick("/my-bookings")}
              >
                My Booking
              </li>
              <li
                style={activeSection === "/post-testimonial" ? styles.sidebarLiHover : styles.sidebarLi}
                onClick={() => handleSectionClick("/post-testimonial")}
              >
                Post a Testimonial
              </li>
              <li
                style={activeSection === "/my-testimonials" ? styles.sidebarLiHover : styles.sidebarLi}
                onClick={() => handleSectionClick("/my-testimonials")}
              >
                My Testimonials
              </li>
              <li
                style={activeSection === "/" ? { ...styles.sidebarLiHover, ...styles.logoutBtn } : styles.logoutBtn}
                onClick={handleLogout}
              >
                Sign Out
              </li>
            </ul>
          </div>

          {/* Booking Details */}
          <div style={styles.profileDetails}>
            {user ? (
              <>
                <div style={styles.profileCard}>
                  <img src="https://via.placeholder.com/100" alt="User" style={styles.profileImg} />
                  <h3>{user.name}</h3>
                </div>

                <h2 style={styles.bookingHeader}>MY BOOKINGS</h2>

                {user?.bookings?.length > 0 ? (
                  user.bookings.map((booking, index) => (
                    <div key={index}>
                      <p style={styles.bookingNumber}>
                        Booking No <span style={{ color: "red" }}>#{booking.bookingId}</span>
                      </p>
                      <div style={styles.bookingInfo}>
                        <img src={booking.carImage} alt="Car" style={styles.carImg} />
                        <div>
                          <h3>{booking.carName}</h3>
                          <p><strong>From:</strong> {booking.fromDate} To {booking.toDate}</p>
                          <p><strong>Message:</strong> {booking.message}</p>
                        </div>
                        <span style={styles.confirmed}>Confirmed</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "1.2rem", color: "gray" }}>You have no bookings yet.</p>
                )}
              </>
            ) : (
              <p>Loading user details...</p>
            )}
          </div>
        </div>
      </div>

      <Footer /> {/* ✅ Footer Added */}
    </>
  );
};

// Styles
const styles = {
  container: { fontFamily: "Arial, sans-serif", width: "100%" },

  banner: {
    width: "100%",
    textAlign: "center",
    padding: "50px 20px",
    color: "white",
    backgroundImage: "url('https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  profileContainer: { display: "flex", width: "80%", margin: "20px auto" },
  sidebar: { width: "25%", background: "#f4f4f4", padding: "20px" },
  profileDetails: { width: "75%", padding: "20px", background: "white" },
  profileImg: { width: "50px", height: "50px", borderRadius: "50%" },

  // Sidebar Styles
  sidebarUl: { listStyle: "none", padding: 0, margin: "20px" },

  sidebarLi: {
    padding: "12px 16px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background 0.3s ease-in-out, transform 0.2s",
    marginBottom: "10px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
  },

  sidebarLiHover: {
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "10px",
    padding: "12px 16px",
    transform: "translateX(5px)",
  },

  activeNavItem: {
    backgroundColor: "#007bff",
    color: "white",
    marginTop: "10px",
    fontWeight: "bold",
    borderRadius: "5px",
    padding: "12px 16px",
  },

  logoutBtn: {
    color: "red",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "30px",
    padding: "12px 16px",
    display: "block",
  },
};

export default UserProfile;











