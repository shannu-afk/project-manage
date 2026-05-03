import { useState } from "react";
import API from "../api/api";
import '../App.css';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card card fade-in">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            placeholder="ENTER EMAIL" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="PASSWORD" 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
        </div>
        <button onClick={handleLogin} className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center mt-6">
          Don't have an account? <a href="/register" className="text-indigo-600 hover:text-indigo-700 font-medium" onClick={e => {e.preventDefault(); window.location.href = '/register';}}>Register here</a>
        </p>
      </div>
    </div>
  );
}
