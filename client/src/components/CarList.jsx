import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  useEffect(() => {
    axios
      .get("http://localhost:3200/api/cars")
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  const handleCarClick = (carId) => {
    if (!isLoggedIn) {
      navigate("/car"); // Redirect to login if not logged in
    } else {
      navigate(`/book-car/${carId}`); // Navigate to car booking page
    }
  };

  const styles = {
    carList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
      padding: "20px",
    },
    carCard: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      transition: "0.3s",
      cursor: "pointer",
      backgroundColor: "#fff",
    },
    carImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    carInfo: {
      padding: "15px",
      textAlign: "center",
    },
    carTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      color: "#333",
    },
    carPrice: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#007bff",
    },
    carMeta: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "10px",
      fontSize: "14px",
      color: "#666",
    },
    carDescription: {
      marginTop: "10px",
      fontSize: "16px",
      color: "#555",
    },
    bookNowButton: {
      marginTop: "15px",
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "0.3s",
    },
    bookNowButtonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.carList}>
      {cars.map((car) => (
        <div key={car._id} style={styles.carCard} onClick={() => handleCarClick(car._id)}>
          {car.images && car.images.length > 0 ? (
       <img
       src={`http://localhost:3200${car.images[0].startsWith("/") ? "" : "/"}${car.images[0]}`}
       alt={car.title}
       style={styles.carImage}
     />
          ) : (
            <p>No image available</p>
          )}

          <div style={styles.carInfo}>
            <h3 style={styles.carTitle}>{car.title}</h3>
            <p style={styles.carPrice}>${car.price} / Day</p>
            <div style={styles.carMeta}>
              <span>🚗 {car.fuelType}</span>
              <span>📅 {car.modelYear} Model</span>
              <span>🪑 {car.seatingCapacity} Seats</span>
            </div>
            <p style={styles.carDescription}>{car.overview}</p>
            <button
              style={styles.bookNowButton}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.bookNowButtonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.bookNowButton.backgroundColor)}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/car/${car._id}`);  // ✅ Navigate to Car Page with Car ID
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarList;
