import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [updatingId, setUpdatingId] = useState(null); // Track updating booking

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/bookings");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, status) => {
    const confirmAction = window.confirm(`Are you sure you want to ${status} this booking?`);
    if (!confirmAction) return;

    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:3200/api/bookings/${id}`, { status });
      alert(`Booking has been ${status}!`);

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === id ? { ...booking, status } : booking
        )
      );
    } catch (error) {
      console.error(`Error updating booking status to ${status}:`, error);
      alert("Failed to update booking status. Please try again.");
    }
    setUpdatingId(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return { background: "yellow", color: "black", padding: "5px", borderRadius: "5px" };
      case "confirmed":
        return { background: "green", color: "white", padding: "5px", borderRadius: "5px" };
      case "cancelled":
        return { background: "red", color: "white", padding: "5px", borderRadius: "5px" };
      default:
        return {};
    }
  };

  const styles = {
    layout: { display: "flex", minHeight: "100vh" },
    content: { flex: 1, padding: "20px", fontFamily: "Arial, sans-serif" },
    heading: { textAlign: "center", marginBottom: "20px", fontSize: "24px", color: "#333" },
    table: { width: "100%", borderCollapse: "collapse", marginTop: "10px", background: "#fff" },
    th: { background: "#007bff", color: "white", padding: "10px", border: "1px solid #ddd", textAlign: "left" },
    td: { padding: "10px", border: "1px solid #ddd", textAlign: "left" },
    button: { padding: "5px 10px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "5px" },
    confirmButton: { background: "green", color: "white" },
    cancelButton: { background: "red", color: "white" },
    disabledButton: { opacity: 0.5, cursor: "not-allowed" },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.content}>
        <h2 style={styles.heading}>All Bookings</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Car</th>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>
                    {booking.carId ? `${booking.carId.brand}, ${booking.carId.title}` : "Unknown Car"}
                  </td>
                  <td style={styles.td}>
                    {booking.userId ? booking.userId.name : "Unknown User"}
                  </td>
                  <td style={styles.td}>
                    {new Date(booking.fromDate).toLocaleDateString()} -{" "}
                    {new Date(booking.toDate).toLocaleDateString()}
                  </td>
                  <td style={{ ...styles.td, ...getStatusStyle(booking.status) }}>
                    {booking.status}
                  </td>
                  <td style={styles.td}>
                    {booking.status === "pending" && (
                      <>
                        <button
                          style={{
                            ...styles.button,
                            ...styles.confirmButton,
                            ...(updatingId === booking._id ? styles.disabledButton : {}),
                          }}
                          onClick={() => updateBookingStatus(booking._id, "confirmed")}
                          disabled={updatingId === booking._id}
                        >
                          {updatingId === booking._id ? "Updating..." : "Confirm"}
                        </button>
                        <button
                          style={{
                            ...styles.button,
                            ...styles.cancelButton,
                            ...(updatingId === booking._id ? styles.disabledButton : {}),
                          }}
                          onClick={() => updateBookingStatus(booking._id, "cancelled")}
                          disabled={updatingId === booking._id}
                        >
                          {updatingId === booking._id ? "Updating..." : "Cancel"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={styles.td}>No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
