import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function Navbar() {
  const { user, signOut, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>🔒 Experiment 9</Link>
      </div>
      <div style={styles.links}>
        <Link to="/products" style={styles.link}>Products</Link>
        {user && <Link to="/profile" style={styles.link}>Profile</Link>}
        {hasRole("ROLE_MODERATOR") || hasRole("ROLE_ADMIN")
          ? <Link to="/mod" style={styles.link}>Mod Panel</Link>
          : null}
        {hasRole("ROLE_ADMIN") && (
          <Link to="/admin" style={styles.link}>Admin</Link>
        )}
        {user ? (
          <button onClick={handleLogout} style={styles.btn}>
            Logout ({user.username})
          </button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "12px 24px", backgroundColor: "#1a1a2e", color: "#fff",
    position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.4)"
  },
  brand: { fontSize: "1.2rem", fontWeight: "bold" },
  brandLink: { color: "#e94560", textDecoration: "none" },
  links: { display: "flex", gap: "16px", alignItems: "center" },
  link: { color: "#ccc", textDecoration: "none", fontSize: "0.95rem" },
  btn: {
    background: "#e94560", color: "#fff", border: "none",
    padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "0.9rem"
  }
};
