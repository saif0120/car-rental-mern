import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const UpdatePassword = () => {
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch user session on page load
    useEffect(() => {
        const fetchUserSession = async () => {
            try {
                const response = await fetch("http://localhost:3200/api/auth/session", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Session expired or not found.");
                }

                const data = await response.json();
                console.log("🔍 Session User Data:", data);

                if (data.user) {
                    setUser(data.user);
                } else {
                    throw new Error("No user found in session.");
                }
            } catch (error) {
                console.error("Error fetching session:", error);
                alert(`Error: ${error.message}`);
                navigate("/");
            }
        };

        fetchUserSession();
    }, [navigate]);

    // Handle form field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswordData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle password update
    const handleUpdatePassword = async () => {
        if (!user) {
            alert("User not logged in.");
            return;
        }

        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        setLoading(true);
        try {
            const requestBody = {
                userId: user._id || user.id, // Ensure user ID is used correctly
                currentPassword: passwordData.currentPassword.trim(),
                newPassword: passwordData.newPassword.trim(),
            };

            console.log("📤 Sending Request Body:", requestBody);

            const response = await fetch("http://localhost:3200/update-password", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            console.log("📥 Response from Backend:", data);

            if (response.ok) {
                alert("✅ Password updated successfully!");
                navigate("/profile-update");
            } else {
                alert("❌ Error: " + (data.error || "Failed to update password"));
            }
        } catch (error) {
            console.error("❌ Error updating password:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        console.log("🚪 Logging Out...");
        await fetch("http://localhost:3200/logout", { method: "POST", credentials: "include" });
        setUser(null);
        navigate("/login");
    };

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.banner}>
                <h2>Update Password</h2>
                <p>Home &gt; Update Password</p>
            </div>

            <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
                <div style={{ width: "25%", background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={styles.sidebarLi}><Link to="/my-bookings" style={styles.link}>My Bookings</Link></li>
                        <li style={styles.sidebarLi}><Link to="/profile-update" style={styles.link}>Profile Update</Link></li>
                        <li style={styles.sidebarLi}><Link to="/update-password" style={styles.link}>Update Password</Link></li>
                        <li style={styles.sidebarLi}><Link to="/test" style={styles.link}>Post a Testimonial</Link></li>
                        <li style={styles.sidebarLi}><Link to="/my-testimonials" style={styles.link}>My Testimonials</Link></li>
                    </ul>
                </div>

                <div style={styles.formContainer}>
                    <h2>Change Your Password</h2>
                    <label>Current Password</label>
                    <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handleChange} style={styles.input} />
                    <label>New Password</label>
                    <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handleChange} style={styles.input} />
                    <label>Confirm New Password</label>
                    <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handleChange} style={styles.input} />
                    <button onClick={handleUpdatePassword} style={styles.button} disabled={loading}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    container: { fontFamily: "Arial, sans-serif", width: "100%" },
    banner: { width: "100%", textAlign: "center", padding: "50px 20px", color: "white", backgroundImage: "url('https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg')", backgroundSize: "cover" },
    sidebarLi: { padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" },
    link: { textDecoration: "none", color: "#333", fontWeight: "bold" },
    formContainer: { flex: 1, padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" },
    input: { width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" },
    button: { backgroundColor: "#007bff", color: "white", padding: "12px", borderRadius: "5px", cursor: "pointer" },
};

export default UpdatePassword;
