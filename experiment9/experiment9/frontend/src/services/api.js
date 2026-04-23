import axios from "axios";

const API_URL = "http://localhost:8080/api";

// ── Axios instance ────────────────────────────────────────────────────────────
const api = axios.create({ baseURL: API_URL });

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.token) {
      config.headers["Authorization"] = "Bearer " + user.token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (username, password) =>
  api.post("/auth/login", { username, password });

export const register = (username, email, password, roles) =>
  api.post("/auth/register", { username, email, password, roles });

// ── Products ──────────────────────────────────────────────────────────────────
export const getProducts = (page = 0, size = 10) =>
  api.get(`/products?page=${page}&size=${size}`);

export const searchProducts = (keyword, page = 0) =>
  api.get(`/products/search?keyword=${keyword}&page=${page}`);

export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// ── Users ─────────────────────────────────────────────────────────────────────
export const getCurrentUser = () => api.get("/users/me");
export const getAllUsers    = () => api.get("/users");

// ── Test Endpoints ────────────────────────────────────────────────────────────
export const getPublicContent  = () => api.get("/public/hello");
export const getUserContent    = () => api.get("/user/profile");
export const getModContent     = () => api.get("/mod/dashboard");
export const getAdminContent   = () => api.get("/admin/dashboard");

export default api;
