const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const session = require("express-session");



const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Allow frontend URL
    credentials: true, // ✅ Allows cookies & sessions
  })
);

app.use(express.json());


app.use(express.json()); // ✅ Enable JSON parsing
app.use(express.urlencoded({ extended: true })); // ✅ Parse URL-encoded data

// ✅ Serve Static Files (For Uploaded Images)
app.use("/uploads", express.static("uploads"));


// ✅ Session Middleware

app.use(
  session({
    secret: "your_secret_key",  // 🛠 Change this to a secure key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },  // ❌ Use `true` if HTTPS
  })
);



// ✅ Check if session is working
// app.get("/session-check", (req, res) => {
//   console.log("🔍 Active Session:", req.session);
//   res.json(req.session.user ? { user: req.session.user } : { message: "No active session" });
// });


// Debugging Session

app.get("/check-session", (req, res) => {
  console.log("Session Data:", req.session);
  if (req.session.user) {
    res.json({ message: "User logged in", user: req.session.user });
  } else {
    res.status(401).json({ message: "Unauthorized: No active session" });
  }
});





// ✅ MongoDB Connection (Ensure MongoDB is running)
mongoose
  .connect("mongodb://127.0.0.1:27017/car_rental")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


  // ✅ Middleware to Check Session
app.get("/api/auth/session", (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});


// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
  regDate: { type: Date, default: Date.now },

});

const User = mongoose.model("User", userSchema);

// ✅ Brand Schema & Model
const brandSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const Brand = mongoose.model("Brand", brandSchema);

// ✅ Car Schema & Model
const carSchema = new mongoose.Schema({
  title: String,
  brand: String,
  overview: String,
  price: String,
  fuelType: String,
  modelYear: String,
  seatingCapacity: String,
  images: [String],
  accessories: [String],
});

const Car = mongoose.model("Car", carSchema);

// ✅ Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


// ✅ Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, mobile, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, mobile, password: hashedPassword });

    await newUser.save();
    console.log("User Registered:", newUser);
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    console.error("Error Signing Up:", error);
    res.status(500).json({ error: "Error Signing Up" });
  }
});

// ✅ Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log("🛠 Login Attempt:", email);

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       console.log("❌ User Not Found:", email);
//       return res.status(400).json({ error: "Invalid Credentials" });
//     }

//     console.log("✅ User Found:", user.email);
//     console.log("🔐 Stored Hashed Password:", user.password);
//     console.log("🔑 Entered Plain Password:", password);

//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("🛠 Password Match Result:", isMatch);

//     if (!isMatch) {
//       console.log("❌ Password Does Not Match for:", email);
//       return res.status(400).json({ error: "Invalid Credentials" });
//     }

//     req.session.user = { id: user._id, name: user.name, email: user.email };
//     console.log("🎉 Login Successful:", req.session.user);

//     // ✅ Ensure Response Returns Proper JSON Object
//     res.json({ 
//       message: "Login successful", 
//       user: req.session.user, 
//     });

//   } catch (error) {
//     console.error("❌ Error Logging In:", error);
//     res.status(500).json({ error: "Error Logging In" });
//   }
// });
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("🛠 Login Attempt:", email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User Not Found:", email);
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect Password for:", email);
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    req.session.user = { id: user._id.toString(), name: user.name, email: user.email }; // ✅ Fix `_id` field
    console.log("🎉 Login Successful! Session Data:", req.session);

    res.json({ message: "Login successful", user: req.session.user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// app.get("/api/auth/session", (req, res) => {
//   if (req.session.user) {
//     res.json({ user: req.session.user });
//   } else {
//     res.status(401).json({ error: "Not logged in" });
//   }
// });

// Assuming you're using express-session
app.get('/api/auth/session', async (req, res) => {
  if (req.session.userId) {
      try {
          const user = await User.findById(req.session.userId);  // Find the user from the database
          if (user) {
              res.json({ user });  // Respond with the user data if found
          } else {
              res.status(404).json({ error: 'User not found.' });
          }
      } catch (error) {
          console.error('❌ Error fetching user:', error);
          res.status(500).json({ error: 'Failed to fetch user data.' });
      }
  } else {
      res.status(401).json({ error: 'No session found. Please log in again.' });  // No session, user needs to log in
  }
});



// ✅ Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("❌ Error Destroying Session:", err);
      return res.status(500).json({ message: "Error Logging Out" });
    }

    res.clearCookie("connect.sid"); // ✅ Session Cookie ko clear karna zaroori hai
    console.log("✅ Session Destroyed, User Logged Out");
    res.json({ message: "Logout successful" });
  });
});

