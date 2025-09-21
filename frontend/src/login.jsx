// Updated Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./Notification";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification, NotificationProvider } = useNotification();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      
      // Success notification
      addNotification("🎉 Login Successful! Welcome back, cricket fan!", "success", 3000);
      
      // Delay navigation to show notification
      setTimeout(() => {
        navigate("/prediction");
      }, 1500);
      
    } catch (error) {
      console.error(error);
      
      // Error notification with specific messages
      let errorMessage = "Login Failed! Please try again.";
      if (error.response?.status === 404) {
        errorMessage = "Invalid credentials! Please check your email and password.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error! Please try again later.";
      }
      
      addNotification(errorMessage, "error", 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p>
            Don't have an account? 
            <button 
              type="button" 
              onClick={() => navigate("/signup")}
              className="link-button"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
      <NotificationProvider />
    </>
  );
}

export default Login;