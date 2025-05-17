
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "./Header";
// import Footer from "./Footer";
// import { FaCalendarAlt, FaGasPump, FaUsers } from "react-icons/fa";

// const CarDetails = () => {
//   const { id } = useParams();
//   const [car, setCar] = useState(null);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [message, setMessage] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Fetch car details
//     axios
//       .get(`http://localhost:3200/api/car/${id}`)
//       .then((res) => setCar(res.data))
//       .catch((err) => console.log("Error fetching car:", err.response?.data || err.message));

//     // Fetch session (Check if user is logged in)
//     axios
//       .get("http://localhost:3200/api/auth/session", { withCredentials: true })
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null));

//   }, [id]);  // ✅ Only run when `id` changes

//   const handleBooking = async () => {
//     if (!fromDate || !toDate) {
//       alert("Please select both From and To dates.");
//       return;
//     }

//     if (new Date(fromDate) >= new Date(toDate)) {
//       alert("Invalid date range. 'From' date must be before 'To' date.");
//       return;
//     }

//     if (!user) {
//       alert("You must be logged in to book a car.");
//       return;
//     }

//     const bookingData = { carId: id, fromDate, toDate, message };

//     try {
//       const response = await axios.post("http://localhost:3200/book-car", bookingData, {
//         withCredentials: true, // ✅ Important for session-based auth
//       });

//       alert("Booking successful!");
//       console.log("Booking Success:", response.data);
//     } catch (error) {
//       alert(`Booking failed: ${error.response?.data?.error || "Unknown error"}`);
//       console.error("Booking Error:", error.response?.data || error.message);
//     }
//   };

//   if (!car) return <h2>Loading...</h2>;

//   return (
//     <div>
//       <Header />

//       <div style={styles.container}>
//         <h1>{car.brand}, {car.title}</h1>

//         <div style={styles.imageAndPrice}>
//           <img
//             src={car.images?.length > 0 ? `http://localhost:3200${car.images[0]}` : "/placeholder.jpg"}
//             alt={car.title}
//             style={styles.carImage}
//           />
//           <div style={styles.priceContainer}>
//             <p style={styles.carPrice}>${car.price} / Day</p>
//           </div>
//         </div>

//         <div style={styles.contentWrapper}>
//           <div style={styles.mainContent}>
//             <div style={styles.infoContainer}>
//               <div style={styles.infoBox}>
//                 <FaCalendarAlt size={20} color="red" />
//                 <h3>{car.modelYear}</h3>
//                 <p>Reg Year</p>
//               </div>
//               <div style={styles.infoBox}>
//                 <FaGasPump size={20} color="red" />
//                 <h3>{car.fuelType}</h3>
//                 <p>Fuel Type</p>
//               </div>
//               <div style={styles.infoBox}>
//                 <FaUsers size={20} color="red" />
//                 <h3>{car.seatingCapacity}</h3>
//                 <p>Seats</p>
//               </div>
//             </div>
//           </div>

//           {/* Booking Section */}
//           <div style={styles.bookingSection}>
//   <h3>📩 Book Now</h3>
//   <input
//     type="date"
//     value={fromDate}
//     onChange={(e) => setFromDate(e.target.value)}
//     onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//     style={styles.input}
//   />
//   <input
//     type="date"
//     value={toDate}
//     onChange={(e) => setToDate(e.target.value)}
//     onFocus={(e) => e.target.showPicker && e.target.showPicker()}
//     style={styles.input}
//   />
//   <textarea
//     value={message}
//     onChange={(e) => setMessage(e.target.value)}
//     placeholder="Message"
//     style={styles.textarea}
//   ></textarea>
//   <button style={styles.bookButton} onClick={handleBooking}>
//     Book Now
//   </button>
// </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// const styles = {
//   container: { maxWidth: "1000px", margin: "auto", padding: "20px" },
//   imageAndPrice: { display: "flex", alignItems: "center", justifyContent: "space-between" },
//   carImage: { width: "60%", height: "auto", borderRadius: "8px" },
//   priceContainer: { padding: "20px", background: "red", color: "white", borderRadius: "8px", textAlign: "center" },
//   infoContainer: { display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" },
//   infoBox: { textAlign: "center", padding: "15px", border: "1px solid #ddd", borderRadius: "8px", width: "120px" },
//   bookingSection: { background: "#f8f8f8", padding: "15px", borderRadius: "8px", width: "250px", textAlign: "center" },
//   input: { width: "100%", padding: "8px", marginBottom: "10px" },
//   textarea: { width: "100%", padding: "8px" },
//   bookButton: { width: "100%", background: "red", color: "white", padding: "10px", border: "none", cursor: "pointer", marginTop: "10px" }
// };