// ✅ Check Authentication Status
app.get("/auth-status", (req, res) => {
  res.json({ isAuthenticated: !!req.session.user, user: req.session.user });
});

// ✅ Admin Login Route
app.post("/admin", async (req, res) => {
  const { email, password } = req.body;

  const adminEmail = "admin@gmail.com";
  const adminPassword = "Admin@123";

  try {
    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.admin = { email: adminEmail };
    req.session.save((err) => {
      if (err) {
        console.error("Session Save Error:", err);
        return res.status(500).json({ message: "Session error" });
      }

      console.log("Admin session stored:", req.session.admin);
      res.json({ message: "Admin login successful", admin: req.session.admin });
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    console.log("Cars Data:", cars); // Check karne ke liye console me print karo
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Post a Vehicle
app.post("/api/car", upload.array("images", 5), async (req, res) => {
  try {
    const { title, brand, overview, price, fuelType, modelYear, seatingCapacity } = req.body;
    const images = req.files.map((file) => `/uploads/${file.filename}`);  // ✅ Ensure correct image path

    const newCar = new Car({ title, brand, overview, price, fuelType, modelYear, seatingCapacity, images });
    await newCar.save();

    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Manage Vehicles (Get all cars)

// ✅ Delete a Vehicle
app.delete("/api/car/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Vehicle not found" });
    }
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting vehicle" });
  }
});

// ✅ Get All Brands
app.get("/api/brands", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: "Error fetching brands" });
  }
});

// ✅ Add a New Brand (Prevents Duplicates)
app.post("/api/brands", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Brand name is required" });
    }

    // Check if brand already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res.status(400).json({ error: "Brand already exists" });
    }

    const newBrand = new Brand({ name });
    await newBrand.save();

    res.status(201).json({ message: "Brand added successfully", brand: newBrand });
  } catch (err) {
    res.status(500).json({ error: "Error adding brand" });
  }
});

// ✅ Delete a Brand
app.delete("/api/brands/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.json({ message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting brand" });
  }
});



// ✅ Fetch all cars
app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    console.log("Cars Data:", cars); // Check karne ke liye console me print karo
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Add a new car (with image upload)
app.post("/api/cars", upload.array("images", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const { title, brand, price, fuelType, modelYear, seatingCapacity, overview } = req.body;
    const imagePaths = req.files.map((file) => `uploads/${file.filename}`); // Ensure correct path

    const newCar = new Car({
      title,
      brand,
      price,
      fuelType,
      modelYear,
      seatingCapacity,
      overview,
      images: imagePaths,
    });

    await newCar.save();
    res.json({ message: "Car added successfully", car: newCar });
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({ error: "Error adding car" });
  }
});


// ✅ Delete a car
app.delete("/api/car/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting car" });
  }
});


// ✅ Fetch All Bookings (GET)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email").populate("carId", "title brand"); // ✅ Fetch car title and brand
    res.json(bookings);
  } catch (error) {
    console.error("❌ Fetching bookings error:", error); // ✅ Log error
    res.status(500).json({ error: "Error fetching bookings" });
  }
});


// ✅ Update Booking Status (PUT)
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === status) {
      return res.status(400).json({ error: `Booking is already ${status}` });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error updating booking status" });
  }
});




const ensureAuthenticated = (req, res, next) => {
  if (req.session.user) return next();
  res.status(401).json({ error: "User not authenticated" });
};

// 📌 Fetch user-specific bookings
app.get("/api/booking", ensureAuthenticated, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.session.user.id }).populate("carId");
    res.json(bookings);
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ error: "Error fetching bookings" });
  }
});





// ✅ Update Password Route

