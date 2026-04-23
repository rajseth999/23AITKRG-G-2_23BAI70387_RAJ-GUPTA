import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/api";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛡️ Admin Dashboard</h2>
      <p style={styles.sub}>Only users with <code>ROLE_ADMIN</code> can see this page.</p>

      {loading ? <p style={styles.info}>Loading users...</p> : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["ID","Username","Email","Roles","Provider"].map((h) => (
                  <th key={h} style={styles.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={styles.tr}>
                  <td style={styles.td}>{u.id}</td>
                  <td style={styles.td}>{u.username}</td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>
                    {u.roles?.map((r) => (
                      <span key={r.name} style={styles.roleBadge}>{r.name}</span>
                    ))}
                  </td>
                  <td style={styles.td}>{u.provider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "24px", background: "#0f0f1a", minHeight: "100vh", color: "#fff" },
  title: { color: "#e94560" },
  sub: { color: "#888", marginBottom: "24px" },
  info: { color: "#888", textAlign: "center" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", background: "#1a1a2e", borderRadius: "12px", overflow: "hidden" },
  th: { padding: "14px 16px", textAlign: "left", background: "#e9456022", color: "#e94560", fontWeight: "600", fontSize: "0.9rem" },
  tr: { borderBottom: "1px solid #2a2a3e" },
  td: { padding: "12px 16px", color: "#ccc", fontSize: "0.9rem" },
  roleBadge: { display: "inline-block", background: "#e9456033", color: "#e94560", padding: "2px 8px", borderRadius: "20px", fontSize: "0.75rem", marginRight: "4px" },
};
