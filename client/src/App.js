import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import PostVehicle from "./components/PostVehicle";
import ManageVehicles from "./components/ManageVehicles";
import ManageBrands from "./components/ManageBrand";
import AddBrand from "./components/AddBrand";
import FAQ from "./components/FAQ";
import CarList from "./components/CarList";
import Contact from "./components/Contact";
import About from "./components/About";
import ManageTestimonials from "./components/ManageTestimonials ";
import UserProfile from "./components/UserProfile";
import UpdatePassword from "./components/UpdatePassword";
import Car from "./components/Car";
import CarDetails from "./components/CarDetails";
import AllBookings from "./components/AllBookings ";
import MyBooking from "./components/MyBooking";
import ProfileUpdate from "./components/ProfileUpdate";
import PostTestimonial from "./components/PostTestimonial ";
import MyTestimonials from "./components/MyTestimonials";
import RegisterUsers from "./components/RegisterUsers ";
import CarPaymentPage from "./components/CarPaymentPage ";
import ProcessPaymentPage from "./components/ProcessPaymentPage ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<CarList/>} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/postvehicle" element={<PostVehicle />} />
        <Route path="/vehicles" element={<ManageVehicles />} />
        <Route path="/brands" element={<ManageBrands/>} />
        <Route path="/add-brand" element={<AddBrand/>} />
        <Route path="/bookings" element={<AllBookings/>} />
        <Route path="/faq" element={<FAQ/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/testimonials" element={<ManageTestimonials/>} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/update-password" element={<UpdatePassword/>} />
        <Route path="/car" element={<Car/>} />
        <Route path="/car/:id" element={<CarDetails />} /> {/* Dynamic route */}
        <Route path="/my-bookings" element={<MyBooking/>} />
        <Route path="/profile-update" element={<ProfileUpdate/>} />
        <Route path="/test" element={<PostTestimonial/>} />
        <Route path="/my-testimonials" element={<MyTestimonials/>} />
        <Route path="/users" element={<RegisterUsers/>} />
        <Route path="/payment" element={<CarPaymentPage/>} />
        <Route path="/process-payment" element={<ProcessPaymentPage/>} />















        






















        {/* <Route path="/signup" element={<SignupPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
