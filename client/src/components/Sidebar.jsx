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
            <li onClick={() => navigate("/queries")}>Manage Queries</li>
            <li onClick={() => navigate("/users")}>Reg Users</li>
            <li onClick={() => navigate("/pages")}>Manage Pages</li>
            <li onClick={() => navigate("/contact-info")}>Update Contact Info</li>
            <li onClick={() => navigate("/subscribers")}>Manage Subscribers</li>
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

.sidebar {
  width: 250px;
  background-color: #1a202c;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.sidebar h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.sidebar nav ul {
  list-style-type: none;
  padding: 0;
}

.sidebar nav ul li {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.sidebar nav ul li:hover {
  background: #2d3748;
}

.main-content {
  flex: 1;
  padding: 20px;
  background: #f3f4f6;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2d3748;
  color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
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
