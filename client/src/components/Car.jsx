import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Car = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedFuel, setSelectedFuel] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3200/api/car").then((res) => setCars(res.data));
    axios.get("http://localhost:3200/api/brands").then((res) => setBrands(res.data));
    axios.get("http://localhost:3200/api/fuelTypes").then((res) => setFuelTypes(res.data));
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      (!selectedBrand || car.brand === selectedBrand) &&
      (!selectedFuel || car.fuelType === selectedFuel)
  );

  return (
    <>
      <Header />

      {/* Banner Section */}
      <div style={styles.banner}>
        <h2>Explore Our Car Rentals</h2>
        <p>Home &gt; Cars</p>
      </div>

      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Find Your Car</h2>
          <select
            style={styles.select}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>{brand.name}</option>
            ))}
          </select>

          <select
            style={styles.select}
            onChange={(e) => setSelectedFuel(e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map((fuel, index) => (
              <option key={index} value={fuel}>{fuel}</option>
            ))}
          </select>

          <button style={styles.searchButton}>Search Car</button>

          {/* Recently Listed Cars */}
          <div style={styles.recentCars}>
            <h3 style={styles.recentTitle}>🚗 Recently Listed Cars</h3>
            {cars.slice(0, 4).map((car) => (
              <div key={car._id} style={styles.recentCarItem}>
                <img
                  src={`http://localhost:3200${car.images[0].startsWith("/") ? "" : "/"}${car.images[0]}`}
                  alt={car.title}
                  style={styles.recentCarImage}
                />
                <div>
                  <h4 style={styles.recentCarTitle}>{car.brand} , {car.title}</h4>
                  <p style={styles.recentCarPrice}>${car.price} Per Day</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Car Listings */}
        <div style={styles.carList}>
          {filteredCars.map((car) => (
            <div key={car._id} style={styles.carCard}>
              <img
                src={`http://localhost:3200${car.images[0].startsWith("/") ? "" : "/"}${car.images[0]}`}
                alt={car.title}
                style={styles.carImage}
              />
              <h3 style={styles.carTitle}>{car.title}</h3>
              <p style={styles.carPrice}>${car.price} Per Day</p>
              <div style={styles.carDetails}>
                <span>🚗 {car.fuelType}</span>
                <span>📅 {car.modelYear} Model</span>
                <span>🪑 {car.seatingCapacity} Seats</span>
              </div>
              <button
                style={styles.viewButton}
                onClick={() => navigate(`/car/${car._id}`)}
              >
                View Details ➜
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

// Styling Object
const styles = {
  banner: {
    width: "100%",
    textAlign: "center",
    padding: "50px 20px",
    color: "white",
    backgroundImage: "url('https://4kwallpapers.com/images/walls/thumbs_2t/1003.jpg')",
    backgroundSize: "cover",
  },
  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: "20px",
  },
  sidebar: {
    background: "#f3f3f3",
    padding: "20px",
    borderRadius: "10px",
  },
  sidebarTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  searchButton: {
    width: "100%",
    background: "#e60000",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
  },
  recentCars: {
    marginTop: "20px",
    padding: "15px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  recentTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  recentCarItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    background: "#f8f8f8",
  },
  recentCarImage: {
    width: "60px",
    height: "40px",
    objectFit: "cover",
    borderRadius: "5px",
  },
  recentCarTitle: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  recentCarPrice: {
    fontSize: "12px",
    color: "#777",
  },
  carList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  carCard: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  carImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  carTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  carPrice: {
    color: "#e60000",
    fontWeight: "bold",
  },
  carDetails: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#666",
    marginTop: "10px",
  },
  viewButton: {
    width: "100%",
    background: "#e60000",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default Car;
