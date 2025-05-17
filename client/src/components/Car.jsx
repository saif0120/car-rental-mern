import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import carAnimation from "../assets/car-animation.json";
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
    const fetchData = async () => {
      try {
        const [carRes, brandRes, fuelRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`),
        ]);
        setCars(carRes.data);
        setBrands(brandRes.data);
        setFuelTypes(fuelRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      (!selectedBrand || car.brand === selectedBrand) &&
      (!selectedFuel || car.fuelType === selectedFuel)
  );

  return (
    <>
      <Header />

      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerContent}>
          <div style={styles.textContainer}>
            <h2 style={styles.bannerTitle}>Explore Our Car Rentals</h2>
            <p style={styles.breadcrumb}>Home &gt; Cars</p>
          </div>
          <div style={styles.animationContainer}>
            <Lottie animationData={carAnimation} loop />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={styles.container}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Find Your Car</h2>

          <select
            style={styles.select}
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>

          <select
            style={styles.select}
            value={selectedFuel}
            onChange={(e) => setSelectedFuel(e.target.value)}
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map((fuel, index) => (
              <option key={index} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>

          {/* Recently Listed Cars */}
          <div style={styles.recentCars}>
            <h3 style={styles.recentTitle}>Recently Listed Cars</h3>
            {cars.slice(0, 4).map((car) => (
              <div key={car._id} style={styles.recentCarItem}>
                <img
                  src={
                    car.images?.[0]
                      ? `http://localhost:3200${car.images[0].startsWith("/") ? "" : "/"}${car.images[0]}`
                      : "https://via.placeholder.com/200x120?text=No+Image"
                  }
                  alt={car.title || "Car"}
                  style={styles.recentCarImage}
                />
                <div>
                  <h4 style={styles.recentCarTitle}>{car.brand}, {car.title}</h4>
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
                src={
                  car.images?.[0]
                    ? `http://localhost:3200${car.images[0].startsWith("/") ? "" : "/"}${car.images[0]}`
                    : "https://via.placeholder.com/200x120?text=No+Image"
                }
                alt={car.title}
                style={styles.carImage}
              />
              <h3 style={styles.carTitle}>{car.title}</h3>
              <p style={styles.carPrice}>${car.price} Per Day</p>
              <div style={styles.carDetails}>
                <span> {car.fuelType}</span>
                <span>📅 {car.modelYear}</span>
                <span> {car.seatingCapacity} Seats</span>
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

// Styles (unchanged, but grouped cleanly)
const styles = {
  banner: {
    width: "100%",
    background: "linear-gradient(to right, #007BFF, #0056b3)",
    padding: "40px 20px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1200px",
    width: "100%",
    gap: "30px",
  },
  textContainer: { flex: 1 },
  bannerTitle: { fontSize: "36px", fontWeight: "bold", marginBottom: "10px" },
  breadcrumb: { fontSize: "16px", color: "#e0e0e0" },
  animationContainer: { flex: 1, maxWidth: "400px" },

  container: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "30px 20px",
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    gap: "30px",
  },

  sidebar: {
    background: "#E0EFFF",
    padding: "25px",
    borderRadius: "15px",
    color: "#0F172A",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  sidebarTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#007BFF",
  },
  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
    color: "#0F172A",
  },

  recentCars: {
    marginTop: "30px",
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "10px",
  },
  recentTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#007BFF",
  },
  recentCarItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    background: "#fff",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
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
    color: "#0F172A",
  },
  recentCarPrice: {
    fontSize: "13px",
    color: "#64748b",
  },

  carList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "25px",
  },
  carCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "15px",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  carImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  carTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginTop: "10px",
    color: "#0F172A",
  },
  carPrice: {
    color: "#007BFF",
    fontWeight: "600",
    fontSize: "16px",
  },
  carDetails: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#475569",
    marginTop: "10px",
  },
  viewButton: {
    width: "100%",
    background: "#007BFF",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
    fontWeight: "bold",
    transition: "background 0.3s ease",
  },
};

export default Car;
