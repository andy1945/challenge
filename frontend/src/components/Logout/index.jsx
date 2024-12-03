import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("expiry");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
