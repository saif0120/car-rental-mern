import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3200/api/testimonials', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials);
        } else {
          console.error('Invalid response format:', data);
          setTestimonials([]);
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  const toggleStatus = (id, status) => {
    fetch(`http://localhost:3200/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: status === 'Active' ? 'Inactive' : 'Active' })
    })
      .then(() => {
        setTestimonials(prev =>
          prev.map(t =>
            t._id === id ? { ...t, status: status === 'Active' ? 'Inactive' : 'Active' } : t
          )
        );
      })
      .catch(err => console.error('Error updating status:', err));
  };

  const styles = {
    layout: {
      display: 'flex',
      minHeight: '100vh',
      backgroundImage: 'url("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    content: {
      flex: 1,
      padding: '30px',
      fontFamily: 'Segoe UI, sans-serif',
      // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency to show background
      margin: '20px',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      fontSize: '30px',
      textAlign: 'center',
      marginBottom: '25px',
      color: '#1f2937',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    },
    th: {
      backgroundColor: '#1e293b',
      color: '#fff',
      padding: '14px 16px',
      fontSize: '15px',
      textAlign: 'left',
    },
    td: {
      padding: '14px 16px',
      borderBottom: '1px solid #e5e7eb',
      fontSize: '14px',
    },
    button: (status) => ({
      backgroundColor: status === 'Active' ? '#22c55e' : '#ef4444',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '6px 14px',
      cursor: 'pointer',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.2s',
    }),
    buttonHover: {
      transform: 'scale(1.03)',
    },
    searchInput: {
      padding: '10px 14px',
      width: '100%',
      maxWidth: '320px',
      marginBottom: '20px',
      borderRadius: '8px',
      border: '1px solid #ccc',
    },
    noData: {
      textAlign: 'center',
      fontSize: '16px',
      color: '#555',
      padding: '20px',
    }
  };

  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.content}>
        <h2 style={styles.heading}>Manage Testimonials</h2>

        {/* Uncomment to enable search */}
        {/* <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.searchInput}
        /> */}

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Testimonial</th>
              <th style={styles.th}>Posting Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length > 0 ? (
              testimonials
                .filter(t =>
                  t.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
                  t.user?.email?.toLowerCase().includes(search.toLowerCase())
                )
                .map((t, index) => (
                  <tr key={t._id}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{t.user?.name}</td>
                    <td style={styles.td}>{t.user?.email}</td>
                    <td style={styles.td}>{t.testimonial}</td>
                    <td style={styles.td}>{new Date(t.createdAt).toLocaleString()}</td>
                    <td style={styles.td}>
                      <button
                        style={styles.button(t.status)}
                        onClick={() => toggleStatus(t._id, t.status)}
                      >
                        {t.status}
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td style={styles.noData} colSpan="6">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTestimonials;
