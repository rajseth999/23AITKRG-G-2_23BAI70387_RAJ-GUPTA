import React, { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext";
import { getUserContent, getModContent, getAdminContent, getPublicContent } from "../services/api";

export default function ProfilePage() {
  const { user, hasRole } = useAuth();
  const [results, setResults] = useState({});

  const test = async (label, fn) => {
    try {
      const res = await fn();
      setResults((prev) => ({ ...prev, [label]: { ok: true, msg: res.data } }));
    } catch (e) {
      setResults((prev) => ({ ...prev, [label]: { ok: false, msg: e.response?.data?.message || "403 Forbidden" } }));
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>👤 Profile</h2>
        <table style={styles.table}>
          <tbody>
            {[["ID", user?.id], ["Username", user?.username], ["Email", user?.email],
              ["Roles", user?.roles?.join(", ")]].map(([k, v]) => (
              <tr key={k}>
                <td style={styles.tdLabel}>{k}</td>
                <td style={styles.tdValue}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>🔬 RBAC Endpoint Test</h3>
        <p style={styles.sub}>Click each button to test role-based access in real time.</p>
        <div style={styles.btnRow}>
          {[
            ["Public", () => getPublicContent()],
            ["User", () => getUserContent()],
            ["Moderator", () => getModContent()],
            ["Admin", () => getAdminContent()],
          ].map(([label, fn]) => (
            <button key={label} onClick={() => test(label, fn)} style={styles.testBtn}>
              Test {label}
            </button>
          ))}
        </div>
        <div style={styles.results}>
          {Object.entries(results).map(([label, { ok, msg }]) => (
            <div key={label} style={{ ...styles.result, borderLeft: `4px solid ${ok ? "#4ade80" : "#ef4444"}` }}>
              <strong style={{ color: ok ? "#4ade80" : "#ef4444" }}>{label}:</strong>{" "}
              <span style={{ color: "#ccc" }}>{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "24px", background: "#0f0f1a", minHeight: "100vh", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" },
  card: { background: "#1a1a2e", padding: "28px", borderRadius: "12px", width: "100%", maxWidth: "600px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" },
  title: { color: "#e94560", marginTop: 0 },
  sub: { color: "#888", marginBottom: "16px", fontSize: "0.9rem" },
  table: { width: "100%", borderCollapse: "collapse" },
  tdLabel: { color: "#888", padding: "8px 12px 8px 0", width: "100px", fontSize: "0.9rem" },
  tdValue: { color: "#fff", padding: "8px 0", fontWeight: "500" },
  btnRow: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" },
  testBtn: { padding: "8px 16px", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" },
  results: { display: "flex", flexDirection: "column", gap: "8px" },
  result: { background: "#0f0f1a", padding: "10px 14px", borderRadius: "6px", fontSize: "0.9rem" },
};
