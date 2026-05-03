import { useState } from "react";
import API from "../api/api";
import '../App.css';

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await API.post("/auth/register", form);
      alert("Registered! Now login");
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card card fade-in">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join the project management platform</p>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label>Name</label>
          <input 
            placeholder="Enter your name" 
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email"
            placeholder="Enter your email" 
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            placeholder="Create a password" 
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            required
          />
        </div>
        <button onClick={handleRegister} className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-center mt-6">
          Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium" onClick={e => {e.preventDefault(); window.location.href = '/';}}>Login here</a>
        </p>
      </div>
    </div>
  );
}
