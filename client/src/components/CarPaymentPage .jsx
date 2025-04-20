import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const CarPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, amount, carId, fromDate, toDate } = location.state || {};

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [upiId, setUpiId] = useState("");

  const handleProceedToPay = (method) => {
    if (method === "Card") {
      navigate("/process-payment", {
        state: { bookingId, amount, carId, fromDate, toDate, method },
      });
    } else {
      setSelectedMethod(method);
    }
  };

  const handlePayNow = () => {
    if (!upiId.trim()) {
      alert("⚠️ Please enter your UPI ID or number.");
      return;
    }

    navigate("/process-payment", {
      state: { bookingId, amount, carId, fromDate, toDate, method: selectedMethod, upiId },
    });
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <h2>🚗 Scan & Pay</h2>

        <div style={styles.qrBox}>
          <div style={styles.qr}></div>
          <p style={styles.scanText}>Scan this QR code to proceed</p>
        </div>

        <div style={styles.details}>
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Car ID:</strong> {carId}</p>
          <p><strong>From:</strong> {fromDate}</p>
          <p><strong>To:</strong> {toDate}</p>
          <p><strong>Total Amount:</strong> ${amount}</p>
        </div>

        <h3 style={{ marginTop: "30px" }}>Or choose a payment method:</h3>

        <div style={styles.paymentOptions}>
          <button style={styles.methodButton} onClick={() => handleProceedToPay("Paytm")}>
            <img src="data:image/png;base64,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" alt="Paytm" style={styles.logo} />
          </button>
          <button style={styles.methodButton} onClick={() => handleProceedToPay("PhonePe")}>
            <img src="https://i.pinimg.com/736x/2a/cf/b6/2acfb6fb41f7fcb82c3230afdecff714.jpg" alt="PhonePe" style={styles.logo} />
          </button>
          <button style={styles.methodButton} onClick={() => handleProceedToPay("Card")}>
            💳 Card
          </button>
        </div>

        {selectedMethod && selectedMethod !== "Card" && (
          <div style={styles.upiBox}>
            <p><strong>{selectedMethod} UPI ID:</strong></p>
            <input
              type="text"
              placeholder="Enter your UPI ID or mobile number"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              style={styles.input}
            />
            <button style={styles.payNowBtn} onClick={handlePayNow}>
              Pay Now via {selectedMethod}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "25px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    background: "#fefefe",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  qrBox: {
    margin: "20px auto",
    padding: "20px",
    border: "2px dashed #999",
    borderRadius: "10px",
    width: "220px",
    height: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fafafa",
  },
  qr: {
    width: "150px",
    height: "150px",
    background: "url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ScanToPay') no-repeat center center",
    backgroundSize: "cover",
    marginBottom: "10px",
  },
  scanText: {
    fontSize: "14px",
    color: "#777",
  },
  details: {
    marginTop: "20px",
    textAlign: "left",
  },
  paymentOptions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  methodButton: {
    padding: "12px 20px",
    borderRadius: "6px",
    background: "#e0f7fa",
    border: "1px solid #ccc",
    cursor: "pointer",
    minWidth: "100px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  logo: {
    height: "24px",
    objectFit: "contain",
  },
  upiBox: {
    marginTop: "25px",
    padding: "15px",
    border: "1px dashed #888",
    borderRadius: "8px",
    background: "#f9f9f9",
  },
  input: {
    padding: "10px",
    width: "80%",
    fontSize: "16px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  payNowBtn: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default CarPaymentPage;
