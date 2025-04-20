import { useState } from "react";
import Sidebar from "./Sidebar";

export default function PostVehicle() {
  const [vehicle, setVehicle] = useState({
    title: "",
    brand: "",
    overview: "",
    price: "",
    modelYear: "",
    seatingCapacity: "",
    fuelType: "",
    images: []
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for handling errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleFileChange = (e) => {
    setVehicle({ ...vehicle, images: [...vehicle.images, ...e.target.files] });
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", vehicle.title);
    formData.append("brand", vehicle.brand);
    formData.append("overview", vehicle.overview);
    formData.append("price", vehicle.price);
    formData.append("modelYear", vehicle.modelYear);
    formData.append("seatingCapacity", vehicle.seatingCapacity);
    formData.append("fuelType", vehicle.fuelType);
    
    for (let i = 0; i < vehicle.images.length; i++) {
      formData.append("images", vehicle.images[i]); // Append each image
    }

    try {
      const response = await fetch("http://localhost:3200/api/car", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to save vehicle data");
      }

      setShowPopup(true); // Show success popup
      setVehicle({ // Reset form after successful submission
        title: "",
        brand: "",
        overview: "",
        price: "",
        modelYear: "",
        seatingCapacity: "",
        fuelType: "",
        images: []
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const styles = {
    container: { width: "100%", margin: "auto", fontFamily: "sans-serif", display: "flex" },
    card: { background: "white", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb" },
    input: { marginBottom: "16px", width: "100%", padding: "12px", border: "1px solid #d1d5db", borderRadius: "8px", transition: "all 0.3s ease" },
    buttonPrimary: { padding: "10px 24px", border: "none", borderRadius: "8px", background: loading ? "#9CA3AF" : "#3b82f6", color: "white", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.3s ease" },
    buttonSecondary: { padding: "10px 24px", border: "1px solid #9ca3af", borderRadius: "8px", background: "#e5e7eb", color: "#374151", cursor: "pointer", transition: "background 0.3s ease" },
    title: { fontSize: "24px", fontWeight: "bold", color: "#1f2937", textAlign: "center", marginBottom: "24px" },
    sectionTitle: { fontSize: "18px", fontWeight: "600", color: "#374151", marginBottom: "8px" },
    popupOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
    popup: { background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", textAlign: "center" }
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={{ width: "100%", paddingLeft: "24px" }}>
        <h1 style={styles.title}>Post A Vehicle</h1>
        <div style={styles.card}>
          <input type="text" placeholder="Vehicle Title" name="title" value={vehicle.title} onChange={handleChange} style={styles.input} />
                 <select name="brand" value={vehicle.brand} onChange={handleChange} style={styles.input}>
                 <option value="">Select Brand</option>
                 <option value="Toyota">Toyota</option>
                 <option value="Honda">Honda</option>
                 <option value="Ford">Ford</option>
                 <option value="BMW">BMW</option>
                 <option value="Mercedes">Mercedes</option>
                 <option value="Audi">Audi</option>
                 <option value="Chevrolet">Chevrolet</option>
                 <option value="Hyundai">Hyundai</option>
                 <option value="Nissan">Nissan</option>
                 <option value="Tesla">Tesla</option>
                 <option value="Mahindra">Mahindra</option>

                    </select> 
            <textarea placeholder="Vehicle Overview" name="overview" value={vehicle.overview} onChange={handleChange} style={styles.input} />
            <input type="text" placeholder="Price Per Day (USD)" name="price" value={vehicle.price} onChange={handleChange} style={styles.input} />
            <input type="text" placeholder="Model Year" name="modelYear" value={vehicle.modelYear} onChange={handleChange} style={styles.input} />
            <input type="text" placeholder="Seating Capacity" name="seatingCapacity" value={vehicle.seatingCapacity} onChange={handleChange} style={styles.input} />
            <input type="text" placeholder="Fuel Type" name="fuelType" value={vehicle.fuelType} onChange={handleChange} style={styles.input} />
          
          <div style={{ marginBottom: "16px" }}>
            <h2 style={styles.sectionTitle}>Upload Images</h2>
            <input type="file" multiple onChange={handleFileChange} style={{ marginTop: "8px", width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "8px" }} />
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <div style={{ display: "flex", gap: "16px", justifyContent: "flex-end" }}>
            <button style={styles.buttonSecondary}>Cancel</button>
            <button style={styles.buttonPrimary} onClick={handleSaveChanges} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      {/* Popup Confirmation */}
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Vehicle details saved successfully!</h3>
            <button style={styles.buttonPrimary} onClick={handleClosePopup}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
