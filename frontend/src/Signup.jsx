// Updated Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./Notification";
import "./Auth.css";

function Signup() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification, NotificationProvider } = useNotification();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Basic validation
    if (formData.password.length < 6) {
      addNotification("Password must be at least 6 characters long!", "warning", 4000);
      setLoading(false);
      return;
    }
    
    try {
      await axios.post("http://localhost:5000/api/signup", formData);
      
      // Success notification
      addNotification("🎊 Account Created Successfully! Welcome to Cricket Predictor!", "success", 3000);
      
      // Delay navigation to show notification
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      console.error(error);
      
      // Error notification with specific messages
      let errorMessage = "Signup Failed! Please try again.";
      if (error.response?.status === 400) {
        errorMessage = "User already exists! Please try with different email.";
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
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              value={formData.username}
              onChange={handleChange} 
              required
            />
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
              placeholder="Password (min 6 characters)" 
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </form>
          <p>
            Already have an account? 
            <button 
              type="button" 
              onClick={() => navigate("/login")}
              className="link-button"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
      <NotificationProvider />
    </>
  );
}

export default Signup;