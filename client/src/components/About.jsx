import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Importing Header component
import Footer from "./Footer"; // Importing Footer component

const About = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundImage: "url('/car image.avif')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      padding: "20px",
    },
    contentWrapper: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      maxWidth: "700px",
      width: "100%",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "15px",
      color: "#333",
    },
    text: {
      fontSize: "18px",
      lineHeight: "1.6",
      color: "#444",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <>
      <Header /> {/* Adding Header Component */}

      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <h2 style={styles.heading}>About Our Car Rental Service</h2>
          <p style={styles.text}>
            Welcome to our premier car rental service! We provide top-quality, affordable, and reliable vehicles to make your journey smooth and enjoyable. Whether you need a car for a business trip, vacation, or daily commute, we have the perfect ride for you.
          </p>
          <p style={styles.text}>
            Our easy booking process, flexible rental plans, and exceptional customer support set us apart. Choose from a wide range of cars and enjoy a hassle-free rental experience!
          </p>

          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>

      <Footer /> {/* Adding Footer Component */}
    </>
  );
};

export default About;
