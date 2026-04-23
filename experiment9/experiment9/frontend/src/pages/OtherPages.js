import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const box = (emoji, title, desc) => (
  <div style={featureStyles.box} key={title}>
    <div style={{ fontSize: "2rem" }}>{emoji}</div>
    <h3 style={{ color: "#e94560", margin: "8px 0 4px" }}>{title}</h3>
    <p style={{ color: "#888", fontSize: "0.9rem", margin: 0 }}>{desc}</p>
  </div>
);

export function HomePage() {
  const { user } = useAuth();
  return (
    <div style={homeStyles.page}>
      <h1 style={homeStyles.h1}>🔒 Experiment 9</h1>
      <p style={homeStyles.sub}>Secure & Scalable Full Stack System</p>
      <p style={homeStyles.desc}>Spring Boot · Spring Security · OAuth2 · RBAC · JPA · React</p>
      <div style={featureStyles.grid}>
        {box("🛡️", "Spring Security", "JWT filter chain protects every request")}
        {box("🔑", "OAuth2 / Google", "One-click Google login with auto-provisioning")}
        {box("👥", "RBAC", "Admin / Moderator / User role hierarchy")}
        {box("⚡", "JPA Optimized", "Batching, paging, projections, indexes")}
        {box("🌐", "CORS Secured", "Configured for React frontend origin only")}
        {box("📦", "REST API", "Full CRUD with role-based endpoint protection")}
      </div>
      <div style={{ marginTop: "32px" }}>
        {user
          ? <Link to="/products" style={homeStyles.cta}>View Products →</Link>
          : <Link to="/login" style={homeStyles.cta}>Get Started →</Link>}
      </div>
    </div>
  );
}

export function ModeratorPage() {
  return (
    <div style={pg}>
      <h2 style={{ color: "#e94560" }}>🛠️ Moderator Panel</h2>
      <p style={{ color: "#888" }}>You have <code>ROLE_MODERATOR</code> or <code>ROLE_ADMIN</code> access.</p>
      <p style={{ color: "#ccc" }}>You can create and edit products from the Products page.</p>
    </div>
  );
}

export function UnauthorizedPage() {
  return (
    <div style={{ ...pg, textAlign: "center" }}>
      <h2 style={{ color: "#ef4444", fontSize: "3rem" }}>403</h2>
      <h3 style={{ color: "#fff" }}>Access Denied</h3>
      <p style={{ color: "#888" }}>You don't have permission to view this page.</p>
      <Link to="/" style={{ color: "#e94560" }}>← Go Home</Link>
    </div>
  );
}

const pg = { padding: "40px", background: "#0f0f1a", minHeight: "100vh", color: "#fff" };

const homeStyles = {
  page: { padding: "60px 24px", background: "#0f0f1a", minHeight: "100vh", color: "#fff", textAlign: "center" },
  h1: { fontSize: "2.8rem", color: "#e94560", marginBottom: "8px" },
  sub: { fontSize: "1.2rem", color: "#ccc", marginBottom: "8px" },
  desc: { color: "#888", marginBottom: "48px" },
  cta: { padding: "14px 32px", background: "#e94560", color: "#fff", borderRadius: "10px", textDecoration: "none", fontWeight: "bold", fontSize: "1.1rem" },
};

const featureStyles = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "860px", margin: "0 auto" },
  box: { background: "#1a1a2e", padding: "24px", borderRadius: "12px", textAlign: "center" },
};
