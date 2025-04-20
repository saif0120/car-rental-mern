import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // State to handle hover effects
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);

  const footerStyles = {
    backgroundColor: "#333",
    color: "white",
    padding: "20px 0",
    textAlign: "center",
    fontSize: "14px",
  };

  const footerContainer = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  };

  const sectionStyle = {
    flex: "1",
    minWidth: "250px",
    marginBottom: "20px",
  };

  const linkStyle = (id) => ({
    color: hoveredLink === id ? "#ffcc00" : "white",
    textDecoration: "none",
    display: "block",
    margin: "5px 0",
    transition: "color 0.3s",
  });

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    padding: "8px",
    width: "80%",
    borderRadius: "5px",
    border: "none",
    marginBottom: "10px",
    outline: "none",
  };

  const buttonStyle = {
    padding: "8px 15px",
    border: "none",
    backgroundColor: hoveredButton ? "#e6b800" : "#ffcc00",
    color: "#333",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background 0.3s, transform 0.2s",
    transform: hoveredButton ? "scale(1.05)" : "scale(1)",
  };

  const socialIcons = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    fontSize: "20px",
  };

  const socialIconStyle = (id) => ({
    color: hoveredSocial === id ? "#ffcc00" : "white",
    transition: "color 0.3s, transform 0.3s",
    transform: hoveredSocial === id ? "scale(1.2)" : "scale(1)",
  });

  return (
    <footer style={footerStyles}>
      <div style={footerContainer}>
        {/* About Section */}
        <div style={sectionStyle}>
          <h3>ABOUT US</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["about", "faq", "privacy", "terms", "admin"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item}`}
                  style={linkStyle(item)}
                  onMouseEnter={() => setHoveredLink(item)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {item.replace(/-/g, " ").toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div style={sectionStyle}>
          <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
          <form style={formStyle}>
            <input type="email" placeholder="Enter Email Address" required style={inputStyle} />
            <button
              type="submit"
              style={buttonStyle}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              Subscribe →
            </button>
          </form>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            *We send great deals and the latest auto news every week.
          </p>
        </div>

        {/* Social Media */}
        <div style={sectionStyle}>
          <p>Connect with Us:</p>
          <div style={socialIcons}>
            {[
              { id: "facebook", icon: <FaFacebookF /> },
              { id: "twitter", icon: <FaTwitter /> },
              { id: "linkedin", icon: <FaLinkedinIn /> },
              { id: "instagram", icon: <FaInstagram /> },
            ].map(({ id, icon }) => (
              <a
                key={id}
                href="#"
                style={socialIconStyle(id)}
                onMouseEnter={() => setHoveredSocial(id)}
                onMouseLeave={() => setHoveredSocial(null)}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div style={{ marginTop: "20px" }}>
        &copy; {new Date().getFullYear()} Car Rental Portal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
