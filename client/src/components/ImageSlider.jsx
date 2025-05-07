import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PEXELS_API_KEY = 'RmtyYG8dbB7L6IWuzm5gI7OxtajN0UKYJeGGCoDiUa7p5UWak1FLEWFY';

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("BMW");

  const fetchImages = (query) => {
    axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
      headers: { Authorization: PEXELS_API_KEY }
    }).then(res => {
      setImages(res.data.photos);
    }).catch(err => {
      console.error("Error fetching images:", err);
    });
  };

  useEffect(() => {
    fetchImages(brand);
  }, [brand]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    pauseOnHover: false,
    prevArrow: <div className="custom-prev-arrow">←</div>,
    nextArrow: <div className="custom-next-arrow">→</div>,
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    gap: '15px',
    flexWrap: 'wrap',
  };

  const buttonStyle = (active) => ({
    padding: '12px 25px',
    backgroundColor: active ? '#1a1a1a' : '#333',
    color: active ? '#fff' : '#d3d3d3',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: active ? '0 0 15px rgba(255, 165, 0, 0.5)' : 'none',
  });

  const brands = ['BMW', 'Cars', 'Audi', 'Mercedes'];

  return (
    <div style={{ width: '100%', padding: '30px 0', backgroundColor: '#fff' }}>
      <div style={buttonGroupStyle}>
        {brands.map((brandName) => (
          <button
            key={brandName}
            style={buttonStyle(brand === brandName)}
            onClick={() => setBrand(brandName)}
            className="brand-btn"
          >
            {brandName}
          </button>
        ))}
      </div>

      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img.src.landscape}
              alt={img.photographer}
              style={{
                width: '100%',
                height: '600px',
                objectFit: 'cover',
                borderRadius: '0px',
              }}
              className="slider-img"
            />
          </div>
        ))}
      </Slider>

      <style>{`
        .custom-prev-arrow, .custom-next-arrow {
          font-size: 30px;
          font-weight: bold;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.7);
          padding: 15px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          position: absolute;
          top: 50%;
          z-index: 1;
        }

        .custom-prev-arrow:hover, .custom-next-arrow:hover {
          background-color: #ff7f50;
        }

        .custom-prev-arrow {
          left: 25px;
        }

        .custom-next-arrow {
          right: 25px;
        }

        .slider-img:hover {
          transform: scale(1.03);
          transition: transform 0.5s ease;
        }

        .brand-btn:hover {
          background-color: #ff7f50;
          color: white;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 165, 0, 0.8);
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;
