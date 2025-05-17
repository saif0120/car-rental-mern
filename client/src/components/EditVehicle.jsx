import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditVehicle.css";
import Sidebar from "./Sidebar";

const EditVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [vehicle, setVehicle] = useState({
    title: "",
    brand: "",
    price: "",
    fuelType: "",
    modelYear: "",
    image: ""
  });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);
        setVehicle(res.data);
        setImagePreview(res.data.image); // initial image preview
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      }
    };

    const fetchBrands = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);
        setBrands(res.data);
      } catch (err) {
        console.error("Error fetching brands:", err);
      }
    };

    fetchVehicle();
    fetchBrands();
  }, [id]);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setVehicle({ ...vehicle, image: file });
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    Object.keys(vehicle).forEach((key) => {
      formData.append(key, vehicle[key]);
    });

    try {
      await axios.put(`http://localhost:3200/api/car/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Vehicle updated successfully!");
      navigate("/vehicles");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <div className="edit-vehicle-wrapper">
      <Sidebar />
      <div className="edit-vehicle-form-container">
        <h2>Edit Vehicle</h2>
        <form className="edit-vehicle-form" onSubmit={(e) => e.preventDefault()}>
          <label>Vehicle Title</label>
          <input
            type="text"
            name="title"
            value={vehicle.title}
            onChange={handleChange}
            required
          />

          <label>Brand</label>
          <select name="brand" value={vehicle.brand} onChange={handleChange} required>
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>

          <label>Price Per Day</label>
          <input
            type="number"
            name="price"
            value={vehicle.price}
            onChange={handleChange}
            required
          />

          <label>Fuel Type</label>
          <select
            name="fuelType"
            value={vehicle.fuelType}
            onChange={handleChange}
            required
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>

          <label>Model Year</label>
          <input
            type="number"
            name="modelYear"
            value={vehicle.modelYear}
            onChange={handleChange}
            required
          />

          <label>Vehicle Image</label>
          <input type="file" name="image" onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

          <div className="button-group">
            <button type="submit" onClick={handleUpdate}>
              Update
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => navigate("/vehicles")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVehicle;
