import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./Header";
import Footer from "./Footer";
import CarList from "./CarList";

import Imageslider from "./ImageSlider";
import SatisfiedCustomers from "./SatisfiedCustomers ";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="container">
      <Header />
      <Imageslider />

      {/* Inline CSS */}
      <style>
        {`
        .hero-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          height: 60vh;
          padding: 40px 20px;
          background: linear-gradient(135deg,rgb(10, 38, 49), #4682b4);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          transition: transform 0.3s ease;
        }

        .hero-section:hover {
          transform: scale(1.02);
        }

        .hero-title {
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 15px;
          color: #fff;
          text-transform: uppercase;
          line-height: 1.3;
        }

        .hero-title .text-black {
          color: #000;
        }

        .hero-text {
          font-size: 1.1rem;
          font-weight: 400;
          max-width: 700px;
          line-height: 1.6;
          margin-top: 15px;
          color: #f1f1f1;
          padding: 0 20px;
        }

        .hero-button {
          padding: 12px 30px;
          background-color: #0056b3;
          border: none;
          border-radius: 30px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s ease, transform 0.3s ease;
          margin-top: 30px;
        }

        .hero-button:hover {
          background-color: #f1c40f;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-text {
            font-size: 1rem;
            max-width: 90%;
          }
          .hero-button {
            font-size: 0.9rem;
          }
        }
      `}
      </style>

      {/* Hero Section with AOS */}
      <div className="hero-section" data-aos="fade-up">
        <h1 className="hero-title" data-aos="fade-down">
          Find the <span className="text-black">Best</span>
          <span className="text-gray-500"> Car For You</span>
        </h1>
        <p className="hero-text" data-aos="fade-up" data-aos-delay="200">
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </p>
        <button className="hero-button" data-aos="zoom-in" data-aos-delay="400">
          Explore Now
        </button>
      </div>

      <div data-aos="fade-up">
        <CarList />
      </div>

      <div data-aos="fade-up" data-aos-delay="300">
       <SatisfiedCustomers></SatisfiedCustomers>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
