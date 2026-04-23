import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Create Account</h2>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="username" placeholder="Username (3-20 chars)"
            value={form.username} onChange={handleChange} style={styles.input} required />
          <input name="email" type="email" placeholder="Email"
            value={form.email} onChange={handleChange} style={styles.input} required />
          <input name="password" type="password" placeholder="Password (min 6 chars)"
            value={form.password} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.footerLink}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", justifyContent: "center",
    alignItems: "center", background: "#0f0f1a" },
  card: { background: "#1a1a2e", padding: "40px", borderRadius: "12px",
    width: "100%", maxWidth: "420px", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" },
  title: { textAlign: "center", color: "#e94560", marginBottom: "20px" },
  error: { background: "#3d1515", color: "#ff6b6b", padding: "10px",
    borderRadius: "6px", marginBottom: "12px", fontSize: "0.9rem" },
  success: { background: "#1a3d1a", color: "#6bff6b", padding: "10px",
    borderRadius: "6px", marginBottom: "12px", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #333",
    background: "#0f0f1a", color: "#fff", fontSize: "1rem" },
  btn: { padding: "12px", background: "#e94560", color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold" },
  footer: { textAlign: "center", color: "#888", marginTop: "16px", fontSize: "0.9rem" },
  footerLink: { color: "#e94560" }
};
