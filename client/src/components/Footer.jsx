import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "./Footer.css"; // Import external CSS

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section">
          <h3>ABOUT US</h3>
          <ul>
            {["about", "faq","admin"].map((item, index) => (
              <li key={index}>
                <a
                  href={`/${item}`}
                  className={hoveredLink === item ? "hovered-link" : ""}
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
        <div className="footer-section">
          <h3>SUBSCRIBE TO OUR NEWSLETTER</h3>
          <form className="subscribe-form">
            <input type="email" placeholder="Enter Email Address" required />
            <button type="submit">Subscribe →</button>
          </form>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            *We send great deals and the latest auto news every week.
          </p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
  <p>Connect with Us:</p>
  <div className="social-icons">
    {[
      { id: "facebook", icon: <FaFacebookF />, url: "https://www.facebook.com/share/1AZFcfrE5e/" },
      { id: "twitter", icon: <FaTwitter />, url: "https://twitter.com/yourhandle" },
      { id: "linkedin", icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/saif-ali-7bb442239?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      { id: "instagram", icon: <FaInstagram />, url: "https://www.instagram.com/pixel_sa1f?igsh=MTI2am91NTF4ZjBzYw==" },
    ].map(({ id, icon, url }) => (
      <a
        key={id}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={hoveredSocial === id ? "hovered-social" : ""}
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
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Car Rental Portal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
