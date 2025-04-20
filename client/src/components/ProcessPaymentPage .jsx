import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const ProcessPaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSimulatePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      // Simulate payment result
      const paymentSuccessful = true; // Change to false to simulate failure

      if (paymentSuccessful) {
        setSuccess(true);
        alert("✅ Booking successfully completed!");
        navigate("/my-bookings"); // Or wherever you want to redirect
      } else {
        alert("❌ Payment was not successful!");
        setProcessing(false);
      }
    }, 3000);
  };

  return (
    <>
      <Header />
      <div style={styles.wrapper}>
        <h2>💳 Processing Payment</h2>
        <p><strong>Booking ID:</strong> {state?.bookingId}</p>
        <p><strong>Amount:</strong> ${state?.amount}</p>
        <p>⏳ Click below to simulate payment processing:</p>

        <button
          onClick={handleSimulatePayment}
          style={styles.payBtn}
          disabled={processing}
        >
          {processing ? "Processing..." : "Simulate Payment"}
        </button>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  wrapper: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "center",
    background: "#fafafa",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  payBtn: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default ProcessPaymentPage;
