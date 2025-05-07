import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const FAQs = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const faqs = [
    { question: "How can I book a car?", answer: "You can book a car through our website by selecting your preferred vehicle and completing the booking process." },
    { question: "What documents are required?", answer: "You need to provide a valid driving license and a government-issued ID for verification." },
    { question: "Is there a deposit required?", answer: "Yes, a refundable security deposit is required at the time of booking." },
    { question: "Do you offer long-term rentals?", answer: "Yes, we offer flexible long-term rental plans at discounted rates." },
    { question: "What payment methods are accepted?", answer: "We accept credit/debit cards, PayPal, and online bank transfers." },
  ];

  // Filter FAQs based on search query
  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div style={darkMode ? styles.darkContainer : styles.container}>
        {/* Header & Dark Mode Toggle */}
        <div style={styles.headerSection}>
          <h1 style={styles.heading}>Frequently Asked Questions</h1>
          <button onClick={toggleDarkMode} style={styles.toggleBtn}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search for a question..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={darkMode ? styles.darkSearchBar : styles.searchBar}
        />

        {/* FAQ List */}
        <div style={styles.content}>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                style={{
                  ...styles.faqItem,
                  ...(darkMode ? styles.darkFaqItem : {}),
                }}
                onClick={() => toggleFAQ(index)}
              >
                <div style={styles.faqHeader}>
                  <h3 style={styles.faqQuestion}>{faq.question}</h3>
                  <span style={styles.icon}>{openIndex === index ? "−" : "+"}</span>
                </div>
                <div
                  style={{
                    ...styles.faqAnswerContainer,
                    maxHeight: openIndex === index ? "200px" : "0",
                    opacity: openIndex === index ? "1" : "0",
                    padding: openIndex === index ? "10px" : "0",
                  }}
                >
                  <p style={darkMode ? styles.darkFaqAnswer : styles.faqAnswer}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>❌ No results found!</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

// Improved CSS
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    transition: "background 0.3s ease",
    color: "#333",
  },
  darkContainer: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#121212",
    color: "#f1f1f1",
    minHeight: "100vh",
    transition: "background 0.3s ease",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "900px",
    margin: "auto",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  toggleBtn: {
    padding: "10px 20px",
    border: "none",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "0.3s ease",
  },
  searchBar: {
    width: "80%",
    maxWidth: "600px",
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #ccc",
    borderRadius: "8px",
    margin: "20px auto",
    display: "block",
    backgroundColor: "#fff",
    color: "#333",
  },
  darkSearchBar: {
    width: "80%",
    maxWidth: "600px",
    padding: "12px",
    fontSize: "1rem",
    border: "2px solid #555",
    borderRadius: "8px",
    margin: "20px auto",
    display: "block",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  content: {
    maxWidth: "800px",
    margin: "auto",
    textAlign: "left",
  },
  faqItem: {
    marginBottom: "15px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "10px 15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  darkFaqItem: {
    backgroundColor: "#1e1e1e",
    color: "#f1f1f1",
    boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
  },
  faqHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "10px",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  faqQuestion: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  faqAnswerContainer: {
    overflow: "hidden",
    transition: "max-height 0.5s ease, opacity 0.3s ease",
    padding: "0 15px",
  },
  faqAnswer: {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
  },
  darkFaqAnswer: {
    fontSize: "1rem",
    color: "#f1f1f1",
    lineHeight: "1.5",
  },
  icon: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
    transition: "0.3s ease",
  },
  noResults: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginTop: "20px",
  },
};

export default FAQs;
