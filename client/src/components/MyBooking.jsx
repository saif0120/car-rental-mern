import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);


        console.log("API Response:", response.data);
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", width: "100%", background: "#f9f9f9" }}>
      <Header />

      {/* ✅ Banner Section */}
      <div style={styles.banner}>
        <h1>My Bookings</h1>
      </div>

      {/* Sidebar + Content Wrapper */}
      <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
        
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              { path: "/my-bookings", label: "My Bookings" },
              { path: "/profile-update", label: "Profile Update" },
              { path: "/update-password", label: "Update Password" },
              { path: "/test", label: "Post a Testimonial" },
              { path: "/my-testimonials", label: "My Testimonials" }
            ].map((item, index) => (
              <li key={index} style={styles.sidebarItem}>
                <Link to={item.path} style={styles.sidebarLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Booking Content */}
        <div style={styles.content}>
          <h2 style={styles.heading}>MY BOOKINGS</h2>

          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div key={index} style={styles.bookingCard}>
                
                {/* Car Image */}
                <img
                  src={booking.images?.length > 0
                    ? `http://localhost:3200${booking.images[0].startsWith("/") ? "" : "/"}${booking.images[0]}`
                    : "/placeholder.jpg"}
                  alt="Car"
                  style={styles.carImage}
                />

                {/* Booking Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={styles.carTitle}>{booking.carId?.title || "Unknown Car"}</h3>
                  <p style={styles.bookingText}>From: {new Date(booking.fromDate).toLocaleDateString()}</p>
                  <p style={styles.bookingText}>To: {new Date(booking.toDate).toLocaleDateString()}</p>
                  <p style={styles.messageText}>Message: {booking.message}</p>
                </div>

                {/* Status Indicator */}
                <div
                  style={{
                    ...styles.statusBadge,
                    borderColor: booking.status?.toLowerCase() === "confirmed" ? "green" : "red",
                    color: booking.status?.toLowerCase() === "confirmed" ? "green" : "red",
                  }}
                >
                  {booking.status || "Pending"}
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noBookings}>No bookings found.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ✅ Centralized styles
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
  content: {
    flex: 1,
    padding: "20px",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textDecoration: "underline",
    textAlign: "center",
    color: "#333",
  },
  bookingCard: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #ddd",
    gap: "20px",
  },
  carImage: {
    width: "120px",
    height: "80px",
    borderRadius: "8px",
    objectFit: "cover",
    border: "1px solid #ddd",
  },
  carTitle: {
    margin: "0 0 5px 0",
    color: "#007bff",
  },
  bookingText: {
    margin: "5px 0",
    color: "#555",
  },
  messageText: {
    margin: "5px 0",
    fontStyle: "italic",
    color: "#666",
  },
  statusBadge: {
    padding: "8px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    border: "2px solid",
    textTransform: "uppercase",
  },
  noBookings: {
    textAlign: "center",
    color: "#888",
    marginTop: "20px",
  },
};

export default MyBookings;
