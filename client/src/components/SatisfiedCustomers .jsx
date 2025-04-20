// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SatisfiedCustomers = () => {
//     const [testimonials, setTestimonials] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTestimonials = async () => {
//             try {
//                 const res = await axios.get('/api/testimonials'); // Make sure proxy is set if needed
//                 setTestimonials(res.data);
//             } catch (error) {
//                 console.error("Error fetching testimonials:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetch('http://localhost:3200/api/testimonials', { credentials: 'include' })
//         .then(res => res.json())
//         .then(data => {
//           if (data.success && Array.isArray(data.testimonials)) {
//             setTestimonials(data.testimonials);
//           } else {
//             console.error("Invalid response format:", data);
//             setTestimonials([]);
//           }
//         })
//         .catch(err => console.error("Error fetching testimonials:", err));



//         fetchTestimonials();
//     }, []);

//     return (
//         <div style={styles.wrapper}>
//             <div style={styles.overlay}></div>

//             <div style={styles.container}>
//                 <h2 style={styles.title}>
//                     Our <span style={{ color: "#fff" }}>Satisfied</span> Customers
//                 </h2>

//                 {loading ? (
//                     <p style={{ color: '#fff' }}>Loading testimonials...</p>
//                 ) : testimonials.length > 0 ? (
//                     <div style={styles.testimonialRow}>
//                         {testimonials.map((t, i) => (
//                             <div key={i} style={styles.card}>
//                                 <div style={styles.iconWrapper}>
//                                     <img
//                                         src="https://cdn4.vectorstock.com/i/1000x1000/72/93/online-testimonial-logo-icon-design-vector-22947293.jpg"
//                                         alt="user"
//                                         style={styles.icon}
//                                     />
//                                 </div>
//                                 <h3 style={styles.name}>{t.user?.name || ''}</h3>
//                                 <p style={styles.message}>{t.testimonial}</p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p style={{ color: '#fff' }}>No testimonials available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// const styles = {
//     wrapper: {
//         position: 'relative',
//         backgroundImage: 'url("https://wallpaperaccess.com/full/3848326.jpg")',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         padding: '100px 20px',
//         color: 'white',
//         zIndex: 1,
//     },
//     overlay: {
//         position: 'absolute',
//         top: 0, left: 0, right: 0, bottom: 0,
//         backgroundColor: 'rgba(0, 0, 0, 0.6)',
//         zIndex: 2
//     },
//     container: {
//         position: 'relative',
//         zIndex: 3,
//         textAlign: 'center',
//         maxWidth: '1200px',
//         margin: '0 auto'
//     },
//     title: {
//         fontSize: '36px',
//         fontWeight: 'bold',
//         marginBottom: '40px',
//         color: '#ccc'
//     },
//     testimonialRow: {
//         display: 'flex',
//         justifyContent: 'center',
//         gap: '30px',
//         flexWrap: 'wrap'
//     },
//     card: {
//         background: 'rgba(255,255,255,0.8)',
//         borderRadius: '15px',
//         padding: '20px',
//         width: '300px',
//         boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//         textAlign: 'center',
//         backdropFilter: 'blur(5px)'
//     },
//     iconWrapper: {
//         width: '80px',
//         height: '80px',
//         margin: '0 auto 15px',
//         background: '#004aad',
//         borderRadius: '50%',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     icon: {
//         width: '40px',
//         height: '40px',
//         filter: 'invert(100%)'
//     },
//     name: {
//         fontSize: '18px',
//         fontWeight: 'bold',
//         marginBottom: '10px',
//         color: '#000'
//     },
//     message: {
//         fontSize: '14px',
//         color: '#333'
//     }
// };

// export default SatisfiedCustomers;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SatisfiedCustomers = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await axios.get('http://localhost:3200/api/testimonials', { withCredentials: true });
                if (res.data.success && Array.isArray(res.data.testimonials)) {
                    setTestimonials(res.data.testimonials);
                } else {
                    console.error("Invalid response format:", res.data);
                    setTestimonials([]);
                }
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex =>
                (prevIndex + 1) % testimonials.length
            );
        }, 4000);
        return () => clearInterval(interval);
    }, [testimonials]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.overlay}></div>

            <div style={styles.container}>
                <h2 style={styles.title}>
                    Our <span style={{ color: "#fff" }}>Satisfied</span> Customers
                </h2>

                {loading ? (
                    <p style={{ color: '#fff' }}>Loading testimonials...</p>
                ) : testimonials.length > 0 ? (
                    <div style={styles.slider}>
                        <div style={styles.card}>
                            <div style={styles.iconWrapper}>
                                <img
                                    src="https://cdn4.vectorstock.com/i/1000x1000/72/93/online-testimonial-logo-icon-design-vector-22947293.jpg"
                                    alt="user"
                                    style={styles.icon}
                                />
                            </div>
                            <h3 style={styles.name}>{testimonials[currentIndex]?.user?.name || 'Anonymous'}</h3>
                            <p style={styles.message}>{testimonials[currentIndex]?.testimonial}</p>
                        </div>
                    </div>
                ) : (
                    <p style={{ color: '#fff' }}>No testimonials available.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: 'relative',
        backgroundImage: 'url("https://wallpaperaccess.com/full/3848326.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        color: 'white',
        zIndex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 2
    },
    container: {
        position: 'relative',
        zIndex: 3,
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#ccc'
    },
    slider: {
        transition: 'all 0.5s ease-in-out',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        height: '100%',
        maxWidth: '500px',
        margin: '0 auto'
    },
    iconWrapper: {
        width: '80px',
        height: '80px',
        margin: '0 auto 15px',
        background: '#004aad',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: '40px',
        height: '40px',
        filter: 'invert(100%)'
    },
    name: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#fff'
    },
    message: {
        fontSize: '14px',
        color: '#eee'
    }
};

export default SatisfiedCustomers;
