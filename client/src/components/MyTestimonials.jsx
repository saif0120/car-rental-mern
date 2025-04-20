import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const MyTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3200/api/mytestimonials', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.testimonials)) {
                    setTestimonials(data.testimonials);
                } else {
                    console.error("Invalid response format:", data);
                    setTestimonials([]);
                }
            })
            .catch(err => console.error("Error fetching testimonials:", err));
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
            <Header />

            <div style={styles.banner}>
                <h1>My Testimonials</h1>
            </div>

            <div style={{ display: "flex", width: "80%", margin: "20px auto", gap: "20px" }}>
                {/* Sidebar */}
                <div style={{ width: "25%", background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={styles.sidebarItem}><Link to="/my-bookings" style={styles.sidebarLink}>My Bookings</Link></li>
                        <li style={styles.sidebarItem}><Link to="/profile-update" style={styles.sidebarLink}>Profile Update</Link></li>
                        <li style={styles.sidebarItem}><Link to="/update-password" style={styles.sidebarLink}>Update Password</Link></li>
                        <li style={styles.sidebarItem}><Link to="/test" style={styles.sidebarLink}>Post a Testimonial</Link></li>
                        <li style={styles.sidebarItem}><Link to="/my-testimonials" style={styles.sidebarLink}>My Testimonials</Link></li>
                    </ul>
                </div>

                {/* Main Content */}
                <div style={{ flexGrow: 1, padding: '20px', maxWidth: '800px', margin: 'auto' }}>
                    <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>MY TESTIMONIALS</h2>
                    {testimonials.length > 0 ? testimonials.map((t, index) => (
                        <div key={index} style={styles.testimonialCard}>
                            <p style={{ fontSize: '16px', color: '#555' }}>{t.testimonial}</p>
                            <p style={{ fontWeight: 'bold', marginTop: '10px' }}>
                                Posting Date: {new Date(t.createdAt).toLocaleString()}
                            </p>
                            <button style={styles.statusButton}>
                                {t.status === 'Active' ? 'Approved' : 'Waiting for approval'}
                            </button>
                        </div>
                    )) : <p style={{ textAlign: 'center', color: '#777' }}>No testimonials found.</p>}
                </div>
            </div>

            <Footer />
        </div>
    );
};

const styles = {
    banner: {
        width: "100%",
        textAlign: "center",
        padding: "50px 20px",
        color: "white",
        backgroundImage: "url('https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg')",
        backgroundSize: "cover"
    },
    sidebarItem: {
        padding: "12px",
        cursor: "pointer",
        borderBottom: "1px solid #ddd"
    },
    sidebarLink: {
        textDecoration: "none",
        color: "#333",
        fontWeight: "bold"
    },
    testimonialCard: {
        background: '#fff',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px'
    },
    statusButton: {
        border: '1px solid #dc3545',
        color: '#dc3545',
        padding: '5px 10px',
        borderRadius: '3px',
        background: 'none',
        cursor: 'default'
    }
};

export default MyTestimonials;