app.post("/update-password", async (req, res) => {
  try {
    console.log("🛠️ Request Headers:", req.headers);
    console.log("📥 Raw Request Body:", req.body);

    const { userId, currentPassword, newPassword } = req.body;

    // Check for required fields
    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required. for Update Password" });
    }

    // Fetch user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare current password with stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect." });
    }
    
    // Hash the new password and update the user record
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: "✅ Password updated successfully!" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



app.get("/api/car", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Get brands
app.get("/api/brands", async (req, res) => {
  const brands = await Car.distinct("brand");
  res.json(brands);
});

// Get fuel types
app.get("/api/fuelTypes", async (req, res) => {
  const fuelTypes = await Car.distinct("fuelType");
  res.json(fuelTypes);
});


//car detalis
app.get("/api/car/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Get car details by ID
// app.get("/api/car/:id", async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     if (!car) {
//       return res.status(404).json({ message: "Car not found" });
//     }
//     res.json(car);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });
// app.get("/api/car/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid car ID format" });
//   }

//   const car = await Car.findById(id);
//   if (!car) {
//     return res.status(404).json({ error: "Car not found" });
//   }

//   res.json(car);
// });


// Booking Schema
// ✅ Booking Schema & Model
const bookingSchema = new mongoose.Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  message: { type: String, default: "" },
  images: [String],
  status: { type: String, default: "pending" } // New, pending, confirmed, etc.
});

const Booking = mongoose.model("Booking", bookingSchema);

// Book a car (with date conflict prevention)
// app.post("/book-car", async (req, res) => {
//   console.log("🔍 Session Object:", req.session); // Debugging session
//   console.log("👤 Session User:", req.session.user);

//   if (!req.session.user) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   const userId = req.session.user._id;
//   console.log("Extracted User ID:", userId); // Debugging user ID

//   if (!userId) {
//     return res.status(401).json({ error: "User ID is missing in session" });
//   }

//   const { carId, fromDate, toDate, message } = req.body;
//   if (!carId || !fromDate || !toDate) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   const car = await Car.findById(carId);
//   if (!car) {
//     return res.status(404).json({ error: "Car not found" });
//   }

//   const newBooking = new Booking({ carId, userId, fromDate, toDate, message, images: car.images });

//   await newBooking.save();
//   res.status(201).json({ message: "Booking successful", booking: newBooking });
// });
app.post("/book-car", async (req, res) => {
  console.log("🔍 Incoming Booking Request...");
  console.log("🔍 Full Session Object:", req.session); // Check if user session exists
  console.log("👤 Extracted User:", req.session.user);

  if (!req.session.user) {
    console.log("❌ User Not Found in Session");
    return res.status(401).json({ error: "User not authenticated" });
  }

  const userId = req.session.user.id; // 🔥 Fix `_id` to `id`
  console.log("✅ Extracted User ID:", userId);

  if (!userId) {
    console.log("❌ User ID missing in session");
    return res.status(401).json({ error: "User ID is missing in session" });
  }

  const { carId, fromDate, toDate, message } = req.body;
  console.log(`🚗 Car ID: ${carId}, 📅 From: ${fromDate}, To: ${toDate}, 📝 Message: ${message}`);

  if (!carId || !fromDate || !toDate) {
    console.log("⚠️ Missing required fields!");
    return res.status(400).json({ error: "Missing required fields" });
  }

  const car = await Car.findById(carId);
  if (!car) {
    console.log("🚫 Car not found in database!");
    return res.status(404).json({ error: "Car not found" });
  }

  // Create and save booking
  const newBooking = new Booking({
    carId,
    userId,
    fromDate,
    toDate,
    message,
    images: car.images,
  });

  try {
    await newBooking.save();
    console.log("✅ Booking saved successfully!");
    res.status(201).json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.log("❌ MongoDB Save Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});




app.get('/api/mybookings', async (req, res) => {
  console.log("🔍 Checking Session:", req.session);

  if (!req.session.user) {
      console.log("❌ User Not Logged In!");
      return res.status(401).json({ message: "User not logged in" });
  }

  const userId = req.session.user.id; // Ensure correct key is used
  console.log("✅ Fetching Bookings for User:", userId);

  try {
      const bookings = await Booking.find({ userId }).populate('carId').populate('userId');
      console.log("📋 Bookings Found:", bookings);
      res.json(bookings);
  } catch (error) {
      console.error("❌ Error Fetching Bookings:", error);
      res.status(500).json({ error: "Something went wrong" });
  }
});



//update profile
// ✅ GET Profile Data (Protected)
app.get("/profile-update", async (req, res) => {
  console.log("🔍 Checking Session:", req.session);

  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized: Please login" });
  }

  try {
    const user = await User.findById(req.session.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("❌ Error Fetching Profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Update User Profile (Protected)
app.put("/profile-update", async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized: Please login" });
    }

    const user = await User.findById(req.session.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("❌ Error Updating Profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// Debugging Session
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = { _id: user._id, email: user.email };
  console.log("User logged in, session set:", req.session);
  res.json({ message: "Login successful" });
});

//post testimonials
const testimonialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  testimonial: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Testimonial = mongoose.model("Testimonial", testimonialSchema);


app.post("/api/testimonials", async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const newTestimonial = new Testimonial({
      user: req.session.user.id,
      testimonial: req.body.testimonial,
    });

    await newTestimonial.save();
    res.json({ success: true, message: "Testimonial added successfully" });
  } catch (error) {
    console.error("Testimonial Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get all testimonials (admin route)
app.get("/api/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().populate("user", "name email");
    res.json({ success: true, testimonials });
  } catch (err) {
    console.error("Get Testimonials Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Update testimonial status
app.put("/api/testimonials/:id", async (req, res) => {
  try {
    const { status } = req.body;
    await Testimonial.findByIdAndUpdate(req.params.id, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (err) {
    console.error("Toggle Status Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get('/api/mytestimonials', async (req, res) => {
    try {
        if (!req.session.user.id) {
            return res.status(401).json({ success: false, message: 'Not logged in' });
        }

        const testimonials = await Testimonial.find({ user: req.session.user.id}).sort({ createdAt: -1 });
        res.json({ success: true, testimonials });
    } catch (err) {
        console.error('Error fetching testimonials:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});




app.get("/api/dashboard-stats", async (req, res) => {
  try {
    // Only count users who have logged in at least once
    const users = await User.countDocuments({ lastLogin: { $exists: true } });
    const vehicles = await Vehicle.countDocuments();
    const bookings = await Booking.countDocuments();
    const brands = await Brand.countDocuments();
    const subscribers = await Subscriber.countDocuments();
    const queries = await Query.countDocuments();
    const testimonials = await Testimonial.countDocuments();

    res.json({
      regUsers: users,
      vehicles,
      bookings,
      brands,
      subscribers,
      queries,
      testimonials,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err });
  }
});


app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});


//GET /api/testimonials - fetch approved testimonials only
app.get('/api/testimonials', async (req, res) => {
  try {
      const testimonials = await Testimonial.find({ status: true })
          .populate('userId', 'name email') // fetch name/email from User
          .sort({ createdAt: -1 });

      res.json(testimonials);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
  }
});

// const querySchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   contact: String,
//   message: String,
//   date: { type: Date, default: Date.now },
//   status: { type: String, default: 'Pending' }
// });

// module.exports = mongoose.model('Query', querySchema);

// // POST new query
// app.post('/api/queries', async (req, res) => {
//   const { name, email, contact, message } = req.body;
//   const newQuery = new Query({ name, email, contact, message });
//   await newQuery.save();
//   res.status(201).json(newQuery);
// });

// // GET all queries
// app.get('/api/queries', async (req, res) => {
//   const queries = await Query.find().sort({ date: -1 });
//   res.json(queries);
// });

// // TOGGLE status
// app.put('/api/queries/:id/toggle', async (req, res) => {
//   const query = await Query.findById(req.params.id);
//   if (!query) return res.status(404).send('Not found');
//   query.status = query.status === 'Read' ? 'Pending' : 'Read';
//   await query.save();
//   res.json(query);
// });








// ✅ Start Server
const PORT = 3200;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));













