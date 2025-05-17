import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const RegisterUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/vehicles`);

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
      backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),
        url("https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=600")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
    content: {
      flex: 1,
      padding: "40px 30px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#fff",
    },
    heading: {
      textAlign: "center",
      marginBottom: "30px",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#ffffff",
      textShadow: "1px 1px 3px rgba(0,0,0,0.8)",
    },
    tableWrapper: {
      overflowX: "auto",
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      borderRadius: "12px",
      overflow: "hidden",
    },
    th: {
      background: "linear-gradient(90deg, #0056b3, #007bff)",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
      fontSize: "16px",
      fontWeight: "600",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #ddd",
      color: "#333",
      fontSize: "15px",
    },
    noUsers: {
      textAlign: "center",
      padding: "20px",
      fontSize: "16px",
      color: "#666",
    },
  };

  return (
    <div style={styles.layout}>
      <Sidebar />

      <div style={styles.content}>
        <h2 style={styles.heading}>Registered Users</h2>
        <div style={styles.tableWrapper}>
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
                    <td style={styles.td}>
                      {new Date(user.regDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={styles.noUsers} colSpan="5">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegisterUsers;
