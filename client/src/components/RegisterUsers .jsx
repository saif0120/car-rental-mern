import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const RegisterUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/users", {
          withCredentials: true,
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      backgroundImage: 'url("https://c8.alamy.com/comp/2CYYK1A/car-insurance-insurance-contract-and-car-keys-on-a-blue-background-2CYYK1A.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    content: {
      flex: 1,
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      // backgroundColor: "rgba(255, 255, 255, 0.8)", // optional for readability
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      background: "#fff",
    },
    th: {
      background: "#007bff",
      color: "white",
      padding: "10px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      border: "1px solid #ddd",
    },
  };
  
  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.content}>
        <h2 style={styles.heading}>Registered Users</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.mobile || "N/A"}</td>
                  <td style={styles.td}>{new Date(user.regDate).toLocaleDateString()}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisterUsers;
