import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [vehicleDropdown, setVehicleDropdown] = useState(false);
  const [bookingDropdown, setBookingDropdown] = useState(false);
  const [brandDropdown, setBrandDropdown] = useState(false);

  useEffect(() => {
    const savedImage = localStorage.getItem("adminProfilePic");
    if (savedImage) {
      setProfilePic(savedImage);
    }
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
    { title: "REG USERS", value: 2, color: "blue", link: "/users" },
    { title: "LISTED VEHICLES", value: 8, color: "green", link: "/vehicles" },
    { title: "TOTAL BOOKINGS", value: 1, color: "blue", link: "/bookings" },
    { title: "LISTED BRANDS", value: 6, color: "orange", link: "/brands" },
    { title: "SUBSCRIBERS", value: 2, color: "blue", link: "/subscribers" },
    { title: "QUERIES", value: 1, color: "green", link: "/queries" },
    { title: "TESTIMONIALS", value: 0, color: "blue", link: "/testimonials" },
  ];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Car Rental Portal | Admin</h2>
        <nav>
          <ul>
            <li onClick={() => navigate("/admindashboard")}>Dashboard</li>
            <li className="dropdown" onClick={() => setBrandDropdown(!brandDropdown)}>
              Brands ▼
              {brandDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => navigate("/brands")}>Manage Brands</li>
                  <li onClick={() => navigate("/add-brand")}>Add New Brand</li>
                </ul>
              )}
            </li>
            <li className="dropdown" onClick={() => setVehicleDropdown(!vehicleDropdown)}>
              Vehicles ▼
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
            <li onClick={() => navigate("/users")}>Reg Users</li>
            <li onClick={() => navigate("/")}>Log Out</li>

          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default AdminDashboard;

const styles = `
.admin-dashboard {
  display: flex;
  height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #1e1e2f, #2e2e3e);
  padding: 25px 20px;
  color: #ecf0f1;
  height: 100vh;
  position: sticky;
  top: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.sidebar h2 {
  text-align: center;
  font-size: 26px;
  color: #f1c40f;
  margin-bottom: 35px;
  letter-spacing: 1px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  font-size: 17px;
  border-radius: 8px;
  transition: background 0.3s;
  cursor: pointer;
}

.sidebar nav ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar nav ul li::before {
  content: "•";
  font-size: 20px;
  color: #f39c12;
}

/* Dropdown Menu */
.sidebar nav ul .dropdown div {
  justify-content: space-between;
}

.sidebar nav ul .dropdown-menu {
  padding-left: 25px;
  display: none;
}

.sidebar nav ul li:hover .dropdown-menu {
  display: block;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  background: linear-gradient(135deg, #3a3a60, #5f72bd);
  color: #fff;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  margin-bottom: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: all 0.3s ease;
}

.header h1 {
  font-size: 30px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.profile-label {
  font-size: 18px;
  color: #ecf0f1;
}

.profile-pic {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 12px;
  border: 2px solid #f1c40f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.profile-pic:hover {
  transform: scale(1.1);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  padding: 40px;
  color: white;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
}
`;