// export default CarDetails;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { FaCalendarAlt, FaGasPump, FaUsers } from "react-icons/fa";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`)
      .then((res) => setCar(res.data))
      .catch((err) => console.log("Error fetching car:", err.response?.data || err.message));

      axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`)
      .then(res => setUser(res.data.user))
      .catch(() => setUser(null));
  }, [id]);

  const handleBooking = async () => {
    if (!fromDate || !toDate) return alert("Please select both From and To dates.");
    if (new Date(fromDate) >= new Date(toDate)) return alert("Invalid date range.");
    if (!user) return alert("You must be logged in to book a car.");

    const bookingData = { carId: id, fromDate, toDate, message };

    try {
      const response = await axios.post("http://localhost:3200/book-car", bookingData, {
        withCredentials: true,
      });

      console.log("Booking Success:", response.data);
      navigate("/payment", {
        state: {
          bookingId: response.data.bookingId,
          amount: response.data.amount || car.price,
          carId: id,
          fromDate,
          toDate,
        },
      });

    } catch (error) {
      alert(`Booking failed: ${error.response?.data?.error || "Unknown error"}`);
      console.error("Booking Error:", error.response?.data || error.message);
    }
  };

  if (!car) return <h2>Loading...</h2>;

  return (
    <div>
      <Header />
      <div style={styles.container}>
        <h1>{car.brand}, {car.title}</h1>
        <div style={styles.imageAndPrice}>
          <img
            src={car.images?.length > 0 ? `http://localhost:3200${car.images[0]}` : "/placeholder.jpg"}
            alt={car.title}
            style={styles.carImage}
          />
          <div style={styles.priceContainer}>
            <p style={styles.carPrice}>${car.price} / Day</p>
          </div>
        </div>

        <div style={styles.contentWrapper}>
          <div style={styles.mainContent}>
            <div style={styles.infoContainer}>
              <InfoBox icon={<FaCalendarAlt />} label={car.modelYear} text="Reg Year" />
              <InfoBox icon={<FaGasPump />} label={car.fuelType} text="Fuel Type" />
              <InfoBox icon={<FaUsers />} label={car.seatingCapacity} text="Seats" />
            </div>
          </div>

          <div style={styles.bookingSection}>
            <h3>📩 Book Now</h3>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              style={styles.input}
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              style={styles.input}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              style={styles.textarea}
            ></textarea>
            <button style={styles.bookButton} onClick={handleBooking}>
              Book Now
            </button>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

const InfoBox = ({ icon, label, text }) => (
  <div style={styles.infoBox}>
    <div style={{ color: "red" }}>{icon}</div>
    <h3>{label}</h3>
    <p>{text}</p>
  </div>
);

const styles = {
  container: { maxWidth: "1000px", margin: "auto", padding: "20px" },
  imageAndPrice: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  carImage: { width: "60%", height: "auto", borderRadius: "8px" },
  priceContainer: { background: "red", padding: "20px", color: "#fff", borderRadius: "10px" },
  infoContainer: { display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" },
  infoBox: { padding: "10px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px", width: "120px" },
  bookingSection: { width: "250px", background: "#f8f8f8", padding: "15px", borderRadius: "8px", textAlign: "center" },
  input: { width: "100%", padding: "8px", marginBottom: "10px" },
  textarea: { width: "100%", padding: "8px", marginBottom: "10px" },
  bookButton: { background: "red", color: "white", padding: "10px", border: "none", width: "100%", cursor: "pointer" }
};

export default CarDetails;



