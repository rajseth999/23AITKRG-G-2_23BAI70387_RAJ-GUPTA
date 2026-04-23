import React, { useEffect, useState } from "react";
import { getProducts, searchProducts, createProduct, updateProduct, deleteProduct } from "../services/api";
import { useAuth } from "../services/AuthContext";

export default function ProductsPage() {
  const { hasRole } = useAuth();
  const canWrite = hasRole("ROLE_ADMIN") || hasRole("ROLE_MODERATOR");
  const canDelete = hasRole("ROLE_ADMIN");

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", stock: "" });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = keyword
        ? await searchProducts(keyword, page)
        : await getProducts(page, 6);
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (e) {
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [page, keyword]);

  const openCreate = () => { setEditItem(null); setForm({ name:"", description:"", price:"", category:"", stock:"" }); setShowForm(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ name: p.name, description: p.description, price: p.price, category: p.category, stock: p.stock }); setShowForm(true); };

  const handleSave = async () => {
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
    try {
      if (editItem) await updateProduct(editItem.id, payload);
      else await createProduct(payload);
      setShowForm(false);
      fetchProducts();
    } catch (e) { alert(e.response?.data?.message || "Save failed"); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>📦 Products</h2>
        <div style={styles.searchRow}>
          <input placeholder="Search by name..." value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
            style={styles.search} />
          {canWrite && <button onClick={openCreate} style={styles.addBtn}>+ Add Product</button>}
        </div>
      </div>

      {error && <div style={styles.error}>{error}</div>}
      {loading ? <p style={styles.info}>Loading...</p> : (
        <div style={styles.grid}>
          {products.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.badge}>{p.category}</div>
              <h3 style={styles.cardTitle}>{p.name}</h3>
              <p style={styles.desc}>{p.description}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>₹{p.price.toFixed(2)}</span>
                <span style={styles.stock}>Stock: {p.stock}</span>
              </div>
              {canWrite && (
                <div style={styles.actions}>
                  <button onClick={() => openEdit(p)} style={styles.editBtn}>Edit</button>
                  {canDelete && <button onClick={() => handleDelete(p.id)} style={styles.delBtn}>Delete</button>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div style={styles.pagination}>
        <button disabled={page === 0} onClick={() => setPage(page - 1)} style={styles.pageBtn}>← Prev</button>
        <span style={{ color: "#ccc" }}>Page {page + 1} / {totalPages}</span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)} style={styles.pageBtn}>Next →</button>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ color: "#e94560" }}>{editItem ? "Edit Product" : "New Product"}</h3>
            {["name","description","price","category","stock"].map((field) => (
              <input key={field} placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                value={form[field]} onChange={(e) => setForm({...form, [field]: e.target.value})}
                style={styles.input} />
            ))}
            <div style={{ display:"flex", gap:"10px", marginTop:"10px" }}>
              <button onClick={handleSave} style={styles.addBtn}>Save</button>
              <button onClick={() => setShowForm(false)} style={styles.delBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "24px", background: "#0f0f1a", minHeight: "100vh", color: "#fff" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "24px" },
  title: { color: "#e94560", margin: 0 },
  searchRow: { display: "flex", gap: "10px" },
  search: { padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#1a1a2e", color: "#fff", width: "220px" },
  addBtn: { padding: "10px 18px", background: "#e94560", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
  error: { background: "#3d1515", color: "#ff6b6b", padding: "10px", borderRadius: "6px", marginBottom: "16px" },
  info: { color: "#888", textAlign: "center", marginTop: "40px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  card: { background: "#1a1a2e", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" },
  badge: { display: "inline-block", background: "#e9456033", color: "#e94560", padding: "3px 10px", borderRadius: "20px", fontSize: "0.75rem", marginBottom: "8px" },
  cardTitle: { margin: "0 0 8px", fontSize: "1.1rem" },
  desc: { color: "#888", fontSize: "0.9rem", margin: "0 0 12px" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  price: { color: "#4ade80", fontWeight: "bold", fontSize: "1.1rem" },
  stock: { color: "#888", fontSize: "0.85rem" },
  actions: { display: "flex", gap: "8px", marginTop: "12px" },
  editBtn: { padding: "6px 14px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  delBtn: { padding: "6px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
  pagination: { display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "32px" },
  pageBtn: { padding: "8px 16px", background: "#1a1a2e", color: "#ccc", border: "1px solid #333", borderRadius: "8px", cursor: "pointer" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 },
  modal: { background: "#1a1a2e", padding: "32px", borderRadius: "12px", width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "8px", border: "1px solid #333", background: "#0f0f1a", color: "#fff", fontSize: "1rem" },
};
