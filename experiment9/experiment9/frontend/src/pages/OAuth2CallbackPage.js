import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { getCurrentUser } from "../services/api";

export default function OAuth2CallbackPage() {
  const [searchParams] = useSearchParams();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      // Temporarily store token to make the /users/me call
      localStorage.setItem("user", JSON.stringify({ token }));
      getCurrentUser()
        .then((res) => {
          const user = res.data;
          const roles = user.roles?.map((r) => r.name) || [];
          signIn({ token, id: user.id, username: user.username, email: user.email, roles });
          navigate("/products");
        })
        .catch(() => {
          localStorage.removeItem("user");
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "60px", color: "#fff", background: "#0f0f1a", minHeight: "100vh" }}>
      <h2>Completing Google sign-in...</h2>
    </div>
  );
}
