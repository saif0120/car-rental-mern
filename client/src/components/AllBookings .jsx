import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./AllBookings.css"; // Add CSS for styling

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

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
    if (!window.confirm(`Are you sure you want to ${status} this booking?`)) return;
    setUpdatingId(id);
    try {
      await axios.put(`http://localhost:3200/api/bookings/${id}`, { status });
      alert(`Booking has been ${status}!`);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (error) {
      alert("Failed to update booking status.");
      console.error(error);
    }
    setUpdatingId(null);
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div
        className="admin-content bookings-background"
      >
        <h2 className="bookings-heading">📋 All Bookings</h2>
        <div className="bookings-table-wrapper">
          {bookings.length > 0 ? (
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car</th>
                  <th>User</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>
                      <strong>{booking.carId?.brand || "Unknown"}</strong>
                      <br />
                      {booking.carId?.title || "Car"}
                    </td>
                    <td>{booking.userId?.name || "Unknown User"}</td>
                    <td>
                      {new Date(booking.fromDate).toLocaleDateString()} -{" "}
                      {new Date(booking.toDate).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`status-badge ${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      {booking.status === "pending" && (
                        <>
                          <button
                            className="btn confirm"
                            onClick={() =>
                              updateBookingStatus(booking._id, "confirmed")
                            }
                            disabled={updatingId === booking._id}
                          >
                            {updatingId === booking._id
                              ? "Updating..."
                              : "✔ Confirm"}
                          </button>
                          <button
                            className="btn cancel"
                            onClick={() =>
                              updateBookingStatus(booking._id, "cancelled")
                            }
                            disabled={updatingId === booking._id}
                          >
                            {updatingId === booking._id
                              ? "Updating..."
                              : "✖ Cancel"}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-bookings">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};  

export default AllBookings;
