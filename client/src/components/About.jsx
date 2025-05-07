import React, { useState } from "react";
import Slider from "react-slick";
import Header from "./Header";
import Footer from "./Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const testimonials = [
    { name: "John Doe", review: "Great service! The car was clean and well-maintained." },
    { name: "Sarah Smith", review: "Affordable pricing and excellent customer support!" },
    { name: "Mike Johnson", review: "Smooth booking process, highly recommend Speedy Rentals!" },
  ];

  const imageCarousel = [
    "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Header />

      <div style={darkMode ? styles.darkContainer : styles.container}>
        {/* Header Section with Dark Mode Button */}
        <div style={styles.headerSection}>
          <h1 style={styles.heading}>About Us</h1>
          <button onClick={toggleDarkMode} style={styles.toggleBtn}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Animated Car Banner */}
        <div style={styles.bannerContainer}>
          <div style={styles.carAnimation}></div>
        </div>

        {/* Description Section */}
        <div style={styles.content}>
          <p style={styles.text}>
            Welcome to <strong>Speedy Rentals</strong>, your trusted car rental service. 
            We provide a seamless and affordable way to rent a car for your travel needs.
          </p>
          <p style={styles.text}>
            Whether you're looking for a luxury ride, an economy car, or a family-friendly SUV,
            we have a wide range of vehicles to suit your preferences.
          </p>
        </div>

        {/* Image Carousel */}
        <Slider {...settings} style={styles.carousel}>
          {imageCarousel.map((img, index) => (
            <div key={index}>
              <img src={img} alt="Car" style={styles.image} />
            </div>
          ))}
        </Slider>

        {/* Testimonials */}
        <h2 style={styles.heading}>What Our Customers Say</h2>
        <Slider {...settings} style={styles.testimonialCarousel}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonial}>
              <p>"{testimonial.review}"</p>
              <h4>- {testimonial.name}</h4>
            </div>
          ))}
        </Slider>

        {/* Contact & Social Links */}
        <div style={styles.contactContainer}>
          <h2 style={styles.heading}>Contact Us</h2>
          <p>Email: saifali0atif@gmail.com</p>
          <p>Phone: 9355653309 </p>
          <div>
            <a href="https://www.facebook.com/share/1AZFcfrE5e/" style={styles.socialLink}>📘 Facebook</a> |
            <a href="https://www.instagram.com/pixel_sa1f?igsh=MTI2am91NTF4ZjBzYw==" style={styles.socialLink}> 📸 Instagram</a> |
            <a href="#" style={styles.socialLink}> 🟢 WhatsApp</a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "50px", backgroundColor: "#f8f9fa" },
  darkContainer: { textAlign: "center", padding: "50px", backgroundColor: "#222", color: "#fff" },
  headerSection: { display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "800px", margin: "auto" },
  heading: { fontSize: "2rem", marginBottom: "20px" },
  toggleBtn: {
    padding: "10px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  },
  text: { fontSize: "1.1rem", lineHeight: "1.6", maxWidth: "600px", margin: "0 auto" },
  bannerContainer: { position: "relative", height: "150px", overflow: "hidden" },
  carAnimation: {
    width: "100px",
    height: "50px",
    background: "red",
    position: "absolute",
    bottom: "10px",
    left: "-100px",
    animation: "moveCar 5s linear infinite",
  },
  "@keyframes moveCar": { "0%": { left: "-100px" }, "100%": { left: "100%" } },
  carousel: { marginTop: "20px", maxWidth: "600px", margin: "auto" },
  image: { width: "100%", borderRadius: "10px" },
  testimonialCarousel: { marginTop: "20px", maxWidth: "600px", margin: "auto" },
  testimonial: { backgroundColor: "#eee", padding: "20px", borderRadius: "10px" },
  contactContainer: { marginTop: "40px" },
  socialLink: { textDecoration: "none", margin: "0 10px", color: "#007bff", fontWeight: "bold" },
};

export default AboutUs;
