import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CarList from "./CarList";
import SatisfiedCustomers  from "./SatisfiedCustomers ";

// import mustangImage from "../assets/images/mustang-mainimg.jpg"; // Ensure correct path

const Home = () => {
  console.log("Footer Component Loaded"); // Debugging

  return (
    <div className="container">
      <Header />

      {/* Main Content */}
      <img src="/mustang-mainimg.jpg" alt="Mustang" className="car-main-image" />

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Find the <span className="text-black">Best</span>
          <span className="text-gray-500"> Car For You</span>
        </h1>
        <p className="hero-text">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
      </div>
       <CarList></CarList>
       <SatisfiedCustomers></SatisfiedCustomers>
      <Footer />
    </div>
  );
};

export default Home;
