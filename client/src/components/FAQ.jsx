import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Importing Header component
import Footer from "./Footer"; // Importing Footer component

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ opened by default
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I book a car?",
      answer: "To book a car, simply browse our listings, select a car, and complete the booking form with your details.",
    },
    {
      question: "What are the payment options?",
      answer: "We accept credit/debit cards, UPI, and PayPal for secure and convenient transactions.",
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before the scheduled pick-up time for a full refund.",
    },
    {
      question: "Are there any age restrictions for renting?",
      answer: "Yes, you must be at least 21 years old with a valid driving license to rent a car.",
    },
    {
      question: "Is insurance included in the rental?",
      answer: "Yes, all our cars come with basic insurance. You can also opt for additional coverage.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      backgroundImage: "url('/logo.jpeg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
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
      marginBottom: "20px",
      color: "black",
    },
    faqItem: {
      borderBottom: "1px solid #ddd",
      padding: "10px 0",
    },
    question: {
      fontSize: "18px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      background: "black",
      color: "white",
      borderRadius: "5px",
      transition: "0.3s",
    },
    answer: {
      padding: "10px",
      fontSize: "16px",
      background: "#f8f9fa",
      borderRadius: "5px",
      marginTop: "5px",
    },
    icon: {
      fontSize: "20px",
    },
    button: {
      marginTop: "20px",
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
          <h2 style={styles.heading}>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <div style={styles.question} onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span style={styles.icon}>{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && <p style={styles.answer}>{faq.answer}</p>}
            </div>
          ))}

          {/* Back to Home Button */}
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

export default FAQ;








// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function PostVehicle() {
//   const navigate = useNavigate();
//   const [vehicle, setVehicle] = useState({
//     title: "",
//     brand: "",
//     overview: "",
//     price: "",
//     modelYear: "",
//     seatingCapacity: "",
//     fuelType: "",
//     images: [],
//     accessories: []
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVehicle({ ...vehicle, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setVehicle({ ...vehicle, images: [...vehicle.images, ...e.target.files] });
//   };

//   const handleAccessoryChange = (accessory) => {
//     setVehicle((prev) => ({
//       ...prev,
//       accessories: prev.accessories.includes(accessory)
//         ? prev.accessories.filter((item) => item !== accessory)
//         : [...prev.accessories, accessory]
//     }));
//   };

//   const handleSaveChanges = async () => {
//     setLoading(true);
//     setError(null);

//     const formData = new FormData();
//     Object.keys(vehicle).forEach((key) => {
//       if (key === "images") {
//         vehicle.images.forEach((img) => formData.append("images", img));
//       } else if (key === "accessories") {
//         formData.append("accessories", JSON.stringify(vehicle.accessories));
//       } else {
//         formData.append(key, vehicle[key]);
//       }
//     });

//     try {
//       const response = await fetch("http://localhost:3200/api/car", {
//         method: "POST",
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save vehicle data");
//       }

//       alert("Vehicle posted successfully!");
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const accessoriesList = [
//     "Air Conditioner", "Power Steering", "CD Player", "Power Door Locks",
//     "Driver Airbag", "Central Locking", "AntiLock Braking System",
//     "Passenger Airbag", "Crash Sensor", "Brake Assist",
//     "Power Windows", "Leather Seats"
//   ];

//   return (
//     <div style={{ display: "flex", fontFamily: "Arial, sans-serif", padding: "0" }}>
//       <Sidebar />
//       <div style={{ width: "100%", padding: "24px", maxWidth: "800px", margin: "auto" }}>
//         <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", margin: "0 0 20px 0" }}>Post A Vehicle</h1>
//         <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
//           <input type="text" name="title" placeholder="Vehicle Title" value={vehicle.title} onChange={handleChange} 
//             style={styles.input} />
          
//           <select name="brand" value={vehicle.brand} onChange={handleChange} style={styles.input}>
//             <option value="">Select Brand</option>
//             {["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Chevrolet", "Hyundai", "Nissan", "Tesla", "Mahindra"].map(brand => (
//               <option key={brand} value={brand}>{brand}</option>
//             ))}
//           </select>

//           <textarea name="overview" placeholder="Vehicle Overview" value={vehicle.overview} onChange={handleChange} 
//             style={styles.textarea} />
          
//           <input type="text" name="price" placeholder="Price Per Day (USD)" value={vehicle.price} onChange={handleChange} 
//             style={styles.input} />
          
//           <input type="text" name="modelYear" placeholder="Model Year" value={vehicle.modelYear} onChange={handleChange} 
//             style={styles.input} />
          
//           <input type="text" name="seatingCapacity" placeholder="Seating Capacity" value={vehicle.seatingCapacity} onChange={handleChange} 
//             style={styles.input} />
          
//           <input type="text" name="fuelType" placeholder="Fuel Type" value={vehicle.fuelType} onChange={handleChange} 
//             style={styles.input} />
          
//           <div style={{ marginBottom: "16px" }}>
//             <h3>Upload Images</h3>
//             <input type="file" multiple onChange={handleFileChange} style={styles.fileInput} />
//           </div>

//           <h3>Accessories</h3>
//           <div style={styles.accessoriesGrid}>
//             {accessoriesList.map((accessory) => (
//               <label key={accessory} style={styles.label}>
//                 <input type="checkbox" checked={vehicle.accessories.includes(accessory)} onChange={() => handleAccessoryChange(accessory)} />
//                 {accessory}
//               </label>
//             ))}
//           </div>

//           {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//           <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//             <button style={styles.cancelButton}>Cancel</button>
//             <button style={styles.saveButton} onClick={handleSaveChanges} disabled={loading}>
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// const styles = {
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "16px"
//   },
//   textarea: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//     fontSize: "16px",
//     height: "100px"
//   },
//   fileInput: {
//     width: "100%",
//     marginBottom: "10px"
//   },
//   accessoriesGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(2, 1fr)",
//     gap: "10px",
//     marginBottom: "10px"
//   },
//   label: {
//     display: "flex",
//     alignItems: "center",
//     gap: "5px"
//   },
//   cancelButton: {
//     flex: 1,
//     padding: "10px",
//     background: "#ccc",
//     border: "none",
//     borderRadius: "4px",
//     fontSize: "16px",
//     cursor: "pointer"
//   },
//   saveButton: {
//     flex: 1,
//     padding: "10px",
//     background: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     fontSize: "16px",
//     cursor: "pointer"
//   }
// };

