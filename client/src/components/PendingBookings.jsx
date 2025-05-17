import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const PendingBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);

        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchPendingBookings();
  }, []);

  // Function to update booking status (confirm or cancel)
  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:3200/api/bookings/${id}`, { status });
      alert(`Booking has been ${status}!`);

      // Refresh bookings after update
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
      alert("Failed to update booking status. Please try again.");
    }
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
    },
    sidebar: {
      width: "250px",
      background: "#333",
      color: "white",
      padding: "20px",
      minHeight: "100vh",
    },
    content: {
      flex: 1,
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      background: "#fff",
    },
    th: {
      background: "#007bff",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    pending: {
      background: "yellow",
      padding: "5px",
      borderRadius: "5px",
    },
    button: {
      padding: "5px 10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginRight: "5px",
    },
    confirmButton: {
      background: "green",
      color: "white",
    },
    cancelButton: {
      background: "red",
      color: "white",
    },
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar Component */}
      <Sidebar style={styles.sidebar} />

      {/* Main Content */}
      <div style={styles.content}>
        <h2 style={styles.heading}>Pending Bookings</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Car</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td style={styles.td}>{booking.carName}</td>
                  <td style={styles.td}>{booking.userName}</td>
                  <td style={styles.td}>{new Date(booking.date).toLocaleDateString()}</td>
                  <td style={{ ...styles.td, ...styles.pending }}>Pending</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, ...styles.confirmButton }}
                      onClick={() => updateBookingStatus(booking._id, "confirmed")}
                    >
                      Confirm
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.cancelButton }}
                      onClick={() => updateBookingStatus(booking._id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={styles.td}>No pending bookings</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingBookings;
