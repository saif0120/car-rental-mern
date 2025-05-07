import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManageVehicles.css";

const ManageVehicles = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [brandDropdown, setBrandDropdown] = useState(false);
  const [vehicleDropdown, setVehicleDropdown] = useState(false);
  const [bookingDropdown, setBookingDropdown] = useState(false);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/cars");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();
  }, []);

  // Handle vehicle deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        await axios.delete(`http://localhost:3200/api/car/${id}`);
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== id));
      } catch (error) {
        console.error("Error deleting vehicle:", error);
      }
    }
  };

  return (
    <div className="manage-vehicles-container">
      <aside className="sidebar">
        <h2>Car Rental Portal | Admin Panel</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/admindashboard")}>Dashboard</li>

            <li className="dropdown">
              <div onClick={() => setBrandDropdown(!brandDropdown)}>Brands ▼</div>
              {brandDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/brands")}>Manage Brands</li>
                  <li onClick={() => navigate("/add-brand")}>Add New Brand</li>
                </ul>
              )}
            </li>

            <li className="dropdown">
              <div onClick={() => setVehicleDropdown(!vehicleDropdown)}>Vehicles ▼</div>
              {vehicleDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/vehicles")}>Manage Vehicles</li>
                  <li onClick={() => navigate("/postvehicle")}>Post New Vehicle</li>
                </ul>
              )}
            </li>

            <li onClick={() => navigate("/bookings")}>
              Bookings
            </li>

            <li onClick={() => navigate("/testimonials")}>Manage Testimonials</li>
            <li onClick={() => navigate("/queries")}>Manage Queries</li>
            <li onClick={() => navigate("/users")}>Reg Users</li>
            <li onClick={() => navigate("/pages")}>Manage Pages</li>
            <li onClick={() => navigate("/contact-info")}>Update Contact Info</li>
            <li onClick={() => navigate("/subscribers")}>Manage Subscribers</li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Manage Vehicles</h1>
          <div className="account">Account</div>
        </header>

        <section className="vehicle-table-section">
          <h3>Vehicle Details</h3>
          <table className="vehicle-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Vehicle Title</th>
                <th>Brand</th>
                <th>Price Per Day</th>
                <th>Fuel Type</th>
                <th>Model Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle._id}>
                  <td>{index + 1}</td>
                  <td>{vehicle.title}</td>
                  <td>{vehicle.brand}</td>
                  <td>${vehicle.price}</td>
                  <td>{vehicle.fuelType}</td>
                  <td>{vehicle.modelYear}</td>
                  <td>
                  <button className="edit-button" onClick={() => navigate(`/editvehicle/${vehicle._id}`)}>✏️</button>

                    <button className="delete-button" onClick={() => handleDelete(vehicle._id)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default ManageVehicles;
