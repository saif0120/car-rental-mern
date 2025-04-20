import React, { useState, useEffect } from 'react';
import { useNavigate,Link  } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const ProfileUpdate = () => {
    const [userData, setUserData] = useState({ name: '', email: '', mobile: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
              const response = await fetch("http://localhost:3200/profile-update", {
                method: "GET",
                credentials: "include", // ✅ Ensures session is sent
              });
          
              if (!response.ok) throw new Error("Failed to fetch");
              const result = await response.json();
              setUserData(result);
            } catch (error) {
              setError("Failed to fetch user data");
                      } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3200/profile-update', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Profile updated successfully!');
            } else {
                setError(data.message || 'Error updating profile');
            }
        } catch (error) {
            setError('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <Header />
            <div style={styles.banner}>
                <h1> Profile Update </h1>
            </div>
            <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
    <div style={{ width: "25%", background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
           <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/my-bookings" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>My Bookings</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/profile-update" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Profile Update</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/update-password" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Update Password</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/test" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>Post a Testimonial</Link>
            </li>
            <li style={{ padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <Link to="/my-testimonials" style={{ textDecoration: "none", color: "#333", fontWeight: "bold" }}>My Testimonials</Link>
            </li>
        </ul>
    </div>

                <div style={styles.formContainer}>
                    <h2> Profile Update</h2>
                    {loading && <p>Loading...</p>}
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type='text' name='name' value={userData.name} onChange={handleChange} required style={styles.input} />
                        <label>Email:</label>
                        <input type='email' name='email' value={userData.email} onChange={handleChange} required style={styles.input} />
                        <label>Mobile:</label>
                        <input type='text' name='mobile' value={userData.mobile} onChange={handleChange} required style={styles.input} />
                        <button type='submit' disabled={loading} style={styles.button}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

const styles = {
    container: { fontFamily: "Arial, sans-serif", width: "100%" },
    banner: { width: "100%", textAlign: "center", padding: "50px 20px", color: "white", backgroundImage: "url('https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg')", backgroundSize: "cover" },
    profileContainer: { display: "flex", width: "80%", margin: "20px auto" },
    sidebar: { width: "25%", background: "#f4f4f4", padding: "20px" },
    sidebarUl: { listStyle: "none", padding: 0 },
    sidebarLi: { padding: "12px", cursor: "pointer", borderBottom: "1px solid #ddd" },
    formContainer: { flex: 1, padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" },
    input: { width: "100%", padding: "10px", marginBottom: "10px", border: "1px solid #ccc", borderRadius: "5px" },
    button: { backgroundColor: "#007bff", color: "white", padding: "12px", borderRadius: "5px", cursor: "pointer" },
};

export default ProfileUpdate;