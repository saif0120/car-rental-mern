import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";

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
          console.error("Invalid response format:", data);
          setTestimonials([]);
        }
      })
      .catch(err => console.error("Error fetching testimonials:", err));
  }, []);

  const toggleStatus = (id, status) => {
    fetch(`http://localhost:3200/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: status === 'Active' ? 'Inactive' : 'Active' })
    }).then(() => {
      setTestimonials(prev => prev.map(t =>
        t._id === id ? { ...t, status: status === 'Active' ? 'Inactive' : 'Active' } : t
      ));
    }).catch(err => console.error("Error updating status:", err));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Manage Testimonials</h2>
        {/* <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: '10px', padding: '5px', width: '300px' }}
        /> */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={styles.th}>S.NO</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Testimonial</th>
              <th style={styles.th}>Posting Date</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(testimonials) ? testimonials : [])
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
                      onClick={() => toggleStatus(t._id, t.status)}
                      style={{
                        backgroundColor: t.status === 'Active' ? '#d4edda' : '#f8d7da',
                        color: t.status === 'Active' ? 'green' : 'red',
                        border: '1px solid',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        cursor: 'pointer'
                      }}
                    >
                      {t.status}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  th: { border: '1px solid #ddd', padding: '8px', background: '#f4f4f4', textAlign: 'left' },
  td: { border: '1px solid #ddd', padding: '8px' }
};

export default ManageTestimonials;
