import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [vehicleDropdown, setVehicleDropdown] = useState(false);
  const [bookingDropdown, setBookingDropdown] = useState(false);
  const [brandDropdown, setBrandDropdown] = useState(false);

  const [statsData, setStatsData] = useState({
    regUsers: 0,
    vehicles: 0,
    bookings: 0,
    brands: 0,
    subscribers: 0,
    queries: 0,
    testimonials: 0,
  });

  useEffect(() => {
    const savedImage = localStorage.getItem("adminProfilePic");
    if (savedImage) {
      setProfilePic(savedImage);
    }

    fetch("http://localhost:3200/api/dashboard-stats", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setStatsData(data))
      .catch((err) => console.error("Error fetching dashboard stats:", err));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        localStorage.setItem("adminProfilePic", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { title: "REG USERS", value: statsData.regUsers, color: "blue", link: "/users" },
    { title: "LISTED VEHICLES", value: statsData.vehicles, color: "green", link: "/vehicles" },
    { title: "TOTAL BOOKINGS", value: statsData.bookings, color: "blue", link: "/bookings" },
    { title: "LISTED BRANDS", value: statsData.brands, color: "orange", link: "/brands" },
    { title: "TESTIMONIALS", value: statsData.testimonials, color: "blue", link: "/testimonials" },
  ];

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Car Rental Portal | Admin</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/admindashboard")}>Dashboard</li>

            {/* Brands Dropdown */}
            <li className="dropdown">
              <div onClick={() => setBrandDropdown(!brandDropdown)}>Brands ▼</div>
              {brandDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/brands")}>Manage Brands</li>
                  <li onClick={() => navigate("/add-brand")}>Add New Brand</li>
                </ul>
              )}
            </li>

            {/* Vehicles Dropdown */}
            <li className="dropdown">
              <div onClick={() => setVehicleDropdown(!vehicleDropdown)}>Vehicles ▼</div>
              {vehicleDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/vehicles")}>Manage Vehicles</li>
                  <li onClick={() => navigate("/postvehicle")}>Post New Vehicle</li>
                </ul>
              )}
            </li>

            {/* Bookings */}
            <li onClick={() => navigate("/bookings")}>Bookings</li>
            <li onClick={() => navigate("/testimonials")}>Manage Testimonials</li>
            <li onClick={() => navigate("/users")}>Reg Users</li>
            <li onClick={() => navigate("/")}>Log Out</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
  <h1>Dashboard</h1>
  <div className="account">
    <label htmlFor="profile-upload" className="profile-label">
      <span class="admin" >Admin</span>
      <div className="profile-pic">
        {profilePic ? (
          <img src={profilePic} alt="Admin" className="profile-img" />
        ) : (
          <span className="placeholder">+</span>
        )}
      </div>
    </label>
    <input
      type="file"
      id="profile-upload"
      accept="image/*"
      onChange={handleImageUpload}
      style={{ display: "none" }}
    />
  </div>
</header>


        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${stat.color}`}
              onClick={() => navigate(stat.link)}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-title">{stat.title}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
