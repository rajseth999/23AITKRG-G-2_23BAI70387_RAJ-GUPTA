import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../services/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(form.username, form.password);
      signIn(res.data);
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Sign In</h2>
        <p style={styles.sub}>Demo users: admin / Admin@123 &nbsp;|&nbsp; user / User@123</p>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="username" placeholder="Username" value={form.username}
            onChange={handleChange} style={styles.input} required />
          <input name="password" type="password" placeholder="Password"
            value={form.password} onChange={handleChange} style={styles.input} required />
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <hr style={{ borderColor: "#333", margin: "16px 0" }} />
        <a href="http://localhost:8080/oauth2/authorize/google" style={styles.googleBtn}>
          🔵 Sign in with Google (OAuth2)
        </a>
        <p style={styles.footer}>
          No account? <Link to="/register" style={styles.footerLink}>Register here</Link>
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
  title: { textAlign: "center", color: "#e94560", marginBottom: "8px" },
  sub: { textAlign: "center", color: "#888", fontSize: "0.8rem", marginBottom: "20px" },
  error: { background: "#3d1515", color: "#ff6b6b", padding: "10px",
    borderRadius: "6px", marginBottom: "12px", fontSize: "0.9rem" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  input: { padding: "12px", borderRadius: "8px", border: "1px solid #333",
    background: "#0f0f1a", color: "#fff", fontSize: "1rem" },
  btn: { padding: "12px", background: "#e94560", color: "#fff", border: "none",
    borderRadius: "8px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold" },
  googleBtn: { display: "block", textAlign: "center", padding: "12px",
    background: "#4285F4", color: "#fff", borderRadius: "8px",
    textDecoration: "none", fontWeight: "bold" },
  footer: { textAlign: "center", color: "#888", marginTop: "16px", fontSize: "0.9rem" },
  footerLink: { color: "#e94560" }
};
