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
        if (testimonials.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [testimonials]);

    return (
        <div style={styles.wrapper}>
            <div style={styles.overlay}></div>
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Our <span style={{ color: "#fff" }}>Satisfied</span> Customers
                </h2>

                {loading ? (
                    <p style={styles.loadingText}>Loading testimonials...</p>
                ) : testimonials.length > 0 ? (
                    <div style={styles.slider}>
                        <div style={styles.card}>
                            <div style={styles.photoWrapper}>
                            <img
  src={
    testimonials[currentIndex]?.user?.photo ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonials[currentIndex]?.user?.name || "User"}`
  }
  alt="user"
  style={styles.photo}
/>


                            </div>
                            <h3 style={styles.name}>
                                {testimonials[currentIndex]?.user?.name || 'Anonymous'}
                            </h3>
                            <p style={styles.message}>
                                “{testimonials[currentIndex]?.testimonial}”
                            </p>
                        </div>
                    </div>
                ) : (
                    <p style={styles.loadingText}>No testimonials available.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        position: 'relative',
        backgroundImage: 'url("https://images.pexels.com/photos/3264504/pexels-photo-3264504.jpeg?auto=compress&cs=tinysrgb&w=600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '100px 20px',
        color: 'white',
        zIndex: 1,
        overflow: 'hidden'
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
        maxWidth: '900px',
        margin: '0 auto'
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#ccc'
    },
    loadingText: {
        color: '#fff',
        fontSize: '16px'
    },
    slider: {
        transition: 'all 0.5s ease-in-out',
    },
    card: {
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '20px',
        padding: '40px 30px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        textAlign: 'center',
        backdropFilter: 'blur(20px)',
        height: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        color: '#fff',
        transition: 'transform 0.5s ease',
    },
    photoWrapper: {
        width: '100px',
        height: '100px',
        margin: '0 auto 20px',
        borderRadius: '50%',
        overflow: 'hidden',
        border: '3px solid #fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
    },
    photo: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "10px solid #007BFF",
        boxShadow: "0 4px 12px rgba(0, 123, 255, 0.3)",
        backgroundColor: "#fff",
      },
    name: {
        fontSize: '22px',
        fontWeight: '600',
        marginBottom: '15px',
        color: '#fff'
    },
    message: {
        fontSize: '16px',
        color: '#eee',
        fontStyle: 'italic',
        lineHeight: '1.6'
    }
};

export default SatisfiedCustomers;
